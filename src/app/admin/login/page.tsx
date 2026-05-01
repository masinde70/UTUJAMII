"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/admin");
    } catch (err) {
      setError(formatAuthError((err as AuthError).code));
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Editorial top bar */}
      <div className="container mx-auto px-6 md:px-10 pt-8">
        <div className="flex items-end justify-between border-b border-foreground/15 pb-4">
          <Link
            href="/"
            className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 hover:text-foreground transition-colors"
          >
            ← Utu Jamii
          </Link>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
            § Editor · Restricted
          </span>
        </div>
      </div>

      {/* Centered form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-accent font-medium">
              Sign in
            </span>
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-foreground leading-[1.1]">
              The editor's{" "}
              <em className="not-italic text-foreground/55">desk.</em>
            </h1>
            <p className="text-[14px] text-foreground/65 leading-relaxed">
              Content management for the UTU JAMII publication. Restricted to
              authorised editors.
            </p>
          </div>

          <div className="space-y-6">
            <label className="block">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">
                Email
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-foreground/25 pb-2 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-accent transition-colors"
              />
            </label>

            <label className="block">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">
                Password
              </span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-foreground/25 pb-2 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-accent transition-colors"
              />
            </label>
          </div>

          {error && (
            <div
              role="alert"
              className="border-l-2 border-accent pl-4 py-1 text-[13px] text-foreground/75 leading-relaxed"
            >
              {error}
            </div>
          )}

          <div className="space-y-6">
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-[12px] font-medium uppercase tracking-[0.22em] hover:bg-primary/90 disabled:bg-foreground/30 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Signing in…" : "Sign in"}
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>

            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40">
              Need access? Contact the site administrator.
            </p>
          </div>
        </form>
      </div>

      {/* Editorial bottom imprint */}
      <div className="container mx-auto px-6 md:px-10 pb-6">
        <div className="flex items-center justify-between border-t border-foreground/15 pt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            Weaving Threads · Since 2016
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 tabular-nums">
            Dar es Salaam — 06°49′S
          </span>
        </div>
      </div>
    </main>
  );
}

function formatAuthError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again in a few minutes.";
    case "auth/network-request-failed":
      return "Network error — check your connection.";
    case "auth/invalid-email":
      return "That email address looks incorrect.";
    default:
      return "Sign-in failed. Please try again.";
  }
}
