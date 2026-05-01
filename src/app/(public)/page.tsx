import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { AnimatedStats } from "@/components/AnimatedStats";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { AboutPreview } from "@/components/AboutPreview";
import { FullWidthBanner } from "@/components/FullWidthBanner";
import { ContactSection } from "@/components/ContactSection";
import { InPractice } from "@/components/InPractice";
import { FAQ } from "@/components/FAQ";
import { Partners } from "@/components/Partners";
import { getProjects } from "@/lib/cms/projects";
import { getHomePage } from "@/lib/cms/pages";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";

export const revalidate = 60;

export default async function Home() {
  const [projects, homeFromCms] = await Promise.all([
    getProjects(),
    getHomePage(),
  ]);
  const home = homeFromCms ?? HOME_FALLBACK;

  return (
    <div className="flex flex-col w-full">
      <Hero data={home} />
      <TrustBar label={home.trustBarLabel} sectors={home.trustBarSectors} />
      <AboutPreview data={home} />

      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-20 md:mb-28">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
              § The Practice
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
              Chapter 02
            </span>
          </div>

          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-16 md:mb-20">
            <h2 className="col-span-12 md:col-span-9 font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light text-foreground leading-[1.08]">
              {home.expertiseHeading}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-4">
            {(home.expertiseServices.length > 0
              ? home.expertiseServices
              : HOME_FALLBACK.expertiseServices
            ).map((service, index) => (
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

      <InPractice projects={projects} />
      <Testimonials items={home.testimonials} />
      <FullWidthBanner
        headline1={home.bannerHeadline1}
        headline2={home.bannerHeadline2}
        quote={home.bannerQuote}
        attribution={home.bannerQuoteAttribution}
      />
      <AnimatedStats stats={home.stats} />
      <FAQ faqs={home.faqs} />
      <Partners partners={home.partners} />
      <ContactSection data={home} />
    </div>
  );
}
