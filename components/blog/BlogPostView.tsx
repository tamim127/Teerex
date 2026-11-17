"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost, BLOG_POSTS } from "@/lib/blogData";

interface BlogPostViewProps {
  post: BlogPost;
}

export default function BlogPostView({ post }: BlogPostViewProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter other posts for "More posts" section (show up to 3)
  const morePosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (!post.alias || p.slug !== post.alias)
  ).slice(0, 3);

  // Track scroll for reading progress and TOC visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
      // Show floating TOC when scrolled past 300px
      if (window.scrollY > 300) {
        setShowToc(true);
      } else {
        setShowToc(false);
        setTocOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close TOC on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTocOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const scrollToAnchor = (href: string) => {
    setTocOpen(false);
    const id = href.replace(/^#/, "");
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // SVG circle calculations
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <>
      <Navbar />

      <main className="wueBDJtZ" id="main" tabIndex={-1}>
        {/* JSON-LD Schema */}
        <script
          id="blog-posting-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `https://tamiulalam.com/blog/${post.slug}#post`,
              headline: post.title,
              description: post.description,
              image: `https://tamiulalam.com${post.cover}`,
              datePublished: post.dateTime,
              dateModified: post.dateTime,
              author: {
                "@type": "Person",
                "@id": "https://tamiulalam.com#person",
                name: "Tamiul Alam",
                url: "https://tamiulalam.com",
              },
              publisher: {
                "@type": "Person",
                "@id": "https://tamiulalam.com#person",
                name: "Tamiul Alam",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://tamiulalam.com/blog/${post.slug}`,
              },
            }),
          }}
        />
        <script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://tamiulalam.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://tamiulalam.com/blog",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                },
              ],
            }),
          }}
        />

        <article className="znRRu5xd" vt-update="none">
          <header className="yBdKb4G8">
            <div
              aria-hidden="true"
              className="GJAxvkvc"
              style={{ backgroundImage: `url("${post.blurDataUrl}")` }}
            ></div>
            <div aria-hidden="true" className="dhsYwEWb">
              <div className="pqpIBwim container">
                <div className="e8TE7qzm"></div>
              </div>
            </div>

            <div className="container">
              <div className="roEb7BWs">
                <nav aria-label="Breadcrumb">
                  <ol className="BDiIidbq">
                    <li className="vDOYUvUh">
                      <Link className="dBRuA5Qx" href="/" data-cuelume-navigate="select">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                          className="size-3.5"
                        >
                          <path
                            d="M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z"
                            opacity="0.2"
                          ></path>
                          <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path>
                        </svg>
                        <span className="vTovxkJs">Home</span>
                      </Link>
                    </li>
                    <li className="vDOYUvUh">
                      <span aria-hidden="true">/</span>
                      <Link className="dBRuA5Qx" href="/blog" data-cuelume-navigate="select">
                        Blog
                      </Link>
                    </li>
                  </ol>
                </nav>

                <h1 className="tadeAG3N">{post.title}</h1>

                <div className="awkLcsUZ">
                  <div className="yBdKb4G8">
                    <div
                      aria-hidden="true"
                      className="Lmn6ER7H"
                      style={{ backgroundImage: `url("${post.blurDataUrl}")` }}
                    ></div>
                    <div
                      className="w1K5mg3I"
                      vt-name={`post-cover-${post.slug}`}
                      vt-update="none"
                    >
                      <img
                        alt={post.title}
                        fetchPriority="high"
                        decoding="async"
                        className="mkImFHcz"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                          objectFit: "cover",
                        }}
                        src={post.cover}
                      />
                      <div aria-hidden="true" className="Ni4pFp4n"></div>
                      <div aria-hidden="true" className="vxfy0tVL"></div>
                    </div>
                  </div>
                </div>

                <div className="V79gF2XX">
                  <div className="luR52R8b">
                    <span className="Q6Hg7Nsz">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="TbK6QKi3 size-3.5"
                      >
                        <path
                          d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                          opacity="0.2"
                        ></path>
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                      </svg>
                      {post.readingTime}
                    </span>
                    <button
                      aria-label="Copy or open this page"
                      className="M2B9RrVW group"
                      type="button"
                      onClick={handleCopyLink}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="pcTy5UWa size-3.5"
                      >
                        <path d="M117.18,188.74a12,12,0,0,1,0,17l-5.12,5.12A58.26,58.26,0,0,1,70.6,228h0A58.62,58.62,0,0,1,29.14,127.92L63.89,93.17a58.64,58.64,0,0,1,98.56,28.11,12,12,0,1,1-23.37,5.44,34.65,34.65,0,0,0-58.22-16.58L46.11,144.89A34.62,34.62,0,0,0,70.57,204h0a34.41,34.41,0,0,0,24.49-10.14l5.11-5.12A12,12,0,0,1,117.18,188.74ZM226.83,45.17a58.65,58.65,0,0,0-82.93,0l-5.11,5.11a12,12,0,0,0,17,17l5.12-5.12a34.63,34.63,0,1,1,49,49L175.1,145.86A34.39,34.39,0,0,1,150.61,156h0a34.63,34.63,0,0,1-33.69-26.72,12,12,0,0,0-23.38,5.44A58.64,58.64,0,0,0,150.56,180h.05a58.28,58.28,0,0,0,41.47-17.17l34.75-34.75a58.62,58.62,0,0,0,0-82.91Z"></path>
                      </svg>
                      <span>{copied ? "Copied!" : "Copy"}</span>
                      <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="Cwvt3uC4 size-3.5"
                      >
                        <path
                          d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <time dateTime={post.dateTime}>{post.date}</time>
                </div>
              </div>
            </div>
          </header>

          <div className="Z341Qab9 vzqQr26y cT1d8N3F">
            <div className="pqpIBwim container">
              <div className="AUnucuLw g4ZzFJT4 relative">
                {/* Floating Table of Contents */}
                {post.toc && post.toc.length > 0 && (
                  <div
                    className="pjqRPfgN fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300"
                    style={{
                      pointerEvents: showToc ? "auto" : "none",
                      opacity: showToc ? 1 : 0,
                      transform: showToc
                        ? "translateX(-50%) translateY(0px) scale(1)"
                        : "translateX(-50%) translateY(50px) scale(0.9)",
                    }}
                  >
                    <div
                      className="qOUps79A glass-pill relative flex items-center"
                      style={{ width: "280px", height: "52px", borderRadius: "26px" }}
                    >
                      <button
                        aria-expanded={tocOpen}
                        className="YHS3MxLe flex items-center justify-between w-full h-full px-5 cursor-pointer text-foreground/85 hover:text-foreground"
                        type="button"
                        onClick={() => setTocOpen(!tocOpen)}
                      >
                        <span className="flex items-center gap-2">
                          <span className="OKwKs6gy size-1.5 relative inline-flex">
                            <span className="Rlh1r4am animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="hqFhJIQg size-1.5 relative inline-flex rounded-full bg-emerald-500"></span>
                          </span>
                          <span className="yFwk9YiD text-xs font-medium tracking-wide">
                            <span className="nxXviLYn">Contents</span>
                          </span>
                        </span>
                        <svg className="IdqIuQ3g" height="22" width="22">
                          <circle
                            className="UD19bd3f"
                            cx="11"
                            cy="11"
                            fill="none"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeOpacity="0.2"
                          ></circle>
                          <circle
                            className="HpJJ8MEU text-foreground"
                            cx="11"
                            cy="11"
                            fill="none"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.1s ease" }}
                          ></circle>
                        </svg>
                      </button>

                      {/* Dropdown TOC navigation */}
                      {tocOpen && (
                        <div
                          className="OkTYK5T6 H8DcjSxn absolute bottom-15 left-0 w-72 rounded-2xl border border-white/10 bg-[#16161a]/95 backdrop-blur-xl p-3 shadow-2xl shadow-black/80 transition-all"
                          style={{ maxHeight: "360px" }}
                        >
                          <div className="HGOiVXdN flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/10">
                            <span className="text-[11px] font-medium text-foreground/55">
                              Contents
                            </span>
                            <button
                              aria-label="Close table of contents"
                              className="JyNPoX0i text-xs text-foreground/50 hover:text-foreground"
                              type="button"
                              onClick={() => setTocOpen(false)}
                            >
                              <kbd className="z26iA6rc px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                                esc
                              </kbd>
                            </button>
                          </div>
                          <div
                            className="r257LNl8 overflow-y-auto max-h-[280px] scrollbar-none"
                            data-lenis-prevent="true"
                          >
                            <nav aria-label="Table of contents" className="tTwDewF6 flex flex-col gap-1">
                              {post.toc.map((item, idx) => (
                                <button
                                  key={idx}
                                  className="oBDg2WFU group fTxx4a3e text-left text-xs py-1.5 px-3 rounded-lg text-foreground/75 hover:bg-white/5 hover:text-foreground transition-colors cursor-pointer truncate"
                                  onClick={() => scrollToAnchor(item.href)}
                                >
                                  {item.text}
                                </button>
                              ))}
                            </nav>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Article Prose Content (HTML string) */}
                <div
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                  className="w-full"
                />

                {/* Corner Crosshairs */}
                <span
                  aria-hidden="true"
                  className="OtybCf2U size-[5px] m7aWZARZ"
                  data-node="top"
                ></span>
                <span
                  aria-hidden="true"
                  className="OtybCf2U size-[5px] SdCAH6sp"
                  data-node="top"
                ></span>
                <span
                  aria-hidden="true"
                  className="OtybCf2U size-[5px] vgoN9Yn8"
                  data-node="bottom"
                ></span>
                <span
                  aria-hidden="true"
                  className="OtybCf2U size-[5px] OpiMbwgW"
                  data-node="bottom"
                ></span>
              </div>
            </div>
          </div>
        </article>

        {/* Divider with "More posts" title */}
        {morePosts.length > 0 && (
          <>
            <div className="oDlRct6k" vt-update="none">
              <div className="pqpIBwim container">
                <div className="puBGkXbv TIL9fneX HpfpfkkS DVKIdLPY">
                  <h2 className="rvJuCjAe">More posts</h2>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] m7aWZARZ"
                    data-node="top"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] SdCAH6sp"
                    data-node="top"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] vgoN9Yn8"
                    data-node="bottom"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] OpiMbwgW"
                    data-node="bottom"
                  ></span>
                </div>
              </div>
            </div>

            <section className="Z341Qab9 vzqQr26y" vt-update="none">
              <div className="pqpIBwim container">
                <div className="AUnucuLw g4ZzFJT4">
                  <div className="lMzuZiwz wZrzoh6z" data-tray="">
                    {morePosts.map((otherPost) => (
                      <Link
                        key={otherPost.slug}
                        className="Z8WFxr01 group/link"
                        data-cuelume-navigate="select"
                        data-hover-cue=""
                        href={`/blog/${otherPost.slug}`}
                      >
                        <div className="yBdKb4G8">
                          <div
                            aria-hidden="true"
                            className="TzN5BeG2"
                            style={{ backgroundImage: `url("${otherPost.blurDataUrl}")` }}
                          ></div>
                          <div
                            className="fwKbmiZR"
                            vt-name={`post-cover-${otherPost.slug}`}
                            vt-update="none"
                          >
                            <img
                              alt={otherPost.title}
                              loading="lazy"
                              decoding="async"
                              className="mkImFHcz size-full"
                              style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                inset: 0,
                                color: "transparent",
                                objectFit: "cover",
                              }}
                              src={otherPost.cover}
                            />
                            <div aria-hidden="true" className="olHZ87OL"></div>
                            <div aria-hidden="true" className="YnM6c4Ko"></div>
                          </div>
                        </div>
                        <div className="T6PHrLyx">
                          <h3 className="Q8ayl6vB">{otherPost.title}</h3>
                          <div className="kfGuq25q">
                            <time dateTime={otherPost.dateTime}>{otherPost.date}</time>
                            <span>{otherPost.readingTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] m7aWZARZ"
                    data-node="top"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] SdCAH6sp"
                    data-node="top"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] vgoN9Yn8"
                    data-node="bottom"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="OtybCf2U size-[5px] OpiMbwgW"
                    data-node="bottom"
                  ></span>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Divider before bottom CTA */}
        <div aria-hidden="true" className="oDlRct6k">
          <div className="pqpIBwim container">
            <div className="puBGkXbv i8FqydUI HpfpfkkS">
              <span aria-hidden="true" className="OtybCf2U size-[5px] m7aWZARZ" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] SdCAH6sp" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] vgoN9Yn8" data-node="bottom"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] OpiMbwgW" data-node="bottom"></span>
            </div>
          </div>
        </div>

        {/* Bottom CTA section */}
        <section className="Z341Qab9 vzqQr26y lDjEEkMl" id="contact">
          <div className="pqpIBwim container">
            <div className="AUnucuLw g4ZzFJT4">
              <div>
                <div className="uD2Od8J1 group/cta-band">
                  <div aria-hidden="true" className="gIt18v46"></div>
                  <div aria-hidden="true" className="D7orcc6I size-full"></div>
                  <div aria-hidden="true" className="rT1C46J3"></div>
                  <div className="LQkq0jGq">
                    <div className="QXfWIAjF" draggable="false" tabIndex={0}>
                      <div className="HaFsWjPD size-26">
                        <div>
                          <div
                            className="fj2IIwsd animate-spin-slow in-data-low-power:animate-none motion-reduce:animate-none max-md:animate-none e1zbvxG2"
                            style={{ animationDuration: "10s" }}
                          >
                            <div className="CcF15Ue0 size-23.75 bg-transparent text-foreground/75">
                              <div className="O3TwA0KC size-20">
                                <svg
                                  className="RD1cQ1kx size-full"
                                  overflow="visible"
                                  viewBox="0 0 100 100"
                                >
                                  <path
                                    d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
                                    fill="transparent"
                                    id="_S_1_"
                                  ></path>
                                  <text>
                                    <textPath
                                      dominantBaseline="hanging"
                                      href="#_S_1_"
                                      startOffset="0"
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        wordSpacing: "5px",
                                        letterSpacing: "2.1px",
                                        fill: "currentColor",
                                      }}
                                    >
                                      OPEN TO WORK · OPEN TO WORK ·
                                    </textPath>
                                  </text>
                                </svg>
                              </div>
                            </div>
                            <span className="vTovxkJs">OPEN TO WORK · OPEN TO WORK ·</span>
                          </div>
                        </div>
                        <span aria-hidden="true" className="pfVoLpy8 size-[58px]"></span>
                        <span aria-hidden="true" className="Tkala6ph size-12">
                          <svg
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="Uoow4MLe size-5"
                          >
                            <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="yBdKb4G8">
                      <div aria-hidden="true" className="gPCycmTR"></div>
                    </div>
                    <h2 className="gozvZb6P">
                      <span className="Dz3lT98p">
                        GOT AN IDEA WORTH <span className="LOrmyQeu">BUILDING?</span>
                      </span>{" "}
                      <span className="dA7nGvhN">
                        LET&apos;S TALK IT <span className="LOrmyQeu">THROUGH</span>
                      </span>
                    </h2>
                    <Link
                      className="ceeDuYjm group B2cg5qG8"
                      data-cuelume-navigate="select"
                      href="/contact"
                    >
                      <span aria-hidden="true" className="WD94VpnX"></span>
                      <span aria-hidden="true" className="wmkRyoGp">
                        <span className="CpVlp4Ye"></span>
                      </span>
                      <span className="VoQ5iTtp">Start a conversation</span>
                      <span className="jkqg29af">
                        <span className="zFO85VE6">
                          <svg
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="zhwXOUw0 size-[18px]"
                          >
                            <path
                              d="M18.5 12L4.99997 12"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            ></path>
                          </svg>
                          <svg
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="t9gAKX1D size-[18px]"
                          >
                            <path
                              d="M18.5 12L4.99997 12"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            ></path>
                          </svg>
                        </span>
                      </span>
                    </Link>
                    <p className="xi1t0XXC">I&apos;m taking on freelance projects and open to full-time roles.</p>
                    <p className="QQrmweN6">Tell me what you&apos;re working on.</p>
                  </div>
                </div>
              </div>
              <span aria-hidden="true" className="OtybCf2U size-[5px] m7aWZARZ" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] SdCAH6sp" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] vgoN9Yn8" data-node="bottom"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] OpiMbwgW" data-node="bottom"></span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
