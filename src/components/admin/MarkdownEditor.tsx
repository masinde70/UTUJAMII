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
      <div className="flex border-b border-gray-200">
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
          className="w-full rounded-b-lg border border-t-0 border-gray-300 px-3 py-2 text-gray-900 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      ) : (
        <div className="rounded-b-lg border border-t-0 border-gray-300 bg-white p-6 min-h-[480px] overflow-auto">
          {value.trim() ? (
            <MarkdownBody source={value} />
          ) : (
            <p className="text-gray-400 italic text-sm">
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
      className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
        active
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
