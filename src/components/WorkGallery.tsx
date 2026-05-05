"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIA_BASE_URL } from "@/lib/site";
import Lightbox, { type LightboxItem } from "./VideoLightbox";

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
  | { type: "video"; src: string; category: Exclude<Category, "all">; aspect: string; verticalRatio?: boolean };

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
    verticalRatio: true,
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/vertical/vertical-2-bed-second.mp4`,
    category: "vertical",
    aspect: "aspect-[9/16]",
    verticalRatio: true,
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/vertical/vertical-3-bed.mp4`,
    category: "vertical",
    aspect: "aspect-[9/16]",
    verticalRatio: true,
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/vertical/vertical-4-bed-ad.mp4`,
    category: "vertical",
    aspect: "aspect-[9/16]",
    verticalRatio: true,
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
    verticalRatio: true,
  },
  {
    type: "video",
    src: `${MEDIA_BASE_URL}/agency/favourite-person-mgm-martin.mp4`,
    category: "agency",
    aspect: "aspect-[9/16]",
    verticalRatio: true,
  },
];

export default function WorkGallery() {
  const [active, setActive] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.category === active);
  }, [active]);

  const openItem = (item: Item) => {
    setLightbox(
      item.type === "video"
        ? { type: "video", src: item.src, aspect: item.verticalRatio ? "9/16" : "16/9" }
        : { type: "image", src: item.src }
    );
  };

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
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.button
                  type="button"
                  key={`${item.src}-${idx}`}
                  onClick={() => openItem(item)}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(idx * 0.03, 0.4) }}
                  className={`group mb-3 md:mb-4 break-inside-avoid relative overflow-hidden bg-re-stone-light w-full ${item.aspect} cursor-pointer block`}
                  aria-label={`Open ${item.type === "video" ? "video" : "image"} preview`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt="Real estate work"
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-re-ink/55 via-re-ink/0 to-re-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Play indicator for videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase">
                        <span className="inline-flex h-9 w-9 items-center justify-center border border-white/70 bg-black/30 backdrop-blur-sm">
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M3 1.5l11 6.5-11 6.5z" />
                          </svg>
                        </span>
                        Play
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-re-stone py-20">No work in this category yet.</p>
          )}
        </div>
      </section>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
