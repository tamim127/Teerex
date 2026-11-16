"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

interface ProjectItem {
  id: string;
  title: string;
  category: "Web App" | "SaaS App" | "Mobile App" | "Starter & Tools";
  categoryLabel: string;
  tagline: string;
  description: string;
  year: string;
  stack: string[];
  gradient: string;
  accentColor: string;
  starColor: string;
  highlights: string[];
  liveUrl: string;
  codeUrl: string;
  caseStudyUrl: string;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }[];
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "keythm",
    title: "Keythm",
    category: "Web App",
    categoryLabel: "Web App",
    tagline: "Keychron meets typing test: every key has its own sound",
    description: "A typing test web app where every key plays its own mechanical switch sound, so practice feels like typing on a real mechanical keyboard.",
    year: "2024",
    stack: ["Next.js", "Web Audio API", "Serwist", "Motion.dev", "TypeScript"],
    gradient: "linear-gradient(145deg, #831843 0%, #DB2777 40%, #f472b6 75%, #fbcfe8 100%)",
    accentColor: "from-pink-500 to-rose-400",
    starColor: "fill-pink-500 dark:fill-pink-400 drop-shadow-[0_0_16px_rgb(236_72_153/0.9)]",
    highlights: [
      "Four typing modes with real-time WPM and accuracy metrics",
      "Anti-cheat system flagging bots, auto-typers, and AFK sessions",
      "Per-second WPM and consistency breakdown analytics",
      "Works offline as an installable Progressive Web App (PWA)",
    ],
    liveUrl: "https://keythm.aayushbharti.in",
    codeUrl: "https://github.com/aayushbharti/keythm",
    caseStudyUrl: "/projects/keythm",
    images: [
      {
        src: "/projects/keythm/screen1.png",
        alt: "Keythm typing test interface",
        width: 3195,
        height: 2091,
      },
    ],
  },
  {
    id: "nextdemy",
    title: "Nextdemy",
    category: "SaaS App",
    categoryLabel: "SaaS App",
    tagline: "An online academy where students learn, and instructors teach and earn",
    description: "An online course platform built with Turborepo where students buy and stream video courses, and instructors create and publish content with monetization tracking.",
    year: "2024",
    stack: ["Next.js", "Express.js", "MongoDB", "Razorpay", "Zustand"],
    gradient: "linear-gradient(145deg, #1e2a78 0%, #2932CB 40%, #5a6aef 75%, #a0b0ff 100%)",
    accentColor: "from-blue-600 to-indigo-400",
    starColor: "fill-blue-500 dark:fill-blue-400 drop-shadow-[0_0_16px_rgb(59_130_246/0.9)]",
    highlights: [
      "Razorpay payments verified via server-side HMAC signatures",
      "Granular per-lesson video progress tracking and certificates",
      "Dedicated instructor dashboard for video uploads and revenue analytics",
      "Sanitized, rate-limited RESTful API with automated database failover",
    ],
    liveUrl: "https://academy.aayushbharti.in",
    codeUrl: "https://github.com/AayushBharti/Zenith-Academy",
    caseStudyUrl: "/projects/nextdemy",
    images: [
      {
        src: "/projects/nextdemy/home.jpg",
        alt: "Nextdemy online academy homepage",
        width: 2400,
        height: 1495,
      },
    ],
  },
  {
    id: "venture-den",
    title: "Venture Den",
    category: "SaaS App",
    categoryLabel: "SaaS App",
    tagline: "Where founders pitch ideas, get an AI score, and get upvoted by the community",
    description: "A startup pitch platform where founders pitch ideas, Gemini LLM evaluates and scores each pitch on three key investment metrics, and the community upvotes the best concepts.",
    year: "2024",
    stack: ["Next.js", "Sanity CMS", "Gemini API", "Tailwind CSS"],
    gradient: "linear-gradient(145deg, #1f2937 0%, #4b5563 40%, #9ca3af 75%, #d1d5db 100%)",
    accentColor: "from-gray-700 to-gray-400",
    starColor: "fill-gray-400 dark:fill-gray-300 drop-shadow-[0_0_14px_rgb(156_163_175/0.7)]",
    highlights: [
      "Automated AI feedback, critique, and rating per submitted pitch",
      "Structured Gemini JSON output validated via Zod schemas before saving",
      "Sanity visual studio integration with real-time editorial preview",
      "Fuzzy keyword search across pitches, founder bios, and industry tags",
    ],
    liveUrl: "https://venture-den.aayushbharti.in",
    codeUrl: "https://github.com/AayushBharti/VentureDen",
    caseStudyUrl: "/projects/venture-den",
    images: [
      {
        src: "/projects/venture-den/screen1.webp",
        alt: "Venture Den screen 1",
        width: 3036,
        height: 2082,
      },
      {
        src: "/projects/venture-den/screen2.webp",
        alt: "Venture Den screen 2",
        width: 3066,
        height: 2088,
      },
    ],
  },
  {
    id: "finote",
    title: "Finote",
    category: "Mobile App",
    categoryLabel: "Mobile App",
    tagline: "A mobile app for tracking spending across multiple wallets",
    description: "A clean mobile expense tracker built for cross-platform iOS and Android that keeps every wallet's balance independent, ensuring clarity on personal cash flow.",
    year: "2023",
    stack: ["React Native", "Expo", "Firebase Firestore", "TypeScript"],
    gradient: "linear-gradient(145deg, #4a1d8e 0%, #7E22CE 40%, #a855f7 75%, #d8b4fe 100%)",
    accentColor: "from-purple-600 to-fuchsia-400",
    starColor: "fill-purple-500 dark:fill-purple-400 drop-shadow-[0_0_16px_rgb(168_85_247/0.9)]",
    highlights: [
      "Dynamic wallet rebalancing with automatic overdraft prevention",
      "Real-time multi-device cloud synchronization powered by Firestore",
      "Camera integration to attach receipt photos to any transaction",
      "Live foreign exchange currency converter with daily rate sync",
    ],
    liveUrl: "https://github.com/AayushBharti/finote-app/releases/",
    codeUrl: "https://github.com/aayushbharti/finote-app",
    caseStudyUrl: "/projects/finote",
    images: [
      {
        src: "/projects/finote-app/screen1.png",
        alt: "Finote wallet balance screen",
        width: 765,
        height: 1518,
      },
      {
        src: "/projects/finote-app/screen2.png",
        alt: "Finote transaction history screen",
        width: 765,
        height: 1518,
      },
      {
        src: "/projects/finote-app/screen3.png",
        alt: "Finote wallet switcher screen",
        width: 765,
        height: 1518,
      },
    ],
  },
  {
    id: "star-forge",
    title: "StarForge",
    category: "Starter & Tools",
    categoryLabel: "Starter & Tools",
    tagline: "An AI SaaS landing page template with parallax depth in the hero",
    description: "A high-conversion landing template tailored for AI SaaS products, featuring subtle mouse-tracking parallax layers, interactive pricing tiers, and modern Bento-box layouts.",
    year: "2024",
    stack: ["Next.js", "Motion.dev", "Tailwind CSS", "TypeScript"],
    gradient: "linear-gradient(145deg, #831843 0%, #DB2777 40%, #f472b6 75%, #fbcfe8 100%)",
    accentColor: "from-rose-600 to-pink-400",
    starColor: "fill-pink-500 dark:fill-pink-400 drop-shadow-[0_0_16px_rgb(236_72_153/0.9)]",
    highlights: [
      "Multi-layered 3D parallax hero that responds to mouse and scroll coordinates",
      "Interactive billing toggle with animated rolling-digit pricing indicators",
      "Static and serverless architecture: fork, customize tokens, and deploy",
      "Optimized Core Web Vitals with 100/100 Lighthouse performance metrics",
    ],
    liveUrl: "https://ai-saas-landing-starter.vercel.app",
    codeUrl: "https://github.com/AayushBharti/ai-saas-landing-starter",
    caseStudyUrl: "/projects/star-forge",
    images: [
      {
        src: "/projects/star-forge/screen1.jpeg",
        alt: "StarForge landing hero",
        width: 1378,
        height: 1081,
      },
      {
        src: "/projects/star-forge/screen2.jpeg",
        alt: "StarForge feature grid",
        width: 1378,
        height: 1324,
      },
    ],
  },
  {
    id: "snippix",
    title: "Snippix",
    category: "Starter & Tools",
    categoryLabel: "Starter & Tools",
    tagline: "Transform code snippets into beautiful, shareable graphics",
    description: "A fast, keyboard-first developer utility designed to turn pasted code snippets into clean, styled PNG or SVG images with customizable themes, fonts, and window frames.",
    year: "2024",
    stack: ["React", "Next.js", "Highlight.js", "Zustand", "HTML-to-Image"],
    gradient: "linear-gradient(145deg, #064e3b 0%, #059669 40%, #34d399 75%, #a7f3d0 100%)",
    accentColor: "from-emerald-600 to-teal-400",
    starColor: "fill-emerald-500 dark:fill-emerald-400 drop-shadow-[0_0_16px_rgb(16_185_129/0.9)]",
    highlights: [
      "10+ elegant syntax color themes with instant light/dark toggle",
      "12+ popular monospace coding typefaces (Fira Code, JetBrains Mono, etc.)",
      "One-click export to clipboard or PNG/SVG file download",
      "Completely local browser execution with zero server image processing",
    ],
    liveUrl: "https://snippix.vercel.app/",
    codeUrl: "https://github.com/AayushBharti/Snippix",
    caseStudyUrl: "https://github.com/AayushBharti/Snippix",
    images: [
      {
        src: "/projects/star-forge/screen1.jpeg",
        alt: "Snippix code exporter preview",
        width: 1378,
        height: 1081,
      },
    ],
  },
  {
    id: "flux-lura",
    title: "Flux Lura",
    category: "Web App",
    categoryLabel: "Web App",
    tagline: "Private in-browser media converter powered by WebAssembly",
    description: "A local-first media converter that runs FFmpeg via WebAssembly directly in the browser, allowing users to convert images, audio, and video files with zero cloud uploads.",
    year: "2024",
    stack: ["Next.js", "FFmpeg.wasm", "Tailwind CSS", "TypeScript"],
    gradient: "linear-gradient(145deg, #78350f 0%, #d97706 40%, #fbbf24 75%, #fef3c7 100%)",
    accentColor: "from-amber-600 to-yellow-400",
    starColor: "fill-amber-500 dark:fill-amber-400 drop-shadow-[0_0_16px_rgb(245_158_11/0.9)]",
    highlights: [
      "Local FFmpeg WebAssembly engine executes directly on client CPU/threads",
      "Broad format compatibility: MP4, WebM, MP3, WAV, GIF, PNG, WebP",
      "Absolute user privacy guarantee: files never leave the local browser sandbox",
      "Parallel batch conversion with real-time percentage progress bars",
    ],
    liveUrl: "https://github.com/AayushBharti/Flux-Lura",
    codeUrl: "https://github.com/AayushBharti/Flux-Lura",
    caseStudyUrl: "https://github.com/AayushBharti/Flux-Lura",
    images: [
      {
        src: "/projects/nextdemy/home.jpg",
        alt: "Flux Lura media conversion suite",
        width: 2400,
        height: 1495,
      },
    ],
  },
];

type CategoryFilter = "All" | "Web App" | "SaaS App" | "Mobile App" | "Starter & Tools";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [tiltMap, setTiltMap] = useState<{ [id: string]: { x: number; y: number } }>({});

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCardMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTiltMap((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleCardMouseLeave = (id: string) => {
    setTiltMap((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  return (
    <>
      <Navbar />

      <main className="wueBDJtZ" id="main" tabIndex={-1}>
        {/* Page Hero Header */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="pqpIBwim container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-white/70">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Curated Portfolio & Archive
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Crafted with care,{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                built for scale
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-lg sm:text-xl text-neutral-400 leading-relaxed mb-10">
              A collection of production web applications, SaaS platforms, mobile solutions, and open-source developer utilities built from pixels to pipelines.
            </p>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-white/10">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {(["All", "Web App", "SaaS App", "Mobile App", "Starter & Tools"] as CategoryFilter[]).map(
                  (cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-white text-black font-semibold shadow-[0_0_16px_rgba(255,255,255,0.3)]"
                            : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
                        }`}
                        type="button"
                      >
                        {cat}
                        {cat === "All" && ` (${ALL_PROJECTS.length})`}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Search Input */}
              <div className="relative min-w-[260px] md:w-72">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects or stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 bg-neutral-900/80 border border-white/10 rounded-full text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="pb-24">
          <div className="pqpIBwim container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <p className="text-neutral-400 text-lg mb-2">No projects found matching your criteria</p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="text-sm text-pink-400 underline hover:text-pink-300"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {filteredProjects.map((p) => {
                  const tilt = tiltMap[p.id] || { x: 0, y: 0 };
                  const isHovered = hoveredCard === p.id;

                  return (
                    <div
                      key={p.id}
                      className="group/card flex flex-col rounded-3xl bg-neutral-950/80 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
                      onMouseEnter={() => setHoveredCard(p.id)}
                      onMouseLeave={() => {
                        setHoveredCard(null);
                        handleCardMouseLeave(p.id);
                      }}
                      onMouseMove={(e) => handleCardMouseMove(p.id, e)}
                      style={{
                        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                        transition: "transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease",
                      }}
                    >
                      {/* Top Visual Showcase Area */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden p-3 sm:p-4">
                        <div
                          className="relative size-full rounded-2xl overflow-hidden flex items-center justify-center"
                          style={{ background: p.gradient }}
                        >
                          {/* Inner soft lighting glares */}
                          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                          {/* Image preview */}
                          <div className="relative w-[90%] h-[85%] rounded-xl overflow-hidden shadow-2xl border border-white/15 transition-transform duration-500 ease-out group-hover/card:scale-[1.03]">
                            <Image
                              src={p.images[0].src}
                              alt={p.images[0].alt}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>

                          {/* Category Badge & Year */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-md text-white border border-white/10">
                              {p.categoryLabel}
                            </span>
                          </div>

                          <div className="absolute top-4 right-4">
                            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-black/40 backdrop-blur-md text-white/80 border border-white/10">
                              {p.year}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 flex flex-col p-6 sm:p-8">
                        {/* Title & Arrow */}
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <Link href={p.caseStudyUrl} className="group/title inline-flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-white group-hover/title:text-pink-400 transition-colors">
                              {p.title}
                            </h3>
                          </Link>
                          <Link
                            href={p.caseStudyUrl}
                            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label={`View ${p.title} case study`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                            >
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </Link>
                        </div>

                        {/* Tagline */}
                        <p className="text-sm font-medium text-pink-400/90 mb-3">{p.tagline}</p>

                        {/* Description */}
                        <p className="text-sm text-neutral-400 leading-relaxed mb-5 line-clamp-3">
                          {p.description}
                        </p>

                        {/* Key Features Highlights */}
                        <ul className="space-y-2 mb-6">
                          {p.highlights.slice(0, 3).map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                              <svg
                                height="18"
                                viewBox="0 0 24 24"
                                width="18"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`mt-0.5 size-4 shrink-0 ${p.starColor}`}
                              >
                                <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
                              </svg>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-6 mt-auto">
                          {p.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm">
                          <Link
                            href={p.caseStudyUrl}
                            className="inline-flex items-center gap-1.5 font-medium text-white hover:text-pink-400 transition-colors"
                          >
                            <span>Read case study</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>

                          <div className="flex items-center gap-3">
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                            >
                              Live
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                            <a
                              href={p.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                            >
                              Code
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA Section */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
