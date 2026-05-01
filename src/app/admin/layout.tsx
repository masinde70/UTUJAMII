"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useUser } from "@/lib/firebase/use-user";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();

  useEffect(() => {
    if (user === undefined) return;
    const onLoginPage = pathname === "/admin/login";
    if (user && onLoginPage) router.replace("/admin");
    if (!user && !onLoginPage) router.replace("/admin/login");
  }, [user, pathname, router]);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground/55 text-[12px] uppercase tracking-[0.25em]">
        Loading…
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background">
        <div className="container mx-auto px-6 md:px-10 pt-8">
          <div className="flex items-end justify-between border-b border-foreground/15 pb-4 mb-2">
            <Link
              href="/admin"
              className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 hover:text-foreground transition-colors"
            >
              § Editor's Desk
            </Link>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/50 tabular-nums">
              UTU JAMII · Admin
            </span>
          </div>
          <div className="flex items-center justify-between py-4 flex-wrap gap-4">
            <nav className="flex items-center gap-8 text-[12px] uppercase tracking-[0.22em]">
              <NavLink href="/admin" exact pathname={pathname}>
                Dashboard
              </NavLink>
              <NavLink href="/admin/pages" pathname={pathname}>
                Pages
              </NavLink>
              <NavLink href="/admin/projects" pathname={pathname}>
                Projects
              </NavLink>
              <NavLink href="/admin/news" pathname={pathname}>
                News
              </NavLink>
            </nav>
            <div className="flex items-center gap-5">
              <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/50 hidden sm:inline">
                {user.email}
              </span>
              <button
                onClick={async () => {
                  await signOut(auth);
                  router.replace("/admin/login");
                }}
                className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground hover:text-accent transition-colors"
              >
                <span className="relative">
                  Sign out
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-foreground/40 group-hover:bg-accent transition-colors duration-500" />
                </span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="pb-24">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  pathname,
  exact,
  children,
}: {
  href: string;
  pathname: string | null;
  exact?: boolean;
  children: ReactNode;
}) {
  const active = exact ? pathname === href : pathname?.startsWith(href);
  return (
    <Link
      href={href}
      className={`group relative font-medium transition-colors ${
        active ? "text-foreground" : "text-foreground/55 hover:text-foreground"
      }`}
    >
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-1 left-0 h-px bg-accent transition-transform duration-500 origin-left ${
            active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </span>
    </Link>
  );
}
