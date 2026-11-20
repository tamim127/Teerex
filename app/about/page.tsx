import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import AboutHero from "@/components/about/AboutHero";
import AboutExperience from "@/components/about/AboutExperience";
import AboutGithub from "@/components/about/AboutGithub";
import AboutCommunity from "@/components/about/AboutCommunity";

export const metadata = {
  title: "About | Journey, Skills & Experience — Tamiul Alam",
  description: "AI full-stack engineer building production web apps end to end, from polished interfaces to LLM features. Remote from Bangladesh, 3+ years shipping.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="wueBDJtZ" id="main" tabIndex={-1}>
        <AboutHero />
        <AboutExperience />
        <AboutGithub />
        <AboutCommunity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
