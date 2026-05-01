"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";
import type {
  HomePage,
  HomePageInput,
  PrincipleItem,
  ExpertiseService,
  FaqItem,
  PartnerItem,
  TestimonialItem,
  StatItem,
} from "@/types/cms";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

function fallbackInput(): HomePageInput {
  const { updatedAt: _u, ...rest } = HOME_FALLBACK;
  void _u;
  return rest;
}

export default function EditHomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [d, setD] = useState<HomePageInput>(() => fallbackInput());

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "pages", "home"));
      if (snap.exists()) {
        const data = snap.data() as HomePage;
        const { updatedAt: _u, ...saved } = data;
        void _u;
        const fb = fallbackInput();
        setD({
          ...fb,
          ...saved,
          trustBarSectors:
            saved.trustBarSectors?.length > 0
              ? saved.trustBarSectors
              : fb.trustBarSectors,
          aboutPrinciples:
            saved.aboutPrinciples?.length > 0
              ? saved.aboutPrinciples
              : fb.aboutPrinciples,
          expertiseServices:
            saved.expertiseServices?.length > 0
              ? saved.expertiseServices
              : fb.expertiseServices,
          testimonials:
            saved.testimonials?.length > 0
              ? saved.testimonials
              : fb.testimonials,
          stats: saved.stats?.length > 0 ? saved.stats : fb.stats,
          faqs: saved.faqs?.length > 0 ? saved.faqs : fb.faqs,
          partners: saved.partners?.length > 0 ? saved.partners : fb.partners,
        });
      }
      setLoading(false);
    })();
  }, []);

  function patch<K extends keyof HomePageInput>(key: K, value: HomePageInput[K]) {
    setD((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await setDoc(doc(db, "pages", "home"), {
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
        <h1 className="font-serif text-3xl font-bold text-gray-900">Home page</h1>
        <p className="text-sm text-gray-500 font-mono mt-1">/</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-6 py-8 space-y-10"
      >
        <Section title="Hero">
          <p className="text-xs text-gray-500 -mt-2">
            The big headline is split into 4 styled lines: each line keeps its
            own typographic style (color, italic, weight) regardless of the
            words you type.
          </p>
          <Field label="Line 1" required>
            <input
              type="text"
              required
              value={d.heroLine1}
              onChange={(e) => patch("heroLine1", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Line 2 (rendered in primary color)" required>
            <input
              type="text"
              required
              value={d.heroLine2}
              onChange={(e) => patch("heroLine2", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Conjunction (small italic)">
            <input
              type="text"
              value={d.heroConjunction}
              onChange={(e) => patch("heroConjunction", e.target.value)}
              className={`${inputClass} max-w-[8rem]`}
            />
          </Field>
          <Field label="Line 3 (italic)" required>
            <input
              type="text"
              required
              value={d.heroLine3}
              onChange={(e) => patch("heroLine3", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Line 4" required>
            <input
              type="text"
              required
              value={d.heroLine4}
              onChange={(e) => patch("heroLine4", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Photo caption">
            <textarea
              rows={2}
              value={d.heroPlateCaption}
              onChange={(e) => patch("heroPlateCaption", e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section title="Trust bar (sector strip)">
          <Field label="Label" hint='Small uppercase text shown before the sector list.'>
            <input
              type="text"
              value={d.trustBarLabel}
              onChange={(e) => patch("trustBarLabel", e.target.value)}
              className={inputClass}
            />
          </Field>
          <StringArrayField
            label="Sectors"
            values={d.trustBarSectors}
            onChange={(next) => patch("trustBarSectors", next)}
            placeholder="Sector"
          />
        </Section>

        <Section title="About preview">
          <Field label="Heading" required>
            <textarea
              required
              rows={2}
              value={d.aboutHeading}
              onChange={(e) => patch("aboutHeading", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field
            label="Body — paragraph 1"
            hint="The first character renders as a large drop cap."
            required
          >
            <textarea
              required
              rows={5}
              value={d.aboutBody1}
              onChange={(e) => patch("aboutBody1", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Body — paragraph 2" required>
            <textarea
              required
              rows={4}
              value={d.aboutBody2}
              onChange={(e) => patch("aboutBody2", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Pull quote" required>
            <textarea
              required
              rows={2}
              value={d.aboutQuote}
              onChange={(e) => patch("aboutQuote", e.target.value)}
              className={inputClass}
            />
          </Field>
          <ArrayField<PrincipleItem>
            label="Principles"
            items={d.aboutPrinciples}
            onChange={(next) => patch("aboutPrinciples", next)}
            empty={{ title: "", body: "" }}
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
                  placeholder="Body"
                  rows={2}
                  value={item.body}
                  onChange={(e) => set({ body: e.target.value })}
                  className={inputClass}
                />
              </>
            )}
          />
        </Section>

        <Section title="Expertise">
          <Field label="Heading" required>
            <textarea
              required
              rows={2}
              value={d.expertiseHeading}
              onChange={(e) => patch("expertiseHeading", e.target.value)}
              className={inputClass}
            />
          </Field>
          <ArrayField<ExpertiseService>
            label="Services"
            items={d.expertiseServices}
            onChange={(next) => patch("expertiseServices", next)}
            empty={{ number: "", title: "", description: "" }}
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
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={item.description}
                  onChange={(e) => set({ description: e.target.value })}
                  className={inputClass}
                />
              </>
            )}
          />
        </Section>

        <Section title="Testimonials">
          <ArrayField<TestimonialItem>
            label="Testimonials"
            items={d.testimonials}
            onChange={(next) => patch("testimonials", next)}
            empty={{
              quote: "",
              author: "",
              org: "",
              project: "",
              location: "",
            }}
            renderItem={(item, set) => (
              <>
                <textarea
                  placeholder="Quote"
                  rows={4}
                  value={item.quote}
                  onChange={(e) => set({ quote: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Author name"
                  value={item.author}
                  onChange={(e) => set({ author: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Organisation / role"
                  value={item.org}
                  onChange={(e) => set({ org: e.target.value })}
                  className={inputClass}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Project"
                    value={item.project}
                    onChange={(e) => set({ project: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={item.location}
                    onChange={(e) => set({ location: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </>
            )}
          />
        </Section>

        <Section title="Banner (mid-page CTA)">
          <Field label="Headline — line 1" required>
            <input
              type="text"
              required
              value={d.bannerHeadline1}
              onChange={(e) => patch("bannerHeadline1", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Headline — line 2 (italic)" required>
            <input
              type="text"
              required
              value={d.bannerHeadline2}
              onChange={(e) => patch("bannerHeadline2", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Quote">
            <textarea
              rows={3}
              value={d.bannerQuote}
              onChange={(e) => patch("bannerQuote", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Quote attribution">
            <input
              type="text"
              value={d.bannerQuoteAttribution}
              onChange={(e) => patch("bannerQuoteAttribution", e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section title="Impact statistics">
          <ArrayField<StatItem>
            label="Stats"
            items={d.stats}
            onChange={(next) => patch("stats", next)}
            empty={{ end: 0, suffix: "", label: "", caption: "" }}
            renderItem={(item, set) => (
              <>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Number"
                    value={item.end}
                    onChange={(e) => set({ end: Number(e.target.value) || 0 })}
                    className={`${inputClass} w-32`}
                  />
                  <input
                    type="text"
                    placeholder="Suffix (e.g. k+, %)"
                    value={item.suffix}
                    onChange={(e) => set({ suffix: e.target.value })}
                    className={`${inputClass} w-32`}
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. Women Trained)"
                    value={item.label}
                    onChange={(e) => set({ label: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Caption (e.g. Across Tanzania)"
                  value={item.caption}
                  onChange={(e) => set({ caption: e.target.value })}
                  className={inputClass}
                />
              </>
            )}
          />
        </Section>

        <Section title="FAQ">
          <ArrayField<FaqItem>
            label="Questions"
            items={d.faqs}
            onChange={(next) => patch("faqs", next)}
            empty={{ question: "", answer: "" }}
            renderItem={(item, set) => (
              <>
                <input
                  type="text"
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) => set({ question: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  placeholder="Answer"
                  rows={3}
                  value={item.answer}
                  onChange={(e) => set({ answer: e.target.value })}
                  className={inputClass}
                />
              </>
            )}
          />
        </Section>

        <Section title="Partners">
          <ArrayField<PartnerItem>
            label="Partners"
            items={d.partners}
            onChange={(next) => patch("partners", next)}
            empty={{ name: "" }}
            renderItem={(item, set) => (
              <>
                <input
                  type="text"
                  placeholder="Name (e.g. Oxfam)"
                  value={item.name}
                  onChange={(e) => set({ name: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="url"
                  placeholder="URL (optional)"
                  value={item.url ?? ""}
                  onChange={(e) =>
                    set({ url: e.target.value || undefined })
                  }
                  className={inputClass}
                />
              </>
            )}
          />
        </Section>

        <Section title="Contact">
          <Field label="Address" hint="Use line breaks for multi-line addresses.">
            <textarea
              rows={3}
              value={d.contactAddress}
              onChange={(e) => patch("contactAddress", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={d.contactEmail}
              onChange={(e) => patch("contactEmail", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              value={d.contactPhone}
              onChange={(e) => patch("contactPhone", e.target.value)}
              className={inputClass}
            />
          </Field>
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
