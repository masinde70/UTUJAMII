"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HOME_FALLBACK } from "@/lib/cms/home-fallback";

type ContactData = {
  contactAddress: string;
  contactEmail: string;
  contactPhone: string;
};

export function ContactSection({ data }: { data?: ContactData }) {
  const d = data ?? HOME_FALLBACK;
  const phoneHref = d.contactPhone.replace(/[^0-9+]/g, "");
  return (
    <section id="contact" className="py-20 md:py-28 bg-surface-alt">
      <div className="container mx-auto px-6 md:px-10">
        {/* Large CTA headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal text-foreground leading-[1.08]">
            Let&apos;s Build<br />
            Together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                Get in Touch
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6 leading-snug">
              Share your vision,<br />
              your challenges,<br />
              and your dreams.
            </h3>

            <div className="space-y-4 text-[14px] text-muted-foreground mt-8">
              <p className="whitespace-pre-line">{d.contactAddress}</p>
              <p>
                <a
                  href={`mailto:${d.contactEmail}`}
                  className="hover:text-foreground transition-colors"
                >
                  {d.contactEmail}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${phoneHref}`}
                  className="hover:text-foreground transition-colors"
                >
                  {d.contactPhone}
                </a>
              </p>
              <p className="text-[13px] text-muted-foreground/70 pt-2">
                Monday &ndash; Friday, 9:00 AM &ndash; 5:00 PM
              </p>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="w-full bg-transparent border-b border-border pb-3 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full bg-transparent border-b border-border pb-3 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-transparent border-b border-border pb-3 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Your Message *"
                className="w-full bg-transparent border-b border-border pb-3 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors resize-none"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors"
              >
                Send Message
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
