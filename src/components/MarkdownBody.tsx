import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-12 mb-6 text-foreground">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-10 mb-5 text-foreground">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-serif text-2xl md:text-3xl font-medium mt-8 mb-4 text-foreground">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6 font-sans font-light tracking-wide">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent pl-6 py-4 my-8 mx-auto xl:-mx-8 italic text-2xl font-serif text-foreground bg-accent/5 rounded-r-2xl shadow-sm">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-8 mb-8 space-y-3 text-lg md:text-xl text-muted-foreground font-light">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-8 mb-8 space-y-3 text-lg md:text-xl text-muted-foreground font-light">
            {children}
          </ol>
        ),
        a: ({ href, children }) => {
          const external = href && !href.startsWith("/");
          return (
            <a
              href={href}
              rel={external ? "noreferrer noopener" : undefined}
              target={external ? "_blank" : undefined}
              className="text-primary font-medium hover:text-accent transition-colors border-b border-primary/30 hover:border-accent"
            >
              {children}
            </a>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
