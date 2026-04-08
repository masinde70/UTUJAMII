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
      transition={{ duration: 0.6, delay }}
      className="group border-t border-border pt-8 pb-4 flex flex-col h-full"
    >
      <span className="text-[12px] text-muted-foreground tracking-[0.15em] uppercase mb-6">
        {number}
      </span>
      <h3 className="font-serif text-[1.4rem] md:text-[1.6rem] font-normal mb-4 text-foreground leading-snug">
        {title}
      </h3>
      <p className="text-[15px] text-muted-foreground leading-relaxed flex-grow mb-6">
        {description}
      </p>
      <div className="flex items-center text-foreground text-sm font-medium mt-auto cursor-pointer group-hover:text-accent transition-colors duration-300">
        <span>Learn more</span>
        <ArrowUpRight size={14} className="ml-1.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </motion.div>
  );
}
