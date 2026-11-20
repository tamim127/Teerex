import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamiul Alam — AI Full-Stack Engineer",
  description: "AI full-stack engineer building production web apps end to end, from polished interfaces to LLM features. Remote from Bangladesh, 3+ years shipping.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="dark gCDjjq_variable pcxXmG_variable _2QVhuG_variable">
      <body className="OZysujzw bg-[#0d0d0f] text-[#f4f4f6] antialiased selection:bg-[#f472b6] selection:text-white">
        {children}
      </body>
    </html>
  );
}
