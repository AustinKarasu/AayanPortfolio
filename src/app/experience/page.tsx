import { PageShell } from "@/components/page-shell";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";
import { experience } from "@/lib/site-data";

export const metadata = {
  title: "Experience",
  description: "Professional experience timeline for Aayan Karasu.",
};

export default function ExperiencePage() {
  return (
    <PageShell
      eyebrow="Experience"
      title="Experience built through hands-on project work."
      description="The timeline below focuses on the kinds of work I can take on for companies, communities, and freelance clients."
    >
      <MotionDiv variants={stagger} initial="hidden" animate="visible" className="relative space-y-5 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-white/10 sm:before:left-6">
        {experience.map((item) => (
          <MotionDiv key={item.role} variants={fadeUp} className="relative pl-12 sm:pl-16">
            <span className="absolute left-0 top-2 flex size-8 items-center justify-center rounded-full border border-red-400/40 bg-red-500/15 sm:size-12">
              <span className="size-2 rounded-full bg-red-400" />
            </span>
            <article className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">{item.role}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{item.context}</p>
                </div>
                <p className="rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300">{item.period}</p>
              </div>
              <p className="mt-5 leading-7 text-zinc-300">{item.description}</p>
            </article>
          </MotionDiv>
        ))}
      </MotionDiv>
    </PageShell>
  );
}
