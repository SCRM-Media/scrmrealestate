import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "dark",
  className = "",
}: {
  /**
   * "dark" = used on light/ivory backgrounds (renders compact text mark in re-ink)
   * "light" = used on navy/black backgrounds (renders full PNG with white "media" + REAL ESTATE)
   */
  variant?: "dark" | "light";
  className?: string;
}) {
  if (variant === "light") {
    return (
      <Link
        href="/"
        aria-label="SCRM Media Real Estate — Home"
        className={`inline-flex items-center ${className}`}
      >
        <Image
          src="/logo.png"
          alt="SCRM Media Real Estate"
          width={3120}
          height={1779}
          priority
          className="h-12 md:h-14 w-auto"
        />
      </Link>
    );
  }

  // Dark variant — clean text mark for white header
  return (
    <Link
      href="/"
      aria-label="SCRM Media Real Estate — Home"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <span
        className="relative inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center border border-re-ink"
        aria-hidden
      >
        <span className="font-sans text-[11px] font-bold tracking-tight text-re-blue-accent">
          scrm
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-base md:text-lg font-semibold tracking-tight text-re-ink">
          <span className="text-re-blue-accent">scrm</span>
          <span className="text-re-ink"> media</span>
        </span>
        <span className="mt-0.5 font-sans text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-re-stone">
          Real Estate
        </span>
      </span>
    </Link>
  );
}
