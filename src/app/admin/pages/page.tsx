"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

const pages = [
  {
    id: "about",
    title: "About",
    description: "Mission, vision, values, and team members.",
    href: "/admin/pages/about",
    publicHref: "/about",
    available: true,
  },
  {
    id: "home",
    title: "Home",
    description: "Hero, expertise, FAQ, partners, contact.",
    href: "/admin/pages/home",
    publicHref: "/",
    available: true,
  },
  {
    id: "services",
    title: "Services",
    description: "Service offerings, sectors, and approach.",
    href: "/admin/pages/services",
    publicHref: "/services",
    available: true,
  },
];

export default function AdminPagesList() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
        Pages
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Edit content displayed on the public site's static pages.
      </p>

      <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-200">
        {pages.map((page) =>
          page.available ? (
            <Link
              key={page.id}
              href={page.href}
              className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors"
            >
              <FileText className="text-gray-400" size={20} />
              <div className="flex-grow">
                <div className="font-medium text-gray-900">{page.title}</div>
                <div className="text-sm text-gray-600">{page.description}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">
                  {page.publicHref}
                </div>
              </div>
              <ArrowRight className="text-gray-400" size={16} />
            </Link>
          ) : (
            <div
              key={page.id}
              className="flex items-center gap-4 p-6 opacity-60"
            >
              <FileText className="text-gray-400" size={20} />
              <div className="flex-grow">
                <div className="font-medium text-gray-900">
                  {page.title}{" "}
                  <span className="text-xs font-normal text-gray-500">
                    (coming soon)
                  </span>
                </div>
                <div className="text-sm text-gray-600">{page.description}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">
                  {page.publicHref}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
