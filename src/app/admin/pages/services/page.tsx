"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {
  ArrayField,
  Field,
  Section,
  StringArrayField,
  inputClass,
} from "@/components/admin/form-utils";
import { SERVICES_FALLBACK } from "@/lib/cms/services-fallback";
import type {
  ServicesPage,
  ServicesPageInput,
  ServicesPageService,
  UniquenessItem,
} from "@/types/cms";

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
      <div className="container mx-auto px-6 md:px-10 max-w-3xl py-12 text-foreground/55 text-[12px] uppercase tracking-[0.22em]">
        Loading…
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-6 md:px-10 max-w-3xl pt-12">
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={12} /> Pages
        </Link>
        <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] text-foreground">
          Services page
        </h1>
        <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-mono mt-2">
          /services
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="container mx-auto px-6 md:px-10 max-w-3xl py-10 space-y-10"
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
            className="border-l-2 border-accent pl-4 py-1 text-[13px] text-foreground/75 leading-relaxed"
          >
            {error}
          </div>
        )}

        <div className="flex justify-end items-center gap-6 pt-6 border-t border-foreground/15">
          <button
            type="button"
            onClick={() => router.push("/admin/pages")}
            className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-[12px] font-medium uppercase tracking-[0.22em] hover:bg-primary/90 disabled:bg-foreground/30 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Saving…" : "Save changes"}
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

