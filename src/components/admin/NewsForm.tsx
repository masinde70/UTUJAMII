"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CloudinaryUpload } from "./CloudinaryUpload";
import { MarkdownEditor } from "./MarkdownEditor";
import { Trash2 } from "lucide-react";
import type { CmsImage, News, NewsInput } from "@/types/cms";

type Props = {
  initialSlug?: string;
  initial?: NewsInput;
  mode: "create" | "edit";
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDateTimeLocal(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export function NewsForm({ initialSlug, initial, mode }: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(initialSlug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initial?.publishedAt
      ? toDateTimeLocal(initial.publishedAt)
      : toDateTimeLocal(new Date().toISOString()),
  );
  const [mainImage, setMainImage] = useState<CmsImage | undefined>(
    initial?.mainImage,
  );
  const [gallery, setGallery] = useState<CmsImage[]>(initial?.gallery ?? []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!slug) {
      setError("Slug is required.");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError("Slug must be lowercase letters, numbers, and hyphens only.");
      return;
    }
    if (!publishedAt) {
      setError("Publish date is required.");
      return;
    }
    if (!body.trim()) {
      setError("Body is required.");
      return;
    }

    setSubmitting(true);
    try {
      const ref = doc(db, "news", slug);
      const now = new Date().toISOString();

      let createdAt = now;
      if (mode === "edit") {
        const existing = await getDoc(ref);
        createdAt = existing.exists()
          ? (existing.data() as News).createdAt
          : now;
      } else {
        const existing = await getDoc(ref);
        if (existing.exists()) {
          throw new Error(`An article with slug "${slug}" already exists.`);
        }
      }

      const publishedISO = new Date(publishedAt).toISOString();

      const payload: Record<string, unknown> = {
        title,
        publishedAt: publishedISO,
        excerpt,
        body,
        createdAt,
        updatedAt: now,
      };
      if (mainImage) payload.mainImage = mainImage;
      if (gallery.length > 0) payload.gallery = gallery;

      await setDoc(ref, payload);
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-6 py-8 space-y-8"
    >
      <Field label="Title" required>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field
        label="Slug"
        required
        hint="The URL path: /news/your-slug. Lowercase letters, numbers, hyphens only."
      >
        <input
          type="text"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          disabled={mode === "edit"}
          className={`${inputClass} font-mono ${mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
      </Field>

      <Field label="Publish date" required>
        <input
          type="datetime-local"
          required
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field
        label="Excerpt"
        required
        hint="Short summary shown on the news listing card. 1–2 sentences."
      >
        <textarea
          required
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={inputClass}
        />
      </Field>

      <CloudinaryUpload
        label="Cover image"
        value={mainImage}
        onChange={setMainImage}
      />

      <Field
        label="Body (Markdown)"
        required
        hint="Press Enter for line breaks. Use # for headings, > for quotes, - for lists, [text](url) for links, **bold**, *italic*. Switch to Preview to see how it'll render."
      >
        <MarkdownEditor value={body} onChange={setBody} rows={20} />
      </Field>

      <GalleryField gallery={gallery} onChange={setGallery} />

      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {submitting
            ? "Saving…"
            : mode === "create"
              ? "Publish article"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function GalleryField({
  gallery,
  onChange,
}: {
  gallery: CmsImage[];
  onChange: (next: CmsImage[]) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Gallery <span className="text-gray-400 font-normal">(optional)</span>
      </label>
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange(gallery.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                aria-label="Remove image"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <CloudinaryUpload
        label=""
        value={undefined}
        onChange={(img) => {
          if (img) onChange([...gallery, img]);
        }}
      />
    </div>
  );
}
