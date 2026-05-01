"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewsForm } from "@/components/admin/NewsForm";

export default function NewArticlePage() {
  return (
    <div>
      <div className="container mx-auto px-6 md:px-10 max-w-3xl pt-12">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={12} /> News
        </Link>
        <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] text-foreground">
          New article
        </h1>
      </div>
      <NewsForm mode="create" />
    </div>
  );
}
