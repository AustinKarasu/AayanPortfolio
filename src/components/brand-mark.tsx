import Image from "next/image";
import { profile } from "@/lib/site-data";

type BrandMarkProps = {
  size?: number;
  showText?: boolean;
};

export function BrandMark({ size = 40, showText = true }: BrandMarkProps) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src={profile.profileImage}
        alt="Aayan Karasu profile photo"
        width={size}
        height={size}
        className="aspect-square rounded-full border border-red-500/35 object-cover shadow-[0_0_28px_rgba(239,68,68,0.24)]"
        priority
      />
      {showText ? (
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-white">Aayan Karasu</span>
          <span className="block text-xs text-zinc-500">Technical Freelancer</span>
        </span>
      ) : null}
    </span>
  );
}
