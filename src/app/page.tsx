import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, H2, CTAButton, Section } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[var(--shell-h)] pt-[var(--shell-h)] min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/listings/listing-01.png"
            alt="Premium luxury property"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-re-ink/30 via-re-ink/55 to-re-ink/85" />
        </div>
        <Container className="relative w-full pb-16 md:pb-24">
          <div className="max-w-3xl">
            <span className="label-eyebrow !text-white/85">SCRM Media · Real Estate</span>
            <h1 className="mt-4 h-display text-5xl md:text-7xl text-white">
              Premium content systems for luxury real estate.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              We help boutique agencies, top-performing agents, and developers build a consistent, editorial brand presence that earns trust before the first call.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CTAButton href="/contact">Book a strategy call</CTAButton>
              <CTAButton href="/work" variant="outline-light">
                See our work
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST BAR */}
      <section className="bg-re-blue text-white">
        <Container className="py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {[
              { v: "35+", l: "Accounts Managed" },
              { v: "1.5M+", l: "Organic Views" },
              { v: "$14", l: "Avg. Cost Per Lead" },
              { v: "AU", l: "Australia-Wide" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl md:text-4xl text-white">{s.v}</p>
                <p className="mt-1 label-eyebrow !text-white/65">{s.l}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* THREE PILLARS */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What we do</Eyebrow>
            <H2 className="mt-3">Three pillars. One coherent brand.</H2>
            <p className="mt-5 text-re-stone text-lg leading-relaxed">
              Most agencies post. The strongest agencies build a system. Ours is built around three pillars that work together — not independently.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-re-stone-light border border-re-stone-light">
            {[
              {
                t: "Social Media",
                d: "8 videos, 6 posts, 6 stories per month. Strategy, planning, scripting, filming, editing, scheduling — all coordinated.",
                i: "01",
              },
              {
                t: "Listing Photography",
                d: "Editorial-grade photography and listing video that makes properties feel premium across every touchpoint.",
                i: "02",
              },
              {
                t: "Vertical Content",
                d: "Reels, TikTok, and short-form video that turns a single listing into a week of distribution.",
                i: "03",
              },
            ].map((p) => (
              <div key={p.t} className="bg-re-ivory p-8 md:p-10">
                <span className="font-serif text-re-blue-accent text-2xl">{p.i}</span>
                <h3 className="mt-6 font-serif text-2xl md:text-3xl text-re-ink">{p.t}</h3>
                <p className="mt-3 text-re-stone leading-relaxed">{p.d}</p>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-re-blue hover:text-re-blue-accent transition-colors"
                >
                  Learn more <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PACKAGES PREVIEW */}
      <Section className="bg-white border-y border-re-stone-light">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <Eyebrow>Packages</Eyebrow>
              <H2 className="mt-3">Built for the way agencies actually grow.</H2>
            </div>
            <Link href="/packages" className="text-sm text-re-blue hover:text-re-blue-accent transition-colors">
              View all packages →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                t: "Minimum Management",
                p: "$1,500",
                pSub: "/ month",
                d: "Brand awareness, listing showcase, and social proof handled monthly.",
                feat: ["8 videos", "6 posts", "6 stories", "Strategy & planning"],
              },
              {
                t: "Growth Management",
                p: "On request",
                pSub: "tailored",
                d: "Scale content velocity with paid distribution and stronger creative output.",
                feat: ["Everything in Minimum", "Paid social", "More volume", "Quarterly review"],
              },
              {
                t: "Full Solution",
                p: "Most complete",
                pSub: "all-in-one",
                d: "Content, listings, photography, video and ongoing partnership.",
                feat: ["All content", "Listing media included", "Vertical add-ons", "Priority production"],
                featured: true,
              },
            ].map((pkg) => (
              <div
                key={pkg.t}
                className={`relative p-8 md:p-10 border transition ${
                  pkg.featured
                    ? "bg-re-blue text-white border-re-blue"
                    : "bg-re-ivory border-re-stone-light hover:border-re-blue/40 hover:shadow-[0_8px_30px_rgba(28,58,94,0.06)]"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-8 bg-re-gold-thin text-re-ink text-[10px] tracking-[0.22em] uppercase px-3 py-1">
                    Most Complete
                  </span>
                )}
                <p className={`label-eyebrow ${pkg.featured ? "!text-white/70" : ""}`}>{pkg.t}</p>
                <p className={`mt-4 font-serif text-4xl ${pkg.featured ? "text-white" : "text-re-ink"}`}>
                  {pkg.p}
                  <span className={`text-sm font-sans ml-1 ${pkg.featured ? "text-white/70" : "text-re-stone"}`}>
                    {pkg.pSub}
                  </span>
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${pkg.featured ? "text-white/80" : "text-re-stone"}`}>
                  {pkg.d}
                </p>
                <ul className={`mt-6 space-y-2 text-sm ${pkg.featured ? "text-white/90" : "text-re-ink"}`}>
                  {pkg.feat.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className={`h-1 w-3 ${pkg.featured ? "bg-white/60" : "bg-re-blue-accent"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WORK GALLERY PREVIEW */}
      <Section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Eyebrow>Recent work</Eyebrow>
              <H2 className="mt-3">A look at what we produce.</H2>
            </div>
            <Link href="/work" className="text-sm text-re-blue hover:text-re-blue-accent transition-colors">
              See full gallery →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div
                key={n}
                className="relative aspect-[4/5] overflow-hidden bg-re-stone-light"
              >
                <Image
                  src={`/media/listings/listing-${String(n).padStart(2, "0")}.png`}
                  alt={`Listing ${n}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section className="bg-re-ivory border-y border-re-stone-light">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Process</Eyebrow>
            <H2 className="mt-3">How we partner with you.</H2>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {[
              {
                n: "01",
                t: "Strategy & direction",
                d: "We map content pillars to your business goals — what you sell, who you serve, and what makes you different locally.",
              },
              {
                n: "02",
                t: "Production system",
                d: "Monthly filming, editing, listing media, and scheduling — built to run consistently, month after month.",
              },
              {
                n: "03",
                t: "Refine & scale",
                d: "We measure what's working, double down, and add channels — paid social, vertical, drone — when the time is right.",
              },
            ].map((s) => (
              <div key={s.n} className="border-t border-re-stone-light/80 pt-6">
                <p className="font-serif text-3xl text-re-blue-accent">{s.n}</p>
                <h3 className="mt-3 font-serif text-2xl text-re-ink">{s.t}</h3>
                <p className="mt-3 text-re-stone leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                q: "Our enquiry quality changed almost immediately. Sellers come in already understanding our process.",
                a: "Principal, Boutique Agency",
              },
              {
                q: "It finally feels like we have a brand, not just a feed. The team look the part on camera and we're winning listings on it.",
                a: "Director, Sales & Property Management",
              },
            ].map((t) => (
              <figure key={t.a} className="border border-re-stone-light p-8 md:p-10 bg-white">
                <span className="font-serif text-5xl text-re-blue-accent leading-none">“</span>
                <blockquote className="mt-2 font-serif text-2xl md:text-[28px] text-re-ink leading-snug">
                  {t.q}
                </blockquote>
                <figcaption className="mt-6 label-eyebrow">{t.a}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section dark className="!py-24">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow light>Ready to look like the agency you actually are?</Eyebrow>
            <H2 light className="mt-3">
              Let's build a content system worth trusting.
            </H2>
            <p className="mt-5 text-white/75 text-lg max-w-2xl">
              A 30-minute call is enough to map what your content should look like over the next 90 days. No pressure, no template pitch.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CTAButton href="/contact">Book a call</CTAButton>
              <CTAButton href="/packages" variant="outline-light">
                View packages
              </CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
