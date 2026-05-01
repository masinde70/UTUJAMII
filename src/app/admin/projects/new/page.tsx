"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={14} /> Projects
        </Link>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          New project
        </h1>
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
