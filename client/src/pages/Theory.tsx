import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from 'framer-motion';

export default function Theory() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Theoretical Background</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Understanding the mathematical concepts behind AI visualization and interpretability
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Neural Network Interpretability</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Interpreting neural networks is crucial for building trustworthy AI systems. Unlike traditional algorithms with clear decision paths, neural networks operate as "black boxes" where the reasoning behind predictions can be difficult to trace. In my work, I focus on techniques that shed light on these internal mechanisms.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The methods I use include feature visualization, which generates optimal inputs for neurons; attribution techniques, which map predictions back to input features; and concept-based explanations, which align neural activity with human-understandable concepts.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Mathematical Representation</h4>
                  <div className="p-2 rounded bg-white dark:bg-gray-800 overflow-x-auto">
                    <pre className="text-sm font-mono">
                      <code>
{`// In feature attribution, we compute the gradient of the output with respect to the input:
// For a network f(x), the attribution of feature i is:
// attr_i = δf(x)/δx_i

// For layer-wise relevance propagation (LRP), with neurons j in layer l:
// R_j^(l) = ∑_k (a_j^(l) * w_jk^(l,l+1) / ∑_j a_j^(l) * w_jk^(l,l+1)) * R_k^(l+1)
`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className="flex justify-center my-8">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg w-full max-w-xl">
                    <div className="aspect-video bg-white dark:bg-gray-800 rounded flex items-center justify-center">
                      <p className="text-gray-400 dark:text-gray-500 text-center">
                        Interactive diagram showing gradient-based attribution
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dimensionality Reduction Techniques</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  High-dimensional data is challenging to visualize directly. Dimensionality reduction techniques project this data into lower-dimensional spaces (typically 2D or 3D) while preserving important structural relationships.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Common Approaches</h4>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>PCA (Principal Component Analysis)</strong>: Linear technique that finds orthogonal axes of maximum variance</li>
                    <li><strong>t-SNE (t-Distributed Stochastic Neighbor Embedding)</strong>: Non-linear technique that preserves local similarities</li>
                    <li><strong>UMAP (Uniform Manifold Approximation and Projection)</strong>: Faster alternative to t-SNE that better preserves global structure</li>
                  </ul>
                </div>
                
                <div className="flex justify-center my-6">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg w-full max-w-xl">
                    <div className="aspect-video bg-white dark:bg-gray-800 rounded flex items-center justify-center">
                      <p className="text-gray-400 dark:text-gray-500 text-center">
                        Comparative visualization of PCA vs t-SNE vs UMAP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Visual Encoding Principles</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Effective visualization relies on matching data attributes to appropriate visual properties. This mapping must consider both the characteristics of the data and human perceptual abilities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Quantitative Data</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Best represented with position, length, or angle (bar charts, scatterplots). Less effective: area, color intensity.
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Categorical Data</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Best represented with distinct colors, shapes, or textures. Group positioning also effective.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-800 dark:text-primary-300 mb-2">Download Resources</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Get my whitepaper on "Principles of Human-Centered AI Visualization" with extensive examples and case studies.
                  </p>
                  <div className="flex justify-center">
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors">
                      Download Whitepaper
                    </button>
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}