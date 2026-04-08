"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "News", href: "/news" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent border-b border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo — Always visible */}
        <Link href="/" className="relative z-50">
          <span className="font-serif text-[1.6rem] font-bold tracking-tight text-foreground">
            Utu Jamii
          </span>
        </Link>

        {/* Desktop Navigation — Right aligned */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/about#contact"
            className="group flex items-center gap-2 ml-4 bg-primary text-primary-foreground px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-50 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu — Full screen overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-background transition-all duration-500 flex flex-col",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Top section with brand context */}
        <div className="px-6 pt-24 pb-6 border-b border-border">
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
            Navigation
          </span>
        </div>

        {/* Nav links — left aligned, large, with numbers */}
        <nav className="flex-1 flex flex-col justify-start px-6 pt-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              className="group flex items-baseline gap-4 py-5 border-b border-border/50 last:border-b-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-[12px] text-muted-foreground/50 tracking-[0.1em] tabular-nums">
                0{i + 1}
              </span>
              <span className="font-serif text-[2rem] text-foreground group-hover:text-accent transition-colors duration-300">
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom section — CTA + contact */}
        <div className="px-6 py-8 border-t border-border">
          <Link
            href="/about#contact"
            className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 text-[13px] font-medium uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors mb-6"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get in Touch
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <div className="flex items-center justify-between text-[12px] text-muted-foreground/60">
            <a href="mailto:info@utujamii.com" className="hover:text-foreground transition-colors">
              info@utujamii.com
            </a>
            <a href="tel:+255712077908" className="hover:text-foreground transition-colors">
              +255 712 077 908
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
