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
      <div className="max-w-3xl mx-auto px-6 py-12 text-gray-500">Loading…</div>
    );
  }
  if (project === "not-found") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-gray-600 mb-4">Project not found.</p>
        <Link href="/admin/projects" className="text-blue-600 underline">
          Back to projects
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
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={14} /> Projects
        </Link>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Edit project
            </h1>
            <p className="text-sm text-gray-500 font-mono mt-1">
              /projects/{slug}
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            <Trash2 size={14} /> {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
      <ProjectForm mode="edit" initialSlug={slug} initial={initial} />
    </div>
  );
}
