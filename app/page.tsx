import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Work from "@/components/Work";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Guestbook from "@/components/Guestbook";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="wueBDJtZ" id="main" tabIndex={-1}>
        <Hero />
        <Features />
        <Work />
        <About />
        <Blog />
        <Guestbook />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
