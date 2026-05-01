"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";
import type { FaqItem } from "@/types/cms";


function Item({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-foreground/15">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full group flex items-start justify-between gap-6 py-6 md:py-7 text-left"
      >
        <div className="flex items-start gap-5 md:gap-7 flex-1">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-foreground/45 tabular-nums pt-1.5 md:pt-2 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-serif text-[1.05rem] md:text-[1.2rem] leading-[1.4] transition-colors duration-300 ${
              open ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
            }`}
          >
            {item.question}
          </span>
        </div>
        <span
          aria-hidden
          className={`shrink-0 mt-1 transition-transform duration-500 ${
            open ? "rotate-45 text-accent" : "text-foreground/60 group-hover:text-foreground"
          }`}
        >
          <Plus size={20} strokeWidth={1.25} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 pb-8 md:pb-10">
              <div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-9">
                <p className="text-[14px] md:text-[15px] text-foreground/70 leading-[1.85]">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ({ faqs }: { faqs?: FaqItem[] }) {
  const items = faqs && faqs.length > 0 ? faqs : HOME_FALLBACK.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section masthead */}
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-20 md:mb-24">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            § Further Reading
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            Chapter 06
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-12">
          {/* Left — standfirst */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-4 md:pr-6 lg:pr-10"
          >
            <h2 className="font-serif text-[clamp(1.85rem,3.6vw,2.8rem)] font-light text-foreground leading-[1.1] mb-6">
              Have some{" "}
              <em className="not-italic text-foreground/55">questions?</em>
            </h2>
            <p className="text-[14px] md:text-[15px] text-foreground/65 leading-[1.8] mb-8">
              A compendium of the questions we hear most often — from community
              leaders, corporate partners, students, and curious neighbours
              alike. Can&apos;t find yours? Write to us.
            </p>
            <a
              href="mailto:info@utujamii.com"
              className="group relative text-[12px] uppercase tracking-[0.22em] text-foreground font-medium py-1 inline-flex"
            >
              <span className="relative">
                Ask a Question
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-500" />
              </span>
            </a>

            <div className="mt-14 pt-6 border-t border-foreground/15 hidden md:block">
              <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/45">
                {items.length} entries · curated
              </span>
            </div>
          </motion.aside>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-8"
          >
            <div className="border-b border-foreground/15">
              {items.map((item, i) => (
                <Item
                  key={i}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
