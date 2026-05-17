import {
  Bot,
  BrainCircuit,
  Code2,
  Database,
  Gamepad2,
  GitBranch,
  Globe2,
  Layers3,
  Mail,
  MonitorCog,
  Palette,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Terminal,
  Video,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Aayan Karasu",
  email: "aayankarasu@gmail.com",
  domain: "aayankarasu.fun",
  githubUser: "AustinKarasu",
  githubUrl: "https://github.com/AustinKarasu",
  headline: "Full-Stack Developer & Technical Freelancer",
  intro:
    "I build websites, apps, Discord bots, Minecraft and game server systems, VPS/Linux setups, AI workflows, and creative digital assets.",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const trustCards = [
  { title: "Full-Stack Development", icon: Layers3 },
  { title: "Game Server Systems", icon: Gamepad2 },
  { title: "AI-Assisted Workflows", icon: BrainCircuit },
  { title: "Creative Design", icon: Palette },
] satisfies Array<{ title: string; icon: LucideIcon }>;

export const skillGroups = [
  {
    title: "Web Development",
    icon: Globe2,
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "APIs"],
  },
  {
    title: "Backend & Databases",
    icon: Database,
    skills: ["Node.js", "PHP", "REST APIs", "MySQL", "Redis", "Authentication", "Dashboards"],
  },
  {
    title: "Servers & DevOps",
    icon: ServerCog,
    skills: ["Linux", "VPS", "Pterodactyl", "Nginx", "Cloudflare", "Docker basics", "Deployment", "Performance tuning"],
  },
  {
    title: "Game Server Development",
    icon: Gamepad2,
    skills: ["Minecraft Bedrock", "PocketMine-MP", "PMMP plugins", "Server optimization", "Game hosting setup"],
  },
  {
    title: "Discord & Automation",
    icon: Bot,
    skills: ["Discord bots", "Webhooks", "Moderation systems", "Ticket systems", "API integrations"],
  },
  {
    title: "AI & Productivity",
    icon: Workflow,
    skills: ["Prompt engineering", "Claude", "Codex", "MCP workflows", "AI agents", "Automation"],
  },
  {
    title: "Creative",
    icon: Palette,
    skills: ["Video editing", "Graphic design", "Banners", "Thumbnails", "Branding assets"],
  },
] satisfies Array<{ title: string; icon: LucideIcon; skills: string[] }>;

export const services = [
  {
    title: "Website Development",
    icon: Code2,
    description: "Clean marketing sites, dashboards, landing pages, and full-stack web apps.",
    deliverables: ["Responsive UI", "API integration", "SEO-ready setup", "Deployment support"],
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Practical Android and iOS app interfaces for product ideas and service workflows.",
    deliverables: ["App UI planning", "Frontend screens", "API-connected flows", "Testing handoff"],
  },
  {
    title: "Discord Bot Development",
    icon: Bot,
    description: "Bots that handle community workflows without making moderation harder.",
    deliverables: ["Commands", "Webhooks", "Tickets", "Moderation tools"],
  },
  {
    title: "Minecraft Server Setup",
    icon: Gamepad2,
    description: "Minecraft Bedrock and PMMP server setup focused on stability and player experience.",
    deliverables: ["Plugin setup", "Ranks and permissions", "Scoreboards", "Optimization"],
  },
  {
    title: "VPS/Linux Server Management",
    icon: Terminal,
    description: "Server setup, maintenance, and performance tuning for web and game projects.",
    deliverables: ["Linux setup", "Nginx", "Cloudflare", "Security basics"],
  },
  {
    title: "Game Server Hosting Setup",
    icon: MonitorCog,
    description: "Hosting environments for game communities that need dependable infrastructure.",
    deliverables: ["Panel setup", "Deployment", "Backups", "Resource tuning"],
  },
  {
    title: "AI Prompt Engineering & AI Workflow Setup",
    icon: WandSparkles,
    description: "AI-assisted workflows using modern tools such as Claude, Codex, and MCP systems.",
    deliverables: ["Prompt systems", "Agent workflows", "Automation planning", "Tool setup"],
  },
  {
    title: "Video Editing & Graphic Design",
    icon: Video,
    description: "Visual assets for online communities, creators, and digital projects.",
    deliverables: ["Edits", "Banners", "Thumbnails", "Branding assets"],
  },
] satisfies Array<{ title: string; icon: LucideIcon; description: string; deliverables: string[] }>;

export const experience = [
  {
    role: "Full-Stack Developer & Technical Freelancer",
    context: "Self-Employed / Remote",
    period: "2023 - Present",
    description:
      "I build websites, backend systems, Discord bots, Minecraft server setups, VPS/Linux environments, automation workflows, and creative digital assets for personal and client-style projects.",
  },
  {
    role: "Minecraft Server Developer & Game Server Setup Specialist",
    context: "Project-Based",
    period: "2023 - Present",
    description:
      "I work with Minecraft Bedrock/PMMP servers, plugin setup, performance optimization, VPS deployment, game hosting environments, permissions, ranks, scoreboards, and Discord integrations.",
  },
  {
    role: "Video Editor & Graphic Designer",
    context: "Freelance / Project-Based",
    period: "2022 - Present",
    description:
      "I create visual content, banners, thumbnails, logos, Discord assets, social media edits, and branding materials for online communities and digital projects.",
  },
];

export const fallbackProjects = [
  {
    id: 1,
    name: "AustinKarasu GitHub Portfolio",
    description: "Public repositories from GitHub are shown here when the API is available.",
    html_url: profile.githubUrl,
    homepage: profile.domain,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    topics: ["portfolio", "web"],
  },
  {
    id: 2,
    name: "Discord Automation Workspace",
    description: "Fallback project card for Discord bot and automation work. Replace with a live repository when ready.",
    html_url: profile.githubUrl,
    homepage: "",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    topics: ["discord", "bots", "tools"],
  },
  {
    id: 3,
    name: "Game Server Setup Notes",
    description: "Fallback project card for Minecraft, PMMP, VPS, and game hosting setup work.",
    html_url: profile.githubUrl,
    homepage: "",
    language: "PHP",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    topics: ["minecraft", "servers"],
  },
];

export const contactLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Website", value: profile.domain, href: `https://${profile.domain}`, icon: Globe2 },
  { label: "GitHub", value: "github.com/AustinKarasu", href: profile.githubUrl, icon: GitBranch },
] satisfies Array<{ label: string; value: string; href: string; icon: LucideIcon }>;

export const principles = [
  { label: "Practical builds", icon: ShieldCheck },
  { label: "Clear communication", icon: Mail },
  { label: "Fast learning", icon: BrainCircuit },
];
