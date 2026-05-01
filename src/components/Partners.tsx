"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";
import type { PartnerItem } from "@/types/cms";

function wordmarkFor(name: string): string {
  const firstWord = name.split(/\s+/)[0] ?? name;
  return firstWord.toUpperCase();
}

export function Partners({ partners }: { partners?: PartnerItem[] }) {
  const items =
    partners && partners.length > 0 ? partners : HOME_FALLBACK.partners;
  return (
    <section className="relative py-24 md:py-32 bg-surface-alt overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section masthead */}
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-20 md:mb-24">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            § In Collaboration
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            Chapter 07
          </span>
        </div>

        {/* Heading + note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 gap-x-6 md:gap-x-10 items-end mb-20 md:mb-28"
        >
          <h2 className="col-span-12 md:col-span-8 font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light text-foreground leading-[1.08]">
            Our partners —{" "}
            <em className="not-italic text-foreground/55">
              the collaborators who walk beside us.
            </em>
          </h2>
          <p className="col-span-12 md:col-span-4 text-[13px] md:text-[14px] text-foreground/60 leading-[1.7] mt-6 md:mt-0 md:pl-6">
            Threads of shared purpose. We work alongside humanitarian, human-rights and development partners across Tanzania and beyond — each engagement a deliberate choice of alignment.
          </p>
        </motion.div>

        {/* Wordmark grid — 5 columns on desktop, editorial rule between */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-foreground/15"
        >
          {items.map((p, i) => {
            const hasUrl = !!p.url && p.url !== "#";
            const Tag = hasUrl ? motion.a : motion.div;
            return (
              <Tag
                key={p.name + i}
                {...(hasUrl
                  ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className={[
                  "group relative flex flex-col items-start justify-between",
                  "px-4 md:px-6 py-10 md:py-14",
                  "border-b border-foreground/15",
                  i !== 0 ? "lg:border-l lg:border-foreground/15" : "",
                  i % 2 === 1 ? "md:border-l md:border-foreground/15 lg:border-l" : "",
                  i % 3 !== 0 ? "md:border-l md:border-foreground/15" : "",
                ].join(" ")}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 tabular-nums mb-8">
                  0{i + 1}
                </span>

                <span
                  className="font-serif-display font-light text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-500"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
                >
                  {wordmarkFor(p.name)}
                </span>

                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-foreground/50 mt-3">
                  {p.name}
                </span>

                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-[width] duration-500 ease-out" />
              </Tag>
            );
          })}
        </motion.div>

        {/* Footnote */}
        <div className="mt-14 md:mt-16 pt-4 border-t border-foreground/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-foreground/55 max-w-md leading-relaxed">
            Partnerships listed represent collaborations across humanitarian, justice and community-development mandates.
          </p>
          <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/45">
            Interested in partnering? — info@utujamii.com
          </span>
        </div>
      </div>
    </section>
  );
}
