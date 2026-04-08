import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { AnimatedStats } from "@/components/AnimatedStats";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { AboutPreview } from "@/components/AboutPreview";
import { FullWidthBanner } from "@/components/FullWidthBanner";
import { ContactSection } from "@/components/ContactSection";

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
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  Our Services
                </span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-normal text-foreground leading-tight">
                Comprehensive Solutions<br />
                for Complex Social Landscapes
              </h2>
            </div>
            <a
              href="/services"
              className="text-[13px] uppercase tracking-[0.15em] text-foreground font-medium hover:text-accent transition-colors border-b border-foreground hover:border-accent pb-1"
            >
              Explore All
            </a>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
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

      <Testimonials />
      <FullWidthBanner />
      <AnimatedStats />
      <ContactSection />
    </div>
  );
}
