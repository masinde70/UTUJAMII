"use client";

import { useState, type ReactNode } from "react";
import { MarkdownBody } from "@/components/MarkdownBody";

type Props = {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
};

export function MarkdownEditor({ value, onChange, rows = 20 }: Props) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="space-y-0">
      <div className="flex border-b border-foreground/15">
        <TabButton active={tab === "edit"} onClick={() => setTab("edit")}>
          Edit
        </TabButton>
        <TabButton
          active={tab === "preview"}
          onClick={() => setTab("preview")}
        >
          Preview
        </TabButton>
      </div>

      {tab === "edit" ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface border border-t-0 border-foreground/15 px-3 py-2 text-foreground font-mono text-sm focus:border-accent focus:outline-none transition-colors"
        />
      ) : (
        <div className="border border-t-0 border-foreground/15 bg-surface p-6 min-h-[480px] overflow-auto">
          {value.trim() ? (
            <MarkdownBody source={value} />
          ) : (
            <p className="text-foreground/40 italic text-[13px]">
              Nothing to preview yet — type some markdown in the Edit tab.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-[11px] uppercase tracking-[0.22em] font-medium border-b-2 -mb-px transition-colors ${
        active
          ? "border-accent text-foreground"
          : "border-transparent text-foreground/50 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
