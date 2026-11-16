"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AboutGithub() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewMode, setViewMode] = useState<"3d" | "flat">("3d");
  const [yaw, setYaw] = useState(0.785); // 45 degrees
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 750;
    const height = 150;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 52 weeks x 7 days
    const cols = 52;
    const rows = 7;

    // Generate deterministic contribution counts totaling ~1,951
    const grid: number[][] = [];
    let countTotal = 0;
    for (let c = 0; c < cols; c++) {
      grid[c] = [];
      for (let r = 0; r < rows; r++) {
        const seed = Math.sin(c * 17.3 + r * 31.7) * 10000;
        const rand = seed - Math.floor(seed);
        let val = 0;
        if (rand > 0.15) {
          val = Math.floor(rand * 14) + 1;
        }
        if (c === 43 && r === 2) val = 30; // October 15 busiest day
        grid[c][r] = val;
        countTotal += val;
      }
    }

    const getColor = (val: number) => {
      if (val === 0) return [22, 27, 34]; // dark bg
      if (val < 4) return [14, 68, 41];
      if (val < 8) return [0, 109, 50];
      if (val < 14) return [38, 166, 65];
      return [57, 211, 83]; // highest
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (viewMode === "flat") {
        const cellSize = Math.min((width - 40) / cols, 11);
        const startX = (width - cols * cellSize) / 2;
        const startY = (height - rows * cellSize) / 2;

        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const val = grid[c][r];
            const [cr, cg, cb] = getColor(val);
            ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
            ctx.fillRect(startX + c * cellSize, startY + r * cellSize, cellSize - 2, cellSize - 2);
          }
        }
        return;
      }

      // 3D Isometric Skyline
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const pitch = 0.52; // ~30 deg
      const sinP = Math.sin(pitch);
      const cosP = Math.cos(pitch);

      const scale = Math.min(width / 600, 1) * 8.2;
      const originX = width / 2;
      const originY = height * 0.72;

      const project = (x: number, y: number, z: number) => {
        const rx = (x * cosY - y * sinY) * scale;
        const ry = (x * sinY + y * cosY) * scale;
        const px = originX + rx;
        const py = originY + ry * sinP - z * cosP * 2.2;
        return [px, py];
      };

      // Sort items back-to-front
      const items: { c: number; r: number; depth: number }[] = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const depth = c * sinY + r * cosY;
          items.push({ c, r, depth });
        }
      }
      items.sort((a, b) => a.depth - b.depth);

      // Draw blocks
      for (const item of items) {
        const c = item.c;
        const r = item.r;
        const val = grid[c][r];
        const [cr, cg, cb] = getColor(val);
        const z = val > 0 ? Math.min(val * 1.8 + 2, 28) : 1;

        const x0 = c - cols / 2;
        const y0 = r - rows / 2;
        const x1 = x0 + 0.85;
        const y1 = y0 + 0.85;

        const p0 = project(x0, y0, z);
        const p1 = project(x1, y0, z);
        const p2 = project(x1, y1, z);
        const p3 = project(x0, y1, z);

        const b0 = project(x0, y0, 0);
        const b1 = project(x1, y0, 0);
        const b2 = project(x1, y1, 0);
        const b3 = project(x0, y1, 0);

        // Right face
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.lineTo(b2[0], b2[1]);
        ctx.lineTo(b1[0], b1[1]);
        ctx.closePath();
        ctx.fillStyle = `rgb(${Math.round(cr * 0.84)}, ${Math.round(cg * 0.84)}, ${Math.round(cb * 0.84)})`;
        ctx.fill();

        // Left / front face
        ctx.beginPath();
        ctx.moveTo(p2[0], p2[1]);
        ctx.lineTo(p3[0], p3[1]);
        ctx.lineTo(b3[0], b3[1]);
        ctx.lineTo(b2[0], b2[1]);
        ctx.closePath();
        ctx.fillStyle = `rgb(${Math.round(cr * 0.68)}, ${Math.round(cg * 0.68)}, ${Math.round(cb * 0.68)})`;
        ctx.fill();

        // Top face
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.lineTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.lineTo(p3[0], p3[1]);
        ctx.closePath();
        ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    render();

    // Mouse drag handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || viewMode !== "3d") return;
      const dx = e.clientX - lastMouseX.current;
      lastMouseX.current = e.clientX;
      setYaw((prev) => prev + dx * 0.01);
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    const onDoubleClick = () => {
      setYaw(0.785);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("dblclick", onDoubleClick);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("dblclick", onDoubleClick);
    };
  }, [viewMode, yaw]);

  return (
    <>
      <section className="Z341Qab9 vzqQr26y" id="github" vt-update="none">
        <div className="pqpIBwim container">
          <div className="AUnucuLw g4ZzFJT4">
            <div className="YfewLcDx cYrXGNhF">
              <div
                className="uotRHvjg zndtoWoO mb-0! max-w-2xl max-sm:px-0"
                style={{ "textShadow": "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)" } as React.CSSProperties}
              >
                <p className="RWtM8UhL">OPEN SOURCE</p>
                <h2 className="Vfg8r5DS">
                  Code &{" "}
                  <span
                    className="qFT8yXw5 animate-gradient-x text-colorfull"
                    style={{
                      "WebkitMaskImage": "linear-gradient(to right, black 70%, transparent 100%)",
                      "WebkitMaskSize": "0% 100%",
                      "WebkitMaskPosition": "left",
                      "WebkitMaskRepeat": "no-repeat",
                    } as React.CSSProperties}
                  >
                    Contributions
                  </span>
                </h2>
              </div>
            </div>
            <div className="lMzuZiwz" data-tray="">
              <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl bg-surface transition-all duration-300 dark:bg-card/15 ring-1 ring-border in-data-tray:bg-[#F7F7F8] dark:in-data-tray:bg-[#0f0f10] in-data-tray:hover:bg-white dark:in-data-tray:hover:bg-[#131314] p-4 hover:bg-surface md:p-8 dark:hover:bg-card/15">
                <div className="bfsHiAXf">
                  <a className="KthBPMWM group/profile" href="https://github.com/AayushBharti" rel="noopener noreferrer" target="_blank">
                    <img
                      alt=""
                      loading="lazy"
                      width="44"
                      height="44"
                      decoding="async"
                      className="AucUsqus size-11"
                      style={{ color: "transparent" } as React.CSSProperties}
                      src="/external/AayushBharti.png"
                    />
                    <span className="PbCYLKZw">
                      <span className="yuirG2HH">@AayushBharti</span>
                      <span className="bVbmtuPL">
                        GitHub
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="WOm6BsVu size-3">
                          <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                      </span>
                    </span>
                  </a>
                  <section
                    className="S8xg31pk qochstpp"
                    style={{ "background": "var(--color-background, #ffffff)", "color": "var(--color-foreground, #171717)", "borderColor": "var(--color-border, #e5e5e5)" } as React.CSSProperties}
                  >
                    <header className="uyxrrVSo">
                      <h3 className="oanmFvYK">
                        <span className="CAP6NKMI">
                          <span className="VKv39mKW">
                            <span className="HBJPZ3bX">
                              <span className="UOk9Yhhp">1,951</span>
                              <span className="BioIn6Ra">contributions in the last year</span>
                            </span>
                            <span className="q4LDyMKt">
                              Busiest on <span className="HpJJ8MEU">October 15</span> with 30 in a day
                            </span>
                          </span>
                          <ul className="cDy3HfIc">
                            <li className="NWwraJYs">
                              <a className="NWwraJYs group/stat" href="https://github.com/AayushBharti?tab=repositories&sort=stargazers" rel="noopener noreferrer" target="_blank">
                                <span className="u3dOmmcs">663</span>
                                <span className="QWZBTbwk">stars</span>
                              </a>
                            </li>
                            <li className="NWwraJYs">
                              <a className="NWwraJYs group/stat" href="https://github.com/AayushBharti?tab=followers" rel="noopener noreferrer" target="_blank">
                                <span className="u3dOmmcs">370</span>
                                <span className="QWZBTbwk">followers</span>
                              </a>
                            </li>
                            <li className="NWwraJYs">
                              <a className="NWwraJYs group/stat" href="https://github.com/AayushBharti?tab=repositories" rel="noopener noreferrer" target="_blank">
                                <span className="u3dOmmcs">97</span>
                                <span className="QWZBTbwk">forks</span>
                              </a>
                            </li>
                            <li className="NWwraJYs">
                              <span className="u3dOmmcs">291</span>
                              <span className="QWZBTbwk">day best streak</span>
                            </li>
                          </ul>
                        </span>
                      </h3>
                      <div aria-label="Chart view" className="BxUItJ2i" role="group" style={{ borderColor: "var(--color-border, #e5e5e5)" } as React.CSSProperties}>
                        <span
                          aria-hidden="true"
                          className="iGwgmAkL"
                          style={{
                            background: "var(--color-foreground, #171717)",
                            transform: viewMode === "3d" ? "translateX(100%)" : "translateX(0%)",
                            transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
                          } as React.CSSProperties}
                        />
                        <button
                          aria-label="Flat heat map"
                          aria-pressed={viewMode === "flat"}
                          className="lnBdHwXG"
                          onClick={() => setViewMode("flat")}
                          style={{ color: viewMode === "flat" ? "var(--color-background, #ffffff)" : "var(--color-muted-foreground, #737373)" } as React.CSSProperties}
                          title="Flat heat map"
                          type="button"
                        >
                          <svg aria-hidden="true" height="14" style={{ maxWidth: "none" } as React.CSSProperties} viewBox="0 0 16 16" width="14">
                            <rect fill="currentColor" height="5.5" rx="1" width="5.5" x="1.5" y="1.5" />
                            <rect fill="currentColor" height="5.5" rx="1" width="5.5" x="9" y="1.5" />
                            <rect fill="currentColor" height="5.5" rx="1" width="5.5" x="1.5" y="9" />
                            <rect fill="currentColor" height="5.5" rx="1" width="5.5" x="9" y="9" />
                          </svg>
                        </button>
                        <button
                          aria-label="3D skyline"
                          aria-pressed={viewMode === "3d"}
                          className="lnBdHwXG"
                          onClick={() => setViewMode("3d")}
                          style={{ color: viewMode === "3d" ? "var(--color-background, #ffffff)" : "var(--color-muted-foreground, #737373)" } as React.CSSProperties}
                          title="3D skyline"
                          type="button"
                        >
                          <svg aria-hidden="true" height="14" style={{ maxWidth: "none" } as React.CSSProperties} viewBox="0 0 16 16" width="14">
                            <path d="M8 1.2 14.2 4.6v6.8L8 14.8 1.8 11.4V4.6Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
                            <path d="M1.8 4.6 8 8l6.2-3.4M8 8v6.8" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
                          </svg>
                        </button>
                      </div>
                    </header>
                    <div className="BnzeIMPs" style={{ borderColor: "var(--color-border, #e5e5e5)" } as React.CSSProperties}>
                      <div className="cWRGyN2k">
                        <div className="hYTftvN7" style={{ height: "150px", outlineColor: "var(--color-foreground, #171717)" } as React.CSSProperties}>
                          <canvas
                            ref={canvasRef}
                            aria-label="1,951 contributions between Nov 16, 2025 — Nov 15, 2026, shown as a 3D skyline. Use the arrow keys to read individual days."
                            className="Zvvb4QYJ"
                            role="img"
                            style={{ maxWidth: "none", touchAction: "pan-y", width: "100%", height: "100%" } as React.CSSProperties}
                            tabIndex={0}
                          />
                        </div>
                      </div>
                      <div className="Fd9ncCZT" style={{ color: "var(--color-muted-foreground, #737373)" } as React.CSSProperties}>
                        <span className="XnxDEOhA">
                          <span aria-hidden="false" className="PqVHRiY8" style={{ opacity: "1" } as React.CSSProperties}>
                            {viewMode === "3d" ? "Drag to orbit · double-click to reset" : "Hover a day for details · arrow keys to explore"}
                          </span>
                        </span>
                        <div className="Q6Hg7Nsz">
                          <span className="HN8xZJM4">Less</span>
                          <button aria-label="Highlight no contributions days" className="UxAuE21x" style={{ background: "#161b22" } as React.CSSProperties} title="No contributions" type="button" />
                          <button aria-label="Highlight light days" className="UxAuE21x" style={{ background: "#0e4429" } as React.CSSProperties} title="Light" type="button" />
                          <button aria-label="Highlight moderate days" className="UxAuE21x" style={{ background: "#006d32" } as React.CSSProperties} title="Moderate" type="button" />
                          <button aria-label="Highlight heavy days" className="UxAuE21x" style={{ background: "#26a641" } as React.CSSProperties} title="Heavy" type="button" />
                          <button aria-label="Highlight heaviest days" className="UxAuE21x" style={{ background: "#39d353" } as React.CSSProperties} title="Heaviest" type="button" />
                          <span className="pSFUK9dn">More</span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <span aria-hidden="true" className="OtybCf2U size-[5px] m7aWZARZ" data-node="top" />
            <span aria-hidden="true" className="OtybCf2U size-[5px] SdCAH6sp" data-node="top" />
            <span aria-hidden="true" className="OtybCf2U size-[5px] vgoN9Yn8" data-node="bottom" />
            <span aria-hidden="true" className="OtybCf2U size-[5px] OpiMbwgW" data-node="bottom" />
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="oDlRct6k" vt-update="none">
        <div className="pqpIBwim container">
          <div className="puBGkXbv i8FqydUI HpfpfkkS">
            <span aria-hidden="true" className="OtybCf2U size-[5px] m7aWZARZ" data-node="top" />
            <span aria-hidden="true" className="OtybCf2U size-[5px] SdCAH6sp" data-node="top" />
            <span aria-hidden="true" className="OtybCf2U size-[5px] vgoN9Yn8" data-node="bottom" />
            <span aria-hidden="true" className="OtybCf2U size-[5px] OpiMbwgW" data-node="bottom" />
          </div>
        </div>
      </div>
    </>
  );
}
