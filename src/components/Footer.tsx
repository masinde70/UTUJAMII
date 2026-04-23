import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  studio: [
    { name: "About", href: "/about" },
    { name: "Our Approach", href: "/about#approach" },
    { name: "Our Team", href: "/about#team" },
    { name: "Contact", href: "/about#contact" },
  ],
  expertise: [
    { name: "Training & Facilitation", href: "/services" },
    { name: "Stakeholder Engagement", href: "/services" },
    { name: "Social Performance", href: "/services" },
    { name: "Impact Assessment", href: "/services" },
    { name: "Community Engagement", href: "/services" },
    { name: "Action Research", href: "/services" },
  ],
  resources: [
    { name: "Projects", href: "/projects" },
    { name: "Journal", href: "/news" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-6 md:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-normal tracking-tight">
                Utu Jamii
              </span>
            </Link>
            <p className="text-primary-foreground/60 text-[15px] leading-relaxed max-w-md mb-8">
              Weaving threads of social dignity, UTU JAMII empowers communities and bridges the gap between corporate ambitions and local aspirations, fostering shared prosperity and sustainable progress through collaboration, training, and research.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-6">
                <a href="mailto:info@utujamii.com" className="text-[13px] text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  info@utujamii.com
                </a>
                <span className="text-primary-foreground/20">|</span>
                <a href="tel:+255712077908" className="text-[13px] text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  +255 712 077 908
                </a>
              </div>
              <p className="text-[13px] text-primary-foreground/40">
                P.O. Box 3661, Kigamboni, Dar es Salaam, Tanzania
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/40 mb-6 font-medium">
                Studio
              </h4>
              <ul className="space-y-3">
                {footerLinks.studio.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/40 mb-6 font-medium">
                Expertise
              </h4>
              <ul className="space-y-3">
                {footerLinks.expertise.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/40 mb-6 font-medium">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-primary-foreground/40 tracking-wide">
            &copy; {new Date().getFullYear()} Utu Jamii. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="group flex items-center gap-1 text-[12px] text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
              LinkedIn <ArrowUpRight size={10} />
            </Link>
            <Link href="#" className="group flex items-center gap-1 text-[12px] text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
              Twitter <ArrowUpRight size={10} />
            </Link>
            <Link href="#" className="group flex items-center gap-1 text-[12px] text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
              Instagram <ArrowUpRight size={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle watermark — small editorial imprint */}
      <div className="container mx-auto px-6 md:px-10 pb-6 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/25">
          Weaving Threads · Since 2016
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/25 tabular-nums">
          Dar es Salaam — 06°49′S
        </span>
      </div>
    </footer>
  );
}
