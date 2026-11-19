"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  id: string;
  href: string;
  label: string;
  width: number;
  offset: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: "/", href: "/", label: "Home", width: 70, offset: 0 },
  { id: "/about", href: "/about", label: "About", width: 71, offset: 70 },
  { id: "/projects", href: "/projects", label: "Work", width: 66, offset: 141 },
  { id: "/blog", href: "/blog", label: "Blog", width: 61, offset: 207 },
];

interface MoreItem {
  href: string;
  title: string;
  description: string;
  tint: string;
  tintGradient: string;
  shot: {
    light: string;
    dark: string;
  };
  icon: React.ReactNode;
}

const MORE_ITEMS: MoreItem[] = [
  {
    href: "/guestbook",
    title: "Guestbook",
    description: "Sign it, say hi",
    tint: "amber",
    tintGradient: "from-[#ffd666] to-[#d97706]",
    shot: {
      light: "/cmdk/guestbook-899bbf86-light.webp",
      dark: "/cmdk/guestbook-899bbf86-dark.webp",
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-4 text-white">
        <path d="M232,48H168a32,32,0,0,0-32,32v87.73a8.17,8.17,0,0,1-7.47,8.25,8,8,0,0,1-8.53-8V80A32,32,0,0,0,88,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,23.94,7.9,7.9,0,0,0,5.12,7.55A8,8,0,0,0,136,232a24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM208,168H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,168Zm0-32H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,136Zm0-32H168.27A8.17,8.17,0,0,1,160,96.53,8,8,0,0,1,168,88h39.73A8.17,8.17,0,0,1,216,95.47,8,8,0,0,1,208,104Z" />
      </svg>
    ),
  },
  {
    href: "/bucket-list",
    title: "Bucket List",
    description: "Goals and adventures, some done",
    tint: "rose",
    tintGradient: "from-[#ffa3b1] to-[#e11d48]",
    shot: {
      light: "/cmdk/bucket-list-ea749768-light.webp",
      dark: "/cmdk/bucket-list-ea749768-dark.webp",
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-4 text-white">
        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM117.66,149.66l-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L80,164.69l26.34-26.35a8,8,0,0,1,11.32,11.32Zm0-64-32,32a8,8,0,0,1-11.32,0l-16-16A8,8,0,0,1,69.66,90.34L80,100.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM192,168H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-64H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Z" />
      </svg>
    ),
  },
  {
    href: "/uses",
    title: "Uses",
    description: "Tools, software and gear I use",
    tint: "slate",
    tintGradient: "from-[#9aa6b8] to-[#4b5567]",
    shot: {
      light: "/cmdk/uses-light.webp",
      dark: "/cmdk/uses-dark.webp",
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-4 text-white">
        <path d="M232,168h-8V72a24,24,0,0,0-24-24H56A24,24,0,0,0,32,72v96H24a8,8,0,0,0-8,8v16a24,24,0,0,0,24,24H216a24,24,0,0,0,24-24V176A8,8,0,0,0,232,168ZM112,72h32a8,8,0,0,1,0,16H112a8,8,0,0,1,0-16ZM224,192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8v-8H224Z" />
      </svg>
    ),
  },
  {
    href: "/attribution",
    title: "Colophon",
    description: "How this site came together",
    tint: "pink",
    tintGradient: "from-[#ffa6d6] to-[#db2777]",
    shot: {
      light: "/cmdk/colophon-light.webp",
      dark: "/cmdk/colophon-dark.webp",
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-4 text-white">
        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM92.8,145.6a8,8,0,1,1-9.6,12.8l-32-24a8,8,0,0,1,0-12.8l32-24a8,8,0,0,1,9.6,12.8L69.33,128Zm58.89-71.4-32,112a8,8,0,1,1-15.38-4.4l32-112a8,8,0,0,1,15.38,4.4Zm53.11,60.2-32,24a8,8,0,0,1-9.6-12.8L186.67,128,163.2,110.4a8,8,0,1,1,9.6-12.8l32,24a8,8,0,0,1,0,12.8Z" />
      </svg>
    ),
  },
  {
    href: "/links",
    title: "Links",
    description: "Every profile in one place",
    tint: "sky",
    tintGradient: "from-[#86d8ff] to-[#0284c7]",
    shot: {
      light: "/cmdk/links-99fbdc14-light.webp",
      dark: "/cmdk/links-99fbdc14-dark.webp",
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-4 text-white">
        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM115.7,192.49a43.31,43.31,0,0,1-55-66.43l25.37-25.37a43.35,43.35,0,0,1,61.25,0,42.9,42.9,0,0,1,9.95,15.43,8,8,0,1,1-15,5.6A27.33,27.33,0,0,0,97.37,112L72,137.37a27.32,27.32,0,0,0,34.68,41.91,8,8,0,1,1,9,13.21Zm79.61-62.55-25.37,25.37A43,43,0,0,1,139.32,168h0a43.35,43.35,0,0,1-40.53-28.12,8,8,0,1,1,15-5.6A27.35,27.35,0,0,0,139.28,152h0a27.14,27.14,0,0,0,19.32-8L184,118.63a27.32,27.32,0,0,0-34.68-41.91,8,8,0,1,1-9-13.21,43.32,43.32,0,0,1,55,66.43Z" />
      </svg>
    ),
  },
];

interface CommandResult {
  id: string;
  category: "Latest" | "Pages" | "More" | "Elsewhere";
  title: string;
  type: string;
  href?: string;
  action?: string;
  description?: string;
  tags?: string;
  image?: string;
  tint?: string;
  icon?: React.ReactNode;
}

const COMMAND_RESULTS: CommandResult[] = [
  {
    id: "latest-post",
    category: "Latest",
    title: "Microsoft 365 Outage: Why Every Reboot Failed",
    type: "Post",
    href: "/blog/microsoft-365-outage-system-design-lessons",
    description: "Microsoft 365 went down for 1.5 days with no extra traffic. How health checks, TLS handshakes and reconnecting clients kept knocking servers over.",
    tags: "system-design · reliability · incidents",
    image: "/blog/microsoft-365-outage-system-design-lessons/cover-reboot-failed-8c5a9d57.webp",
  },
  {
    id: "latest-project",
    category: "Latest",
    title: "Keythm",
    type: "Project",
    href: "/projects/keythm",
    description: "Interactive rhythm and typing experience built with Next.js, Web Audio, and canvas.",
    tags: "nextjs · audio · interactive",
    image: "/projects/keythm/screen1.png",
  },
  {
    id: "page-home",
    category: "Pages",
    title: "Home",
    type: "Page",
    href: "/",
    tint: "from-[#6aa6ff] to-[#2563eb]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z" />
      </svg>
    ),
  },
  {
    id: "page-about",
    category: "Pages",
    title: "About",
    type: "Page",
    href: "/about",
    tint: "from-[#5ee9d5] to-[#0f8f84]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z" />
      </svg>
    ),
  },
  {
    id: "page-work",
    category: "Pages",
    title: "Work",
    type: "Page",
    href: "/projects",
    tint: "from-[#b49cff] to-[#6d28d9]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208h0a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64,123.2,86.4A8,8,0,0,0,128,88h72v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Z" />
      </svg>
    ),
  },
  {
    id: "page-blog",
    category: "Pages",
    title: "Blog",
    type: "Page",
    href: "/blog",
    tint: "from-[#ffb877] to-[#ea580c]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,176H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm-8-56V44l44,44Z" />
      </svg>
    ),
  },
  {
    id: "page-contact",
    category: "Pages",
    title: "Contact",
    type: "Page",
    href: "/contact",
    tint: "from-[#5be08b] to-[#16a34a]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z" />
      </svg>
    ),
  },
  {
    id: "more-guestbook",
    category: "More",
    title: "Guestbook",
    type: "Page",
    href: "/guestbook",
    tint: "from-[#ffd666] to-[#d97706]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M232,48H168a32,32,0,0,0-32,32v87.73a8.17,8.17,0,0,1-7.47,8.25,8,8,0,0,1-8.53-8V80A32,32,0,0,0,88,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,23.94,7.9,7.9,0,0,0,5.12,7.55A8,8,0,0,0,136,232a24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM208,168H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,168Zm0-32H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,136Zm0-32H168.27A8.17,8.17,0,0,1,160,96.53,8,8,0,0,1,168,88h39.73A8.17,8.17,0,0,1,216,95.47,8,8,0,0,1,208,104Z" />
      </svg>
    ),
  },
  {
    id: "more-bucket",
    category: "More",
    title: "Bucket List",
    type: "Page",
    href: "/bucket-list",
    tint: "from-[#ffa3b1] to-[#e11d48]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM117.66,149.66l-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L80,164.69l26.34-26.35a8,8,0,0,1,11.32,11.32Zm0-64-32,32a8,8,0,0,1-11.32,0l-16-16A8,8,0,0,1,69.66,90.34L80,100.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM192,168H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-64H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Z" />
      </svg>
    ),
  },
  {
    id: "more-uses",
    category: "More",
    title: "Uses",
    type: "Page",
    href: "/uses",
    tint: "from-[#9aa6b8] to-[#4b5567]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M232,168h-8V72a24,24,0,0,0-24-24H56A24,24,0,0,0,32,72v96H24a8,8,0,0,0-8,8v16a24,24,0,0,0,24,24H216a24,24,0,0,0,24-24V176A8,8,0,0,0,232,168ZM112,72h32a8,8,0,0,1,0,16H112a8,8,0,0,1,0-16ZM224,192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8v-8H224Z" />
      </svg>
    ),
  },
  {
    id: "more-colophon",
    category: "More",
    title: "Colophon",
    type: "Page",
    href: "/attribution",
    tint: "from-[#ffa6d6] to-[#db2777]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM92.8,145.6a8,8,0,1,1-9.6,12.8l-32-24a8,8,0,0,1,0-12.8l32-24a8,8,0,0,1,9.6,12.8L69.33,128Zm58.89-71.4-32,112a8,8,0,1,1-15.38-4.4l32-112a8,8,0,0,1,15.38,4.4Zm53.11,60.2-32,24a8,8,0,0,1-9.6-12.8L186.67,128,163.2,110.4a8,8,0,1,1,9.6-12.8l32,24a8,8,0,0,1,0,12.8Z" />
      </svg>
    ),
  },
  {
    id: "more-links",
    category: "More",
    title: "Links",
    type: "Page",
    href: "/links",
    tint: "from-[#86d8ff] to-[#0284c7]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM115.7,192.49a43.31,43.31,0,0,1-55-66.43l25.37-25.37a43.35,43.35,0,0,1,61.25,0,42.9,42.9,0,0,1,9.95,15.43,8,8,0,1,1-15,5.6A27.33,27.33,0,0,0,97.37,112L72,137.37a27.32,27.32,0,0,0,34.68,41.91,8,8,0,1,1,9,13.21Zm79.61-62.55-25.37,25.37A43,43,0,0,1,139.32,168h0a43.35,43.35,0,0,1-40.53-28.12,8,8,0,1,1,15-5.6A27.35,27.35,0,0,0,139.28,152h0a27.14,27.14,0,0,0,19.32-8L184,118.63a27.32,27.32,0,0,0-34.68-41.91,8,8,0,1,1-9-13.21,43.32,43.32,0,0,1,55,66.43Z" />
      </svg>
    ),
  },
  {
    id: "elsewhere-github",
    category: "Elsewhere",
    title: "GitHub",
    type: "Link",
    href: "https://github.com/tamim127",
    tint: "from-[#5a5a5f] to-[#1c1c1f]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z" />
      </svg>
    ),
  },
  {
    id: "elsewhere-linkedin",
    category: "Elsewhere",
    title: "LinkedIn",
    type: "Link",
    href: "https://linkedin.com/in/tamiulalam",
    tint: "from-[#3f95e6] to-[#0a66c2]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
      </svg>
    ),
  },
  {
    id: "elsewhere-x",
    category: "Elsewhere",
    title: "X (Twitter)",
    type: "Link",
    href: "https://x.com/tamiulalam",
    tint: "from-[#5a5a5f] to-[#1c1c1f]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M215,219.85a8,8,0,0,1-7,4.15H160a8,8,0,0,1-6.75-3.71l-40.49-63.63L53.92,221.38a8,8,0,0,1-11.84-10.76l61.77-68L41.25,44.3A8,8,0,0,1,48,32H96a8,8,0,0,1,6.75,3.71l40.49,63.63,58.84-64.72a8,8,0,0,1,11.84,10.76l-61.77,67.95,62.6,98.38A8,8,0,0,1,215,219.85Z" />
      </svg>
    ),
  },
  {
    id: "elsewhere-whatsapp",
    category: "Elsewhere",
    title: "WhatsApp",
    type: "Link",
    href: "https://wa.me/8801833866581",
    tint: "from-[#25D366] to-[#128C7E]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M187.58,144.84l-25-12a8,8,0,0,0-8,.8l-14.61,11a78.83,78.83,0,0,1-35.59-35.59l11-14.61a8,8,0,0,0,.8-8l-12-25a8.08,8.08,0,0,0-10.19-4.23l-24,8A8,8,0,0,0,64,76,120.12,120.12,0,0,0,180,192a8,8,0,0,0,7.6-4.95l8-24A8.05,8.05,0,0,0,187.58,144.84ZM128,24A104,104,0,0,0,36.18,176.88L24.83,219a8,8,0,0,0,9.81,9.81l42.16-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L49.6,210.36l6.94-27.79a8,8,0,0,0-.68-6.54A88,88,0,1,1,128,216Z" />
      </svg>
    ),
  },
  {
    id: "elsewhere-calendly",
    category: "Elsewhere",
    title: "Book a Call (Calendly)",
    type: "Link",
    href: "https://calendly.com/tamiul-dev/30min",
    tint: "from-[#006BFF] to-[#0047B3]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z" />
      </svg>
    ),
  },
  {
    id: "elsewhere-copy-email",
    category: "Elsewhere",
    title: "Copy email",
    type: "Action",
    action: "copy-email",
    tint: "from-[#5be08b] to-[#16a34a]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3 text-white">
        <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [selectedMoreIdx, setSelectedMoreIdx] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<NavItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Determine active item from current route
  const activeItem = NAV_ITEMS.find((item) => {
    if (item.href === "/") return pathname === "/";
    if (item.href === "/projects") return pathname.startsWith("/projects") || pathname.startsWith("/work");
    return pathname.startsWith(item.href);
  });

  const isMoreRouteActive = MORE_ITEMS.some((item) => pathname.startsWith(item.href));

  // Determine indicator position and size
  const currentIndicator = hoveredTab || (isMoreRouteActive ? { width: 84, offset: 268 } : activeItem);
  const indicatorWidth = currentIndicator ? currentIndicator.width : 0;
  const indicatorTransform = currentIndicator ? (currentIndicator.offset === 0 ? "none" : `translateX(${currentIndicator.offset}px)`) : "none";

  // Active More Item for Preview
  const activeMoreItem = MORE_ITEMS[selectedMoreIdx] || MORE_ITEMS[0];

  // Set default selected index based on current URL when dropdown opens
  useEffect(() => {
    if (isMoreOpen) {
      const currentIdx = MORE_ITEMS.findIndex((item) => pathname.startsWith(item.href));
      if (currentIdx !== -1) {
        setSelectedMoreIdx(currentIdx);
      }
    }
  }, [isMoreOpen, pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global keydown for ⌘K / Ctrl+K and Esc
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMoreOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus search input when dialog opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      setSelectedIdx(0);
    }
  }, [isSearchOpen]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(openTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMoreMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setHoveredTab({ id: "more", href: "", label: "More", width: 84, offset: 268 });
    openTimeoutRef.current = setTimeout(() => {
      setIsMoreOpen(true);
    }, 120);
  };

  const handleMoreMouseLeave = () => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsMoreOpen(false);
    }, 250);
  };

  const handleDropdownBodyMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
  };

  const handleDropdownBodyMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsMoreOpen(false);
    }, 250);
  };

  // Filtered search results
  const filteredResults = COMMAND_RESULTS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.tags?.toLowerCase().includes(q)
    );
  });

  const activeResult = filteredResults[selectedIdx] || filteredResults[0];

  const handleSelectResult = (item: CommandResult) => {
    if (item.action === "copy-email") {
      navigator.clipboard.writeText("tamiul.dev@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      return;
    }
    if (item.href) {
      setIsSearchOpen(false);
      if (item.href.startsWith("http")) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeResult) {
        handleSelectResult(activeResult);
      }
    }
  };

  return (
    <>
      <div hidden={true}></div>
      <a className="tEP7xTCS" href="#main">
        Skip to content
      </a>
      <div aria-hidden="true" className="egXUCMVF" data-top-fade="true"></div>

      <header className="LDwyKDLM" data-site-header="">
        <nav className="cIB3Vvwv container">
          {/* Brand Logo Monogram */}
          <Link aria-label="Homepage" className="vTovxkJs" href="/">
            <svg className="size-7.5" viewBox="0 0 5350 5350" xmlns="http://www.w3.org/2000/svg">
              <path
                className="xlGzLZsj"
                d="M 800 650 L 2380 650 A 70 70 0 0 1 2450 720 L 2450 1140 A 70 70 0 0 1 2380 1210 L 1730 1210 L 1730 4000 A 70 70 0 0 1 1660 4070 L 1240 4070 A 70 70 0 0 1 1170 4000 L 1170 1210 L 520 1210 A 70 70 0 0 1 458 1128 L 738 678 A 70 70 0 0 1 800 650 Z"
              />
              <path
                className="xlGzLZsj"
                d="M 2820 650 L 3310 650 A 70 70 0 0 1 3373 690 L 3850 1560 L 4327 690 A 70 70 0 0 1 4390 650 L 4880 650 A 70 70 0 0 1 4950 720 L 4950 4000 A 70 70 0 0 1 4880 4070 L 4460 4070 A 70 70 0 0 1 4390 4000 L 4390 2050 L 3915 2915 A 70 70 0 0 1 3785 2915 L 3310 2050 L 3310 4000 A 70 70 0 0 1 3240 4070 L 2820 4070 A 70 70 0 0 1 2750 4000 L 2750 720 A 70 70 0 0 1 2820 650 Z"
              />
            </svg>
          </Link>

          {/* Central Pill Navigation */}
          <div className="TxJWQrXF" ref={navContainerRef}>
            <div className="YY778nJx">
              {/* Spacer Placeholder setting width */}
              <div
                aria-hidden="true"
                className="r7rXnV7I"
                style={{ width: isMoreOpen ? "464px" : "464px" }}
              />

              {/* Seamless Pill / Expandable Dropdown Container */}
              <div
                className={`viTwDePg glass-pill ${isMoreOpen ? "lWhLmzZe" : ""}`}
                id="js-nav-content"
                style={{
                  borderRadius: "22px",
                  opacity: 1,
                  width: isMoreOpen ? "612px" : "464px",
                  height: isMoreOpen ? "326px" : "44px",
                  transition: "width 0.32s cubic-bezier(0.32, 0.72, 0, 1), height 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
                  overflow: "hidden",
                }}
                onMouseEnter={handleDropdownBodyMouseEnter}
                onMouseLeave={handleDropdownBodyMouseLeave}
              >
                {/* 1. Desktop View (>= 1024px) */}
                <div className="nav-desktop-view w-full h-full">
                  <div className="YcnvxVaA">
                    {/* Top Row: Items + More + Book a Call */}
                    <div className="UTH4R7lB" onMouseLeave={() => setHoveredTab(null)}>
                      {/* Active Indicator Chip */}
                      <span
                        className="FB1eHA3B pointer-events-none"
                        style={{
                          width: `${indicatorWidth}px`,
                          opacity: indicatorWidth > 0 ? 0.85 : 0,
                          transform: indicatorTransform,
                          transition: "transform 0.24s cubic-bezier(0.32, 0.72, 0, 1), width 0.24s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.2s ease",
                        }}
                      />

                      <ul className="bjccYXPY">
                        {NAV_ITEMS.map((item) => {
                          const isActive =
                            item.href === "/"
                              ? pathname === "/"
                              : item.href === "/projects"
                              ? pathname.startsWith("/projects") || pathname.startsWith("/work")
                              : pathname.startsWith(item.href);
                          return (
                            <li
                              key={item.id}
                              className="YLupmxaw"
                              data-nav-id={item.id}
                              onMouseEnter={() => {
                                setHoveredTab(item);
                                if (isMoreOpen) handleMoreMouseLeave();
                              }}
                            >
                              <Link
                                aria-current={isActive ? "page" : undefined}
                                className={`MaHFwS0N rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:focus-visible:ring-white/25 ${
                                  isActive ? "EohvOtfJ" : "jf0l9ROJ"
                                }`}
                                href={item.href}
                              >
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}

                        {/* More Button */}
                        <li
                          className="YLupmxaw relative"
                          data-nav-id="more-dropdown"
                          onMouseEnter={handleMoreMouseEnter}
                          onMouseLeave={handleMoreMouseLeave}
                        >
                          <button
                            aria-expanded={isMoreOpen}
                            aria-haspopup="true"
                            className={`yR1LBoBj rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:focus-visible:ring-white/25 cursor-pointer ${
                              isMoreRouteActive || isMoreOpen ? "EohvOtfJ" : "jf0l9ROJ"
                            }`}
                            type="button"
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                          >
                            <span className="gFlNue09">
                              <span aria-hidden="true" className="PSfHqSF3">
                                More
                              </span>
                              <span className="TugXYmIm">More</span>
                            </span>
                            <svg
                              fill="none"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`U1lOidJ7 size-3.5 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
                            >
                              <path
                                d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </button>
                        </li>

                        {/* Book a Call Button */}
                        <li
                          className="oZtEZu3B"
                          data-nav-id="/contact"
                          onMouseEnter={() => {
                            if (isMoreOpen) handleMoreMouseLeave();
                          }}
                        >
                          <a
                            className="mfY05KOD wu9g7sY6"
                            href="https://calendly.com/tamiul-dev/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Book a Call
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Expanded Dropdown Content (Matches User Screenshot & Reference Site) */}
                    {isMoreOpen && (
                      <div
                        className="HTcz4I92 animate-in fade-in-0 duration-200"
                        onMouseEnter={handleDropdownBodyMouseEnter}
                        onMouseLeave={handleDropdownBodyMouseLeave}
                      >
                        {/* 2-Column Split: Menu Items List + Live Interactive Preview */}
                        <div className="KTJGmcbK">
                          {/* Left Column: Subpages List */}
                          <ul className="vvfnK7iR">
                            {MORE_ITEMS.map((item, idx) => {
                              const isSelected = idx === selectedMoreIdx;
                              const isCurrent = pathname.startsWith(item.href);

                              return (
                                <li className="A98AvHDD" key={item.href}>
                                  <Link
                                    aria-current={isCurrent ? "page" : undefined}
                                    className="AfeFrmww relative flex items-center gap-3 px-2.5 py-1.5 rounded-[10px] text-left transition-colors"
                                    data-cuelume-navigate="select"
                                    href={item.href}
                                    onMouseEnter={() => setSelectedMoreIdx(idx)}
                                    onFocus={() => setSelectedMoreIdx(idx)}
                                    onClick={() => setIsMoreOpen(false)}
                                  >
                                    {/* Active Highlight Pill */}
                                    {isSelected && (
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 rounded-[10px] bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] pointer-events-none transition-all duration-150"
                                      />
                                    )}

                                    {/* Tinted Gradient Icon */}
                                    <span
                                      className={`relative flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-b shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_3px_rgba(0,0,0,0.3)] ${item.tintGradient}`}
                                    >
                                      {item.icon}
                                    </span>

                                    {/* Titles & Descriptions */}
                                    <span className="UcHojnm0 flex flex-col flex-1 min-w-0">
                                      <span className="aPi30Rka text-[13.5px] font-medium text-white/90 leading-tight">
                                        {item.title}
                                      </span>
                                      <span className="i8uhGPFK text-[11px] text-neutral-400 truncate leading-tight mt-0.5">
                                        {item.description}
                                      </span>
                                    </span>

                                    {/* Current indicator */}
                                    {isCurrent && (
                                      <span className="AY0sZtdB text-[11px] text-blue-400 font-medium shrink-0">
                                        Current
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>

                          {/* Right Column: Visual Preview Card */}
                          <div className="B10ibJY9 flex flex-col gap-2">
                            <div className="Y5wdnXKj relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900/60 shadow-inner">
                              <img
                                alt={activeMoreItem.title}
                                className="absolute inset-0 size-full object-cover object-top transition-opacity duration-200"
                                src={activeMoreItem.shot.dark}
                              />
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                              />
                            </div>
                            <div className="MGeZZ5dU flex items-center justify-between px-1 text-[11.5px]">
                              <span className="Ld2dhrN2 font-medium text-white/80">{activeMoreItem.title}</span>
                              <span className="mnWRQLjO text-neutral-500 font-mono text-[11px]">
                                tamiulalam.com{activeMoreItem.href}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Integrated Search Bar */}
                        <button
                          className="WPM70boD group/search w-full mt-2.5 pt-2 flex items-center justify-between border-t border-white/[0.08] px-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          data-command-menu-trigger=""
                          type="button"
                          onClick={() => {
                            setIsMoreOpen(false);
                            setIsSearchOpen(true);
                          }}
                        >
                          <span className="s93OBtdY flex items-center gap-2 text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                              className="size-3.5"
                            >
                              <path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                            </svg>
                            Search posts, projects and pages
                          </span>
                          <span className="ar2YuVQ4 flex items-center gap-1">
                            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-300">
                              ⌘
                            </kbd>
                            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-300">
                              K
                            </kbd>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Mobile View (< 1024px) - Clean single pill without any overlapping button */}
                <div className="nav-mobile-view w-full h-full">
                  <div className="sB07pUME flex items-center justify-center h-full">
                    <button
                      aria-label="Open menu"
                      className="flex w-full cursor-pointer items-center justify-between px-3.5 py-1.5 outline-none"
                      data-command-menu-trigger=""
                      draggable="false"
                      type="button"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <svg className="ZclEPDsZ size-6 shrink-0" viewBox="0 0 5350 5350" xmlns="http://www.w3.org/2000/svg">
                        <path
                          className="xlGzLZsj"
                          d="M 800 650 L 2380 650 A 70 70 0 0 1 2450 720 L 2450 1140 A 70 70 0 0 1 2380 1210 L 1730 1210 L 1730 4000 A 70 70 0 0 1 1660 4070 L 1240 4070 A 70 70 0 0 1 1170 4000 L 1170 1210 L 520 1210 A 70 70 0 0 1 458 1128 L 738 678 A 70 70 0 0 1 800 650 Z"
                        />
                        <path
                          className="xlGzLZsj"
                          d="M 2820 650 L 3310 650 A 70 70 0 0 1 3373 690 L 3850 1560 L 4327 690 A 70 70 0 0 1 4390 650 L 4880 650 A 70 70 0 0 1 4950 720 L 4950 4000 A 70 70 0 0 1 4880 4070 L 4460 4070 A 70 70 0 0 1 4390 4000 L 4390 2050 L 3915 2915 A 70 70 0 0 1 3785 2915 L 3310 2050 L 3310 4000 A 70 70 0 0 1 3240 4070 L 2820 4070 A 70 70 0 0 1 2750 4000 L 2750 720 A 70 70 0 0 1 2820 650 Z"
                        />
                      </svg>
                      <span className="iOCBjBZ4 font-medium text-white/90 text-sm">tamim</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Search (⌘K) Trigger Button */}
            <button
              aria-label="Search (⌘K)"
              className={`Qq36h3Tu group/search size-9 glass-pill QUG9utTP cursor-pointer transition-all duration-200 ${
                isMoreOpen ? "Bwb3h0t3 opacity-0 pointer-events-none scale-90" : ""
              }`}
              data-command-menu-trigger=""
              type="button"
              onClick={() => setIsSearchOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="APYD8aRC size-4.5"
              >
                <path d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z" opacity="0.2" />
                <path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Command Menu / Search Modal (⌘K) */}
      {isSearchOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in-0 duration-200"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="group/popup relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[22px] bg-[#101012] border border-white/10 shadow-[0_22px_50px_-16px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-5 text-neutral-400">
                <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z" />
              </svg>
              <input
                ref={searchInputRef}
                aria-label="Search"
                className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
                placeholder="Search posts, projects, pages…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIdx(0);
                }}
                onKeyDown={handleSearchKeyDown}
              />
              <button
                aria-label="Close"
                className="flex size-7 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                type="button"
                onClick={() => setIsSearchOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-4">
                  <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
                </svg>
              </button>
            </div>

            {/* Results Grid / Columns */}
            <div className="flex max-h-[460px] min-h-[300px]">
              {/* Left Column: Result List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-4">
                {filteredResults.length === 0 ? (
                  <div className="py-12 text-center text-sm text-neutral-500">No results found for &ldquo;{searchQuery}&rdquo;</div>
                ) : (
                  (["Latest", "Pages", "More", "Elsewhere"] as const).map((cat) => {
                    const catItems = filteredResults.filter((item) => item.category === cat);
                    if (catItems.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1">
                        <div className="px-3 text-[11px] font-medium uppercase tracking-wider text-neutral-500">{cat}</div>
                        <div className="space-y-0.5">
                          {catItems.map((item) => {
                            const itemIndex = filteredResults.indexOf(item);
                            const isSelected = itemIndex === selectedIdx;

                            return (
                              <button
                                key={item.id}
                                className={`flex w-full items-center gap-3 px-3 py-2 rounded-xl text-left text-sm transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-neutral-300 hover:bg-white/5 hover:text-white"
                                }`}
                                type="button"
                                onMouseEnter={() => setSelectedIdx(itemIndex)}
                                onClick={() => handleSelectResult(item)}
                              >
                                {item.image ? (
                                  <span className="flex size-7 overflow-hidden rounded-lg border border-white/10 shrink-0">
                                    <img alt="" className="size-full object-cover" src={item.image} />
                                  </span>
                                ) : (
                                  <span
                                    className={`flex size-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b ${
                                      item.tint || "from-neutral-700 to-neutral-800"
                                    } shadow-sm`}
                                  >
                                    {item.icon}
                                  </span>
                                )}
                                <span className="flex-1 truncate font-medium">{item.title}</span>
                                <span className="text-[11px] text-neutral-500 group-hover:text-neutral-400">
                                  {item.type}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Live Context Preview Card (hidden on mobile) */}
              {activeResult && (
                <div className="hidden sm:flex w-72 flex-col justify-between border-l border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="flex flex-col gap-3">
                    {activeResult.image && (
                      <div className="overflow-hidden rounded-xl border border-white/10 aspect-video w-full bg-neutral-900">
                        <img alt="" className="size-full object-cover" src={activeResult.image} />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold text-white leading-snug">{activeResult.title}</h3>
                      {activeResult.description && (
                        <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                          {activeResult.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <dl className="flex flex-col gap-1.5 text-[11px] pt-3 border-t border-white/[0.06]">
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">Type</dt>
                      <dd className="text-neutral-300 font-medium">{activeResult.type}</dd>
                    </div>
                    {activeResult.tags && (
                      <div className="flex justify-between">
                        <dt className="text-neutral-500">Tags</dt>
                        <dd className="text-neutral-300">{activeResult.tags}</dd>
                      </div>
                    )}
                    {activeResult.href && (
                      <div className="flex justify-between">
                        <dt className="text-neutral-500">Destination</dt>
                        <dd className="text-neutral-300 font-mono truncate max-w-[130px]">{activeResult.href}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Guide / Action Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-white/[0.02] text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-300">
                  ↑↓
                </kbd>
                <span>Navigate</span>
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-300 ml-2">
                  ↵
                </kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2">
                {copiedEmail && <span className="text-emerald-400 font-medium">Copied!</span>}
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-300">
                  esc
                </kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
