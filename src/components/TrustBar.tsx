"use client";

import React from "react";
import { motion } from "framer-motion";

const sectors = [
  "Mining",
  "Infrastructure",
  "Energy",
  "Agriculture",
  "Healthcare",
];

export function TrustBar() {
  return (
    <section className="py-12 border-y border-border bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-medium whitespace-nowrap">
            Active Across Sectors
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="text-[13px] text-muted-foreground/60 tracking-wide font-medium uppercase"
              >
                {sector}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
