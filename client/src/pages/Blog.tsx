import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogSection } from "@/components/BlogSection";

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <BlogSection />
      </div>
      <Footer />
    </div>
  );
}