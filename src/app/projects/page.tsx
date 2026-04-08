import React from "react";
import Link from "next/link";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/queries";
import { ArrowRight } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProjectsPage() {
  let projects = [];
  try {
    projects = await client.fetch(PROJECTS_QUERY);
  } catch (error) {
    console.warn("Sanity fetch failed (likely missing project ID). Returning empty grid.");
  }

  return (
    <div className="pt-24 min-h-[70vh] flex flex-col items-center pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Our Work
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Featured Projects
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our impact across Eastern Africa, weaving progress and dignity into every community we touch.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-muted rounded-2xl">
            <p className="text-muted-foreground">No projects found. Create some in the Studio!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Link href={`/projects/${project.slug.current}`} key={project._id} className="group flex flex-col bg-surface border border-muted rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">No Image</div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  {project.client && (
                    <span className="text-xs font-bold tracking-wider text-accent uppercase mb-3 block">
                      {project.client}
                    </span>
                  )}
                  <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                    {project.summary}
                  </p>
                  <div className="flex items-center text-primary font-medium mt-auto group-hover:text-accent transition-colors">
                    <span>Read Case Study</span>
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
