"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { profile } from "@/lib/site-data";

const cooldownKey = "aayan-contact-last-submit";
const cooldownMs = 60_000;

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [coolingDown, setCoolingDown] = useState(false);
  const minMessageLength = 24;

  const helperText = useMemo(
    () => "This opens your email app with a prepared message. No backend stores your details.",
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const website = String(form.get("website") ?? "");
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const project = String(form.get("project") ?? "").trim();
    const budget = String(form.get("budget") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (website) return;

    const lastSubmit = Number(localStorage.getItem(cooldownKey) ?? 0);
    if (Date.now() - lastSubmit < cooldownMs) {
      setCoolingDown(true);
      setStatus("Please wait a minute before opening another email draft.");
      return;
    }

    if (!name || !email || !project || message.length < minMessageLength) {
      setStatus("Add your name, email, project type, and a short clear message.");
      return;
    }

    const subject = encodeURIComponent(`Project enquiry from ${name}: ${project}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${project}`,
        budget ? `Budget/timeline: ${budget}` : "Budget/timeline: Not specified",
        "",
        "Message:",
        message,
      ].join("\n"),
    );

    localStorage.setItem(cooldownKey, String(Date.now()));
    setCoolingDown(false);
    setStatus("Opening your email app with a clean project draft.");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-300">
          Name
          <input name="name" required className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Email
          <input name="email" required type="email" className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="you@example.com" />
        </label>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-300">
          Project
          <select name="project" required className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-red-400">
            <option value="">Choose one</option>
            <option>Website or web app</option>
            <option>Discord bot</option>
            <option>Minecraft/server setup</option>
            <option>VPS/Linux help</option>
            <option>AI workflow</option>
            <option>Design or video edit</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Budget or timeline
          <input name="budget" className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="Optional but helpful" />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm text-zinc-300">
        Message
        <textarea name="message" required minLength={minMessageLength} rows={6} className="resize-none rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400" placeholder="Tell me what you want built, what exists already, and what result you need." />
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={coolingDown} className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60">
          <Send size={17} />
          Prepare Email
        </button>
        <p className="text-sm text-zinc-500">{helperText}</p>
      </div>
      {status ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
          <CheckCircle2 size={16} className="text-red-400" />
          {status}
        </p>
      ) : null}
    </form>
  );
}
