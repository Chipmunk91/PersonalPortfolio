import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { Button } from "@/components/ui/button";
import { skills } from "@/lib/data";
import { projects, getProjectsByLanguage } from "@/lib/projectLoader";
import { getBlogPostsByLanguage } from "@/lib/blogLoader";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Brain,
  PaintBucket,
} from "lucide-react";
import { FaPython, FaReact, FaJs } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function JapaneseHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  // Exit intent detection - temporarily disabled
  const handleMouseLeave = (e: MouseEvent) => {
    // Exit intent popup is disabled for now
    // Uncomment below to re-enable when needed
    /*
    if (e.clientY <= 0 && !sessionStorage.getItem("hasShownExitModal")) {
      setIsModalOpen(true);
      sessionStorage.setItem("hasShownExitModal", "true");
    }
    */
  };

  // Add event listener on component mount and remove on unmount
  useEffect(() => {
    // Event listener is added but the handler function doesn't trigger the popup
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Get featured projects and blog posts
  const featuredProjects = getProjectsByLanguage('ja').slice(0, 3);
  const featuredPosts = getBlogPostsByLanguage('ja').slice(0, 2);
  const featuredSkills = skills.slice(0, 8);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Skills Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              専門分野
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {featuredSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="skill-tag px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-500 mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                インタラクティブな可視化
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ユーザーが複雑なデータを直感的に探索できるダイナミックで
                レスポンシブなビジュアルインターフェースを構築しています。
              </p>
              <div className="flex space-x-2">
                <FaReact className="text-blue-500" />
                <FaJs className="text-yellow-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  D3.js, Three.js
                </span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-12 w-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center text-accent-500 mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                AIモデルの解釈可能性
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ビジュアルおよびインタラクティブなツールを通じて、
                複雑なAI/MLモデルを透明で理解しやすくします。
              </p>
              <div className="flex space-x-2">
                <FaPython className="text-blue-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  TensorFlow, PyTorch
                </span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="h-12 w-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center text-secondary-500 mb-4">
                <PaintBucket className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                UX/UIデザイン
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                複雑なデータの可視化を理解しやすくする直感的で
                アクセスしやすいインターフェースを作成します。
              </p>
              <div className="flex space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Figma, Framer, モーションデザイン
                </span>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/ja/about" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="group">
                <span>専門知識についてもっと見る</span>
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section id="featured-projects" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop header with side by side layout */}
          <div className="hidden md:flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                注目のプロジェクト
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                最近の作品をご紹介します
              </p>
            </div>
            <Link href="/ja/projects" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="link" className="text-primary-500">
                <span>すべてのプロジェクトを見る</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile header with centered layout */}
          <div className="md:hidden text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              注目のプロジェクト
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              最近の作品をご紹介します
            </p>
            <Link href="/ja/projects" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="link" className="text-primary-500">
                <span>すべてのプロジェクトを見る</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop header with side by side layout */}
          <div className="hidden md:flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                最新のインサイト
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                AI可視化に関する考察とチュートリアル
              </p>
            </div>
            <Link href="/ja/blog" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="link" className="text-primary-500">
                <span>すべての記事を読む</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile header with centered layout */}
          <div className="md:hidden text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              最新のインサイト
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI可視化に関する考察とチュートリアル
            </p>
            <Link href="/ja/blog" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="link" className="text-primary-500">
                <span>すべての記事を読む</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded-full">
                        {post.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        {post.readTime}分で読める
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/ja/blog/${post.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <Button variant="link" className="text-primary-500 p-0">
                        記事を読む
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            データを直感的なビジュアルに変換する準備はできていますか？
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            次のプロジェクトで協力して、洞察を導く強力でインタラクティブな
            可視化を作成しましょう。
          </p>
          <Link href="/ja/contact" onClick={() => window.scrollTo(0, 0)}>
            <Button
              variant="outline"
              className="
              px-6 py-3 
              border border-primary-600
              text-primary-600
              dark:bg-gray-800 
              dark:text-white 
              font-medium 
              rounded-lg 
              hover:bg-gray-100 
              dark:hover:bg-gray-700 
              transition-colors h-12 
              dark:border-gray-700
              "
            >
              お問い合わせ
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}