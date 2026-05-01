"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { ABOUT_FALLBACK } from "@/lib/cms/about-fallback";
import type {
  AboutPage,
  AboutPageInput,
  TeamMember,
  ValueItem,
  CmsImage,
} from "@/types/cms";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export default function EditAboutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [heading, setHeading] = useState("");
  const [intro, setIntro] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [values, setValues] = useState<ValueItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "pages", "about"));
      const data = snap.exists() ? (snap.data() as AboutPage) : ABOUT_FALLBACK;
      setHeading(data.heading ?? "");
      setIntro(data.intro ?? "");
      setMission(data.mission ?? "");
      setVision(data.vision ?? "");
      setValues(data.values ?? []);
      setTeam(data.team ?? []);
      setLoading(false);
    })();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload: AboutPageInput = {
        heading,
        intro,
        mission,
        vision,
        values,
        team,
      };
      await setDoc(doc(db, "pages", "about"), {
        ...payload,
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
          About page
        </h1>
        <p className="text-sm text-gray-500 font-mono mt-1">/about</p>
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
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Intro paragraph" required>
            <textarea
              required
              rows={4}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section title="Mission & Vision">
          <Field label="Mission" required>
            <textarea
              required
              rows={4}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Vision" required>
            <textarea
              required
              rows={4}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className={inputClass}
            />
          </Field>
        </Section>

        <Section title="Values">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Value {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setValues(values.filter((_, j) => j !== i))}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Remove value"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Title (e.g. Utu — Human Dignity)"
                value={v.title}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = { ...v, title: e.target.value };
                  setValues(next);
                }}
                className={inputClass}
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={v.description}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = { ...v, description: e.target.value };
                  setValues(next);
                }}
                className={inputClass}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setValues([...values, { title: "", description: "" }])}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={14} /> Add value
          </button>
        </Section>

        <Section title="Team">
          {team.map((m, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Team member {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setTeam(team.filter((_, j) => j !== i))}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Remove team member"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Name"
                value={m.name}
                onChange={(e) => updateTeam(setTeam, team, i, { name: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Role (e.g. Managing Director)"
                value={m.role}
                onChange={(e) => updateTeam(setTeam, team, i, { role: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Speciality (optional)"
                value={m.speciality ?? ""}
                onChange={(e) =>
                  updateTeam(setTeam, team, i, { speciality: e.target.value })
                }
                className={inputClass}
              />
              <textarea
                placeholder="Bio"
                rows={4}
                value={m.bio}
                onChange={(e) => updateTeam(setTeam, team, i, { bio: e.target.value })}
                className={inputClass}
              />
              <CloudinaryUpload
                label="Photo (optional)"
                value={m.photo}
                onChange={(photo: CmsImage | undefined) =>
                  updateTeam(setTeam, team, i, { photo })
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setTeam([...team, { name: "", role: "", bio: "" }])
            }
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={14} /> Add team member
          </button>
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

function updateTeam(
  setTeam: (next: TeamMember[]) => void,
  team: TeamMember[],
  index: number,
  patch: Partial<TeamMember>,
) {
  const next = [...team];
  next[index] = { ...team[index], ...patch };
  setTeam(next);
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
