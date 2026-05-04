/**
 * One-shot script to upload all videos in public/media/{agency,landscape,vertical}
 * to a Supabase Storage bucket called "media".
 *
 * Usage:
 *   1. Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your env
 *      (NEVER commit the service role key — it's only used locally for this upload).
 *   2. Run:  node scripts/upload-media.mjs
 *
 * After upload, set in Vercel env:
 *   NEXT_PUBLIC_MEDIA_BASE_URL=<SUPABASE_URL>/storage/v1/object/public/media
 */

import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.\n" +
      "Find them in Supabase → Project Settings → API."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const BUCKET = "media";
const ROOT = "public/media-web";
const FOLDERS = ["agency", "landscape", "vertical"];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const s = statSync(path);
    if (s.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

function contentTypeFor(file) {
  if (file.endsWith(".mp4")) return "video/mp4";
  if (file.endsWith(".mov")) return "video/quicktime";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    console.log(`Creating bucket "${BUCKET}" (public)…`);
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 52428800, // 50 MB (free tier max)
    });
    if (error) throw error;
  }
}

async function main() {
  await ensureBucket();

  const files = FOLDERS.flatMap((folder) => {
    try {
      return walk(join(ROOT, folder));
    } catch {
      return [];
    }
  });

  console.log(`Uploading ${files.length} files to bucket "${BUCKET}"…\n`);

  let ok = 0;
  let fail = 0;
  for (const path of files) {
    const key = relative(ROOT, path); // e.g. "vertical/vertical-3-bed.mp4"
    const buffer = readFileSync(path);
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(key, buffer, {
        contentType: contentTypeFor(path),
        upsert: true,
      });
    if (error) {
      console.error(`  ✗ ${key} — ${error.message}`);
      fail++;
    } else {
      console.log(`  ✓ ${key}`);
      ok++;
    }
  }

  console.log(`\nDone. ${ok} uploaded, ${fail} failed.`);
  console.log(`\nPublic base URL:`);
  console.log(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}\n`);
  console.log(`Set this in Vercel as NEXT_PUBLIC_MEDIA_BASE_URL.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
