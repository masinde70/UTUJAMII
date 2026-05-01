import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getNews } from "@/lib/cms/news";

export const revalidate = 60;

export default async function NewsPage() {
  const articles = await getNews();

  return (
    <div className="pt-24 min-h-[70vh] flex flex-col items-center pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Latest Updates
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            News & Insights
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay informed about our latest community engagements, reports, and industry perspectives.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-muted rounded-2xl">
            <p className="text-muted-foreground">
              No articles yet. Sign in to{" "}
              <Link href="/admin" className="underline">
                /admin
              </Link>{" "}
              to publish the first one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                href={`/news/${article.id}`}
                key={article.id}
                className="group flex flex-col bg-surface border border-muted rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                  {article.mainImage ? (
                    <img
                      src={article.mainImage.url}
                      alt={article.mainImage.alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-xs font-medium text-muted-foreground mb-4">
                    <Calendar size={14} className="mr-2" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                  <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-medium mt-auto group-hover:text-accent transition-colors">
                    <span>Read Article</span>
                    <ArrowRight
                      size={16}
                      className="ml-2 transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
