import { PageShell } from "@/components/page-shell";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";
import { skillGroups } from "@/lib/site-data";

export const metadata = {
  title: "Skills",
  description: "Grouped technical and creative skills for Aayan Karasu.",
};

export default function SkillsPage() {
  return (
    <PageShell
      eyebrow="Skills"
      title="Skills grouped by the work clients actually need."
      description="From full-stack development to servers, automation, AI workflows, and creative assets, these are the areas I can bring into a project."
    >
      <MotionDiv variants={stagger} initial="hidden" animate="visible" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <MotionDiv key={group.title} variants={fadeUp} className="premium-card rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-red-400/40">
            <group.icon className="mb-5 text-red-400" size={26} />
            <h2 className="text-xl font-semibold text-white">{group.title}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-sm text-zinc-300">
                  {skill}
                </span>
              ))}
            </div>
          </MotionDiv>
        ))}
      </MotionDiv>
    </PageShell>
  );
}
