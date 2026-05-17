import Image from "next/image";

type BrandMarkProps = {
  size?: number;
  showText?: boolean;
};

export function BrandMark({ size = 40, showText = true }: BrandMarkProps) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Aayan Karasu logo"
        width={size}
        height={size}
        className="rounded-lg border border-red-500/25 shadow-[0_0_28px_rgba(239,68,68,0.2)]"
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
