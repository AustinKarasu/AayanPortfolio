"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { navItems } from "@/lib/site-data";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/projects" className="rounded-md border border-white/10 px-4 py-2 text-sm text-white transition hover:border-red-400/50 hover:bg-white/5">
            View Projects
          </Link>
          <Link href="/contact" className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500">
            Hire Me
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-white lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm ${
                  pathname === item.href ? "bg-white/10 text-white" : "text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-red-600 px-3 py-3 text-center text-sm font-medium text-white">
              Contact Me
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
