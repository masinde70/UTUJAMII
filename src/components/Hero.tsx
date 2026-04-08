"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col justify-end pb-12 md:pb-24 pt-24 md:pt-32 md:min-h-screen overflow-hidden bg-background">
      {/* Subtle background texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a14' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-12 mb-12 md:mb-20">
          {/* Left — Editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:max-w-[60%]"
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                Shared Prosperity
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[1.08] tracking-tight text-foreground">
              Bridging{" "}
              <em className="not-italic text-primary">Communities</em>
              <br className="hidden sm:block" />
              <span className="text-muted-foreground/50"> & </span>
              <span className="text-muted-foreground/60">Business</span>{" "}
              Together
            </h1>
          </motion.div>

          {/* Right — Featured image + descriptor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:max-w-[35%] flex flex-col gap-4"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop')" }}
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[280px]">
                Creating the environment for building a bright future — where business thrives and communities flourish.
              </p>
              <span className="text-[12px] uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
                Dar es Salaam
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom row — navigation bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            {/* Left labels */}
            <div className="flex items-center gap-6 md:gap-12">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Focus</span>
                <span className="text-sm font-medium text-foreground">Stakeholder Engagement</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Region</span>
                <span className="text-sm font-medium text-foreground">East Africa</span>
              </div>
            </div>

            {/* Right links */}
            <div className="flex items-center gap-6">
              <Link
                href="/projects"
                className="group flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Projects
                <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services"
                className="group flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Expertise
                <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
