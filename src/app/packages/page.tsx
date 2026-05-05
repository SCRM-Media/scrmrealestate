import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, H2, CTAButton, Section } from "@/components/ui";
import { Reveal, Stagger, StaggerChild } from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Monthly content management, listing photography and video, vertical content add-ons, and drone — transparent pricing built for real estate agencies.",
};

const packages = [
  {
    name: "Minimum Management",
    tagline: "Brand Awareness Package",
    price: "$1,500",
    sub: "/ month",
    description:
      "A consistent monthly content rhythm — brand awareness, listings, team, and social proof handled for you.",
    features: [
      "8 social media videos per month",
      "6 social media posts per month",
      "6 stories per month",
      "Monthly planning & direction",
      "Content tailored to business goals",
      "Editing, captions & scheduling",
    ],
    featured: false,
    cta: "Book a call",
  },
  {
    name: "Growth Management",
    tagline: "Volume + Distribution",
    price: "On request",
    sub: "tailored",
    description:
      "When the foundation is producing, we scale — more content, more channels, paid distribution where it earns its keep.",
    features: [
      "Everything in Minimum Management",
      "Additional video volume",
      "Paid social distribution",
      "Stronger creative variations",
      "Quarterly strategy review",
      "Priority production slots",
    ],
    featured: true,
    cta: "Talk to us",
  },
  {
    name: "Full Solution",
    tagline: "Most Complete",
    price: "All-in-one",
    sub: "partnership",
    description:
      "Content, listings, photography, vertical, drone — every layer of your real estate brand under one roof.",
    features: [
      "All content production",
      "Listing photography & video",
      "Vertical add-ons included",
      "Drone where applicable",
      "Direct production team",
      "Dedicated account direction",
    ],
    featured: false,
    cta: "Book a call",
  },
];

const photoPackages = [
  { name: "Listing Essentials", price: "$600", details: "10 photos + listing video" },
  { name: "Listing Standard", price: "$800", details: "15 photos + listing video" },
  { name: "Listing Premium", price: "$1,000", details: "20 photos + listing video" },
];

const addOns = [
  {
    name: "Vertical Social Video",
    price: "$300 – $450",
    details: "$300 for monthly clients · $450 standalone or non-social-media clients",
  },
  {
    name: "Drone — Small Add-On",
    price: "$100",
    details: "1–3 drone photos. Front of property, exterior, or context shot.",
  },
  {
    name: "Drone — Larger Add-On",
    price: "$200",
    details: "~3 extra drone shots: wide area, top of building, front, location/context.",
  },
];

const faqs = [
  {
    q: "Is the monthly package locked in?",
    a: "No long-term lock-ins. We work to a quarterly cadence so the system has time to compound, but you're not locked into multi-year contracts.",
  },
  {
    q: "Can I change packages later?",
    a: "Absolutely. Most agencies start at Minimum Management and either scale into Growth, or step into the Full Solution as listing volume picks up.",
  },
  {
    q: "Are listings included in the monthly package?",
    a: "Listing photography and listing video are separate per-listing pricing. They're rolled into the Full Solution package, but priced individually if you want to keep them separate.",
  },
  {
    q: "How does invoicing work?",
    a: "Monthly packages are invoiced at the start of each cycle. Listing media is invoiced once the property is shot and delivered.",
  },
  {
    q: "Do you film in-person each month?",
    a: "Yes. We film monthly content batches in person — typically a half-day at your office or out on a listing — to capture team, agent, and listing-based content together.",
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-re-blue text-white">
        <Container className="py-20 md:py-28">
          <Reveal>
            <Eyebrow light>Packages & pricing</Eyebrow>
            <h1 className="mt-3 h-display text-5xl md:text-6xl text-white max-w-3xl">
              Transparent pricing. Built around how real estate actually works.
            </h1>
            <p className="mt-5 text-white/80 max-w-2xl text-lg">
              Monthly content systems, listing media, and add-ons — priced individually so you can build the partnership that fits.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* MAIN PACKAGES */}
      <Section className="!pt-16 md:!pt-20">
        <Container>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" staggerChildren={0.1}>
            {packages.map((pkg) => (
              <StaggerChild
                key={pkg.name}
                className={`relative p-8 md:p-10 border flex flex-col transition-all duration-500 ${
                  pkg.featured
                    ? "bg-re-blue text-white border-re-blue hover:shadow-[0_24px_60px_rgba(28,58,94,0.25)]"
                    : "bg-white border-re-stone-light hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(28,58,94,0.08)] hover:border-re-blue/40"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-8 bg-re-gold-thin text-re-ink text-[10px] tracking-[0.22em] uppercase px-3 py-1">
                    Most Popular
                  </span>
                )}
                <p className={`label-eyebrow ${pkg.featured ? "!text-white/70" : ""}`}>
                  {pkg.tagline}
                </p>
                <h3
                  className={`mt-3 font-serif text-3xl ${
                    pkg.featured ? "text-white" : "text-re-ink"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`mt-6 font-serif text-5xl ${
                    pkg.featured ? "text-white" : "text-re-ink"
                  }`}
                >
                  {pkg.price}
                  <span
                    className={`ml-2 text-sm font-sans ${
                      pkg.featured ? "text-white/70" : "text-re-stone"
                    }`}
                  >
                    {pkg.sub}
                  </span>
                </p>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    pkg.featured ? "text-white/80" : "text-re-stone"
                  }`}
                >
                  {pkg.description}
                </p>
                <ul
                  className={`mt-6 space-y-2.5 text-sm flex-grow ${
                    pkg.featured ? "text-white/90" : "text-re-ink"
                  }`}
                >
                  {pkg.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span
                        className={`mt-2 h-1 w-3 shrink-0 ${
                          pkg.featured ? "bg-white/60" : "bg-re-blue-accent"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CTAButton
                    href="/contact"
                    variant={pkg.featured ? "outline-light" : "solid"}
                  >
                    {pkg.cta}
                  </CTAButton>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* LISTING MEDIA */}
      <Section className="bg-white border-y border-re-stone-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <Reveal direction="left" className="md:col-span-5">
              <Eyebrow>Listing media</Eyebrow>
              <H2 className="mt-3">Listing photography & video.</H2>
              <p className="mt-5 text-re-stone leading-relaxed">
                Editorial-grade photography paired with a horizontal listing video — every package, every time. Add vertical, drone, or both as add-ons below.
              </p>
              <div className="relative mt-8 aspect-[4/5] overflow-hidden bg-re-stone-light group">
                <Image
                  src="/media/listings/listing-12.png"
                  alt="Listing photography"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
            <Stagger className="md:col-span-7 grid grid-cols-1 gap-4" staggerChildren={0.08}>
              {photoPackages.map((p) => (
                <StaggerChild
                  key={p.name}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-6 md:p-7 border border-re-stone-light bg-re-ivory hover:border-re-blue/40 hover:bg-white transition-all duration-500"
                >
                  <div>
                    <p className="label-eyebrow">{p.name}</p>
                    <p className="mt-2 font-serif text-2xl text-re-ink">{p.details}</p>
                  </div>
                  <p className="font-serif text-3xl text-re-blue">{p.price}</p>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ADD-ONS */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-2xl mb-12">
              <Eyebrow>Add-ons</Eyebrow>
              <H2 className="mt-3">Add depth to any listing.</H2>
              <p className="mt-5 text-re-stone leading-relaxed">
                Vertical and drone are priced individually so you can scale presentation to the property — not the other way around.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerChildren={0.08}>
            {addOns.map((a) => (
              <StaggerChild
                key={a.name}
                className="p-7 border border-re-stone-light bg-re-ivory hover:border-re-blue/40 hover:bg-white transition-all duration-500"
              >
                <p className="label-eyebrow">{a.name}</p>
                <p className="mt-2 font-serif text-3xl text-re-blue">{a.price}</p>
                <p className="mt-3 text-sm text-re-stone leading-relaxed">{a.details}</p>
              </StaggerChild>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* FAQ */}
      <Section dark>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <Reveal className="md:col-span-4">
              <Eyebrow light>FAQ</Eyebrow>
              <H2 light className="mt-3">
                Pricing questions.
              </H2>
              <p className="mt-5 text-white/70 leading-relaxed">
                If your question isn't covered here, it's a 5-minute answer on a call.
              </p>
            </Reveal>
            <Reveal className="md:col-span-8" delay={0.15}>
              <FAQAccordion items={faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Next step</Eyebrow>
              <H2 className="mt-3">Want a recommendation tailored to your agency?</H2>
              <p className="mt-5 text-re-stone text-lg">
                Tell us about your current content, listings volume, and goals — we'll suggest the package that actually fits.
              </p>
              <div className="mt-8">
                <CTAButton href="/contact">Book a strategy call</CTAButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
