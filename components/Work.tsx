"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectHighlight {
  text: string;
}

interface ProjectData {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  gradient: string;
  accentColor: string;
  activeTickClass: string;
  starClass: string;
  highlights: string[];
  liveUrl: string;
  codeUrl: string;
  caseStudyUrl: string;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
    sizes: string;
  }[];
}

const PROJECTS: ProjectData[] = [
  {
    id: "keythm",
    title: "Keythm",
    category: "Web App",
    tagline: "Keychron meets typing test: every key has its own sound",
    description: "A typing test where every key plays its own mechanical switch sound, so practice feels like typing on a real keyboard.",
    stack: ["Next.js", "Web Audio API", "Serwist", "Motion.dev"],
    gradient: "linear-gradient(145deg, #831843 0%, #DB2777 40%, #f472b6 75%, #fbcfe8 100%)",
    accentColor: "pink",
    activeTickClass: "bg-pink-500 dark:bg-pink-400 drop-shadow-[0_0_16px_rgb(236_72_153/0.9)]",
    starClass: "fill-pink-500 dark:fill-pink-400 drop-shadow-[0_0_16px_rgb(236_72_153/0.9)]",
    highlights: [
      "Four modes with live WPM and accuracy",
      "Flags bots, auto-typers and AFK runs",
      "Per-second WPM and consistency breakdown",
      "Works offline as a PWA",
    ],
    liveUrl: "https://keythm.tamiulalam.com",
    codeUrl: "https://github.com/tamim127/keythm",
    caseStudyUrl: "/projects/keythm",
    images: [
      {
        src: "/projects/keythm/screen1.png",
        alt: "Keythm",
        width: 3195,
        height: 2091,
        className: "dQb6bSIT",
        sizes: "(max-width: 768px) 85vw, 580px",
      },
    ],
  },
  {
    id: "nextdemy",
    title: "Nextdemy",
    category: "SaaS App",
    tagline: "An online academy where students learn, and instructors teach and earn",
    description: "An online course platform where students buy and stream courses, and instructors create their own and see what they earn.",
    stack: ["Next.js", "Express.js", "MongoDB", "Razorpay"],
    gradient: "linear-gradient(145deg, #1e2a78 0%, #2932CB 40%, #5a6aef 75%, #a0b0ff 100%)",
    accentColor: "blue",
    activeTickClass: "bg-blue-500 dark:bg-blue-400 drop-shadow-[0_0_16px_rgb(59_130_246/0.9)]",
    starClass: "fill-blue-500 dark:fill-blue-400 drop-shadow-[0_0_16px_rgb(59_130_246/0.9)]",
    highlights: [
      "Razorpay payments verified by server signature",
      "Per-lesson progress for every course",
      "Instructors upload videos and track earnings",
      "Rate-limited, sanitized Express API",
    ],
    liveUrl: "https://academy.tamiulalam.com",
    codeUrl: "https://github.com/tamim127/Zenith-Academy",
    caseStudyUrl: "/projects/nextdemy",
    images: [
      {
        src: "/projects/nextdemy/home.jpg",
        alt: "Nextdemy",
        width: 2400,
        height: 1495,
        className: "fIr6pYw9",
        sizes: "(max-width: 768px) 85vw, 580px",
      },
    ],
  },
  {
    id: "venture-den",
    title: "Venture Den",
    category: "SaaS App",
    tagline: "Where founders pitch ideas, get an AI score, and get upvoted by the community",
    description: "A platform where founders pitch startup ideas, Gemini scores each pitch on three criteria, and the community upvotes the best ones.",
    stack: ["Next.js", "Sanity CMS", "Gemini"],
    gradient: "linear-gradient(145deg, #1f2937 0%, #4b5563 40%, #9ca3af 75%, #d1d5db 100%)",
    accentColor: "gray",
    activeTickClass: "bg-gray-400 dark:bg-gray-300 drop-shadow-[0_0_14px_rgb(156_163_175/0.7)]",
    starClass: "fill-gray-400 dark:fill-gray-300 drop-shadow-[0_0_14px_rgb(156_163_175/0.7)]",
    highlights: [
      "Written AI feedback and suggestions per pitch",
      "Structured AI output validated before saving",
      "Sanity visual editing with live preview",
      "Fuzzy search across pitches and posts",
    ],
    liveUrl: "https://venture-den.tamiulalam.com",
    codeUrl: "https://github.com/tamim127/VentureDen",
    caseStudyUrl: "/projects/venture-den",
    images: [
      {
        src: "/projects/venture-den/screen1.webp",
        alt: "Venture Den screen 1",
        width: 3036,
        height: 2082,
        className: "ePk8FJ5T",
        sizes: "(max-width: 768px) 85vw, 500px",
      },
      {
        src: "/projects/venture-den/screen2.webp",
        alt: "Venture Den screen 2",
        width: 3066,
        height: 2088,
        className: "UujZHrvx",
        sizes: "(max-width: 768px) 65vw, 430px",
      },
    ],
  },
  {
    id: "finote",
    title: "Finote",
    category: "Mobile App",
    tagline: "A mobile app for tracking spending across multiple wallets",
    description: "A mobile expense tracker that keeps every wallet's balance separate, so you always know where your money went.",
    stack: ["React Native", "Expo", "Firebase"],
    gradient: "linear-gradient(145deg, #4a1d8e 0%, #7E22CE 40%, #a855f7 75%, #d8b4fe 100%)",
    accentColor: "purple",
    activeTickClass: "bg-purple-500 dark:bg-purple-400 drop-shadow-[0_0_16px_rgb(168_85_247/0.9)]",
    starClass: "fill-purple-500 dark:fill-purple-400 drop-shadow-[0_0_16px_rgb(168_85_247/0.9)]",
    highlights: [
      "Edits rebalance wallets, overdrafts blocked",
      "Live sync across devices via Firestore",
      "Receipt photo on any transaction",
      "Live currency exchange rates",
    ],
    liveUrl: "https://github.com/tamim127/finote-app/releases/",
    codeUrl: "https://github.com/tamim127/finote-app",
    caseStudyUrl: "/projects/finote",
    images: [
      {
        src: "/projects/finote-app/screen1.png",
        alt: "Finote screen 1",
        width: 765,
        height: 1518,
        className: "KYvVq4Kh",
        sizes: "(max-width: 768px) 40vw, 270px",
      },
      {
        src: "/projects/finote-app/screen2.png",
        alt: "Finote screen 2",
        width: 765,
        height: 1518,
        className: "hiwczE2B",
        sizes: "(max-width: 768px) 40vw, 270px",
      },
      {
        src: "/projects/finote-app/screen3.png",
        alt: "Finote screen 3",
        width: 765,
        height: 1518,
        className: "rBQNrSEc",
        sizes: "(max-width: 768px) 40vw, 270px",
      },
    ],
  },
  {
    id: "star-forge",
    title: "StarForge",
    category: "Starter",
    tagline: "An AI SaaS landing page template with parallax depth in the hero",
    description: "A one-page landing template for AI SaaS products, with a parallax hero that gives the page real depth. Made with Next.js and Tailwind CSS.",
    stack: ["Next.js", "Motion.dev", "Tailwind CSS"],
    gradient: "linear-gradient(145deg, #831843 0%, #DB2777 40%, #f472b6 75%, #fbcfe8 100%)",
    accentColor: "pink",
    activeTickClass: "bg-pink-500 dark:bg-pink-400 drop-shadow-[0_0_16px_rgb(236_72_153/0.9)]",
    starClass: "fill-pink-500 dark:fill-pink-400 drop-shadow-[0_0_16px_rgb(236_72_153/0.9)]",
    highlights: [
      "Parallax that follows scroll and mouse",
      "Pricing toggle with rolling-digit prices",
      "No backend: fork, rebrand, deploy",
    ],
    liveUrl: "https://ai-saas-landing-starter.vercel.app",
    codeUrl: "https://github.com/tamim127/ai-saas-landing-starter",
    caseStudyUrl: "/projects/star-forge",
    images: [
      {
        src: "/projects/star-forge/screen1.jpeg",
        alt: "StarForge screen 1",
        width: 1378,
        height: 1081,
        className: "XwKGInSG",
        sizes: "(max-width: 768px) 68vw, 450px",
      },
      {
        src: "/projects/star-forge/screen2.jpeg",
        alt: "StarForge screen 2",
        width: 1378,
        height: 1324,
        className: "AUKX8lQI",
        sizes: "(max-width: 768px) 55vw, 380px",
      },
    ],
  },
];

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilts, setTilts] = useState<{ [key: string]: { rotateX: number; rotateY: number; mouseX: number; mouseY: number } }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const targetPoint = scrollY + viewportHeight * 0.45;

      let closestIdx = 0;
      let minDistance = Infinity;

      PROJECTS.forEach((p, idx) => {
        const el = document.getElementById(`project-${p.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + window.scrollY + rect.height * 0.5;
          const distance = Math.abs(targetPoint - elementCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProject = (idx: number) => {
    const p = PROJECTS[idx];
    if (!p) return;
    const el = document.getElementById(`project-${p.id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setActiveIndex(idx);
  };

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilts((prev) => ({
      ...prev,
      [id]: { rotateX, rotateY, mouseX: (x / rect.width) * 100, mouseY: (y / rect.height) * 100 },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTilts((prev) => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 },
    }));
  };

  return (
    <>
      <section className="Z341Qab9 vzqQr26y" id="work" vt-update="none">
        <div className="pqpIBwim container">
          <div className="AUnucuLw g4ZzFJT4">
            {/* Header Title */}
            <div className="YfewLcDx cYrXGNhF">
              <div
                className="uotRHvjg zndtoWoO mb-0! max-w-2xl max-sm:px-0"
                style={
                  {
                    textShadow:
                      "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)",
                  } as React.CSSProperties
                }
              >
                <p className="RWtM8UhL">CASE STUDIES</p>
                <h2 className="Vfg8r5DS">
                  Curated{" "}
                  <span
                    className="qFT8yXw5 animate-gradient-x text-colorfull"
                    style={
                      {
                        WebkitMaskImage:
                          "linear-gradient(to right, black 70%, transparent 100%)",
                        WebkitMaskSize: "0% 100%",
                        WebkitMaskPosition: "left",
                        WebkitMaskRepeat: "no-repeat",
                      } as React.CSSProperties
                    }
                  >
                    work
                  </span>
                </h2>
              </div>
            </div>

            {/* Work Grid */}
            <div className="LPxiRzqd" style={{ "--n": String(PROJECTS.length) } as React.CSSProperties}>
              <span aria-hidden="true" className="OtybCf2U size-[5px] q7jbNXRn"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] BUiM8pL5"></span>

              {/* Scrubbable Ruler Navigation */}
              <nav aria-label="Projects" className="JbML7Egu">
                <ol
                  className="xQRxYffN"
                  style={{ "--ruler-shift": `${-activeIndex * 14}px` } as React.CSSProperties}
                >
                  {PROJECTS.map((p, idx) => {
                    const isActive = activeIndex === idx;
                    const dist = Math.abs(idx - activeIndex);
                    const scale = isActive ? 1 : dist === 1 ? 0.58 : dist === 2 ? 0.34 : 0.2;
                    const alpha = isActive ? 1 : dist === 1 ? 0.8 : dist === 2 ? 0.5 : 0.3;

                    return (
                      <li key={p.id}>
                        <button
                          aria-current={isActive ? "true" : undefined}
                          aria-label={`Go to ${p.title}`}
                          className="IE82hgl2 group/tick"
                          type="button"
                          onClick={() => scrollToProject(idx)}
                        >
                          <span
                            className={`h-[2px] w-3 origin-right scale-x-(--tick-scale) rounded-full opacity-(--tick-alpha) transition-[scale,opacity,background-color] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:w-6 lg:origin-left ${
                              isActive
                                ? p.activeTickClass
                                : "bg-neutral-400 group-hover/tick:scale-x-[max(var(--tick-scale),0.7)] group-hover/tick:opacity-100 dark:bg-neutral-500"
                            }`}
                            style={
                              {
                                "--tick-scale": String(scale),
                                "--tick-alpha": String(alpha),
                              } as React.CSSProperties
                            }
                          ></span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              {/* Project Headers, Cards, and Descriptions */}
              {PROJECTS.map((p, idx) => {
                const isActive = activeIndex === idx;
                const tilt = tilts[p.id] || { rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 };

                return (
                  <React.Fragment key={p.id}>
                    {/* Header (sticky on desktop, ordered above card on mobile) */}
                    <header
                      className="x9J4YDGA IUXmHlVg lg:*:pointer-events-auto lg:col-start-2 lg:row-[1/span_var(--n)] lg:self-start lg:sticky lg:invisible lg:data-active:visible"
                      data-active={isActive ? "" : undefined}
                      data-panel={p.id}
                      style={
                        {
                          "--i": String(idx),
                          "--row": String(idx + 1),
                        } as React.CSSProperties
                      }
                    >
                      <div className="bWpSITjz">
                        <Link
                          className="JPJYX61i"
                          data-cuelume-navigate="select"
                          data-part="title"
                          href={p.caseStudyUrl}
                        >
                          <h3 className="vFyMobR0">
                            <span
                              className="e3s8YVYJ"
                              vt-name={`project-title-${p.id}`}
                              vt-update="none"
                            >
                              {p.title}
                            </span>
                          </h3>
                        </Link>
                        <p className="cHOE4NK2" data-part="category">
                          {p.category}
                        </p>
                      </div>
                      <ul
                        aria-label="Key technologies"
                        className="XG6RgEz6 hqOj6m0v"
                        data-part="stack"
                      >
                        {p.stack.map((tech) => (
                          <li key={tech} className="CIvRfYgw">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </header>

                    {/* Card Container */}
                    <div
                      className="v66kjNuD"
                      data-card={p.id}
                      id={`project-${p.id}`}
                      style={
                        {
                          "--i": String(idx),
                          "--row": String(idx + 1),
                        } as React.CSSProperties
                      }
                    >
                      <div className="puwtDZKG">
                        <Link
                          aria-label={`View Details of ${p.title}`}
                          className="wIIQbAMC group group/card VYpRSA2m pMxaXO0E MXkYIQuh"
                          data-cuelume-navigate="select"
                          data-cursor="project"
                          draggable="false"
                          href={p.caseStudyUrl}
                          onMouseMove={(e) => handleMouseMove(p.id, e)}
                          onMouseLeave={() => handleMouseLeave(p.id)}
                          style={{
                            transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                            transition: "transform 0.15s ease-out",
                          }}
                        >
                          <div className="LtAgQjhC size-full">
                            {/* Card Color Gradients */}
                            <div
                              aria-hidden="true"
                              className="ra3Ijz6n"
                              style={{ background: p.gradient } as React.CSSProperties}
                            ></div>
                            <div
                              aria-hidden="true"
                              className="aByHzhjR"
                              style={{ background: p.gradient } as React.CSSProperties}
                            ></div>
                            <div aria-hidden="true" className="ajoev9jf">
                              <div className="k63vog5n"></div>
                              <div className="gDiilyth"></div>
                            </div>
                            <div
                              aria-hidden="true"
                              className="qk5MHLuA"
                              style={{
                                opacity: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 0.35 : 0,
                                background: `radial-gradient(circle at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                                transition: "opacity 0.2s ease",
                              }}
                            ></div>
                            <div aria-hidden="true" className="hSkaGi4P"></div>
                            <div aria-hidden="true" className="nJgEeXyH"></div>

                            {/* Tagline & Arrow */}
                            <div className="z-10 flex w-full flex-row items-center justify-between gap-8 px-4 py-2 text-white/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.25)] md:px-6 md:py-4 lg:px-7 lg:py-6 2xl:px-10 2xl:py-8">
                              <p className="text-pretty text-base sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
                                {p.tagline}
                              </p>
                              <svg
                                fill="none"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="oZ5jVnHV size-5 md:size-6 transition-transform duration-300 group-hover/card:translate-x-1"
                              >
                                <path
                                  d="M18.5 12L4.99997 12"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </div>

                            {/* Project Images */}
                            <div className="GzzPxBAj">
                              {p.images.length === 1 ? (
                                <img
                                  alt={p.images[0].alt}
                                  draggable="false"
                                  loading="lazy"
                                  width={p.images[0].width}
                                  height={p.images[0].height}
                                  decoding="async"
                                  className={p.images[0].className}
                                  sizes={p.images[0].sizes}
                                  src={p.images[0].src}
                                />
                              ) : (
                                <div
                                  className={
                                    p.id === "venture-den"
                                      ? "aBOMteQZ group"
                                      : p.id === "finote"
                                      ? "WUlA89bh group"
                                      : "RKYB2xna"
                                  }
                                >
                                  {p.images.map((img) => (
                                    <img
                                      key={img.src}
                                      alt={img.alt}
                                      draggable="false"
                                      loading="lazy"
                                      width={img.width}
                                      height={img.height}
                                      decoding="async"
                                      className={img.className}
                                      sizes={img.sizes}
                                      src={img.src}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Description Panel (sticky on desktop, ordered below card on mobile) */}
                    <div
                      className="EY0qOg3E PJdyMwcy lg:col-start-2 lg:row-[1/span_var(--n)] lg:self-start lg:sticky lg:invisible lg:data-active:visible"
                      data-active={isActive ? "" : undefined}
                      data-panel={p.id}
                      style={
                        {
                          "--i": String(idx),
                          "--row": String(idx + 1),
                        } as React.CSSProperties
                      }
                    >
                      <p className="iqTJZ2HB" data-part="description">
                        {p.description}
                      </p>

                      <ul className="Gd8pYKa4">
                        {p.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="Ymf3PXZv" data-part={`highlight-${hIdx}`}>
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`mt-px size-5 shrink-0 ${p.starClass}`}
                            >
                              <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
                            </svg>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="oWZvPI8G" data-part="links">
                        <Link
                          className="jvBIhWmv group group/link"
                          data-cuelume-navigate="select"
                          data-hover-cue=""
                          href={p.caseStudyUrl}
                        >
                          <span aria-hidden="true" className="cUrK1wFv"></span>
                          <span className="yBdKb4G8">Read case study</span>
                          <span className="EbCQEnox">
                            <span aria-hidden="true" className="jqVlgQOM size-4">
                              <svg
                                fill="none"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="tzvMTSPc size-4"
                              >
                                <path
                                  d="M18.5 12L4.99997 12"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                              </svg>
                              <svg
                                fill="none"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="agqyeFYJ size-4"
                              >
                                <path
                                  d="M18.5 12L4.99997 12"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </span>
                          </span>
                        </Link>

                        <a
                          className="E4fbsvwd"
                          href={p.liveUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Live
                          <svg
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="size-3.5"
                          >
                            <path
                              d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </a>

                        <a
                          className="E4fbsvwd"
                          href={p.codeUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Code
                          <svg
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="size-3.5"
                          >
                            <path
                              d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              <span aria-hidden="true" className="OtybCf2U size-[5px] m7aWZARZ" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] SdCAH6sp" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] vgoN9Yn8" data-node="bottom"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] OpiMbwgW" data-node="bottom"></span>
            </div>
          </div>
        </div>
      </section>

      {/* See all projects banner */}
      <div className="oDlRct6k" vt-update="none">
        <div className="pqpIBwim container">
          <div className="puBGkXbv TIL9fneX HpfpfkkS">
            <Link
              className="jvBIhWmv group group/link"
              data-cuelume-navigate="select"
              data-hover-cue=""
              href="/projects"
            >
              <span aria-hidden="true" className="cUrK1wFv"></span>
              <span className="yBdKb4G8">See all projects</span>
              <span className="EbCQEnox">
                <span aria-hidden="true" className="jqVlgQOM size-4">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="tzvMTSPc size-4"
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="agqyeFYJ size-4"
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </span>
            </Link>
            <span aria-hidden="true" className="OtybCf2U size-[5px] m7aWZARZ" data-node="top"></span>
            <span aria-hidden="true" className="OtybCf2U size-[5px] SdCAH6sp" data-node="top"></span>
            <span aria-hidden="true" className="OtybCf2U size-[5px] vgoN9Yn8" data-node="bottom"></span>
            <span aria-hidden="true" className="OtybCf2U size-[5px] OpiMbwgW" data-node="bottom"></span>
          </div>
        </div>
      </div>
    </>
  );
}
