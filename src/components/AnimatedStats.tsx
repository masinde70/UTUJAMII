"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
}

function StatItem({ end, suffix = "", label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
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
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline gap-1 mb-2">
        <span className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-normal text-foreground leading-none">
          {count}
        </span>
        <span className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] text-accent leading-none">
          {suffix}
        </span>
      </div>
      <div className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
        {label}
      </div>
    </div>
  );
}

export function AnimatedStats() {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const stats = [
    { end: 10, suffix: "k+", label: "Women Trained" },
    { end: 50, suffix: "+", label: "Communities Reached" },
    { end: 120, suffix: "+", label: "Projects Delivered" },
    { end: 95, suffix: "%", label: "Client Retention" },
  ];

  return (
    <section className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-accent" />
            <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Impact in Numbers
            </span>
          </div>

          {/* Stats grid with dividers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={i > 0 ? "lg:border-l lg:border-border lg:pl-8" : ""}
              >
                <StatItem end={stat.end} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
