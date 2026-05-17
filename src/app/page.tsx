import Link from "next/link";
import { ArrowDownToLine, ArrowRight, GitBranch } from "lucide-react";
import { HeroShowcase } from "@/components/hero-showcase";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";
import { profile, principles, trustCards } from "@/lib/site-data";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,0.22),transparent_34%),linear-gradient(135deg,rgba(24,24,27,0.95),rgba(0,0,0,1)_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <MotionDiv initial="hidden" animate="visible" variants={stagger}>
            <MotionDiv variants={fadeUp} className="mb-5 inline-flex rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">
              Open for part-time or freelance work
            </MotionDiv>
            <MotionDiv variants={fadeUp}>
              <p className="text-lg font-medium text-zinc-400">{profile.name}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {profile.headline}
              </h1>
            </MotionDiv>
            <MotionDiv variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              {profile.intro}
            </MotionDiv>
            <MotionDiv variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500">
                Contact Me <ArrowRight size={17} />
              </Link>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-red-400/50 hover:bg-white/5">
                <GitBranch size={17} /> GitHub
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-red-400/50 hover:bg-white/5">
                <ArrowDownToLine size={17} /> Resume
              </a>
            </MotionDiv>
          </MotionDiv>

          <HeroShowcase />
        </div>
      </section>

      <MotionSection initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card) => (
            <MotionDiv key={card.title} variants={fadeUp} className="premium-card rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-red-400/40">
              <card.icon className="mb-4 text-red-400" size={24} />
              <h2 className="font-medium text-white">{card.title}</h2>
            </MotionDiv>
          ))}
        </div>
      </MotionSection>

      <section className="border-y border-white/10 bg-zinc-950/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {principles.map((item) => (
            <div key={item.label} className="flex items-center gap-3 text-zinc-300">
              <item.icon className="text-red-400" size={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
