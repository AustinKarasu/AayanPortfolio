import { PageShell } from "@/components/page-shell";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";

const strengths = [
  "I can move between frontend, backend, server infrastructure, automation, AI tools, and creative design without losing the practical goal.",
  "I focus on working solutions first: clean interfaces, reliable setup, readable code, and a handoff that makes sense.",
  "I learn fast when a project needs a new stack, API, panel, plugin, or workflow.",
];

export const metadata = {
  title: "About",
  description: "About Aayan Karasu, a full-stack developer and technical freelancer.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="A practical developer with a wide technical range."
      description="I work across development, server infrastructure, automation, AI tools, and creative design. The common thread is simple: understand the problem, build something that works, and keep improving it until it feels reliable."
    >
      <MotionDiv variants={stagger} initial="hidden" animate="visible" className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <MotionDiv variants={fadeUp} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="space-y-5 text-base leading-8 text-zinc-300">
            <p>
              My work sits between software development and technical operations. I build websites and backend systems, set up Discord bots, work with Minecraft Bedrock and PMMP servers, manage VPS/Linux environments, and use AI tools to speed up real workflows.
            </p>
            <p>
              I am comfortable with both code and setup work. That helps when a project needs more than a page on the internet: deployment, permissions, APIs, server panels, performance fixes, automation, and clean user-facing design often need to fit together.
            </p>
            <p>
              I also handle creative work like video edits, banners, thumbnails, and branding assets, which makes me useful for online communities and small teams that need both technical execution and visual polish.
            </p>
          </div>
        </MotionDiv>
        <MotionDiv variants={fadeUp} className="grid gap-4">
          {strengths.map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-zinc-950/70 p-5 text-sm leading-6 text-zinc-300">
              {item}
            </div>
          ))}
        </MotionDiv>
      </MotionDiv>
    </PageShell>
  );
}
