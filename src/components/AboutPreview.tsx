"use client";

import React from "react";
import { motion } from "framer-motion";

const principles = [
  {
    index: "i.",
    title: "Empowerment at the Core",
    body:
      "We equip communities and businesses with the tools they need to thrive together, fostering lasting and sustainable change.",
  },
  {
    index: "ii.",
    title: "Dignity in Action",
    body:
      "We value Utu — the essence of being human — working with respect for cultural dignity, inclusivity, and interconnectedness.",
  },
];

export function AboutPreview() {
  return (
    <section className="relative py-24 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section masthead */}
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-16 md:mb-24">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            § Who We Are
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            Chapter 01
          </span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12 gap-y-16">
          {/* Large image — col 1-6 */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.6s] ease-out hover:scale-[1.03]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1800&auto=format&fit=crop')",
                }}
              />
              {/* Index badge */}
              <div className="absolute top-5 left-5 bg-background/95 backdrop-blur-sm px-3 py-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60 block">
                  Figure
                </span>
                <span className="font-serif text-[13px] text-foreground tabular-nums">
                  01 — Unity
                </span>
              </div>
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-3 border-t border-foreground/15 pt-3">
              <p className="text-[12px] text-foreground/55 leading-[1.6] max-w-[320px]">
                Hands interwoven in the village centre. Shared gesture, shared dignity.
              </p>
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                Photo · Mwadui
              </span>
            </figcaption>
          </motion.figure>

          {/* Text column — col 7-12 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-6 md:pt-4"
          >
            <h2 className="font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light text-foreground leading-[1.08] mb-10 md:mb-12">
              Hand in hand, hearts aligned —{" "}
              <em className="not-italic text-foreground/55">weaving progress</em> thread by thread.
            </h2>

            {/* Body with editorial drop cap */}
            <div className="relative">
              <p className="text-[16px] md:text-[17px] text-foreground/75 leading-[1.75] mb-8">
                <span
                  className="float-left font-serif-display text-[5.2rem] leading-[0.82] mr-3 mt-2 text-primary"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
                >
                  U
                </span>
                TU JAMII provides the link between businesses, government, communities and other stakeholders — creating the environment to build a bright future together. We believe in <em className="text-foreground italic">utu</em>, the Swahili essence of shared humanity and dignity.
              </p>
              <p className="text-[16px] md:text-[17px] text-foreground/75 leading-[1.75] mb-12">
                We don&apos;t just deliver solutions — we equip communities and businesses with the tools they need to thrive together, fostering lasting change across Tanzania and East Africa.
              </p>

              {/* Editorial pull quote */}
              <blockquote className="border-l-2 border-accent pl-6 mb-14">
                <p className="font-serif italic text-[1.25rem] md:text-[1.4rem] leading-[1.35] text-foreground">
                  &ldquo;If you want to go fast, go alone. If you want to go far — go together.&rdquo;
                </p>
                <cite className="not-italic text-[10px] uppercase tracking-[0.25em] text-foreground/50 block mt-3">
                  — African Proverb
                </cite>
              </blockquote>
            </div>

            {/* Numbered principles */}
            <div className="border-t border-foreground/15 pt-10 space-y-8">
              {principles.map((p) => (
                <div key={p.title} className="grid grid-cols-12 gap-4">
                  <span className="col-span-2 md:col-span-1 font-serif italic text-[15px] text-accent pt-0.5 tabular-nums">
                    {p.index}
                  </span>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="font-serif text-[1.15rem] text-foreground mb-1.5">{p.title}</h3>
                    <p className="text-[14px] text-foreground/65 leading-[1.65]">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
