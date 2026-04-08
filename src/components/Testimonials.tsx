"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Before UTU JAMII came, there was confusion and anger. Then, they arrived, listened to our worries, and built bridges between us and the company. They trained our women, helped resolve grievances fairly, and ensured our children weren't forgotten. UTU JAMII isn't just a name; it's a feeling of hope woven into the fabric of our village.",
    author: "Bi Aisha",
    org: "Community Leader, Fungoni Mineral Sands Project",
  },
  {
    quote: "UTU JAMII, with their gentle hands and patient hearts, guided us. They trained our women, empowered them to speak up, and showed us how to fight for justice together. Now, the committees stand strong, a shield against violence, and our community feels safer, more unified. They haven't just given us tools; they've given us courage.",
    author: "Bwana Hamis",
    org: "Worker and Councilor",
  },
  {
    quote: "Community relations were strained, mistrust ran high, and navigating complex social dynamics threatened project progress. That's when we partnered with UTU JAMII. They became our bridge, their facilitation expertise smoothing communication channels and building trust. They weren't just a consultant; they were a skilled diplomat, weaving threads of understanding.",
    author: "Mr. Rashid",
    org: "Project Manager, Mwadui Resettlement",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-accent" />
          <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
            Client Perspectives
          </span>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <p className="font-serif text-[1.05rem] md:text-[1.1rem] text-foreground leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto pt-6 border-t border-border">
                <p className="text-sm font-medium text-foreground">{t.author}</p>
                <p className="text-[13px] text-muted-foreground">{t.org}</p>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
