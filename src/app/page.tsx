import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import GridBackground from "@/components/GridBackground";
import Hero from "@/components/Hero";

// Below-the-fold sections: code-split so their JS doesn't have to be
// parsed/executed alongside Hero's on initial load.
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
