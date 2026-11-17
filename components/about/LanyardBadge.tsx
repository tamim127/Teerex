"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

// Precise geometric TM Monogram SVG Paths matching 0 0 5350 5350 coordinate space
export const TM_PATH_T =
  "M 800 650 L 2380 650 A 70 70 0 0 1 2450 720 L 2450 1140 A 70 70 0 0 1 2380 1210 L 1730 1210 L 1730 4000 A 70 70 0 0 1 1660 4070 L 1240 4070 A 70 70 0 0 1 1170 4000 L 1170 1210 L 520 1210 A 70 70 0 0 1 458 1128 L 738 678 A 70 70 0 0 1 800 650 Z";

export const TM_PATH_M =
  "M 2820 650 L 3310 650 A 70 70 0 0 1 3373 690 L 3850 1560 L 4327 690 A 70 70 0 0 1 4390 650 L 4880 650 A 70 70 0 0 1 4950 720 L 4950 4000 A 70 70 0 0 1 4880 4070 L 4460 4070 A 70 70 0 0 1 4390 4000 L 4390 2050 L 3915 2915 A 70 70 0 0 1 3785 2915 L 3310 2050 L 3310 4000 A 70 70 0 0 1 3240 4070 L 2820 4070 A 70 70 0 0 1 2750 4000 L 2750 720 A 70 70 0 0 1 2820 650 Z";

const TOTAL_SEGMENTS = 40;

export default function LanyardBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const segmentsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const wandRef = useRef<HTMLDivElement>(null);

  // Interaction State
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Physics animation values
  const physicsRef = useRef({
    // Card position and angles
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    vRotX: 0,
    vRotY: 0,
    vRotZ: 0,
    targetRotY: 0,
    targetRotX: 0,
    targetRotZ: 0,
    targetX: 0,
    targetY: 0,
    // Drag tracking
    isDragging: false,
    startX: 0,
    startY: 0,
    dragX: 0,
    dragY: 0,
    // Wand position
    wandX: 0,
    wandY: 0,
    targetWandX: 0,
    targetWandY: 0,
    wandRot: 0,
    // Clock for idle oscillation
    time: 0,
    animId: 0,
  });

  // Keep targetRotY in sync with isFlipped and isHovered
  useEffect(() => {
    // When hovered or flipped, target is 180deg (front face); otherwise 0deg (back face)
    const target = isFlipped ? 180 : isHovered ? 180 : 0;
    physicsRef.current.targetRotY = target;
  }, [isFlipped, isHovered]);

  // Main physics animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05); // cap dt at 50ms
      lastTime = currentTime;

      const p = physicsRef.current;
      p.time += dt;

      // 1. Natural idle breathing oscillation when not dragging
      const idleSway = Math.sin(p.time * 2.2) * 1.5;
      const idleTilt = Math.cos(p.time * 1.8) * 1.0;

      // 2. Spring physics for RotY (flipping / 3D rotation)
      const diffY = p.targetRotY - p.rotY;
      const springKY = 42;
      const dampY = 8.5;
      const accelRotY = diffY * springKY - p.vRotY * dampY;
      p.vRotY += accelRotY * dt;
      p.rotY += p.vRotY * dt;

      // 3. Spring physics for RotX & RotZ (tilt and sway)
      const targetX = p.isDragging ? p.dragX : p.targetX;
      const targetY = p.isDragging ? p.dragY : p.targetY;

      const diffX = targetX - p.x;
      const diffYPos = targetY - p.y;
      const springK = 35;
      const damp = 6.8;

      p.vx += (diffX * springK - p.vx * damp) * dt;
      p.vy += (diffYPos * springK - p.vy * damp) * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Angular tilt derived from displacement and pointer target
      const targetTiltZ = (p.x / 14) + (p.isDragging ? 0 : idleSway);
      const targetTiltX = p.targetRotX + (p.isDragging ? (p.y / 18) : idleTilt);

      p.vRotZ += ((targetTiltZ - p.rotZ) * 40 - p.vRotZ * 7.5) * dt;
      p.rotZ += p.vRotZ * dt;

      p.vRotX += ((targetTiltX - p.rotX) * 40 - p.vRotX * 7.5) * dt;
      p.rotX += p.vRotX * dt;

      // 4. Update Card Transform in DOM
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0px) rotateX(${p.rotX.toFixed(2)}deg) rotateY(${p.rotY.toFixed(2)}deg) rotateZ(${p.rotZ.toFixed(2)}deg)`;
      }

      // 5. Update Lanyard Anchor (.DF2uArsl)
      if (lanyardRef.current) {
        const topSway = (p.rotZ * 0.25).toFixed(2);
        lanyardRef.current.style.transform = `rotate(${topSway}deg)`;
      }

      // 6. Update Ribbon / Fita segments (.lmcgaIxJ)
      // Each segment curves smoothly following the card's position and angle
      const segCount = segmentsRef.current.length;
      for (let i = 0; i < segCount; i++) {
        const el = segmentsRef.current[i];
        if (!el) continue;
        const progress = (i + 1) / segCount;
        const curve = Math.pow(progress, 1.5);
        const segX = (p.x * curve).toFixed(2);
        const segZ = (p.rotZ * progress).toFixed(2);
        const segTwist = ((p.rotY % 360) * 0.12 * progress).toFixed(2);

        el.style.transform = `translate3d(${segX}px, 0px, 0px) rotateZ(${segZ}deg) rotateY(${segTwist}deg)`;
      }

      // 7. Update Wand position (.ihyvdr0x) on desktop
      if (wandRef.current) {
        p.wandX += (p.targetWandX - p.wandX) * 0.12;
        p.wandY += (p.targetWandY - p.wandY) * 0.12;
        const wandAngle = ((p.targetWandX - p.wandX) * 0.25).toFixed(2);
        wandRef.current.style.transform = `translate3d(${p.wandX.toFixed(1)}px, ${p.wandY.toFixed(1)}px, 0px) rotate(${wandAngle}deg)`;
      }

      p.animId = requestAnimationFrame(loop);
    };

    physicsRef.current.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(physicsRef.current.animId);
    };
  }, []);

  // Pointer Movement Handlers (Hover & 3D Tilt)
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2); // -1 to 1
    const normY = (e.clientY - centerY) / (rect.height / 2); // -1 to 1

    const p = physicsRef.current;

    // Update wand target
    p.targetWandX = e.clientX - rect.left - 28;
    p.targetWandY = e.clientY - rect.top - 6;

    if (p.isDragging) {
      p.dragX = (e.clientX - p.startX);
      p.dragY = Math.max(-20, Math.min(80, e.clientY - p.startY));
      return;
    }

    // Dynamic 3D tilt
    p.targetRotX = -normY * 18;
    p.targetRotZ = normX * 8;
    p.targetX = normX * 24;
    p.targetY = Math.max(0, normY * 10);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    if (wandRef.current) {
      wandRef.current.style.opacity = "1";
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    const p = physicsRef.current;
    p.isDragging = false;
    setIsDragging(false);
    p.targetRotX = 0;
    p.targetRotZ = 0;
    p.targetX = 0;
    p.targetY = 0;
    if (wandRef.current) {
      wandRef.current.style.opacity = "0.7";
    }
  }, []);

  // Pointer Down / Drag Handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const p = physicsRef.current;
    p.isDragging = true;
    p.startX = e.clientX - p.x;
    p.startY = e.clientY - p.y;
    p.dragX = p.x;
    p.dragY = p.y;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (p.isDragging) {
      // If it was a short tap / click without significant drag, toggle flip
      const dragDist = Math.hypot(p.x - p.dragX, p.y - p.dragY);
      if (dragDist < 6) {
        setIsFlipped((prev) => !prev);
      }
      p.isDragging = false;
      setIsDragging(false);
      p.targetX = 0;
      p.targetY = 0;
    }
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  // Toggle Flip (Tap it button)
  const handleToggleFlip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      className="vf5XRHCh relative select-none"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        aria-label="Reveal photo"
        aria-pressed={isFlipped}
        className="jsGwwbmX cursor-grab active:cursor-grabbing outline-none"
        type="button"
        onClick={handleToggleFlip}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className="yBdKb4G8">
          {/* Lanyard assembly anchor */}
          <div
            ref={lanyardRef}
            className="DF2uArsl"
            style={{ transformOrigin: "50% -28rem", willChange: "transform" }}
          >
            {/* Top off-screen lanyard anchor */}
            <div className="LFlCyN6E">
              <span className="U3QL9u2x"></span>
              <span aria-hidden="true" className="iyP3eQOM">
                tamiulalam.com · tamiulalam.com · tamiulalam.com · tamiulalam.com · tamiulalam.com · tamiulalam.com
              </span>
            </div>

            {/* Articulated Lanyard Ribbon (40 segments) */}
            <div className="hvdVJOFI" style={{ transformStyle: "preserve-3d" }}>
              {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    segmentsRef.current[i] = el;
                  }}
                  className="lmcgaIxJ transition-transform duration-75 ease-out"
                  style={{
                    willChange: "transform",
                    transformOrigin: "50% 0%",
                  }}
                >
                  <span
                    className="WX58qX4Y"
                    style={{ top: `${-i * 100}%` as React.CSSProperties["top"] }}
                  >
                    <span className="U3QL9u2x"></span>
                    <span aria-hidden="true" className="sWVGFhon">
                      tamiulalam.com · tamiulalam.com
                    </span>
                    <span className="f9aQyiCn"></span>
                  </span>
                  <span className="dKoRKbRv"></span>
                </span>
              ))}
            </div>

            {/* Metal Crimp / Clamp */}
            <div className="DxOCaPMh" style={{ transform: "none" }}>
              <span className="ihu2p2Tv"></span>
            </div>

            {/* 3D Perspective Card Container */}
            <div className="x8XqRawj">
              <div
                ref={cardRef}
                className="Iuu9LgSP shadow-2xl transition-shadow duration-300"
                style={{
                  transformOrigin: "50% 0%",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* Front Metal Ring / Clip */}
                <span className="batquUDO">
                  <svg aria-hidden="true" className="mLG5qyoy size-full" viewBox="-14 -2 28 48">
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="tm-badge-steel-1" x1="-10" x2="10" y1="0" y2="42">
                        <stop offset="0" stopColor="#f5f6f8" />
                        <stop offset="0.3" stopColor="#b9bcc4" />
                        <stop offset="0.5" stopColor="#eceef1" />
                        <stop offset="0.75" stopColor="#868991" />
                        <stop offset="1" stopColor="#d9dce2" />
                      </linearGradient>
                      <clipPath id="tm-badge-above-1">
                        <rect height="20" width="28" x="-14" y="-2" />
                      </clipPath>
                      <clipPath id="tm-badge-hole-1">
                        <rect x="-20" y="33" width="40" height="10" rx="5" />
                      </clipPath>
                    </defs>
                    <path d="M-6 6A6 4 0 0 1 6 6" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="2.8" />
                    <path d="M-6 6A6 4 0 0 1 6 6" fill="none" stroke="url(#tm-badge-steel-1)" strokeLinecap="round" strokeWidth="2.2" />
                    <path d="M-6 6A6 4 0 0 1 6 6" fill="none" stroke="rgb(255 255 255 / 0.75)" strokeLinecap="round" strokeWidth="0.5" />
                    <g clipPath="url(#tm-badge-above-1)">
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="3.2" />
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="url(#tm-badge-steel-1)" strokeLinecap="round" strokeWidth="2.6" />
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="rgb(255 255 255 / 0.75)" strokeLinecap="round" strokeWidth="0.6" />
                    </g>
                    <g clipPath="url(#tm-badge-hole-1)" opacity="0.7">
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="3.2" />
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="url(#tm-badge-steel-1)" strokeLinecap="round" strokeWidth="2.6" />
                    </g>
                    <path d="M3.59 7.15A8 15 -8 0 0 -0.59 36.85" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="3.2" />
                    <path d="M3.59 7.15A8 15 -8 0 0 -0.59 36.85" fill="none" stroke="url(#tm-badge-steel-1)" strokeLinecap="round" strokeWidth="2.6" />
                    <path d="M6 6A6 4 0 0 1 -6 6" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="2.8" />
                    <path d="M6 6A6 4 0 0 1 -6 6" fill="none" stroke="url(#tm-badge-steel-1)" strokeLinecap="round" strokeWidth="2.2" />
                  </svg>
                </span>

                {/* Back Metal Ring / Clip */}
                <span className="t47IkOvn">
                  <svg aria-hidden="true" className="mLG5qyoy size-full" viewBox="-14 -2 28 48">
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="tm-badge-steel-2" x1="-10" x2="10" y1="0" y2="42">
                        <stop offset="0" stopColor="#f5f6f8" />
                        <stop offset="0.3" stopColor="#b9bcc4" />
                        <stop offset="0.5" stopColor="#eceef1" />
                        <stop offset="0.75" stopColor="#868991" />
                        <stop offset="1" stopColor="#d9dce2" />
                      </linearGradient>
                      <clipPath id="tm-badge-above-2">
                        <rect height="20" width="28" x="-14" y="-2" />
                      </clipPath>
                      <clipPath id="tm-badge-hole-2">
                        <rect x="-20" y="33" width="40" height="10" rx="5" />
                      </clipPath>
                    </defs>
                    <path d="M-6 6A6 4 0 0 1 6 6" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="2.8" />
                    <path d="M-6 6A6 4 0 0 1 6 6" fill="none" stroke="url(#tm-badge-steel-2)" strokeLinecap="round" strokeWidth="2.2" />
                    <g clipPath="url(#tm-badge-above-2)">
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="3.2" />
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="url(#tm-badge-steel-2)" strokeLinecap="round" strokeWidth="2.6" />
                    </g>
                    <g clipPath="url(#tm-badge-hole-2)" opacity="0.7">
                      <path d="M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="3.2" />
                    </g>
                    <path d="M3.59 7.15A8 15 -8 0 0 -0.59 36.85" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="3.2" />
                    <path d="M3.59 7.15A8 15 -8 0 0 -0.59 36.85" fill="none" stroke="url(#tm-badge-steel-2)" strokeLinecap="round" strokeWidth="2.6" />
                    <path d="M6 6A6 4 0 0 1 -6 6" fill="none" stroke="#4a4c53" strokeLinecap="round" strokeWidth="2.8" />
                    <path d="M6 6A6 4 0 0 1 -6 6" fill="none" stroke="url(#tm-badge-steel-2)" strokeLinecap="round" strokeWidth="2.2" />
                  </svg>
                </span>

                {/* BACK FACE (Dark Textured Surface) */}
                <div className="vbMi65Qi">
                  <span className="qYvKVdVm ttsdkztT">
                    <span className="aWYsOPOe eJWna5HM"></span>
                  </span>
                  <span className="ro2RGQcy"></span>
                  {/* Central Large TM Logo Monogram */}
                  <div className="K1er5Gvw flex items-center justify-center">
                    <svg viewBox="0 0 5350 5350" xmlns="http://www.w3.org/2000/svg" className="NPyXgOxv">
                      <path d={TM_PATH_T} fill="#fff" />
                      <path d={TM_PATH_M} fill="#fff" />
                    </svg>
                  </div>
                  {/* Name Label */}
                  <p className="nEaZjwG7 tracking-[0.2em]">TAMIUL ALAM</p>
                  {/* Specular Highlight / Sheen */}
                  <span
                    className="Vzkm1c00 transition-opacity duration-300"
                    style={{
                      opacity: isHovered ? 0.25 : 0.08,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                    }}
                  ></span>
                </div>

                {/* FRONT FACE (White ID Card Surface) */}
                <div className="g5BBZF0k">
                  <span className="qYvKVdVm XutHFKJ4">
                    <span className="aWYsOPOe p5WJShVE"></span>
                  </span>
                  {/* Top-Left Small TM Logo */}
                  <svg viewBox="0 0 5350 5350" xmlns="http://www.w3.org/2000/svg" className="q5yvIpBk">
                    <path d={TM_PATH_T} fill="#141416" />
                    <path d={TM_PATH_M} fill="#141416" />
                  </svg>
                  {/* Card Photo */}
                  <div className="CL0VtOdE">
                    <img
                      alt="Tamiul Alam"
                      loading="lazy"
                      decoding="async"
                      className="lVq9cCBh"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: "0",
                        top: "0",
                        right: "0",
                        bottom: "0",
                        objectFit: "cover",
                        backgroundPosition: "50% 50%",
                      }}
                      sizes="(min-width: 1024px) 216px, 168px"
                      srcSet="/media/tamim.43ipx6mklr1vf.webp 32w, /media/tamim.43ipx6mklr1vf.webp 48w, /media/tamim.43ipx6mklr1vf.webp 64w, /media/tamim.43ipx6mklr1vf.webp 96w, /media/tamim.43ipx6mklr1vf.webp 128w, /media/tamim.43ipx6mklr1vf.webp 256w, /media/tamim.43ipx6mklr1vf.webp 384w, /media/tamim.43ipx6mklr1vf.webp 640w, /media/tamim.43ipx6mklr1vf.webp 828w, /media/tamim.43ipx6mklr1vf.webp 1080w, /media/tamim.43ipx6mklr1vf.webp 1440w, /media/tamim.43ipx6mklr1vf.webp 1920w"
                      src="/media/tamim.43ipx6mklr1vf.webp"
                    />
                  </div>
                  {/* Front Identity Info */}
                  <p className="txrhG78W">Tamiul Alam</p>
                  <p className="BG8DaSJO">AI FULL-STACK ENGINEER</p>
                  {/* Specular Highlight */}
                  <span
                    className="Vzkm1c00 transition-opacity duration-300"
                    style={{
                      opacity: isHovered ? 0.35 : 0.1,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 60%)",
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tap it pill tooltip */}
        <span aria-hidden="true" className="ItR_9W_className gdxDRLUF pointer-events-none">
          {isFlipped ? "flip back ✦" : "tap it ✦"}
        </span>
      </button>

      {/* Wave it callout indicator */}
      <div aria-hidden="true" className="kLtKRCeo pointer-events-none">
        <span className="ItR_9W_className zb6X3Tf9">wave it</span>
        <svg
          className="sCAkto4s"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          viewBox="0 0 48 36"
        >
          <path d="M2 32 C 14 34, 22 29, 28 21 S 38 11, 46 11" pathLength="1" strokeDashoffset="0" strokeDasharray="0 1" />
          <path d="M40.5 6.5 L46 11 L40 15" pathLength="1" strokeDashoffset="0" strokeDasharray="0 1" />
        </svg>
      </div>

      {/* Elder Wand Accessory Floating Beside Badge */}
      <div
        ref={wandRef}
        aria-hidden="true"
        className="ihyvdr0x pointer-events-none transition-opacity duration-500 hidden md:block"
        style={{
          position: "absolute",
          top: "40px",
          right: "-36px",
          width: "56px",
          height: "560px",
          transformOrigin: "50% 6px",
          willChange: "transform",
          zIndex: 30,
          opacity: isHovered ? 1 : 0.85,
        }}
      >
        <svg className="LP98Iz3A size-full drop-shadow-xl" viewBox="0 0 56 560">
          <defs>
            <clipPath id="tm-elder-clip">
              <path d="M28 0 26.86 2.00 L26.71 4.14 L26.57 6.28 L26.41 8.42 L26.26 10.55 L26.10 12.69 L25.93 14.83 L25.77 16.97 L25.62 19.11 L25.58 21.25 L25.54 23.38 L25.51 25.52 L25.47 27.66 L25.43 29.80 L25.39 31.94 L25.36 34.08 L25.32 36.22 L25.28 38.35 L25.24 40.49 L25.19 42.63 L25.09 44.77 L24.87 46.91 L24.44 49.05 L23.72 51.18 L22.78 53.32 L21.93 55.46 L21.56 57.60 L21.86 59.74 L22.63 61.88 L23.49 64.02 L24.14 66.15 L24.50 68.29 L24.64 70.43 L24.66 72.57 L24.64 74.71 L24.61 76.85 L24.57 78.98 L24.53 81.12 L24.49 83.26 L24.46 85.40 L24.42 87.54 L24.38 89.68 L24.34 91.82 L24.31 93.95 L24.27 96.09 L24.23 98.23 L24.19 100.37 L24.16 102.51 L24.12 104.65 L24.08 106.78 L24.02 108.92 L23.94 111.06 L23.78 113.20 L23.46 115.34 L22.88 117.48 L22.00 119.62 L20.90 121.75 L19.83 123.89 L19.15 126.03 L19.11 128.17 L19.72 130.31 L20.71 132.45 L21.74 134.58 L22.54 136.72 L23.04 138.86 L23.29 141.00 L23.38 143.14 L23.39 145.28 L23.36 147.42 L23.33 149.55 L23.29 151.69 L23.26 153.83 L23.22 155.97 L23.18 158.11 L23.14 160.25 L23.11 162.38 L23.07 164.52 L23.03 166.66 L22.99 168.80 L22.96 170.94 L22.92 173.08 L22.88 175.22 L22.84 177.35 L22.81 179.49 L22.77 181.63 L22.73 183.77 L22.69 185.91 L22.66 188.05 L22.62 190.18 L22.58 192.32 L22.53 194.46 L22.46 196.60 L22.34 198.74 L22.12 200.88 L21.73 203.02 L21.08 205.15 L20.15 207.29 L19.00 209.43 L17.81 211.57 L16.87 213.71 L16.45 215.85 L16.67 217.98 L17.45 220.12 L18.54 222.26 L19.64 224.40 L20.55 226.54 L21.18 228.68 L21.54 230.82 L21.71 232.95 L21.77 235.09 L21.78 237.23 L21.75 239.37 L21.72 241.51 L21.68 243.65 L21.64 245.78 L21.61 247.92 L21.57 250.06 L21.53 252.20 L21.49 254.34 L21.46 256.48 L21.42 258.62 L21.38 260.75 L21.34 262.89 L21.31 265.03 L21.27 267.17 L21.23 269.31 L21.19 271.45 L21.16 273.58 L21.12 275.72 L21.08 277.86 L21.04 280.00 L21.00 282.14 L20.96 284.28 L20.90 286.42 L20.82 288.55 L20.69 290.69 L20.49 292.83 L20.17 294.97 L19.70 297.11 L19.02 299.25 L18.13 301.38 L17.05 303.52 L15.88 305.66 L14.75 307.80 L13.84 309.94 L13.29 312.08 L13.20 314.22 L13.59 316.35 L14.37 318.49 L15.39 320.63 L16.49 322.77 L17.52 324.91 L18.38 327.05 L19.02 329.18 L19.46 331.32 L19.73 333.46 L19.88 335.60 L19.96 337.74 L20.00 339.88 L20.01 342.02 L20.00 344.15 L19.99 346.29 L19.98 348.43 L19.96 350.57 L19.95 352.71 L19.93 354.85 L19.92 356.98 L19.90 359.12 L19.89 361.26 L19.87 363.40 L19.86 365.54 L19.84 367.68 L19.83 369.82 L19.81 371.95 L19.79 374.09 L19.77 376.23 L19.73 378.37 L19.69 380.51 L19.63 382.65 L19.54 384.78 L19.42 386.92 L19.23 389.06 L18.97 391.20 L18.60 393.34 L18.12 395.48 L17.48 397.62 L16.67 399.75 L15.69 401.89 L14.54 404.03 L13.25 406.17 L11.87 408.31 L10.45 410.45 L9.08 412.58 L7.85 414.72 L6.85 416.86 L6.16 419.00 L5.84 421.14 L5.90 423.28 L6.35 425.42 L7.14 427.55 L8.21 429.69 L9.47 431.83 L10.84 433.97 L12.23 436.11 L13.55 438.25 L14.76 440.38 L15.81 442.52 L16.69 444.66 L17.40 446.80 L17.95 448.94 L18.35 451.08 L18.64 453.22 L18.84 455.35 L18.97 457.49 L19.05 459.63 L19.10 461.77 L19.12 463.91 L19.12 466.05 L19.11 468.18 L19.08 470.32 L19.04 472.46 L18.97 474.60 L18.85 476.74 L18.66 478.88 L18.37 481.02 L17.95 483.15 L17.36 485.29 L16.56 487.43 L15.55 489.57 L14.34 491.71 L12.98 493.85 L11.57 495.98 L10.22 498.12 L9.07 500.26 L8.25 502.40 L7.86 504.54 L7.94 506.68 L8.48 508.82 L9.42 510.95 L10.64 513.09 L12.00 515.23 L13.37 517.37 L14.64 519.51 L15.75 521.65 L16.64 523.78 L17.26 525.92 L17.51 528.06 L17.49 530.20 L17.25 532.34 L16.84 534.48 L16.29 536.62 L15.64 538.75 L14.90 540.89 L14.09 543.03 L13.21 545.17 L12.28 547.31 L11.29 549.45 L10.72 551.58 L11.53 553.72 L14.63 555.86 L28.00 558.00 L28.00 558.00 L41.37 555.86 L44.47 553.72 L45.28 551.58 L44.71 549.45 L43.72 547.31 L42.79 545.17 L41.91 543.03 L41.10 540.89 L40.36 538.75 L39.71 536.62 L39.16 534.48 L38.75 532.34 L38.51 530.20 L38.49 528.06 L38.74 525.92 L39.36 523.78 L40.25 521.65 L41.36 519.51 L42.63 517.37 L44.00 515.23 L45.36 513.09 L46.58 510.95 L47.52 508.82 L48.06 506.68 L48.14 504.54 L47.75 502.40 L46.93 500.26 L45.78 498.12 L44.43 495.98 L43.02 493.85 L41.66 491.71 L40.45 489.57 L39.44 487.43 L38.64 485.29 L38.05 483.15 L37.63 481.02 L37.34 478.88 L37.15 476.74 L37.03 474.60 L36.96 472.46 L36.92 470.32 L36.89 468.18 L36.88 466.05 L36.88 463.91 L36.90 461.77 L36.95 459.63 L37.03 457.49 L37.16 455.35 L37.36 453.22 L37.65 451.08 L38.05 448.94 L38.60 446.80 L39.31 444.66 L40.19 442.52 L41.24 440.38 L42.45 438.25 L43.77 436.11 L45.16 433.97 L46.53 431.83 L47.79 429.69 L48.86 427.55 L49.65 425.42 L50.10 423.28 L50.16 421.14 L49.84 419.00 L49.15 416.86 L48.15 414.72 L46.92 412.58 L45.55 410.45 L44.13 408.31 L42.75 406.17 L41.46 404.03 L40.31 401.89 L39.33 399.75 L38.52 397.62 L37.88 395.48 L37.40 393.34 L37.03 391.20 L36.77 389.06 L36.58 386.92 L36.46 384.78 L36.37 382.65 L36.31 380.51 L36.27 378.37 L36.23 376.23 L36.21 374.09 L36.19 371.95 L36.17 369.82 L36.16 367.68 L36.14 365.54 L36.13 363.40 L36.11 361.26 L36.10 359.12 L36.08 356.98 L36.07 354.85 L36.05 352.71 L36.04 350.57 L36.02 348.43 L36.01 346.29 L36.00 344.15 L35.99 342.02 L36.00 339.88 L36.04 337.74 L36.12 335.60 L36.27 333.46 L36.54 331.32 L36.98 329.18 L37.62 327.05 L38.48 324.91 L39.51 322.77 L40.61 320.63 L41.63 318.49 L42.41 316.35 L42.80 314.22 L42.71 312.08 L42.16 309.94 L41.25 307.80 L40.12 305.66 L38.95 303.52 L37.87 301.38 L36.98 299.25 L36.30 297.11 L35.83 294.97 L35.51 292.83 L35.31 290.69 L35.18 288.55 L35.10 286.42 L35.04 284.28 L35.00 282.14 L34.96 280.00 L34.92 277.86 L34.88 275.72 L34.84 273.58 L34.81 271.45 L34.77 269.31 L34.73 267.17 L34.69 265.03 L34.66 262.89 L34.62 260.75 L34.58 258.62 L34.54 256.48 L34.51 254.34 L34.47 252.20 L34.43 250.06 L34.39 247.92 L34.36 245.78 L34.32 243.65 L34.28 241.51 L34.25 239.37 L34.22 237.23 L34.23 235.09 L34.29 232.95 L34.46 230.82 L34.82 228.68 L35.45 226.54 L36.36 224.40 L37.46 222.26 L38.55 220.12 L39.33 217.98 L39.55 215.85 L39.13 213.71 L38.19 211.57 L37.00 209.43 L35.85 207.29 L34.92 205.15 L34.27 203.02 L33.88 200.88 L33.66 198.74 L33.54 196.60 L33.47 194.46 L33.42 192.32 L33.38 190.18 L33.34 188.05 L33.31 185.91 L33.27 183.77 L33.23 181.63 L33.19 179.49 L33.16 177.35 L33.12 175.22 L33.08 173.08 L33.04 170.94 L33.01 168.80 L32.97 166.66 L32.93 164.52 L32.89 162.38 L32.86 160.25 L32.82 158.11 L32.78 155.97 L32.74 153.83 L32.71 151.69 L32.67 149.55 L32.64 147.42 L32.61 145.28 L32.62 143.14 L32.71 141.00 L32.96 138.86 L33.46 136.72 L34.26 134.58 L35.29 132.45 L36.28 130.31 L36.89 128.17 L36.85 126.03 L36.17 123.89 L35.10 121.75 L34.00 119.62 L33.12 117.48 L32.54 115.34 L32.22 113.20 L32.06 111.06 L31.98 108.92 L31.92 106.78 L31.88 104.65 L31.84 102.51 L31.81 100.37 L31.77 98.23 L31.73 96.09 L31.69 93.95 L31.66 91.82 L31.62 89.68 L31.58 87.54 L31.54 85.40 L31.51 83.26 L31.47 81.12 L31.43 78.98 L31.39 76.85 L31.36 74.71 L31.34 72.57 L31.36 70.43 L31.50 68.29 L31.86 66.15 L32.51 64.02 L33.37 61.88 L34.14 59.74 L34.44 57.60 L34.07 55.46 L33.22 53.32 L32.28 51.18 L31.56 49.05 L31.13 46.91 L30.91 44.77 L30.81 42.63 L30.76 40.49 L30.72 38.35 L30.68 36.22 L30.64 34.08 L30.61 31.94 L30.57 29.80 L30.53 27.66 L30.49 25.52 L30.46 23.38 L30.42 21.25 L30.38 19.11 L30.23 16.97 L30.07 14.83 L29.90 12.69 L29.74 10.55 L29.59 8.42 L29.43 6.28 L29.29 4.14 L29.14 2.00 Z" />
            </clipPath>
          </defs>
          <path
            className="MtMkzyno"
            d="M28 0 26.86 2.00 L26.71 4.14 L26.57 6.28 L26.41 8.42 L26.26 10.55 L26.10 12.69 L25.93 14.83 L25.77 16.97 L25.62 19.11 L25.58 21.25 L25.54 23.38 L25.51 25.52 L25.47 27.66 L25.43 29.80 L25.39 31.94 L25.36 34.08 L25.32 36.22 L25.28 38.35 L25.24 40.49 L25.19 42.63 L25.09 44.77 L24.87 46.91 L24.44 49.05 L23.72 51.18 L22.78 53.32 L21.93 55.46 L21.56 57.60 L21.86 59.74 L22.63 61.88 L23.49 64.02 L24.14 66.15 L24.50 68.29 L24.64 70.43 L24.66 72.57 L24.64 74.71 L24.61 76.85 L24.57 78.98 L24.53 81.12 L24.49 83.26 L24.46 85.40 L24.42 87.54 L24.38 89.68 L24.34 91.82 L24.31 93.95 L24.27 96.09 L24.23 98.23 L24.19 100.37 L24.16 102.51 L24.12 104.65 L24.08 106.78 L24.02 108.92 L23.94 111.06 L23.78 113.20 L23.46 115.34 L22.88 117.48 L22.00 119.62 L20.90 121.75 L19.83 123.89 L19.15 126.03 L19.11 128.17 L19.72 130.31 L20.71 132.45 L21.74 134.58 L22.54 136.72 L23.04 138.86 L23.29 141.00 L23.38 143.14 L23.39 145.28 L23.36 147.42 L23.33 149.55 L23.29 151.69 L23.26 153.83 L23.22 155.97 L23.18 158.11 L23.14 160.25 L23.11 162.38 L23.07 164.52 L23.03 166.66 L22.99 168.80 L22.96 170.94 L22.92 173.08 L22.88 175.22 L22.84 177.35 L22.81 179.49 L22.77 181.63 L22.73 183.77 L22.69 185.91 L22.66 188.05 L22.62 190.18 L22.58 192.32 L22.53 194.46 L22.46 196.60 L22.34 198.74 L22.12 200.88 L21.73 203.02 L21.08 205.15 L20.15 207.29 L19.00 209.43 L17.81 211.57 L16.87 213.71 L16.45 215.85 L16.67 217.98 L17.45 220.12 L18.54 222.26 L19.64 224.40 L20.55 226.54 L21.18 228.68 L21.54 230.82 L21.71 232.95 L21.77 235.09 L21.78 237.23 L21.75 239.37 L21.72 241.51 L21.68 243.65 L21.64 245.78 L21.61 247.92 L21.57 250.06 L21.53 252.20 L21.49 254.34 L21.46 256.48 L21.42 258.62 L21.38 260.75 L21.34 262.89 L21.31 265.03 L21.27 267.17 L21.23 269.31 L21.19 271.45 L21.16 273.58 L21.12 275.72 L21.08 277.86 L21.04 280.00 L21.00 282.14 L20.96 284.28 L20.90 286.42 L20.82 288.55 L20.69 290.69 L20.49 292.83 L20.17 294.97 L19.70 297.11 L19.02 299.25 L18.13 301.38 L17.05 303.52 L15.88 305.66 L14.75 307.80 L13.84 309.94 L13.29 312.08 L13.20 314.22 L13.59 316.35 L14.37 318.49 L15.39 320.63 L16.49 322.77 L17.52 324.91 L18.38 327.05 L19.02 329.18 L19.46 331.32 L19.73 333.46 L19.88 335.60 L19.96 337.74 L20.00 339.88 L20.01 342.02 L20.00 344.15 L19.99 346.29 L19.98 348.43 L19.96 350.57 L19.95 352.71 L19.93 354.85 L19.92 356.98 L19.90 359.12 L19.89 361.26 L19.87 363.40 L19.86 365.54 L19.84 367.68 L19.83 369.82 L19.81 371.95 L19.79 374.09 L19.77 376.23 L19.73 378.37 L19.69 380.51 L19.63 382.65 L19.54 384.78 L19.42 386.92 L19.23 389.06 L18.97 391.20 L18.60 393.34 L18.12 395.48 L17.48 397.62 L16.67 399.75 L15.69 401.89 L14.54 404.03 L13.25 406.17 L11.87 408.31 L10.45 410.45 L9.08 412.58 L7.85 414.72 L6.85 416.86 L6.16 419.00 L5.84 421.14 L5.90 423.28 L6.35 425.42 L7.14 427.55 L8.21 429.69 L9.47 431.83 L10.84 433.97 L12.23 436.11 L13.55 438.25 L14.76 440.38 L15.81 442.52 L16.69 444.66 L17.40 446.80 L17.95 448.94 L18.35 451.08 L18.64 453.22 L18.84 455.35 L18.97 457.49 L19.05 459.63 L19.10 461.77 L19.12 463.91 L19.12 466.05 L19.11 468.18 L19.08 470.32 L19.04 472.46 L18.97 474.60 L18.85 476.74 L18.66 478.88 L18.37 481.02 L17.95 483.15 L17.36 485.29 L16.56 487.43 L15.55 489.57 L14.34 491.71 L12.98 493.85 L11.57 495.98 L10.22 498.12 L9.07 500.26 L8.25 502.40 L7.86 504.54 L7.94 506.68 L8.48 508.82 L9.42 510.95 L10.64 513.09 L12.00 515.23 L13.37 517.37 L14.64 519.51 L15.75 521.65 L16.64 523.78 L17.26 525.92 L17.51 528.06 L17.49 530.20 L17.25 532.34 L16.84 534.48 L16.29 536.62 L15.64 538.75 L14.90 540.89 L14.09 543.03 L13.21 545.17 L12.28 547.31 L11.29 549.45 L10.72 551.58 L11.53 553.72 L14.63 555.86 L28.00 558.00 Z"
            fill="#1a1a1e"
          />
          <g clipPath="url(#tm-elder-clip)">
            {/* Deathly Hallows Emblem near wand grip */}
            <circle cx="28" cy="460" r="10" stroke="#00e5ff" strokeWidth="1.2" fill="none" opacity="0.8" />
            <polygon points="28,446 17,470 39,470" stroke="#00e5ff" strokeWidth="1.2" fill="none" opacity="0.8" />
            <line x1="28" y1="446" x2="28" y2="470" stroke="#00e5ff" strokeWidth="1.2" opacity="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
