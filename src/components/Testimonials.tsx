"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";
import type { TestimonialItem } from "@/types/cms";

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

export function Testimonials({ items }: { items?: TestimonialItem[] } = {}) {
  const testimonials =
    items && items.length > 0 ? items : HOME_FALLBACK.testimonials;
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section masthead */}
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-16 md:mb-24">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            § Voices from the Field
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            Chapter 04
          </span>
        </div>

        {/* Staggered editorial column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-14 gap-y-16">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={[
                "relative flex flex-col",
                i === 1 ? "md:pt-14" : "",
                i === 2 ? "md:pt-6" : "",
              ].join(" ")}
            >
              {/* Editorial mark — SVG left-quote glyph + project index */}
              <div className="flex items-start justify-between mb-6">
                <svg
                  width="58"
                  height="44"
                  viewBox="0 0 58 44"
                  fill="none"
                  aria-hidden
                  className="text-accent"
                >
                  <path
                    d="M0 44V26C0 11.6 10.4 0 24 0V8C15.2 8 9 14.8 9 24H20V44H0ZM34 44V26C34 11.6 44.4 0 58 0V8C49.2 8 43 14.8 43 24H54V44H34Z"
                    fill="currentColor"
                    fillOpacity="0.9"
                  />
                </svg>
                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/45 tabular-nums pt-2">
                  Testimony · 0{i + 1}
                </span>
              </div>

              <p className="font-serif text-[1.02rem] md:text-[1.08rem] leading-[1.65] text-foreground mb-10">
                {t.quote}
              </p>

              {/* Attribution block — editorial, with initials disc */}
              <div className="mt-auto pt-6 border-t border-foreground/15 flex items-start gap-4">
                <div
                  aria-hidden
                  className="shrink-0 w-11 h-11 rounded-full border border-accent/50 bg-accent/[0.08] flex items-center justify-center"
                >
                  <span className="font-serif text-[14px] text-accent tracking-wide">
                    {initialsFor(t.author)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-serif text-[15px] text-foreground leading-tight">
                    {t.author}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55 mt-1">
                    {t.org}
                  </p>
                  <p className="text-[11px] text-foreground/45 mt-1">
                    {t.project} · {t.location}
                  </p>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
