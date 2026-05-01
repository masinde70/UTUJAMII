"use client";

import Link from "next/link";
import { useUser } from "@/lib/firebase/use-user";

export default function AdminDashboard() {
  const user = useUser();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
        Welcome{user?.displayName ? `, ${user.displayName}` : ""}.
      </h1>
      <p className="text-gray-600 mb-12">
        Manage UTUJAMII content from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/projects"
          className="block bg-white rounded-2xl border border-gray-200 p-8 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
            Projects
          </h2>
          <p className="text-sm text-gray-600">
            Featured case studies displayed at /projects.
          </p>
        </Link>

        <Link
          href="/admin/news"
          className="block bg-white rounded-2xl border border-gray-200 p-8 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
            News & Insights
          </h2>
          <p className="text-sm text-gray-600">
            Articles and updates displayed at /news.
          </p>
        </Link>
      </div>
    </div>
  );
}
