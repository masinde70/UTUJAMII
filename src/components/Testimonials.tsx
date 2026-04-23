"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Before UTU JAMII came, there was confusion and anger. Then they arrived, listened to our worries, and built bridges between us and the company. They trained our women, helped resolve grievances fairly, and ensured our children weren't forgotten. UTU JAMII isn't just a name; it's a feeling of hope woven into the fabric of our village.",
    author: "Bi Aisha",
    initials: "BA",
    org: "Community Leader",
    project: "Fungoni Mineral Sands",
    location: "Pwani",
  },
  {
    quote:
      "UTU JAMII, with their gentle hands and patient hearts, guided us. They trained our women, empowered them to speak up, and showed us how to fight for justice together. Now the committees stand strong, a shield against violence, and our community feels safer, more unified. They haven't just given us tools; they've given us courage.",
    author: "Bwana Hamis",
    initials: "BH",
    org: "Worker and Councillor",
    project: "Community Grievance Programme",
    location: "Geita",
  },
  {
    quote:
      "Community relations were strained, mistrust ran high, and navigating complex social dynamics threatened project progress. That's when we partnered with UTU JAMII. They became our bridge, their facilitation expertise smoothing communication channels and building trust. They weren't just a consultant; they were a skilled diplomat, weaving threads of understanding.",
    author: "Mr. Rashid",
    initials: "MR",
    org: "Project Manager",
    project: "Mwadui Resettlement",
    location: "Shinyanga",
  },
];

export function Testimonials() {
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
                    {t.initials}
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
