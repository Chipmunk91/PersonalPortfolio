import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Projects() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ProjectsSection />
      </div>
      <Footer />
    </div>
  );
}