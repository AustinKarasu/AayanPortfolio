import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SiteEffects } from "@/components/site-effects";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aayankarasu.fun"),
  title: {
    default: "Aayan Karasu | Full-Stack Developer & Technical Freelancer",
    template: "%s | Aayan Karasu",
  },
  description:
    "Portfolio for Aayan Karasu, a full-stack developer and technical freelancer building websites, apps, Discord bots, game server systems, VPS/Linux setups, AI workflows, and creative digital assets.",
  keywords: [
    "Aayan Karasu",
    "Full-Stack Developer",
    "Technical Freelancer",
    "Discord Bot Developer",
    "Minecraft Server Developer",
    "VPS Linux Engineer",
    "AI Tools Specialist",
  ],
  authors: [{ name: "Aayan Karasu", url: "https://www.aayankarasu.fun" }],
  creator: "Aayan Karasu",
  openGraph: {
    title: "Aayan Karasu | Full-Stack Developer & Technical Freelancer",
    description:
      "Websites, apps, Discord bots, Minecraft/game server systems, VPS/Linux setups, AI workflows, and creative digital assets.",
    url: "https://www.aayankarasu.fun",
    siteName: "Aayan Karasu Portfolio",
    images: [{ url: "/brand-banner.svg", width: 1600, height: 900, alt: "Aayan Karasu portfolio banner" }],
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayan Karasu | Full-Stack Developer & Technical Freelancer",
    description: "Full-stack development, server systems, automation, AI workflows, and design.",
    images: ["/brand-banner.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-black text-white">
        <SiteEffects />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
