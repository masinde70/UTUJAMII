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
import type { News } from "@/types/cms";
import { Plus, FileText, Sparkles } from "lucide-react";
import { SAMPLE_NEWS } from "@/lib/cms/sample-news";

export default function AdminNewsList() {
  const [articles, setArticles] = useState<News[] | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedError, setSeedError] = useState<string | null>(null);

  async function load() {
    const snapshot = await getDocs(
      query(collection(db, "news"), orderBy("publishedAt", "desc")),
    );
    setArticles(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as News));
  }

  useEffect(() => {
    load();
  }, []);

  const existingIds = new Set(articles?.map((a) => a.id) ?? []);
  const missingSamples = SAMPLE_NEWS.filter((s) => !existingIds.has(s.slug));
  const allSeeded = missingSamples.length === 0 && articles !== null;

  async function handleSeed() {
    if (missingSamples.length === 0) return;
    if (
      !confirm(
        `Create ${missingSamples.length} sample article${missingSamples.length === 1 ? "" : "s"}? Existing articles will not be affected.`,
      )
    ) {
      return;
    }
    setSeeding(true);
    setSeedError(null);
    try {
      const now = new Date().toISOString();
      for (const sample of missingSamples) {
        const ref = doc(db, "news", sample.slug);
        const existing = await getDoc(ref);
        if (existing.exists()) continue;
        const { slug, ...input } = sample;
        void slug;
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
            News & Insights
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Articles displayed on the public /news page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding || allSeeded}
            title={
              allSeeded
                ? "All sample articles already exist"
                : `Add ${missingSamples.length} sample article${missingSamples.length === 1 ? "" : "s"}`
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
            href="/admin/news/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> New article
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

      {articles === null ? (
        <p className="text-gray-500">Loading…</p>
      ) : articles.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <FileText className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-gray-600 mb-4">No articles yet.</p>
          <p className="text-sm text-gray-500">
            Use the buttons above to seed sample articles or create from scratch.
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
                  Published
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
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{a.title}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">
                      /news/{a.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(a.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(a.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/news/${a.id}`}
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
