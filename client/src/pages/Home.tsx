import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exit intent detection
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0 && !sessionStorage.getItem('hasShownExitModal')) {
      setIsModalOpen(true);
      sessionStorage.setItem('hasShownExitModal', 'true');
    }
  };

  // Add event listener on component mount and remove on unmount
  useState(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <EmailCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
