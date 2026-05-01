"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { ProjectForm } from "@/components/admin/ProjectForm";
import type { Project, ProjectInput } from "@/types/cms";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [project, setProject] = useState<Project | null | "not-found">(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "projects", slug));
      if (snap.exists()) {
        setProject({ id: snap.id, ...snap.data() } as Project);
      } else {
        setProject("not-found");
      }
    })();
  }, [slug]);

  async function handleDelete() {
    if (!project || project === "not-found") return;
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "projects", slug));
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
      setDeleting(false);
    }
  }

  if (project === null) {
    return (
      <div className="container mx-auto px-6 md:px-10 max-w-3xl py-12 text-foreground/55 text-[12px] uppercase tracking-[0.22em]">
        Loading…
      </div>
    );
  }
  if (project === "not-found") {
    return (
      <div className="container mx-auto px-6 md:px-10 max-w-3xl py-12">
        <p className="text-foreground/70 mb-4">Project not found.</p>
        <Link
          href="/admin/projects"
          className="text-[11px] uppercase tracking-[0.22em] text-foreground hover:text-accent transition-colors"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  const initial: ProjectInput = {
    title: project.title,
    summary: project.summary,
    body: project.body,
    client: project.client,
    mainImage: project.mainImage,
    gallery: project.gallery,
    impactMetrics: project.impactMetrics,
  };

  return (
    <div>
      <div className="container mx-auto px-6 md:px-10 max-w-3xl pt-12">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={12} /> Projects
        </Link>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] text-foreground">
              Edit project
            </h1>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-mono mt-2">
              /projects/{slug}
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/65 hover:text-accent hover:border-accent disabled:opacity-50 transition-colors"
          >
            <Trash2 size={12} /> {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
      <ProjectForm mode="edit" initialSlug={slug} initial={initial} />
    </div>
  );
}
