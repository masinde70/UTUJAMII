"use client";

import React from "react";
import { motion } from "framer-motion";
import { SERVICES_FALLBACK } from "@/lib/cms/services-fallback";
import type { ServicesPage } from "@/types/cms";

export function ServicesPageContent({ data }: { data: ServicesPage }) {
  const services =
    data.services.length > 0 ? data.services : SERVICES_FALLBACK.services;
  const sectors =
    data.sectors.length > 0 ? data.sectors : SERVICES_FALLBACK.sectors;
  const uniqueness =
    data.uniquenessItems.length > 0
      ? data.uniquenessItems
      : SERVICES_FALLBACK.uniquenessItems;

  return (
    <>
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
              {data.heroHeading}
            </h1>
            <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] max-w-2xl">
              {data.heroIntro}
            </p>
          </motion.div>
        </div>
      </section>

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
                {data.sectorsHeading}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {sectors.map((sector, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="border-t border-border pt-4"
                  >
                    <span className="text-[13px] text-foreground font-medium">
                      {sector}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                {data.uniquenessHeading}
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {uniqueness.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-t border-border pt-6"
                >
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
