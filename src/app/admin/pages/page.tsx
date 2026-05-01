"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pages = [
  {
    id: "about",
    title: "About",
    description: "Mission, vision, values, and team members.",
    href: "/admin/pages/about",
    publicHref: "/about",
    available: true,
  },
  {
    id: "home",
    title: "Home",
    description: "Hero, expertise, FAQ, partners, contact.",
    href: "/admin/pages/home",
    publicHref: "/",
    available: true,
  },
  {
    id: "services",
    title: "Services",
    description: "Service offerings, sectors, and approach.",
    href: "/admin/pages/services",
    publicHref: "/services",
    available: true,
  },
];

export default function AdminPagesList() {
  return (
    <div className="container mx-auto px-6 md:px-10 pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-16 md:mb-20">
        <h1 className="col-span-12 md:col-span-8 font-serif text-[clamp(2.4rem,5vw,4rem)] font-light text-foreground leading-[1.05]">
          Pages —{" "}
          <em className="not-italic text-foreground/55">
            the static surfaces.
          </em>
        </h1>
        <p className="col-span-12 md:col-span-4 text-[15px] text-foreground/65 leading-[1.7] mt-4 md:mt-2">
          Edit content displayed on the public site's anchor pages. Each page
          maps to a Firestore document with named sections.
        </p>
      </div>

      <div className="border-t border-foreground/15">
        {pages.map((page, i) =>
          page.available ? (
            <Link
              key={page.id}
              href={page.href}
              className="group block border-b border-foreground/15 py-8 md:py-10"
            >
              <Row index={i + 1} {...page} />
            </Link>
          ) : (
            <div
              key={page.id}
              className="block border-b border-foreground/15 py-8 md:py-10 opacity-50"
            >
              <Row index={i + 1} {...page} disabled />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function Row({
  index,
  title,
  description,
  publicHref,
  disabled,
}: {
  index: number;
  title: string;
  description: string;
  publicHref: string;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 items-start md:items-center">
      <div className="col-span-12 md:col-span-2">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block w-[6px] h-[6px] shrink-0 bg-primary"
          />
          <span
            className="font-serif-display font-light text-[2rem] md:text-[2.4rem] leading-none tabular-nums text-foreground/25"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
          >
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="col-span-12 md:col-span-7">
        <h2 className="font-serif text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-[1.15] text-foreground mb-2 group-hover:text-primary transition-colors duration-500">
          {title}
          {disabled && (
            <span className="ml-3 text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-sans">
              Coming soon
            </span>
          )}
        </h2>
        <p className="text-[14px] text-foreground/65 leading-[1.7] mb-2">
          {description}
        </p>
        <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-mono">
          {publicHref}
        </p>
      </div>
      {!disabled && (
        <div className="col-span-12 md:col-span-3 md:text-right mt-4 md:mt-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground font-medium">
            <span className="relative">
              Edit
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-foreground/40 group-hover:bg-accent transition-colors duration-500" />
            </span>
            <ArrowUpRight
              size={13}
              className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </span>
        </div>
      )}
    </div>
  );
}
