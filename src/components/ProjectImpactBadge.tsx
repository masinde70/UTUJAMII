"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface ProjectImpactBadgeProps {
  value: string;
  label: string;
}

export function ProjectImpactBadge({ value, label }: ProjectImpactBadgeProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Try to parse the value to extract numbers and letters
  const match = value.match(/^(\d+)(.*)$/);
  const numericEnd = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (isInView && numericEnd !== null && numericEnd > 0) {
      let start = 0;
      const duration = 2000;
      const increment = numericEnd / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericEnd) {
          clearInterval(timer);
          setCount(numericEnd);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [numericEnd, isInView]);

  return (
    <div ref={ref} className="group p-6 rounded-2xl bg-surface border border-muted hover:border-accent/30 transition-colors shadow-sm text-center flex flex-col items-center justify-center">
      <div className="font-serif text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
        {numericEnd !== null ? (
          <>
            {count}
            {suffix}
          </>
        ) : (
          value
        )}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}
