"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Project } from "@/types/cms";
import { ArrowUpRight, Plus, Sparkles } from "lucide-react";
import { SAMPLE_PROJECTS } from "@/lib/cms/sample-projects";

export default function AdminProjectsList() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedError, setSeedError] = useState<string | null>(null);

  async function load() {
    const snapshot = await getDocs(
      query(collection(db, "projects"), orderBy("createdAt", "desc")),
    );
    setProjects(
      snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Project),
    );
  }

  useEffect(() => {
    load();
  }, []);

  const existingIds = new Set(projects?.map((p) => p.id) ?? []);
  const missingSamples = SAMPLE_PROJECTS.filter(
    (s) => !existingIds.has(s.slug),
  );
  const allSeeded = missingSamples.length === 0 && projects !== null;

  async function handleSeed() {
    if (missingSamples.length === 0) return;
    if (
      !confirm(
        `Create ${missingSamples.length} sample project${missingSamples.length === 1 ? "" : "s"}? Existing projects will not be affected.`,
      )
    )
      return;
    setSeeding(true);
    setSeedError(null);
    try {
      const now = new Date().toISOString();
      for (const sample of missingSamples) {
        const ref = doc(db, "projects", sample.slug);
        const existing = await getDoc(ref);
        if (existing.exists()) continue;
        const { slug, location, sector, ...input } = sample;
        void location;
        void sector;
        await setDoc(ref, { ...input, createdAt: now, updatedAt: now });
      }
      await load();
    } catch (err) {
      setSeedError(err instanceof Error ? err.message : "Seed failed.");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="container mx-auto px-6 md:px-10 pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-8">
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-light text-foreground leading-[1.05]">
            Projects —{" "}
            <em className="not-italic text-foreground/55">case studies.</em>
          </h1>
          <p className="text-[15px] text-foreground/65 leading-[1.7] mt-4 max-w-xl">
            Featured engagements displayed at /projects. Each entry maps to a
            slug-based Firestore document with markdown body and impact metrics.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col md:items-end gap-3 mt-6 md:mt-2">
          <button
            onClick={handleSeed}
            disabled={seeding || allSeeded}
            title={
              allSeeded
                ? "All 3 sample projects already exist"
                : `Add ${missingSamples.length} sample project${missingSamples.length === 1 ? "" : "s"}`
            }
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground/65 hover:text-foreground disabled:text-foreground/30 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles size={13} />
            {seeding
              ? "Seeding…"
              : allSeeded
                ? "Samples seeded"
                : `Seed samples (${missingSamples.length})`}
          </button>
          <Link
            href="/admin/projects/new"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-primary/90 transition-colors"
          >
            <Plus size={13} /> New project
          </Link>
        </div>
      </div>

      {seedError && (
        <div
          role="alert"
          className="mb-8 border-l-2 border-accent pl-4 py-1 text-[13px] text-foreground/75 leading-relaxed"
        >
          {seedError}
        </div>
      )}

      {projects === null ? (
        <p className="text-foreground/55 text-[12px] uppercase tracking-[0.22em] border-t border-foreground/15 pt-8">
          Loading…
        </p>
      ) : projects.length === 0 ? (
        <div className="border-t border-foreground/15 py-16 text-center">
          <p className="text-foreground/55 text-[15px] leading-relaxed">
            No projects yet. Use the buttons above to seed samples or create
            from scratch.
          </p>
        </div>
      ) : (
        <div className="border-t border-foreground/15">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/admin/projects/${project.id}`}
      className="group block border-b border-foreground/15 py-6 md:py-8"
    >
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 items-start md:items-center">
        <div className="col-span-2 md:col-span-1 flex items-center">
          <span
            className="font-serif-display font-light text-[1.6rem] leading-none tabular-nums text-foreground/30"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
          >
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <div className="col-span-10 md:col-span-6">
          <h3 className="font-serif text-[1.15rem] md:text-[1.25rem] font-light leading-[1.2] text-foreground group-hover:text-primary transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-mono mt-1">
            /projects/{project.id}
          </p>
        </div>
        <div className="col-span-6 md:col-span-2 mt-3 md:mt-0">
          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
            {project.client ?? "—"}
          </span>
        </div>
        <div className="col-span-6 md:col-span-2 mt-3 md:mt-0">
          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 tabular-nums">
            {new Date(project.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="col-span-12 md:col-span-1 md:text-right mt-3 md:mt-0">
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-foreground font-medium">
            Edit
            <ArrowUpRight
              size={12}
              className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
