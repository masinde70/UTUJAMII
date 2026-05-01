import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/cms/projects";
import type { Project } from "@/types/cms";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section masthead */}
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-20 md:mb-28">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            § Case Studies
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            Volume 01
          </span>
        </div>

        {/* Heading + standfirst */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-20 md:mb-28">
          <h1 className="col-span-12 md:col-span-8 font-serif text-[clamp(2.4rem,5vw,4rem)] font-light text-foreground leading-[1.05]">
            Featured projects —{" "}
            <em className="not-italic text-foreground/55">
              across Tanzania &amp; East Africa.
            </em>
          </h1>
          <p className="col-span-12 md:col-span-4 text-[15px] text-foreground/65 leading-[1.7] mt-4 md:mt-2">
            A working portfolio of community engagements — each project a chapter in a longer practice of weaving progress and dignity into the places we serve.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="border-t border-foreground/15 pt-12 text-center">
            <p className="text-foreground/55 text-[15px] leading-relaxed">
              No projects yet. Sign in to{" "}
              <Link
                href="/admin"
                className="underline decoration-accent underline-offset-4 hover:text-foreground"
              >
                /admin
              </Link>{" "}
              to add the first one.
            </p>
          </div>
        ) : (
          <div className="space-y-24 md:space-y-32">
            {projects.map((project, i) => (
              <ProjectEntry
                key={project.id}
                project={project}
                index={i}
                featured={i === 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectEntry({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const reverse = index % 2 === 1;
  const projectNo = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block border-t border-foreground/15 pt-12 md:pt-16"
    >
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-12 gap-y-8 items-center">
        {/* Image */}
        <figure
          className={`col-span-12 md:col-span-8 relative ${reverse ? "md:order-2" : ""}`}
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
            {project.mainImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                style={{ backgroundImage: `url('${project.mainImage.url}')` }}
                role="img"
                aria-label={project.mainImage.alt}
              />
            ) : (
              <div className="absolute inset-0 bg-primary/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/70" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/70" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/70" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/70" />
            {project.client && (
              <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm px-3 py-1.5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/70">
                  {project.client}
                </span>
              </div>
            )}
          </div>
          <figcaption className="mt-4 flex items-start justify-between gap-3 border-t border-foreground/15 pt-3">
            <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 tabular-nums">
              Project {projectNo}
              {project.client ? ` · ${project.client}` : ""}
            </span>
          </figcaption>
        </figure>

        {/* Text — alternates plain / featured-on-dark-green */}
        <div
          className={`col-span-12 md:col-span-4 ${reverse ? "md:order-1" : ""} ${
            featured
              ? "bg-primary text-primary-foreground p-7 md:p-8 self-stretch flex flex-col justify-center"
              : "flex flex-col"
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
                featured ? "text-primary-foreground/40" : "text-foreground/25"
              }`}
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              {projectNo}
            </span>
          </div>

          <h2
            className={`font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-light leading-[1.15] mb-5 transition-colors duration-500 ${
              featured
                ? "text-primary-foreground"
                : "text-foreground group-hover:text-primary"
            }`}
          >
            {project.title}
          </h2>

          <p
            className={`text-[14.5px] leading-[1.7] mb-7 ${
              featured ? "text-primary-foreground/80" : "text-foreground/70"
            }`}
          >
            {project.summary}
          </p>

          <div
            className={`inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.22em] font-medium ${
              featured ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            <span className="relative">
              Read Case Study
              <span
                className={`absolute -bottom-0.5 left-0 w-full h-px transition-colors duration-500 group-hover:bg-accent ${
                  featured ? "bg-primary-foreground/80" : "bg-foreground/40"
                }`}
              />
            </span>
            <ArrowUpRight
              size={13}
              className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
