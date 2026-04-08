"use client";

import React from "react";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";

const services = [
  {
    number: "01",
    title: "Training & Facilitation",
    description:
      "Training and facilitation for building capacity and collaboration. We cover community engagement, conflict resolution, leadership, participatory research, and sustainable development. Our facilitation services include mediation, conflict resolution, and community dialogue — ensuring projects are informed, collaborative, successful, and sustainable.",
    capabilities: ["Community Engagement", "Conflict Resolution", "Leadership Development", "Participatory Research", "Mediation", "Community Dialogue"],
    targets: "Communities, Businesses, Governments",
  },
  {
    number: "02",
    title: "Stakeholder Engagement",
    description:
      "Communities actively participate in shaping development projects. We address unsustainable development, miscommunication and conflict, exclusion and marginalisation through stakeholder mapping, participatory research, facilitation and dialogue, capacity building, and ongoing monitoring and evaluation.",
    capabilities: ["Stakeholder Mapping", "Participatory Research", "Facilitation & Dialogue", "Capacity Building", "Monitoring & Evaluation"],
    targets: "Communities, Businesses, Governments, Civil Society",
  },
  {
    number: "03",
    title: "Business & Social Performance",
    description:
      "Bridging financial goals and community well-being. We help organisations balance profit and purpose, measure impact, identify risks, and engage stakeholders effectively. Our offerings include social impact assessments, strategic development, stakeholder engagement, capacity building, and impact measurement — aligned with SDGs and IFC standards.",
    capabilities: ["Social Impact Assessments", "Strategic Development", "IFC Compliance", "Impact Measurement", "Risk Management"],
    targets: "Businesses, Investors, Policymakers, Communities",
  },
  {
    number: "04",
    title: "Community Engagement",
    description:
      "We don't just consult — we co-create. We tackle miscommunication and mistrust, exclusion and marginalisation, power imbalances, and cultural and social nuances. World Bank research shows projects with strong community engagement are 20% more likely to be completed on time and within budget.",
    capabilities: ["Participatory Research", "Facilitation Workshops", "Capacity Building", "Conflict Resolution", "Monitoring & Evaluation"],
    targets: "Communities, Businesses, NGOs, Government Agencies",
  },
  {
    number: "05",
    title: "Participatory Action Research & Assessment",
    description:
      "Communities as co-creators of knowledge and change. We address misrepresentation, lack of ownership, and power imbalances through participatory research design, collaborative data collection including focus groups, community mapping, and storytelling, joint analysis, and actionable recommendations.",
    capabilities: ["Appreciative Inquiry", "Most Significant Change", "Community Mapping", "Focus Groups", "Qualitative Research"],
    targets: "Communities, Businesses, Policymakers, Academia",
  },
  {
    number: "06",
    title: "Social Impact Assessment (SIA)",
    description:
      "Beyond the bottom line — illuminating potential and actual social impacts. We conduct scoping and baseline studies, participatory research, impact identification and analysis, mitigation and enhancement strategies, and monitoring and evaluation. A 2024 IISD study shows projects with robust SIA are 40% more likely to achieve social development objectives.",
    capabilities: ["Scoping & Baseline Studies", "Impact Analysis", "Mitigation Strategies", "Enhancement Plans", "Monitoring & Evaluation"],
    targets: "Project Developers, Investors, Governments, CSOs",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                Our Services. Our Programs
              </span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-normal text-foreground leading-[1.08] mb-8">
              Comprehensive solutions for complex social landscapes.
            </h1>
            <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] max-w-2xl">
              From in-depth social assessments to continuous stakeholder engagement, we provide end-to-end consulting for complex projects. Our three core areas span training and facilitation, business and social performance, and participatory action research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="border-t border-border py-12 md:py-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                  {/* Number + Title */}
                  <div className="lg:col-span-5">
                    <span className="text-[12px] text-muted-foreground tracking-[0.15em] uppercase block mb-4">
                      {service.number}
                    </span>
                    <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-normal text-foreground leading-snug mb-4">
                      {service.title}
                    </h2>
                    <p className="text-[12px] text-accent uppercase tracking-[0.1em]">
                      {service.targets}
                    </p>
                  </div>

                  {/* Description + Capabilities */}
                  <div className="lg:col-span-7">
                    <p className="text-[15px] text-muted-foreground leading-[1.8] mb-8">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {service.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-[12px] text-muted-foreground border border-border px-3 py-1.5 tracking-wide"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 md:py-28 bg-surface-alt">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  Sectors
                </span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-normal text-foreground leading-tight">
                Expertise across industries.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {["Agriculture", "Mining", "Manufacturing", "Energy", "Finance", "Healthcare", "Education", "Infrastructure", "Technology", "Tourism"].map((sector, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="border-t border-border pt-4"
                  >
                    <span className="text-[13px] text-foreground font-medium">{sector}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What makes us unique */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  Our Approach
                </span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-normal text-foreground leading-tight">
                What makes UTU JAMII unique.
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { title: "Community-Centred", desc: "Every engagement starts with listening — understanding local contexts, cultural nuances, and community aspirations before designing solutions." },
                { title: "Rights-Based Focus", desc: "We champion the rights of marginalised groups — women, youth, and people with disabilities — ensuring their voices shape development outcomes." },
                { title: "Participatory Methodology", desc: "We use appreciative inquiry, most significant change, and community-driven assessments — communities as co-creators, not just beneficiaries." },
                { title: "Evidence-Based Practice", desc: "Rigorous qualitative and quantitative research underpins every recommendation, from baseline studies to impact evaluations." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-t border-border pt-6"
                >
                  <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactSection />
    </div>
  );
}
