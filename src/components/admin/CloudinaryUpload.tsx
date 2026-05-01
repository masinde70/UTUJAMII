"use client";

import { useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, X } from "lucide-react";
import type { CmsImage } from "@/types/cms";

type Props = {
  value: CmsImage | undefined;
  onChange: (next: CmsImage | undefined) => void;
  label?: string;
};

function unlockBodyScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

function isWidgetVisible(): boolean {
  const frames = document.querySelectorAll<HTMLElement>(
    'iframe[src*="upload-widget.cloudinary.com"]',
  );
  return Array.from(frames).some((frame) => {
    const style = window.getComputedStyle(frame);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

export function CloudinaryUpload({ value, onChange, label = "Image" }: Props) {
  useEffect(() => {
    const interval = setInterval(() => {
      const locked =
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden";
      if (locked && !isWidgetVisible()) unlockBodyScroll();
    }, 300);
    return () => {
      clearInterval(interval);
      unlockBodyScroll();
    };
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="space-y-3">
          <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={value.url}
              alt={value.alt || ""}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          <input
            type="text"
            placeholder="Alt text (describe the image for accessibility)"
            value={value.alt}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{ maxFiles: 1, sources: ["local", "url", "camera"] }}
          onSuccess={(result) => {
            const info = result.info;
            if (typeof info === "object" && info && "secure_url" in info) {
              onChange({
                url: (info as { secure_url: string }).secure_url,
                alt: "",
              });
            }
            setTimeout(unlockBodyScroll, 200);
          }}
          onClose={unlockBodyScroll}
          onAbort={unlockBodyScroll}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              <Upload size={32} className="mb-2" />
              <span className="text-sm font-medium">Upload image</span>
              <span className="text-xs text-gray-400 mt-1">
                JPG, PNG, WebP up to 10 MB
              </span>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
