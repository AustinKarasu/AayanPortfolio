"use client";

import { useEffect, useState } from "react";
import { MotionDiv } from "@/components/motion";

export function SiteEffects() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <MotionDiv
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-72 rounded-full bg-red-500/10 blur-3xl md:block"
        animate={{ x: position.x - 144, y: position.y - 144 }}
        transition={{ type: "spring", damping: 28, stiffness: 120, mass: 0.4 }}
      />
      <div className="fixed left-0 top-0 z-[70] h-0.5 w-full bg-transparent">
        <div className="h-full bg-gradient-to-r from-red-700 via-red-400 to-white shadow-[0_0_18px_rgba(239,68,68,0.65)]" style={{ width: `${progress * 100}%` }} />
      </div>
    </>
  );
}
