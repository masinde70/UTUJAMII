import React from "react";
import { ContactSection } from "@/components/ContactSection";
import { AboutPageContent } from "@/components/AboutPageContent";
import { getAboutPage } from "@/lib/cms/pages";
import { ABOUT_FALLBACK } from "@/lib/cms/about-fallback";

export const revalidate = 60;

export default async function AboutPage() {
  const fromCms = await getAboutPage();
  const data = fromCms ?? ABOUT_FALLBACK;

  return (
    <div className="flex flex-col w-full">
      <AboutPageContent data={data} />
      <ContactSection />
    </div>
  );
}
