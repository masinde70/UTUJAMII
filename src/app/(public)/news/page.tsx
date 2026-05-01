import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getNews } from "@/lib/cms/news";
import type { News } from "@/types/cms";

export const revalidate = 60;

function formatEditorialDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
}

export default async function NewsPage() {
  const articles = await getNews();

  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section masthead */}
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-20 md:mb-28">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            § News & Dispatches
          </span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            Volume 01
          </span>
        </div>

        {/* Heading + standfirst */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-20 md:mb-28">
          <h1 className="col-span-12 md:col-span-8 font-serif text-[clamp(2.4rem,5vw,4rem)] font-light text-foreground leading-[1.05]">
            Field updates &amp;{" "}
            <em className="not-italic text-foreground/55">
              long-form reflections.
            </em>
          </h1>
          <p className="col-span-12 md:col-span-4 text-[15px] text-foreground/65 leading-[1.7] mt-4 md:mt-2">
            Reports, milestones, and reflections from across our community engagements in Tanzania and East Africa.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="border-t border-foreground/15 pt-12 text-center">
            <p className="text-foreground/55 text-[15px] leading-relaxed">
              No dispatches yet. Sign in to{" "}
              <Link href="/admin" className="underline decoration-accent underline-offset-4 hover:text-foreground">
                /admin
              </Link>{" "}
              to publish the first one.
            </p>
          </div>
        ) : (
          <div className="space-y-20 md:space-y-28">
            {articles.map((article, i) => (
              <DispatchEntry
                key={article.id}
                article={article}
                index={i}
                featured={i === 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DispatchEntry({
  article,
  index,
  featured = false,
}: {
  article: News;
  index: number;
  featured?: boolean;
}) {
  const reverse = index % 2 === 1;
  const dispatchNo = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/news/${article.id}`}
      className="group block border-t border-foreground/15 pt-12 md:pt-16"
    >
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-12 gap-y-8 items-center">
        {/* Image */}
        <figure
          className={`col-span-12 md:col-span-7 relative ${reverse ? "md:order-2" : ""}`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
            {article.mainImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                style={{ backgroundImage: `url('${article.mainImage.url}')` }}
                role="img"
                aria-label={article.mainImage.alt}
              />
            ) : (
              <div className="absolute inset-0 bg-primary/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/70" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/70" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/70" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/70" />
            <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/70 tabular-nums">
                Dispatch · {dispatchNo}
              </span>
            </div>
          </div>
        </figure>

        {/* Text — alternates plain / featured-on-dark-green */}
        <div
          className={`col-span-12 md:col-span-5 ${reverse ? "md:order-1" : ""} ${
            featured
              ? "bg-primary text-primary-foreground p-7 md:p-8 self-stretch flex flex-col justify-center"
              : "flex flex-col"
          }`}
        >
          {featured && (
            <span className="text-[10px] uppercase tracking-[0.28em] text-accent font-medium mb-5">
              Featured Dispatch
            </span>
          )}

          <div className="flex items-center gap-3 mb-5">
            <span
              className={`text-[10px] md:text-[11px] uppercase tracking-[0.28em] tabular-nums ${
                featured ? "text-primary-foreground/55" : "text-foreground/50"
              }`}
            >
              {formatEditorialDate(article.publishedAt)}
            </span>
            <span
              className={`w-6 h-px ${
                featured ? "bg-primary-foreground/30" : "bg-foreground/20"
              }`}
            />
          </div>

          <h2
            className={`font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-light leading-[1.15] mb-5 transition-colors duration-500 ${
              featured
                ? "text-primary-foreground"
                : "text-foreground group-hover:text-primary"
            }`}
          >
            {article.title}
          </h2>

          <p
            className={`text-[14.5px] leading-[1.7] mb-7 ${
              featured ? "text-primary-foreground/80" : "text-foreground/70"
            }`}
          >
            {article.excerpt}
          </p>

          <div
            className={`inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.22em] font-medium ${
              featured ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            <span className="relative">
              Read Dispatch
              <span
                className={`absolute -bottom-0.5 left-0 w-full h-px transition-colors duration-500 group-hover:bg-accent ${
                  featured ? "bg-primary-foreground/80" : "bg-foreground/40"
                }`}
              />
            </span>
            <ArrowUpRight
              size={13}
              className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
