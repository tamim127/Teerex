"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blogData";

const CATEGORIES = [
  "All Posts",
  "Next.js",
  "react",
  "system design",
  "reliability",
  "incidents",
  "cloud",
  "developer tools",
  "Claude Code",
  "AI",
  "workflow",
  "caching",
  "turbopack",
  "performance",
  "Web Vitals",
  "MDX",
  "tutorial",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Normalize tag helper for flexible comparison
  const normalizeTag = (tag: string) =>
    tag.toLowerCase().replace(/[^a-z0-9]/g, "");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory !== "All Posts") {
        const targetNorm = normalizeTag(selectedCategory);
        matchesCategory = post.tags.some(
          (t) => normalizeTag(t) === targetNorm
        );
      }

      // Search filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = post.title.toLowerCase().includes(query);
        const inDesc = post.description.toLowerCase().includes(query);
        const inTags = post.tags.some((t) => t.toLowerCase().includes(query));
        matchesSearch = inTitle || inDesc || inTags;
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const latestPosts = filteredPosts.slice(1);

  return (
    <>
      <Navbar />

      <main className="wueBDJtZ" id="main" tabIndex={-1}>
        <script
          id="collection-page-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": "https://tamiulalam.com/blog",
              isPartOf: { "@id": "https://tamiulalam.com#website" },
              name: "Blog",
              description: "A digital garden of thoughts, tutorials, and experiences.",
              url: "https://tamiulalam.com/blog",
              dateModified: "2026-11-15T00:00:00.000Z",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: BLOG_POSTS.map((p, idx) => ({
                  "@type": "ListItem",
                  position: idx + 1,
                  name: p.title,
                  url: `https://tamiulalam.com/blog/${p.slug}`,
                })),
              },
              publisher: {
                "@type": "Person",
                "@id": "https://tamiulalam.com#person",
                name: "Tamiul Alam",
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
                { "@type": "ListItem", position: 2, name: "Blog" },
              ],
            }),
          }}
        />

        <section className="GTLhVnre e8Cklw07" vt-update="none">
          <div
            className="gywsUsrn"
            style={{
              maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)",
              opacity: "1",
            }}
          >
            <img
              alt="crumpled paper texture"
              decoding="async"
              className="SQFVIHpA"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: 0,
                color: "transparent",
              }}
              sizes="100vw"
              src="/crumpled-paper.avif"
            />
          </div>
          <div aria-hidden="true" className="dhsYwEWb">
            <div className="pqpIBwim container">
              <div className="PqKDV40c">
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
          <div className="container">
            <div className="cpJC8Z9M">
              <div
                className="uotRHvjg zndtoWoO mb-0!"
                style={{
                  textShadow:
                    "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)",
                }}
              >
                <p className="RWtM8UhL">The Pensieve</p>
                <h1 className="Vfg8r5DS">
                  Handpicked{" "}
                  <span className="mask-sweep animate-mask-sweep">
                    <span className="IoXF2GxW animate-gradient-x text-colorfull">
                      Insights
                    </span>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post / Filter section */}
        <section
          className="Z341Qab9 vzqQr26y"
          aria-label="Featured article"
          vt-update="none"
        >
          <div className="pqpIBwim container">
            <div className="AUnucuLw g4ZzFJT4">
              <div className="MnOqWclX">
                <div className="izBXm3JQ">
                  <div className="lRJ7KI1n scrollbar-none">
                    {CATEGORIES.map((category) => {
                      const isActive = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          aria-pressed={isActive}
                          className={isActive ? "xwnAwqqB cursor-pointer" : "F2HcHOnG laOIGGU6 cursor-pointer"}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt68QzMz flex items-center gap-2">
                  {isSearching ? (
                    <div className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900/80 px-2.5 py-1 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="size-3.5 text-neutral-400"
                      >
                        <path
                          d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z"
                          opacity="0.2"
                        ></path>
                        <path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts..."
                        className="w-32 bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none lg:w-44"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="text-xs text-neutral-400 hover:text-white"
                        >
                          ✕
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearching(false);
                          setSearchQuery("");
                        }}
                        className="text-[11px] text-neutral-400 hover:text-white"
                      >
                        esc
                      </button>
                    </div>
                  ) : (
                    <button
                      aria-label="Search posts"
                      type="button"
                      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-600 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:text-neutral-300 lg:h-9 lg:w-52 lg:justify-start lg:gap-2 lg:px-3"
                      onClick={() => setIsSearching(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="TbK6QKi3 size-4"
                      >
                        <path
                          d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z"
                          opacity="0.2"
                        ></path>
                        <path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                      <span className="eKtWtOHx">Search posts</span>
                      <span className="lURaim67">
                        <kbd className="kbFtKMZp">⌘</kbd>
                        <kbd className="kbFtKMZp">K</kbd>
                      </span>
                    </button>
                  )}

                  <a
                    aria-label="RSS Feed"
                    className="FecUpqnw size-9"
                    href="/blog/rss.xml"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      className="size-4"
                    >
                      <path
                        d="M216,200H56V40A160,160,0,0,1,216,200Z"
                        opacity="0.2"
                      ></path>
                      <path d="M106.91,149.09A71.53,71.53,0,0,1,128,200a8,8,0,0,1-16,0,56,56,0,0,0-56-56,8,8,0,0,1,0-16A71.53,71.53,0,0,1,106.91,149.09ZM56,80a8,8,0,0,0,0,16A104,104,0,0,1,160,200a8,8,0,0,0,16,0A120,120,0,0,0,56,80Zm118.79,1.21A166.89,166.89,0,0,0,56,32a8,8,0,0,0,0,16A151,151,0,0,1,163.48,92.52,151,151,0,0,1,208,200a8,8,0,0,0,16,0A166.9,166.9,0,0,0,174.79,81.21ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Dynamic Posts Count */}
              <p aria-live="polite" className="vTovxkJs">
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
              </p>

              {/* Featured Post Card */}
              {featuredPost ? (
                <div className="lMzuZiwz B5zPmW36" data-tray="">
                  <Link
                    className="UE3UTEf6 group/link"
                    data-cuelume-navigate="select"
                    data-hover-cue=""
                    href={`/blog/${featuredPost.slug}`}
                  >
                    <div
                      aria-hidden="true"
                      className="GG65tvby"
                      style={{ backgroundImage: `url("${featuredPost.blurDataUrl}")` }}
                    ></div>
                    <div className="Xg55Pm8H">
                      <div className="yBdKb4G8">
                        <div
                          aria-hidden="true"
                          className="TzN5BeG2"
                          style={{ backgroundImage: `url("${featuredPost.blurDataUrl}")` }}
                        ></div>
                        <div
                          className="Bj0EyEuZ"
                          vt-name={`post-cover-${featuredPost.slug}`}
                          vt-update="none"
                        >
                          <img
                            alt={featuredPost.title}
                            fetchPriority="high"
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
                            sizes="(max-width: 767px) 100vw, 55vw"
                            src={featuredPost.cover}
                          />
                          <div aria-hidden="true" className="olHZ87OL"></div>
                          <div aria-hidden="true" className="YnM6c4Ko"></div>
                        </div>
                      </div>
                    </div>
                    <div className="rb0Tk4HC">
                      <div className="WxYDkZm6">
                        <span className="HpJJ8MEU">Featured</span>
                        <time dateTime={featuredPost.dateTime}>{featuredPost.date}</time>
                        <span>{featuredPost.readingTime}</span>
                      </div>
                      <h2 className="iH7gw3x1">{featuredPost.title}</h2>
                      <p className="gsMxZuWB">{featuredPost.description}</p>
                      <ul className="MxAiKtZv">
                        {featuredPost.tags.map((t) => (
                          <li key={t} className="A0Q9WatR">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="py-16 text-center text-neutral-400">
                  <p className="text-lg">No posts found in this category.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All Posts");
                      setSearchQuery("");
                    }}
                    className="mt-3 text-sm text-[#f472b6] underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              )}

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

        {/* Latest Articles section */}
        {latestPosts.length > 0 && (
          <>
            <div className="oDlRct6k" vt-update="none">
              <div className="pqpIBwim container">
                <div className="puBGkXbv TIL9fneX HpfpfkkS DVKIdLPY">
                  <h2 className="eQdtdpsl">Latest articles</h2>
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

            <section
              className="Z341Qab9 vzqQr26y"
              aria-label="Latest articles"
              vt-update="none"
            >
              <div className="pqpIBwim container">
                <div className="AUnucuLw g4ZzFJT4">
                  <div className="lMzuZiwz" data-tray="">
                    <div className="a5yZgLIW">
                      {latestPosts.map((post) => (
                        <Link
                          key={post.slug}
                          className="Z8WFxr01 group/link"
                          data-cuelume-navigate="select"
                          data-hover-cue=""
                          href={`/blog/${post.slug}`}
                        >
                          <div className="yBdKb4G8">
                            <div
                              aria-hidden="true"
                              className="TzN5BeG2"
                              style={{ backgroundImage: `url("${post.blurDataUrl}")` }}
                            ></div>
                            <div
                              className="fwKbmiZR"
                              vt-name={`post-cover-${post.slug}`}
                              vt-update="none"
                            >
                              <img
                                alt={post.title}
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
                                sizes="(max-width: 767px) 90vw, (max-width: 1024px) 45vw, 380px"
                                src={post.cover}
                              />
                              <div aria-hidden="true" className="olHZ87OL"></div>
                              <div aria-hidden="true" className="YnM6c4Ko"></div>
                            </div>
                          </div>
                          <div className="T6PHrLyx">
                            <h3 className="Q8ayl6vB">{post.title}</h3>
                            <div className="kfGuq25q">
                              <time dateTime={post.dateTime}>{post.date}</time>
                              <span>{post.readingTime}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
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
