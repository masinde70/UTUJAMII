import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { AnimatedStats } from "@/components/AnimatedStats";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { AboutPreview } from "@/components/AboutPreview";
import { FullWidthBanner } from "@/components/FullWidthBanner";
import { ContactSection } from "@/components/ContactSection";
import { InPractice } from "@/components/InPractice";

const services = [
  {
    number: "01",
    title: "Training & Facilitation",
    description:
      "Building capacity and collaboration through community engagement, conflict resolution, leadership, and participatory research training programmes.",
  },
  {
    number: "02",
    title: "Stakeholder Engagement",
    description:
      "Creating the environment where communities actively participate in shaping development projects — building bridges of trust, one conversation at a time.",
  },
  {
    number: "03",
    title: "Business & Social Performance",
    description:
      "Bridging financial goals and community well-being through social impact assessments, strategic development, and compliance with IFC Performance Standards.",
  },
  {
    number: "04",
    title: "Community Engagement",
    description:
      "We don't just consult — we co-create. Participatory research, facilitation workshops, capacity building, and conflict resolution for lasting relationships.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustBar />
      <AboutPreview />

      {/* Expertise Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          {/* Section masthead */}
          <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-20 md:mb-28">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
              § The Practice
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
              Chapter 02
            </span>
          </div>

          {/* Heading + link */}
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-16 md:mb-20">
            <h2 className="col-span-12 md:col-span-9 font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light text-foreground leading-[1.08]">
              Comprehensive solutions for{" "}
              <em className="not-italic text-foreground/55">complex social landscapes.</em>
            </h2>
            <div className="col-span-12 md:col-span-3 flex md:justify-end md:items-end mt-6 md:mt-0">
              <a
                href="/services"
                className="group relative text-[12px] uppercase tracking-[0.22em] text-foreground font-medium py-1"
              >
                <span className="relative">
                  Explore All Services
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </span>
              </a>
            </div>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                number={service.number}
                title={service.title}
                description={service.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <InPractice />
      <Testimonials />
      <FullWidthBanner />
      <AnimatedStats />
      <ContactSection />
    </div>
  );
}
