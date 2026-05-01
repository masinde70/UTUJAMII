"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export const inputClass =
  "w-full bg-surface border border-foreground/15 px-3 py-2 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-accent transition-colors";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5 pt-10 first:pt-0">
      <div className="border-b border-foreground/15 pb-3">
        <h2 className="font-serif text-[1.3rem] md:text-[1.5rem] font-light leading-tight text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] uppercase tracking-[0.22em] text-foreground/65">
        {label}
        {required && <span className="text-accent ml-1.5">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[12px] text-foreground/55 leading-relaxed">{hint}</p>
      )}
    </div>
  );
}

export function ArrayField<T>({
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
  renderItem: (item: T, set: (patch: Partial<T>) => void) => ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-[11px] uppercase tracking-[0.22em] text-foreground/65">
        {label}
      </label>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-surface-alt border border-foreground/10 p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/50 tabular-nums">
              {label.replace(/s$/, "")} {String(i + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-foreground/40 hover:text-accent transition-colors"
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
        className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/65 hover:text-accent transition-colors"
      >
        <Plus size={13} /> Add {label.toLowerCase().replace(/s$/, "")}
      </button>
    </div>
  );
}

export function StringArrayField({
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
      <label className="block text-[11px] uppercase tracking-[0.22em] text-foreground/65">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {values.map((v, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-1.5 bg-surface border border-foreground/15 px-3 py-1"
          >
            <input
              type="text"
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="bg-transparent text-[13px] text-foreground outline-none w-32"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="text-foreground/40 hover:text-accent transition-colors"
              aria-label="Remove"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="inline-flex items-center gap-1 px-3 py-1 border border-dashed border-foreground/25 text-[12px] uppercase tracking-[0.18em] text-foreground/55 hover:border-accent hover:text-accent transition-colors"
        >
          <Plus size={12} /> {placeholder ?? "Add"}
        </button>
      </div>
    </div>
  );
}

export function FormShell({ children }: { children: ReactNode }) {
  return (
    <form className="container mx-auto px-6 md:px-10 max-w-3xl pt-8 pb-16 space-y-10">
      {children}
    </form>
  );
}
