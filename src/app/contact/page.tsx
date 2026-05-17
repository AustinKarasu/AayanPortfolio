import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { contactLinks, profile } from "@/lib/site-data";

export const metadata = {
  title: "Contact",
  description: "Contact Aayan Karasu for development, server, automation, AI workflow, or design work.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let's build something professional."
      description="Send a clear message about what you need: a website, app, Discord bot, Minecraft server, VPS/Linux setup, AI workflow, or creative asset."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Reach me directly</h2>
          <div className="mt-6 space-y-4">
            {contactLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-red-400/40">
                <link.icon className="text-red-400" size={22} />
                <span>
                  <span className="block text-sm text-zinc-500">{link.label}</span>
                  <span className="block break-all text-white">{link.value}</span>
                </span>
              </a>
            ))}
          </div>
          <a href={`mailto:${profile.email}`} className="mt-6 inline-flex rounded-md bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500">
            Open Email
          </a>
        </section>
        <ContactForm />
      </div>
    </PageShell>
  );
}
