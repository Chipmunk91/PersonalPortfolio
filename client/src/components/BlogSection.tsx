import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "./BlogPostCard";
import { blogPosts } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, Mail, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function BlogSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter((post) => {
    // Category filter
    const passesCategory =
      activeFilter === "all" || post.category === activeFilter;

    // Search filter
    const passesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return passesCategory && passesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get posts to display based on current mode and page
  const displayedPosts = showAllArticles
    ? filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage,
      )
    : filteredPosts.slice(0, 6);

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Thoughts, tutorials, and deep dives into data visualization, AI
            interpretability, and interactive tools.
          </p>
        </motion.div>

        {/* Blog Filters */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveFilter("all")}
            >
              All Posts
            </Button>
            <Button
              variant={activeFilter === "tutorial" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveFilter("tutorial")}
            >
              Tutorials
            </Button>
            <Button
              variant={activeFilter === "case-study" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveFilter("case-study")}
            >
              Case Studies
            </Button>
            <Button
              variant={activeFilter === "insight" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveFilter("insight")}
            >
              Insights
            </Button>
          </div>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {!showAllArticles ? (
            <Button
              variant="outline"
              className="inline-flex items-center gap-2 px-6 py-3 h-auto rounded-full"
              onClick={() => {
                setShowAllArticles(true);
                setCurrentPage(1);
              }}
            >
              <span>View All Articles</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center gap-2 flex-wrap">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="sm"
                    className="w-10 h-10 rounded-full"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="
          mt-16 
          bg-gradient-to-r 
          from-primary-600 to-accent-600 
          rounded-xl overflow-hidden shadow-xl
          border-b
          md:border-b-0 
          md:border-r 
          border-gray-200 
          dark:border-gray-700
          "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="px-6 py-12 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-4">
                  Subscribe to my newsletter
                </h3>
                <p className="text-primary-100 mb-6">
                  Get the latest articles, tutorials, and resources on AI
                  visualization and interpretability delivered straight to your
                  inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white h-12"
                  />
                  <Button
                    className="
                    px-6 py-3 
                    border border-primary-600
                    bg-white 
                    text-primary-600 
                    dark:bg-gray-800 
                    dark:text-white 
                    font-medium rounded-lg 
                    hover:bg-gray-100 
                    dark:hover:bg-gray-700 
                    transition-colors h-12 
                    dark:border-gray-700"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-primary-200 mt-3">
                  I respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              <div className="md:w-1/2 md:pl-12 flex justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Mail className="h-24 w-24 text-white opacity-20" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
