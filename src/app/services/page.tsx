import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, H2, CTAButton, Section } from "@/components/ui";
import { Reveal, Stagger, StaggerChild } from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Monthly social media management, listing photography, listing video, vertical content, and drone — all built specifically for real estate agencies.",
};

const services = [
  {
    id: "social",
    eyebrow: "Service 01",
    title: "Monthly Social Media Management",
    body:
      "A consistent monthly content system built around your business goals — brand awareness, listings, team, social proof, and local authority. Strategy and execution under one roof.",
    includes: [
      "8 social media videos per month",
      "6 social media posts per month",
      "6 stories per month",
      "Monthly planning, direction & content coordination",
      "Editing, captions & scheduling",
    ],
    ideal: "Agencies who want to look more premium, build trust before the call, and stop posting reactively.",
    image: "/media/listings/listing-03.png",
    reverse: false,
  },
  {
    id: "photography",
    eyebrow: "Service 02",
    title: "Listing Photography & Video",
    body:
      "Editorial-grade listing photography paired with a horizontal listing video that makes properties look the part on portals, brochures, and social.",
    includes: [
      "10 / 15 / 20 photo packages",
      "Professional listing video included",
      "Same-day on-site production",
      "Premium colour grade and editing",
      "Optimised for portals + social",
    ],
    ideal: "Boutique agencies and agents who want every listing to look like a flagship listing.",
    image: "/media/listings/listing-06.png",
    reverse: true,
  },
  {
    id: "vertical",
    eyebrow: "Service 03",
    title: "Vertical Social Media Listing Video",
    body:
      "Reels-first short-form video that turns one listing into a week of distribution. Built to perform on Instagram, TikTok, and Facebook Reels.",
    includes: [
      "Punchy edit, hook-driven structure",
      "Captions and platform-ready exports",
      "$300 add-on for monthly clients",
      "$450 standalone (or non-social media clients)",
      "Pairs with listing photography",
    ],
    ideal: "Agents who already get good results but want their listings to travel further online.",
    image: "/media/listings/listing-09.png",
    reverse: false,
  },
];

const faqs = [
  {
    q: "Do you only work with luxury agencies?",
    a: "We specialise in premium and boutique real estate, but we work with any agency that takes its brand seriously and wants a long-term partner — not a freelancer.",
  },
  {
    q: "Where are you based and how far do you travel?",
    a: "We're Australia-based and service Australia-wide. Most production happens in Sydney metro; for regional or interstate work we plan filming in batches to keep it efficient.",
  },
  {
    q: "Can I just buy listing photos without the monthly package?",
    a: "Yes. Listing photography and video are sold per-job. The monthly package is separate and optional, but the two work very well together.",
  },
  {
    q: "How do drone shots work?",
    a: "We add drone to listing media for $100 (1–3 shots) or $200 for a wider package — front of property, location/context, top-of-building, etc. Adjusted to suit the property.",
  },
  {
    q: "Can you handle paid social as well?",
    a: "Yes — paid social is part of our Growth Management offering. We typically wait until your organic system is producing strong creative before scaling spend.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/listings/listing-02.png"
            alt="Editorial real estate marketing"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-re-ink/30 via-re-ink/55 to-re-ink/85" />
        </div>
        <Container className="relative w-full pb-16 md:pb-24">
          <Reveal>
            <Eyebrow>
              <span className="!text-white/85">Services</span>
            </Eyebrow>
            <h1 className="mt-3 h-display text-5xl md:text-6xl text-white max-w-3xl">
              One studio. Every layer of your real estate brand.
            </h1>
            <p className="mt-5 text-white/80 max-w-2xl text-lg">
              From your monthly content rhythm to the photography on your next listing — designed and produced by a single team.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* SERVICES */}
      {services.map((s) => (
        <Section id={s.id} key={s.id} className={s.reverse ? "bg-white border-y border-re-stone-light" : ""}>
          <Container>
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center ${s.reverse ? "md:[direction:rtl]" : ""}`}>
              <Reveal direction={s.reverse ? "right" : "left"} className="md:col-span-7 [direction:ltr]">
                <div className="relative aspect-[4/3] overflow-hidden bg-re-stone-light group">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                </div>
              </Reveal>
              <Reveal direction={s.reverse ? "left" : "right"} className="md:col-span-5 [direction:ltr]">
                <Eyebrow>{s.eyebrow}</Eyebrow>
                <h2 className="mt-3 h-display text-3xl md:text-4xl text-re-ink">{s.title}</h2>
                <p className="mt-5 text-re-stone leading-relaxed">{s.body}</p>

                <div className="mt-8">
                  <p className="label-eyebrow">Includes</p>
                  <ul className="mt-3 space-y-2 text-sm text-re-ink">
                    {s.includes.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1 w-3 bg-re-blue-accent shrink-0" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-re-blue-light p-5 border-l-2 border-re-blue-accent">
                  <p className="label-eyebrow">Ideal for</p>
                  <p className="mt-1 text-sm text-re-ink">{s.ideal}</p>
                </div>

                <div className="mt-7">
                  <CTAButton href="/contact" variant="outline">
                    Talk to us about this
                  </CTAButton>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}

      {/* FAQ */}
      <Section dark>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <Reveal direction="up" className="md:col-span-4">
              <Eyebrow light>FAQ</Eyebrow>
              <H2 light className="mt-3">
                Common questions, answered.
              </H2>
              <p className="mt-5 text-white/70 leading-relaxed">
                Still unsure if we're a fit? A 30-minute call is the fastest way to find out.
              </p>
            </Reveal>
            <Reveal direction="up" className="md:col-span-8" delay={0.15}>
              <FAQAccordion items={faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-re-ivory">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Next step</Eyebrow>
              <H2 className="mt-3">Find the right service for your agency.</H2>
              <p className="mt-5 text-re-stone text-lg">
                We'll review your current content, your goals, and where the highest-leverage move is right now — before you commit to anything.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTAButton href="/contact">Book a strategy call</CTAButton>
                <CTAButton href="/packages" variant="outline">
                  See packages
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
