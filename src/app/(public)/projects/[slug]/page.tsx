import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { ProjectImpactBadge } from "@/components/ProjectImpactBadge";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getProjectBySlug } from "@/lib/cms/projects";

export const revalidate = 60;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="pb-24 bg-background w-full overflow-hidden">
      <div className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end mb-16 px-4 md:px-12 pb-16 lg:pb-24">
        {project.mainImage ? (
          <>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={project.mainImage.url}
                alt={project.mainImage.alt}
                className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </>
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start pt-32">
          <Link
            href="/projects"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8 font-medium tracking-wide uppercase text-xs"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Case Studies
          </Link>

          <div className="max-w-4xl">
            {project.client && (
              <div className="flex items-center text-xs md:text-sm font-bold tracking-widest text-accent uppercase mb-6 bg-black/40 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <Building2 size={14} className="mr-2" />
                Partner: {project.client}
              </div>
            )}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] drop-shadow-xl">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/80 border-l-2 border-accent pl-6 py-2 max-w-3xl drop-shadow-md leading-relaxed">
              {project.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-2/3">
            <div className="w-24 h-1 bg-accent mb-12 rounded-full" />
            <div className="max-w-3xl pt-4">
              {project.body ? (
                <MarkdownBody source={project.body} />
              ) : (
                <p className="text-xl text-muted-foreground italic">
                  No detailed case study provided for this project yet.
                </p>
              )}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32 flex flex-col gap-6">
              <h3 className="font-serif text-3xl font-bold text-foreground">
                Measurable Impact
              </h3>
              <p className="text-muted-foreground font-light mb-4">
                Driving sustainable value and measurable outcomes across our engagements.
              </p>

              {project.impactMetrics && project.impactMetrics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {project.impactMetrics.map((metric, i) => (
                    <ProjectImpactBadge
                      key={i}
                      value={metric.value}
                      label={metric.label}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-surface border border-dashed border-muted text-center text-muted-foreground italic">
                  Impact metrics are currently being compiled for this particular project.
                </div>
              )}
            </div>
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="max-w-7xl mx-auto mt-32 pt-24 border-t border-border relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />

            <div className="text-center mb-16 relative z-10">
              <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
                Visual Proof
              </span>
              <h3 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Project Gallery
              </h3>
              <p className="text-muted-foreground text-xl font-light">
                Documenting the reality on the ground.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[300px] relative z-10">
              {project.gallery.map((image, index) => {
                let spanClass = "col-span-1 row-span-1";
                if (index % 5 === 0)
                  spanClass = "col-span-1 sm:col-span-2 row-span-2";
                else if (index % 7 === 0) spanClass = "col-span-1 row-span-2";

                return (
                  <div
                    key={index}
                    className={`bg-muted rounded-3xl overflow-hidden relative group shadow-md hover:shadow-2xl transition-all duration-700 ${spanClass}`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-multiply transition-colors duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
