"use client";

import { Send } from "lucide-react";
import { profile } from "@/lib/site-data";

export function ContactForm() {
  return (
    <form className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-300">
          Name
          <input className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Email
          <input type="email" className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="you@example.com" />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm text-zinc-300">
        Project
        <input className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="Website, bot, server setup, design..." />
      </label>
      <label className="mt-4 grid gap-2 text-sm text-zinc-300">
        Message
        <textarea rows={6} className="resize-none rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="Tell me what you want built." />
      </label>
      <a href={`mailto:${profile.email}`} className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500">
        <Send size={17} />
        Email Aayan
      </a>
    </form>
  );
}
