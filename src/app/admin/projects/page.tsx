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
import { Plus, FileText, Sparkles } from "lucide-react";
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
    ) {
      return;
    }
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
        await setDoc(ref, {
          ...input,
          createdAt: now,
          updatedAt: now,
        });
      }
      await load();
    } catch (err) {
      setSeedError(err instanceof Error ? err.message : "Seed failed.");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Projects
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Case studies displayed on the public /projects page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding || allSeeded}
            title={
              allSeeded
                ? "All 3 sample projects already exist"
                : `Add ${missingSamples.length} sample project${missingSamples.length === 1 ? "" : "s"} (Fungoni, Mwadui, Women's Leadership)`
            }
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles size={16} />
            {seeding
              ? "Seeding…"
              : allSeeded
                ? "Samples seeded"
                : `Seed samples (${missingSamples.length})`}
          </button>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> New project
          </Link>
        </div>
      </div>

      {seedError && (
        <div
          role="alert"
          className="mb-6 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800"
        >
          {seedError}
        </div>
      )}

      {projects === null ? (
        <p className="text-gray-500">Loading…</p>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <FileText className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-gray-600 mb-4">No projects yet.</p>
          <p className="text-sm text-gray-500">
            Use the buttons above to seed sample projects or create from scratch.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-700">
                  Title
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-700">
                  Client
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-700">
                  Updated
                </th>
                <th className="text-right px-6 py-3 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">
                      /projects/{p.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {p.client ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
