"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";

type Props = {
  headline1?: string;
  headline2?: string;
  quote?: string;
  attribution?: string;
};

export function FullWidthBanner({
  headline1,
  headline2,
  quote,
  attribution,
}: Props = {}) {
  const h1 = headline1 || HOME_FALLBACK.bannerHeadline1;
  const h2 = headline2 || HOME_FALLBACK.bannerHeadline2;
  const q = quote || HOME_FALLBACK.bannerQuote;
  const attr = attribution || HOME_FALLBACK.bannerQuoteAttribution;
  return (
    <section className="relative min-h-[65vh] md:min-h-[78vh] bg-primary text-primary-foreground overflow-hidden flex items-center">
      {/* Subtle noise for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative woven threads — ambient, mirrored on both sides */}
      <WovenMotif className="absolute top-0 left-6 md:left-10 h-full w-[22px] opacity-40" />
      <WovenMotif className="absolute top-0 right-6 md:right-10 h-full w-[22px] opacity-40" />

      {/* Corner editorial marks */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-3 text-primary-foreground/60 text-[10px] uppercase tracking-[0.3em]">
        <span className="w-8 h-px bg-primary-foreground/40" />
        <span>Interlude</span>
      </div>
      <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-3 text-primary-foreground/60 text-[10px] uppercase tracking-[0.3em] tabular-nums">
        <span>—</span>
        <span className="w-8 h-px bg-primary-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-6 md:px-10 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[960px] mx-auto text-center"
        >
          <h2
            className="font-serif-display text-[clamp(2.4rem,6.5vw,5.8rem)] font-light text-primary-foreground leading-[1.02]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', letterSpacing: "-0.015em" }}
          >
            {h1}
            <br />
            <em className="not-italic italic font-normal">{h2}</em>
          </h2>

          <div className="mt-10 mx-auto w-16 h-px bg-accent" />

          <blockquote className="mt-12 max-w-xl mx-auto">
            <p className="font-serif italic text-[1.1rem] md:text-[1.3rem] leading-[1.5] text-primary-foreground/85">
              &ldquo;{q}&rdquo;
            </p>
            <cite className="not-italic text-[10px] uppercase tracking-[0.28em] text-primary-foreground/55 block mt-4">
              — {attr}
            </cite>
          </blockquote>
        </motion.div>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[10px] uppercase tracking-[0.3em] text-primary-foreground/45">
        Pause · Chapter Break
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[10px] uppercase tracking-[0.3em] text-primary-foreground/45 tabular-nums">
        N° 05 · Interlude
      </div>
    </section>
  );
}

function WovenMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 22 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="banner-thread" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c96b42" stopOpacity="0" />
          <stop offset="25%" stopColor="#c96b42" stopOpacity="0.7" />
          <stop offset="75%" stopColor="#faf9f6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M11 0 Q 22 40 11 80 Q 0 120 11 160 Q 22 200 11 240 Q 0 280 11 320 Q 22 360 11 400 Q 0 440 11 480 Q 22 520 11 560 Q 0 600 11 640 Q 22 680 11 720 Q 0 760 11 800"
        fill="none"
        stroke="url(#banner-thread)"
        strokeWidth="0.8"
      />
      <path
        d="M11 0 Q 0 40 11 80 Q 22 120 11 160 Q 0 200 11 240 Q 22 280 11 320 Q 0 360 11 400 Q 22 440 11 480 Q 0 520 11 560 Q 22 600 11 640 Q 0 680 11 720 Q 22 760 11 800"
        fill="none"
        stroke="url(#banner-thread)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
