"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewsForm } from "@/components/admin/NewsForm";

export default function NewArticlePage() {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={14} /> News
        </Link>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          New article
        </h1>
      </div>
      <NewsForm mode="create" />
    </div>
  );
}
