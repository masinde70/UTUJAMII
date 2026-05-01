"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { NewsForm } from "@/components/admin/NewsForm";
import type { News, NewsInput } from "@/types/cms";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [article, setArticle] = useState<News | null | "not-found">(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "news", slug));
      if (snap.exists()) {
        setArticle({ id: snap.id, ...snap.data() } as News);
      } else {
        setArticle("not-found");
      }
    })();
  }, [slug]);

  async function handleDelete() {
    if (!article || article === "not-found") return;
    if (!confirm(`Delete "${article.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "news", slug));
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
      setDeleting(false);
    }
  }

  if (article === null) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-gray-500">Loading…</div>
    );
  }
  if (article === "not-found") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-gray-600 mb-4">Article not found.</p>
        <Link href="/admin/news" className="text-blue-600 underline">
          Back to news
        </Link>
      </div>
    );
  }

  const initial: NewsInput = {
    title: article.title,
    publishedAt: article.publishedAt,
    excerpt: article.excerpt,
    body: article.body,
    mainImage: article.mainImage,
    gallery: article.gallery,
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={14} /> News
        </Link>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Edit article
            </h1>
            <p className="text-sm text-gray-500 font-mono mt-1">/news/{slug}</p>
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
      <NewsForm mode="edit" initialSlug={slug} initial={initial} />
    </div>
  );
}
