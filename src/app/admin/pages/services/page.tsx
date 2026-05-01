"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { SERVICES_FALLBACK } from "@/lib/cms/services-fallback";
import type {
  ServicesPage,
  ServicesPageInput,
  ServicesPageService,
  UniquenessItem,
} from "@/types/cms";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

function fallbackInput(): ServicesPageInput {
  const { updatedAt: _u, ...rest } = SERVICES_FALLBACK;
  void _u;
  return rest;
}

export default function EditServicesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [d, setD] = useState<ServicesPageInput>(() => fallbackInput());

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "pages", "services"));
      if (snap.exists()) {
        const data = snap.data() as ServicesPage;
        const { updatedAt: _u, ...saved } = data;
        void _u;
        const fb = fallbackInput();
        setD({
          ...fb,
          ...saved,
          services: saved.services?.length > 0 ? saved.services : fb.services,
          sectors: saved.sectors?.length > 0 ? saved.sectors : fb.sectors,
          uniquenessItems:
            saved.uniquenessItems?.length > 0
              ? saved.uniquenessItems
              : fb.uniquenessItems,
        });
      }
      setLoading(false);
    })();
  }, []);

  function patch<K extends keyof ServicesPageInput>(
    key: K,
    value: ServicesPageInput[K],
  ) {
    setD((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await setDoc(doc(db, "pages", "services"), {
        ...d,
        updatedAt: new Date().toISOString(),
      });
      router.push("/admin/pages");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-gray-500">Loading…</div>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={14} /> Pages
        </Link>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Services page
        </h1>
        <p className="text-sm text-gray-500 font-mono mt-1">/services</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-6 py-8 space-y-10"
      >
        <Section title="Hero">
          <Field label="Heading" required>
            <textarea
              required
              rows={2}
              value={d.heroHeading}
              onChange={(e) => patch("heroHeading", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Intro paragraph" required>
            <textarea
              required
              rows={4}
              value={d.heroIntro}
              onChange={(e) => patch("heroIntro", e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section title="Services">
          <ArrayField<ServicesPageService>
            label="Services"
            items={d.services}
            onChange={(next) => patch("services", next)}
            empty={{
              number: "",
              title: "",
              targets: "",
              description: "",
              capabilities: [],
            }}
            renderItem={(item, set) => (
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Number (e.g. 01)"
                    value={item.number}
                    onChange={(e) => set({ number: e.target.value })}
                    className={`${inputClass} w-24`}
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => set({ title: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Targets (comma-separated audience)"
                  value={item.targets}
                  onChange={(e) => set({ targets: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  placeholder="Description"
                  rows={4}
                  value={item.description}
                  onChange={(e) => set({ description: e.target.value })}
                  className={inputClass}
                />
                <StringArrayField
                  label="Capabilities"
                  values={item.capabilities}
                  onChange={(next) => set({ capabilities: next })}
                  placeholder="Capability"
                />
              </>
            )}
          />
        </Section>

        <Section title="Sectors">
          <Field label="Section heading" required>
            <textarea
              required
              rows={2}
              value={d.sectorsHeading}
              onChange={(e) => patch("sectorsHeading", e.target.value)}
              className={inputClass}
            />
          </Field>
          <StringArrayField
            label="Sector names"
            values={d.sectors}
            onChange={(next) => patch("sectors", next)}
            placeholder="Sector (e.g. Mining)"
          />
        </Section>

        <Section title="What makes us unique">
          <Field label="Section heading" required>
            <textarea
              required
              rows={2}
              value={d.uniquenessHeading}
              onChange={(e) => patch("uniquenessHeading", e.target.value)}
              className={inputClass}
            />
          </Field>
          <ArrayField<UniquenessItem>
            label="Approach items"
            items={d.uniquenessItems}
            onChange={(next) => patch("uniquenessItems", next)}
            empty={{ title: "", desc: "" }}
            renderItem={(item, set) => (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => set({ title: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={item.desc}
                  onChange={(e) => set({ desc: e.target.value })}
                  className={inputClass}
                />
              </>
            )}
          />
        </Section>

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
            onClick={() => router.push("/admin/pages")}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </section>
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

function ArrayField<T>({
  label,
  items,
  onChange,
  empty,
  renderItem,
}: {
  label: string;
  items: T[];
  onChange: (next: T[]) => void;
  empty: T;
  renderItem: (item: T, set: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 uppercase">
              {label.replace(/s$/, "")} {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-red-600 hover:text-red-800"
              aria-label="Remove"
            >
              <Trash2 size={14} />
            </button>
          </div>
          {renderItem(item, (patch) => {
            const next = [...items];
            next[i] = { ...item, ...patch };
            onChange(next);
          })}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, empty])}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
      >
        <Plus size={14} /> Add {label.toLowerCase().replace(/s$/, "")}
      </button>
    </div>
  );
}

function StringArrayField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {values.map((v, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-1.5 bg-white border border-gray-300 rounded-full px-3 py-1"
          >
            <input
              type="text"
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="bg-transparent text-sm text-gray-800 outline-none w-32"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="text-gray-400 hover:text-red-600"
              aria-label="Remove"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="inline-flex items-center gap-1 rounded-full border border-dashed border-gray-300 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
        >
          <Plus size={12} /> {placeholder ?? "Add"}
        </button>
      </div>
    </div>
  );
}
