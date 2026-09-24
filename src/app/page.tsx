import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Skills } from "@/components/sections/Skills";
import { Honours } from "@/components/sections/Honours";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Experience />
      <ProjectGrid />
      <Skills />
      <Honours />
      <Contact />
    </>
  );
}
