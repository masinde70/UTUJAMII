"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CloudinaryUpload } from "./CloudinaryUpload";
import { MarkdownEditor } from "./MarkdownEditor";
import { Field, inputClass } from "./form-utils";
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
      className="container mx-auto px-6 md:px-10 max-w-3xl py-8 space-y-8"
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
          className={`${inputClass} font-mono ${mode === "edit" ? "bg-surface-alt cursor-not-allowed" : ""}`}
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
          className="border-l-2 border-accent pl-4 py-1 text-[13px] text-foreground/75 leading-relaxed"
        >
          {error}
        </div>
      )}

      <div className="flex justify-end items-center gap-6 pt-6 border-t border-foreground/15">
        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-foreground transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-[12px] font-medium uppercase tracking-[0.22em] hover:bg-primary/90 disabled:bg-foreground/30 disabled:cursor-not-allowed transition-colors"
        >
          {submitting
            ? "Saving…"
            : mode === "create"
              ? "Publish article"
              : "Save changes"}
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </form>
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
      <label className="block text-[11px] uppercase tracking-[0.22em] text-foreground/65">
        Gallery{" "}
        <span className="text-foreground/40 normal-case tracking-normal text-[12px]">
          (optional)
        </span>
      </label>
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square bg-surface-alt overflow-hidden border border-foreground/10"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange(gallery.filter((_, j) => j !== i))}
                className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm p-1 hover:bg-background transition-colors"
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
