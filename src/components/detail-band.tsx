import type { LucideIcon } from "lucide-react";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";

type DetailBandProps = {
  items: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
};

export function DetailBand({ items }: DetailBandProps) {
  return (
    <MotionDiv variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <MotionDiv key={item.title} variants={fadeUp} className="premium-card rounded-lg border border-white/10 bg-zinc-950/70 p-5 transition hover:-translate-y-1 hover:border-red-400/40">
          <item.icon className="text-red-400" size={22} />
          <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}
