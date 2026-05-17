import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";
import { services } from "@/lib/site-data";

export const metadata = {
  title: "Services",
  description: "Services offered by Aayan Karasu for web, apps, bots, servers, AI workflows, and design.",
};

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Technical and creative services for real project work."
      description="Each service is shaped around useful deliverables: something you can launch, manage, hand off, or build on."
    >
      <MotionDiv variants={stagger} initial="hidden" animate="visible" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <MotionDiv key={service.title} variants={fadeUp} className="premium-card group flex min-h-80 flex-col rounded-lg border border-white/10 bg-zinc-950/70 p-6 transition hover:-translate-y-1 hover:border-red-400/40">
            <service.icon className="mb-5 text-red-400" size={26} />
            <h2 className="text-xl font-semibold text-white">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{service.description}</p>
            <div className="mt-5 space-y-2">
              {service.deliverables.map((item) => (
                <p key={item} className="text-sm text-zinc-300">- {item}</p>
              ))}
            </div>
            <Link href="/contact" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-red-300 transition group-hover:text-red-200">
              Request this service <ArrowRight size={15} />
            </Link>
          </MotionDiv>
        ))}
      </MotionDiv>
    </PageShell>
  );
}
