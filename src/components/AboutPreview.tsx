"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";
import type { HomePage } from "@/types/cms";

type AboutPreviewData = Pick<
  HomePage,
  "aboutHeading" | "aboutBody1" | "aboutBody2" | "aboutQuote" | "aboutPrinciples"
>;

const ROMAN = ["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii."];

export function AboutPreview({ data }: { data?: AboutPreviewData }) {
  const d = data ?? HOME_FALLBACK;
  const firstChar = d.aboutBody1.charAt(0);
  const restOfBody1 = d.aboutBody1.slice(1);
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
              {d.aboutHeading}
            </h2>

            {/* Body with editorial drop cap */}
            <div className="relative">
              <p className="text-[16px] md:text-[17px] text-foreground/75 leading-[1.75] mb-8">
                <span
                  className="float-left font-serif-display text-[5.2rem] leading-[0.82] mr-3 mt-2 text-primary"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
                >
                  {firstChar}
                </span>
                {restOfBody1}
              </p>
              <p className="text-[16px] md:text-[17px] text-foreground/75 leading-[1.75] mb-12">
                {d.aboutBody2}
              </p>

              {/* Editorial pull quote */}
              <blockquote className="border-l-2 border-accent pl-6 mb-14">
                <p className="font-serif italic text-[1.25rem] md:text-[1.4rem] leading-[1.35] text-foreground">
                  &ldquo;{d.aboutQuote}&rdquo;
                </p>
                <cite className="not-italic text-[10px] uppercase tracking-[0.25em] text-foreground/50 block mt-3">
                  — African Proverb
                </cite>
              </blockquote>
            </div>

            {/* Numbered principles */}
            <div className="border-t border-foreground/15 pt-10 space-y-8">
              {(d.aboutPrinciples.length > 0
                ? d.aboutPrinciples
                : HOME_FALLBACK.aboutPrinciples
              ).map((p, i) => (
                <div key={p.title || i} className="grid grid-cols-12 gap-4">
                  <span className="col-span-2 md:col-span-1 font-serif italic text-[15px] text-accent pt-0.5 tabular-nums">
                    {ROMAN[i] ?? `${i + 1}.`}
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
