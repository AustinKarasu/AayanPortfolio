"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, GitFork, GitBranch, Search, Star } from "lucide-react";
import { MotionArticle, MotionDiv, fadeUp, stagger } from "@/components/motion";
import { fallbackProjects, profile } from "@/lib/site-data";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
};

const filters = ["All", "Web", "Bots", "Minecraft", "Servers", "AI", "Tools"];

function projectTags(repo: Repo) {
  const source = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${(repo.topics ?? []).join(" ")}`.toLowerCase();
  const tags = new Set<string>();

  if (/web|next|react|html|css|tailwind|site|app/.test(source)) tags.add("Web");
  if (/bot|discord|webhook/.test(source)) tags.add("Bots");
  if (/minecraft|pmmp|pocketmine|bedrock/.test(source)) tags.add("Minecraft");
  if (/server|vps|linux|docker|nginx|hosting/.test(source)) tags.add("Servers");
  if (/ai|prompt|agent|claude|codex|mcp/.test(source)) tags.add("AI");
  if (/tool|cli|utility|dashboard|api/.test(source)) tags.add("Tools");

  if (tags.size === 0 && repo.language) tags.add(repo.language);
  return Array.from(tags).slice(0, 4);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function ProjectExplorer() {
  const [repos, setRepos] = useState<Repo[]>(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [status, setStatus] = useState<"loading" | "live" | "fallback">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=12`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });

        if (!response.ok) throw new Error("GitHub request failed");
        const data = (await response.json()) as Repo[];
        setRepos(data.length > 0 ? data : fallbackProjects);
        setStatus(data.length > 0 ? "live" : "fallback");
      } catch {
        if (!controller.signal.aborted) {
          setRepos(fallbackProjects);
          setStatus("fallback");
        }
      }
    }

    loadRepos();
    return () => controller.abort();
  }, []);

  const filteredRepos = useMemo(() => {
    if (activeFilter === "All") return repos;
    return repos.filter((repo) => projectTags(repo).includes(activeFilter));
  }, [activeFilter, repos]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <Search size={18} className="text-red-400" />
          {status === "live" ? "Showing public GitHub repositories." : status === "loading" ? "Loading public GitHub repositories." : "Showing fallback projects because GitHub data is unavailable."}
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-3 py-2 text-sm transition ${
                activeFilter === filter
                  ? "border-red-400/60 bg-red-500/15 text-white"
                  : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <MotionDiv variants={stagger} initial="hidden" animate="visible" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredRepos.map((repo) => {
          const tags = projectTags(repo);
          return (
            <MotionArticle
              key={repo.id}
              variants={fadeUp}
              className="premium-card group flex min-h-72 flex-col rounded-lg border border-white/10 bg-zinc-950/70 p-6 transition hover:-translate-y-1 hover:border-red-400/40 hover:bg-zinc-900/80"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{repo.name.replaceAll("-", " ")}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
                    {repo.description || "Public GitHub repository. The repository name is shown without adding claims that are not in the project description."}
                  </p>
                </div>
                <GitBranch className="shrink-0 text-zinc-600 transition group-hover:text-red-400" size={22} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  {repo.language ? <span>{repo.language}</span> : null}
                  <span className="inline-flex items-center gap-1"><Star size={14} /> {repo.stargazers_count}</span>
                  <span className="inline-flex items-center gap-1"><GitFork size={14} /> {repo.forks_count}</span>
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
                    GitHub <ExternalLink size={15} />
                  </a>
                  {repo.homepage ? (
                    <a href={repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white transition hover:border-red-400/50">
                      Live Link <ExternalLink size={15} />
                    </a>
                  ) : null}
                </div>
              </div>
            </MotionArticle>
          );
        })}
      </MotionDiv>
    </section>
  );
}
