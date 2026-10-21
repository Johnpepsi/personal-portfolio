import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Homelab from "@/components/Homelab";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Expertise />
      <Experience />
      <Projects />
      <Homelab />
      <Contact />
      <Footer />
    </>
  );
}
