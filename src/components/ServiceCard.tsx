"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  number: string;
  delay?: number;
}

export function ServiceCard({ title, description, number, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative pt-8 pb-10 px-4 -mx-4 flex flex-col h-full cursor-pointer transition-colors duration-500 ease-out hover:bg-primary hover:text-primary-foreground"
    >
      {/* Top rule — draws from left on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-foreground/15 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </div>

      {/* Large serif index — the display moment */}
      <div className="flex items-start justify-between mb-10">
        <span
          className="font-serif-display font-light leading-[0.85] text-foreground/85 group-hover:text-accent tabular-nums transition-colors duration-500"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
            fontSize: "clamp(4.5rem, 7vw, 6.5rem)",
          }}
        >
          {number}
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 group-hover:text-primary-foreground/55 tabular-nums pt-3 transition-colors duration-500">
          / 04
        </span>
      </div>

      <h3 className="font-serif text-[1.35rem] md:text-[1.5rem] font-normal mb-4 leading-[1.2] text-foreground group-hover:text-primary-foreground transition-colors duration-500">
        {title}
      </h3>
      <p className="text-[14.5px] text-foreground/65 group-hover:text-primary-foreground/80 leading-[1.65] flex-grow mb-8 transition-colors duration-500">
        {description}
      </p>

      <div className="flex items-center text-[12px] font-medium uppercase tracking-[0.2em] mt-auto text-foreground group-hover:text-primary-foreground transition-colors duration-500">
        <span className="relative">
          Explore
          <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground/50 group-hover:bg-accent transition-colors duration-500" />
        </span>
        <ArrowUpRight
          size={13}
          className="ml-2 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
    </motion.div>
  );
}
