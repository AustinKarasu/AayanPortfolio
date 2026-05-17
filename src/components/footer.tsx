import { profile } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-zinc-500 sm:px-6 lg:px-8">
      © 2026 {profile.name}. Built with Next.js and Tailwind CSS.
    </footer>
  );
}
