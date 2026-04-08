"use client";

import React from "react";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";

const team = [
  {
    name: "Annagrace Felix Rwehumbiza",
    role: "Managing Director",
    speciality: "Gender Expert & Mediation Specialist",
    bio: "With a law degree and LLM in Sexual and Reproductive Rights, Annagrace brings legal acumen, extensive field experience in resettlement projects, human rights-business collaborations, and gender concerns. A skilled qualitative researcher using participatory methodologies, she has trained women entrepreneurs and facilitated stakeholder dialogue across East Africa.",
  },
  {
    name: "Richard Mabala",
    role: "Community Engagement Mentor",
    speciality: "Practitioner",
    bio: "A seasoned community engagement mentor and practitioner, Richard brings decades of experience in participatory approaches, community dialogue facilitation, and capacity building across Tanzania and the broader East African region.",
  },
  {
    name: "Beata Rutabingwa",
    role: "Community Engagement Specialist",
    speciality: "Disaster Risk Management",
    bio: "Beata specialises in community engagement and disaster risk management, bringing expertise in building community resilience, facilitating stakeholder dialogue, and developing frameworks for managing social risks in complex project environments.",
  },
  {
    name: "Dedi Mwita",
    role: "Social Development Specialist",
    speciality: "",
    bio: "Dedi is a dedicated social development specialist with expertise in community development programming, social impact assessment, and stakeholder engagement across diverse sectors including mining, infrastructure, and energy.",
  },
];

const values = [
  {
    title: "Utu — Human Dignity",
    description: "We value the essence of being human — recognising our interconnectedness and working with respect for cultural dignity and inclusivity.",
  },
  {
    title: "Jamii — Community",
    description: "We believe in a win-win model where business thrives and communities flourish — going beyond mutual misunderstandings and unnecessary conflicts.",
  },
  {
    title: "Wide-Ranging Expertise",
    description: "Our team boasts legal acumen, field experience, research expertise, and well-honed skills of community engagement, negotiation, and mediation.",
  },
  {
    title: "Beyond Projects, a Vision",
    description: "We're committed to promoting development while ensuring gender equality, youth development, and actively contributing to social change across Tanzania and Africa.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                About Us
              </span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-normal text-foreground leading-[1.08] max-w-4xl mb-8">
              If you want to go fast, go alone. If you want to go far, go together.
            </h1>
            <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] max-w-2xl">
              UTU JAMII is a Tanzanian organisation dedicated to empowering communities and building a more just and equitable society. We act as a bridge between businesses, government, communities, and other stakeholders — creating the environment for building a bright future together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full-width image */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop')" }}
        />
      </div>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  Our Mission
                </span>
              </div>
              <p className="text-[16px] md:text-[17px] text-foreground leading-[1.8]">
                To contribute to social change and development for all, in particular women and marginalised groups, through providing consultancy services in participatory community engagement and research, workshops and training facilitation, and capacity development.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  Our Vision
                </span>
              </div>
              <p className="text-[16px] md:text-[17px] text-foreground leading-[1.8]">
                A society where businesses and other stakeholders in Tanzania and across Africa thrive alongside vibrant communities — where economic growth goes hand in hand with social progress and where everyone has the opportunity to flourish.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="approach" className="py-20 md:py-28 bg-surface-alt">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  Why Work With Us
                </span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-normal text-foreground leading-tight">
                Rooted in principle, driven by impact.
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-t border-border pt-6"
                >
                  <h3 className="font-serif text-lg text-foreground mb-3">{value.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  UTU JAMII in Action
                </span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-normal text-foreground leading-tight">
                A track record of meaningful impact.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-0">
                {[
                  ["First paralegal network", "Established in Tanzania, offering legal aid to thousands"],
                  ["Women trained on rights", "10,000+"],
                  ["Sectors served", "Mining, Infrastructure, Energy, Agriculture"],
                  ["Regions active", "Tanzania, Ethiopia, Mozambique, Kenya"],
                  ["Community approach", "Participatory & rights-based"],
                  ["Standards framework", "IFC Performance Standards"],
                  ["Grievances resolved", "106 of 122 within 3 months (Fungoni)"],
                ].map(([label, value], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start justify-between gap-8 py-4 border-b border-border text-[14px]"
                  >
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-foreground font-medium text-right">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 md:py-28 bg-surface-alt">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-px bg-accent" />
            <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Our Team. Our Experts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="aspect-[3/4] bg-muted mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-1 font-medium">{member.role}</p>
                {member.speciality && (
                  <p className="text-[12px] text-muted-foreground mb-3">{member.speciality}</p>
                )}
                <p className="text-[13px] text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </div>
  );
}
