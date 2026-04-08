"use client";

import React from "react";
import { motion } from "framer-motion";

export function AboutPreview() {
  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left — Large statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
                Who We Are
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-normal text-foreground leading-[1.15] mb-8">
              Hand in hand, hearts aligned &mdash; weaving progress thread by thread.
            </h2>
            <div className="relative aspect-[3/2] w-full overflow-hidden mt-10">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop')" }}
              />
            </div>
          </motion.div>

          {/* Right — Description + details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 lg:pt-20"
          >
            <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] mb-10 max-w-xl">
              UTU JAMII provides the link between businesses, government, communities, and other stakeholders, creating the environment for building a bright future together. We believe in &ldquo;utu&rdquo; &mdash; the Swahili essence of shared humanity and dignity.
            </p>
            <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.8] mb-12 max-w-xl">
              We don&apos;t just deliver solutions &mdash; we equip communities and businesses with the tools and resources they need to thrive together, fostering lasting change across Tanzania and East Africa. If you want to go fast, go alone. If you want to go far, go together.
            </p>

            {/* Approach highlights */}
            <div className="border-t border-border pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-lg text-foreground mb-2">Empowerment at the Core</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  We equip communities and businesses with the tools they need to thrive together, fostering lasting and sustainable change.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground mb-2">Dignity in Action</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  We value &ldquo;Utu&rdquo; &mdash; the essence of being human &mdash; working with respect for cultural dignity, inclusivity, and interconnectedness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
