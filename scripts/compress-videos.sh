#!/bin/bash
# Compress all videos in public/media/{agency,landscape,vertical} into web/
# Outputs H.264 MP4, ~1.5 Mbps, faststart for streaming.
# Skips files that already have a compressed version.
set -e

SRC_ROOT="public/media"
OUT_ROOT="public/media-web"
mkdir -p "$OUT_ROOT/agency" "$OUT_ROOT/landscape" "$OUT_ROOT/vertical"

compress() {
  local src="$1"
  local rel="${src#$SRC_ROOT/}"
  local base="${rel%.*}"
  local out="$OUT_ROOT/$base.mp4"

  if [[ -f "$out" ]]; then
    echo "  ✓ skip $rel (already compressed)"
    return
  fi

  echo "  → compressing $rel"
  ffmpeg -y -i "$src" \
    -vcodec libx264 \
    -preset slow \
    -crf 26 \
    -maxrate 2500k \
    -bufsize 5000k \
    -vf "scale='min(1080,iw)':-2" \
    -acodec aac -b:a 128k \
    -movflags +faststart \
    -loglevel error \
    "$out"
}

for dir in agency landscape vertical; do
  for f in "$SRC_ROOT/$dir"/*.mp4 "$SRC_ROOT/$dir"/*.mov; do
    [[ -f "$f" ]] || continue
    compress "$f"
  done
done

echo ""
echo "Compressed sizes:"
du -sh "$OUT_ROOT"/* 2>/dev/null
echo ""
du -sh "$OUT_ROOT"
