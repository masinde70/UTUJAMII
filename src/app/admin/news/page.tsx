"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { News } from "@/types/cms";
import { Plus, FileText } from "lucide-react";

export default function AdminNewsList() {
  const [articles, setArticles] = useState<News[] | null>(null);

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(
        query(collection(db, "news"), orderBy("publishedAt", "desc")),
      );
      setArticles(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as News),
      );
    })();
  }, []);

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
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> New article
        </Link>
      </div>

      {articles === null ? (
        <p className="text-gray-500">Loading…</p>
      ) : articles.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <FileText className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-gray-600 mb-4">No articles yet.</p>
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Publish your first article
          </Link>
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
