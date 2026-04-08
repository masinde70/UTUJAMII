"use client";

import React from "react";
import { motion } from "framer-motion";

export function FullWidthBanner() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-6"
        >
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-normal text-white leading-[1.1] max-w-4xl mx-auto">
            Beyond Profits,<br />
            Building a Brighter Future
          </h2>
          <p className="text-white/60 text-[15px] md:text-base mt-6 max-w-lg mx-auto leading-relaxed">
            Beyond the mutual misunderstandings, beyond the unnecessary conflicts — finding the formula where business thrives and communities flourish.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
