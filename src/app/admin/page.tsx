"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useUser } from "@/lib/firebase/use-user";

const sections = [
  {
    title: "Pages",
    href: "/admin/pages",
    description:
      "Edit the static pages — Home, About, and Services — section by section.",
    label: "Static",
  },
  {
    title: "Projects",
    href: "/admin/projects",
    description:
      "Featured case studies displayed at /projects. Add, edit, or remove engagements.",
    label: "Case Studies",
  },
  {
    title: "News & Insights",
    href: "/admin/news",
    description:
      "Articles and dispatches displayed at /news. Publish updates and reflections.",
    label: "Dispatches",
  },
];

export default function AdminDashboard() {
  const user = useUser();
  const firstName =
    user?.displayName?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "editor";

  return (
    <div className="container mx-auto px-6 md:px-10 pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-8">
          <span className="text-[10px] uppercase tracking-[0.28em] text-accent font-medium mb-5 block">
            Welcome back
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-light text-foreground leading-[1.05]">
            Good to see you,{" "}
            <em className="not-italic text-foreground/55">{firstName}.</em>
          </h1>
        </div>
        <p className="col-span-12 md:col-span-4 text-[15px] text-foreground/65 leading-[1.7] mt-4 md:mt-2">
          Manage UTU JAMII content from one place. Changes you save here
          publish to the live site within sixty seconds.
        </p>
      </div>

      <div className="border-t border-foreground/15">
        {sections.map((section, i) => (
          <Link
            key={section.href}
            href={section.href}
            className="group block border-b border-foreground/15 py-8 md:py-10"
          >
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
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="col-span-12 md:col-span-7">
                <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/50 mb-2 block">
                  {section.label}
                </span>
                <h2 className="font-serif text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-[1.15] text-foreground mb-2 group-hover:text-primary transition-colors duration-500">
                  {section.title}
                </h2>
                <p className="text-[14px] text-foreground/65 leading-[1.7] max-w-xl">
                  {section.description}
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right mt-4 md:mt-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground font-medium">
                  <span className="relative">
                    Open
                    <span className="absolute -bottom-0.5 left-0 w-full h-px bg-foreground/40 group-hover:bg-accent transition-colors duration-500" />
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
