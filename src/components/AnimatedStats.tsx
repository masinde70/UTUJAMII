"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";
import type { StatItem as StatItemData } from "@/types/cms";

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
  caption: string;
  index: string;
}

function StatItem({ end, suffix = "", label, caption, index }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1800;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return (
    <div ref={ref} className="flex flex-col h-full">
      <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/40 tabular-nums mb-6">
        {index}
      </span>

      <div className="flex items-start gap-1 mb-6">
        <span
          className="font-serif-display font-light text-[clamp(4rem,8.5vw,8rem)] leading-[0.85] text-primary-foreground tabular-nums"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
        >
          {count}
        </span>
        <span
          className="font-serif-display font-light text-[clamp(2rem,4vw,3.5rem)] leading-none text-accent pt-2"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
        >
          {suffix}
        </span>
      </div>

      <div className="mt-auto">
        <p className="font-serif text-[1.05rem] text-primary-foreground leading-tight mb-1.5">{label}</p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/50">{caption}</p>
      </div>
    </div>
  );
}

export function AnimatedStats({ stats: statsProp }: { stats?: StatItemData[] } = {}) {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const stats =
    statsProp && statsProp.length > 0 ? statsProp : HOME_FALLBACK.stats;

  return (
    <section className="relative py-24 md:py-40 bg-primary text-primary-foreground overflow-hidden" ref={ref}>
      {/* Subtle grain for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* Section masthead */}
        <div className="flex items-end justify-between border-b border-primary-foreground/20 pb-4 mb-20 md:mb-28">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-primary-foreground/60">
            § Impact in Numbers
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-primary-foreground/60 tabular-nums">
            Chapter 05 · As of 2026
          </span>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 md:gap-y-20 lg:gap-y-0"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label + i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={i > 0 ? "lg:border-l lg:border-primary-foreground/20 lg:pl-8" : "lg:pr-8"}
            >
              <StatItem
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                caption={stat.caption}
                index={String(i + 1).padStart(2, "0")}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footnote row */}
        <div className="mt-20 md:mt-24 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-primary-foreground/55 max-w-md leading-relaxed">
            * Figures compiled from project records across Tanzania, Kenya, Uganda &amp; Rwanda. Independently verified through client testimony.
          </p>
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/50 tabular-nums">
            Source — Utu Jamii Internal Audit
          </span>
        </div>
      </div>
    </section>
  );
}
