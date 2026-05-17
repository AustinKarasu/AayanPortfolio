import { PageShell } from "@/components/page-shell";
import { ProjectExplorer } from "@/components/project-explorer";

export const metadata = {
  title: "Projects",
  description: "Public GitHub repositories and selected project areas for Aayan Karasu.",
};

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Projects"
      title="Public repositories and project work."
      description="This page loads public GitHub repositories from AustinKarasu and falls back to clean static project cards if the API is unavailable."
    >
      <ProjectExplorer />
    </PageShell>
  );
}
