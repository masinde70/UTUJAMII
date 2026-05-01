"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading…
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-serif text-xl font-bold text-gray-900">
              UTUJAMII Admin
            </Link>
            <nav className="flex items-center gap-6 text-sm">
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
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline">{user.email}</span>
            <button
              onClick={async () => {
                await signOut(auth);
                router.replace("/admin/login");
              }}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
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
      className={
        active
          ? "text-gray-900 font-medium border-b-2 border-blue-600 pb-1"
          : "text-gray-600 hover:text-gray-900 pb-1"
      }
    >
      {children}
    </Link>
  );
}
