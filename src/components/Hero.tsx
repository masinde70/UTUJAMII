"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";
import type { HomePage } from "@/types/cms";

type HeroData = Pick<
  HomePage,
  | "heroLine1"
  | "heroLine2"
  | "heroConjunction"
  | "heroLine3"
  | "heroLine4"
  | "heroPlateCaption"
>;

export function Hero({ data }: { data?: HeroData }) {
  const d = data ?? HOME_FALLBACK;
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative flex flex-col pt-32 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-background">
      {/* Ambient woven-thread rail — referencing 'weaving threads of humanity' */}
      <WovenRail />

      {/* Paper grain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* Masthead — editorial top strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between border-b border-foreground/15 pb-4 mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 md:gap-5">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
              N° 01 — The Weave
            </span>
            <span className="w-6 h-px bg-foreground/20 hidden md:block" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 hidden md:inline">
              Shared Prosperity
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
              06°49′S · 39°17′E
            </span>
            <span className="w-6 h-px bg-foreground/20 hidden md:block" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums hidden sm:inline">
              {today}
            </span>
          </div>
        </motion.div>

        {/* Main editorial grid: 12-col, asymmetric */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-14">
          {/* Headline — col 1-8 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-8 relative"
          >
            <h1
              className="font-serif-display text-[clamp(2.7rem,8vw,7rem)] font-light leading-[0.95] text-foreground"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              {d.heroLine1}
              <br />
              <em
                className="not-italic font-normal text-primary"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
              >
                {d.heroLine2}
              </em>
              <br />
              <span className="text-foreground/30 italic font-light">{d.heroConjunction}</span>{" "}
              <span
                className="italic font-light text-foreground/85"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
              >
                {d.heroLine3}
              </span>
              <br />
              <span
                className="font-light"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
              >
                {d.heroLine4}
              </span>
            </h1>

            {/* Accent underline stroke */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 h-px bg-accent w-16 origin-left"
            />
          </motion.div>

          {/* Image plate — col 9-12, fills column height alongside headline */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col h-full min-h-[520px] md:min-h-0"
          >
            <div className="relative flex-1 w-full overflow-hidden bg-muted">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] ease-out hover:scale-[1.04]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1800&auto=format&fit=crop')",
                }}
              />
              {/* Plate corner marks */}
              <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/70" />
              <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/70" />
              <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/70" />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/70" />
              {/* Date stamp on plate */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-white/80 bg-black/25 backdrop-blur-sm px-2 py-1">
                Field Session
              </div>
            </div>

            {/* Plate caption — editorial style */}
            <figcaption className="mt-4 flex items-start justify-between gap-3 border-t border-foreground/15 pt-3">
              <p className="text-[12px] text-foreground/60 leading-[1.55] max-w-[220px]">
                {d.heroPlateCaption}
              </p>
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 whitespace-nowrap tabular-nums">
                Plate 01 · Dar es Salaam
              </span>
            </figcaption>
          </motion.figure>
        </div>

        {/* Bottom editorial strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 md:mt-12 border-t border-foreground/15 pt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="flex items-start gap-10 md:gap-14">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/50 block mb-1.5">
                Focus
              </span>
              <span className="font-serif text-[17px] text-foreground italic">
                Stakeholder Engagement
              </span>
            </div>
            <div className="w-px h-10 bg-foreground/15" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/50 block mb-1.5">
                Region
              </span>
              <span className="font-serif text-[17px] text-foreground italic">East Africa</span>
            </div>
            <div className="w-px h-10 bg-foreground/15 hidden sm:block" />
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/50 block mb-1.5">
                Est.
              </span>
              <span className="font-serif text-[17px] text-foreground italic tabular-nums">
                2016
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-8 flex-wrap">
            <Link
              href="/projects"
              className="group relative text-[12px] uppercase tracking-[0.22em] text-foreground font-medium flex items-center gap-1.5 py-1"
            >
              <span className="relative">
                Projects
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/services"
              className="group relative text-[12px] uppercase tracking-[0.22em] text-foreground font-medium flex items-center gap-1.5 py-1"
            >
              <span className="relative">
                Expertise
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ArrowDown size={13} className="text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function WovenRail() {
  return (
    <svg
      className="absolute top-0 right-3 md:right-6 h-full w-[22px] z-0 pointer-events-none opacity-55"
      viewBox="0 0 22 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="thread-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c96b42" stopOpacity="0" />
          <stop offset="20%" stopColor="#c96b42" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#2c3e2d" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2c3e2d" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M11 0 Q 22 40 11 80 Q 0 120 11 160 Q 22 200 11 240 Q 0 280 11 320 Q 22 360 11 400 Q 0 440 11 480 Q 22 520 11 560 Q 0 600 11 640 Q 22 680 11 720 Q 0 760 11 800"
        fill="none"
        stroke="url(#thread-fade)"
        strokeWidth="0.9"
      />
      <path
        d="M11 0 Q 0 40 11 80 Q 22 120 11 160 Q 0 200 11 240 Q 22 280 11 320 Q 0 360 11 400 Q 22 440 11 480 Q 0 520 11 560 Q 22 600 11 640 Q 0 680 11 720 Q 22 760 11 800"
        fill="none"
        stroke="url(#thread-fade)"
        strokeWidth="0.9"
      />
    </svg>
  );
}
