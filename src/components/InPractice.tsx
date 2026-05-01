"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SAMPLE_PROJECTS } from "@/lib/cms/sample-projects";
import type { Project } from "@/types/cms";

type Card = {
  index: string;
  slug: string;
  title: string;
  location: string;
  sector: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
};

function buildCards(projects: Project[] | undefined): Card[] {
  const fromCms: Card[] = (projects ?? []).slice(0, 3).map((p, i) => ({
    index: String(i + 1).padStart(2, "0"),
    slug: p.id,
    title: p.title,
    location: p.client ?? "Tanzania",
    sector: p.client ?? "Engagement",
    summary: p.summary,
    imageUrl: p.mainImage?.url ?? SAMPLE_PROJECTS[i % 3].mainImage!.url,
    imageAlt: p.mainImage?.alt ?? p.title,
  }));

  const fillers = SAMPLE_PROJECTS.slice(fromCms.length, 3).map((s, i) => ({
    index: String(fromCms.length + i + 1).padStart(2, "0"),
    slug: s.slug,
    title: s.title,
    location: s.location,
    sector: s.sector,
    summary: s.summary,
    imageUrl: s.mainImage!.url,
    imageAlt: s.mainImage!.alt,
  }));

  return [...fromCms, ...fillers].slice(0, 3);
}

export function InPractice({ projects }: { projects?: Project[] }) {
  const cards = buildCards(projects);

  return (
    <section className="relative py-24 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-20 md:mb-28">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            § In Practice
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            Chapter 03
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 mb-20 md:mb-28 gap-x-6 md:gap-x-10 items-end"
        >
          <h2 className="col-span-12 md:col-span-8 font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light text-foreground leading-[1.08]">
            Projects in motion —{" "}
            <em className="not-italic text-foreground/55">
              across Tanzania &amp; East Africa.
            </em>
          </h2>
          <div className="col-span-12 md:col-span-4 md:text-right mt-6 md:mt-0">
            <Link
              href="/projects"
              className="group relative text-[12px] uppercase tracking-[0.22em] text-foreground font-medium inline-flex items-center gap-1.5 py-1"
            >
              <span className="relative">
                Full Portfolio
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-36">
          {cards.map((card, i) => (
            <ProjectBlock
              key={card.slug}
              card={card}
              reverse={i % 2 === 1}
              featured={i === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({
  card,
  reverse,
  featured = false,
}: {
  card: Card;
  reverse: boolean;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-12 gap-x-6 md:gap-x-12 gap-y-8 items-center"
    >
      <figure
        className={`col-span-12 md:col-span-8 relative ${reverse ? "md:order-2" : ""}`}
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
            style={{ backgroundImage: `url('${card.imageUrl}')` }}
            role="img"
            aria-label={card.imageAlt}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
          <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/70" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/70" />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/70" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/70" />
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm px-3 py-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/70">
              {card.sector}
            </span>
          </div>
        </div>
        <figcaption className="mt-4 flex items-start justify-between gap-3 border-t border-foreground/15 pt-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
            Project {card.index} · {card.location}
          </span>
        </figcaption>
      </figure>

      <div
        className={`col-span-12 md:col-span-4 ${reverse ? "md:order-1" : ""} ${
          featured
            ? "bg-primary text-primary-foreground p-7 md:p-8 self-stretch flex flex-col justify-center"
            : "md:pt-4"
        }`}
      >
        {featured && (
          <span className="text-[10px] uppercase tracking-[0.28em] text-accent font-medium mb-5">
            Featured Engagement
          </span>
        )}

        <div className="flex items-center gap-3 mb-5">
          <span
            aria-hidden
            className={`inline-block w-[7px] h-[7px] shrink-0 ${
              featured ? "bg-accent" : "bg-primary"
            }`}
          />
          <span
            className={`font-serif-display font-light text-[2.5rem] md:text-[3rem] leading-none tabular-nums ${
              featured
                ? "text-primary-foreground/40"
                : "text-foreground/25"
            }`}
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
          >
            {card.index}
          </span>
          <span
            className={`text-[10px] uppercase tracking-[0.28em] tabular-nums ${
              featured
                ? "text-primary-foreground/55"
                : "text-foreground/50"
            }`}
          >
            / 03
          </span>
        </div>

        <h3
          className={`font-serif text-[1.6rem] md:text-[1.85rem] font-light leading-[1.15] mb-5 ${
            featured ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {card.title}
        </h3>

        <p
          className={`text-[14.5px] leading-[1.75] mb-8 ${
            featured ? "text-primary-foreground/80" : "text-foreground/70"
          }`}
        >
          {card.summary}
        </p>

        <Link
          href={`/projects/${card.slug}`}
          className={`group relative inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.22em] font-medium py-1 ${
            featured ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          <span className="relative">
            See Project
            <span
              className={`absolute -bottom-0.5 left-0 w-full h-px transition-colors duration-500 group-hover:bg-accent ${
                featured ? "bg-primary-foreground/80" : "bg-foreground/50"
              }`}
            />
          </span>
          <ArrowUpRight
            size={13}
            className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </Link>
      </div>
    </motion.div>
  );
}
