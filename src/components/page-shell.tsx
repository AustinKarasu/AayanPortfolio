import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="max-w-3xl">
        {eyebrow ? <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-red-400">{eyebrow}</p> : null}
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">{description}</p>
      </section>
      <div className="mt-12">{children}</div>
    </main>
  );
}
