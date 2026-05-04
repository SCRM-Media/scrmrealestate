"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { MEDIA_BASE_URL } from "@/lib/site";

type Category = "all" | "listing" | "vertical" | "landscape" | "agency";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "listing", label: "Listing Photography" },
  { id: "vertical", label: "Vertical Video" },
  { id: "landscape", label: "Listing Video" },
  { id: "agency", label: "Brand & Team" },
];

type Item =
  | { type: "image"; src: string; category: Exclude<Category, "all">; aspect: string }
  | { type: "video"; src: string; category: Exclude<Category, "all">; aspect: string; poster?: string };

const items: Item[] = [
  ...Array.from({ length: 16 }).map<Item>((_, i) => ({
    type: "image",
    src: `/media/listings/listing-${String(i + 1).padStart(2, "0")}.png`,
    category: "listing" as const,
    aspect: i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-[4/3]" : "aspect-[4/5]",
  })),
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/vertical/vertical-2-bed-first.mp4`,
    category: "vertical",
    aspect: "aspect-[9/16]",
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/vertical/vertical-2-bed-second.mp4`,
    category: "vertical",
    aspect: "aspect-[9/16]",
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/vertical/vertical-3-bed.mp4`,
    category: "vertical",
    aspect: "aspect-[9/16]",
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/vertical/vertical-4-bed-ad.mp4`,
    category: "vertical",
    aspect: "aspect-[9/16]",
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/landscape/landscape-2-bed.mp4`,
    category: "landscape",
    aspect: "aspect-video",
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/landscape/landscape-3-bed.mp4`,
    category: "landscape",
    aspect: "aspect-video",
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/agency/peter-strata-informative.mp4`,
    category: "agency",
    aspect: "aspect-[9/16]",
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/agency/favourite-person-mgm-martin.mp4`,
    category: "agency",
    aspect: "aspect-[9/16]",
  },
];

export default function WorkGallery() {
  const [active, setActive] = useState<Category>("all");

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.category === active);
  }, [active]);

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-[var(--shell-h)] z-20 bg-re-ivory/95 backdrop-blur-sm border-b border-re-stone-light">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar py-4">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`shrink-0 px-4 md:px-5 py-2.5 text-xs tracking-[0.16em] uppercase border transition-colors min-h-[40px] ${
                    isActive
                      ? "bg-re-blue text-white border-re-blue"
                      : "bg-transparent text-re-ink border-re-stone-light hover:border-re-blue"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Masonry-style gallery */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
            {filtered.map((item, idx) => (
              <div
                key={`${item.src}-${idx}`}
                className={`mb-3 md:mb-4 break-inside-avoid relative overflow-hidden bg-re-stone-light ${item.aspect}`}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt="Real estate work"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-re-stone py-20">No work in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
