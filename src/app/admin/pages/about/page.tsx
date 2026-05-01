"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Plus, Trash2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import {
  Field,
  Section,
  inputClass,
} from "@/components/admin/form-utils";
import { ABOUT_FALLBACK } from "@/lib/cms/about-fallback";
import type {
  AboutPage,
  AboutPageInput,
  TeamMember,
  ValueItem,
  CmsImage,
} from "@/types/cms";

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
          About page
        </h1>
        <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-mono mt-2">
          /about
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
              className="bg-surface-alt p-4 space-y-3 border border-foreground/10"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/50 tabular-nums">
                  Value {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setValues(values.filter((_, j) => j !== i))}
                  className="text-foreground/40 hover:text-accent transition-colors"
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
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/65 hover:text-accent transition-colors"
          >
            <Plus size={14} /> Add value
          </button>
        </Section>

        <Section title="Team">
          {team.map((m, i) => (
            <div
              key={i}
              className="bg-surface-alt p-4 space-y-3 border border-foreground/10"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/50 tabular-nums">
                  Team member {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setTeam(team.filter((_, j) => j !== i))}
                  className="text-foreground/40 hover:text-accent transition-colors"
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
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/65 hover:text-accent transition-colors"
          >
            <Plus size={14} /> Add team member
          </button>
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

