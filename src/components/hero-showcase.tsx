"use client";

import Image from "next/image";
import { useState } from "react";
import { Bot, Code2, ServerCog, Sparkles } from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { profile } from "@/lib/site-data";

const stackItems = [
  { label: "Web", icon: Code2, detail: "Next.js / APIs" },
  { label: "Bots", icon: Bot, detail: "Discord systems" },
  { label: "Servers", icon: ServerCog, detail: "VPS / Linux" },
  { label: "AI", icon: Sparkles, detail: "Agent workflows" },
];

export function HeroShowcase() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ rotateX: y * -9, rotateY: x * 11 });
      }}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      className="hero-perspective"
    >
      <div
        className="relative overflow-hidden rounded-lg border border-white/10 bg-black/45 p-5 shadow-2xl shadow-red-950/30 backdrop-blur-xl transition-transform duration-200"
        style={{ transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(239,68,68,0.24),transparent_30%),radial-gradient(circle_at_86%_80%,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative rounded-md border border-white/10 bg-zinc-950/90 p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500" />
              <span className="size-3 rounded-full bg-zinc-600" />
              <span className="size-3 rounded-full bg-zinc-600" />
            </div>
            <span className="rounded-md border border-red-400/25 bg-red-500/10 px-2 py-1 text-xs text-red-100">live portfolio</span>
          </div>

          <div className="grid gap-5 pt-5 sm:grid-cols-[0.7fr_1fr]">
            <div className="flex items-center justify-center">
              <div className="brand-orbit relative flex size-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <Image src={profile.profileImage} alt="Aayan Karasu profile photo" width={96} height={96} className="size-24 rounded-full object-cover object-[50%_34%] ring-2 ring-red-400/35" priority />
                <span className="orbit-dot top-2" />
                <span className="orbit-dot bottom-3 left-5 animation-delay-400" />
                <span className="orbit-dot right-4 top-12 animation-delay-700" />
              </div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <p className="text-zinc-500">$ build --professional</p>
              <p className="text-white">frontend: polished responsive UI</p>
              <p className="text-white">backend: APIs, auth, dashboards</p>
              <p className="text-white">infra: VPS, Linux, panels</p>
              <p className="text-red-300">output: clean launch-ready work</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {stackItems.map((item) => (
              <div key={item.label} className="group rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:border-red-400/40">
                <item.icon className="text-red-400" size={20} />
                <p className="mt-3 font-medium text-white">{item.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
