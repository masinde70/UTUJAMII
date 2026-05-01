"use client";

import React from "react";
import { motion } from "framer-motion";
import type { AboutPage } from "@/types/cms";

export function AboutPageContent({ data }: { data: AboutPage }) {
  return (
    <>
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
              {data.heading}
            </h1>
            <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] max-w-2xl">
              {data.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
      </div>

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
                {data.mission}
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
                {data.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
              {data.values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-t border-border pt-6"
                >
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 md:py-28 bg-surface-alt">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-px bg-accent" />
            <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Our Team. Our Experts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {data.team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="aspect-[3/4] bg-muted mb-6 overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo.url}
                      alt={member.photo.alt || member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
                  )}
                </div>
                <h3 className="font-serif text-lg text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-[12px] uppercase tracking-[0.15em] text-accent mb-1 font-medium">
                  {member.role}
                </p>
                {member.speciality && (
                  <p className="text-[12px] text-muted-foreground mb-3">
                    {member.speciality}
                  </p>
                )}
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
