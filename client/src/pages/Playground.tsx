import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sliders, BarChart3, Layers } from 'lucide-react';

export default function Playground() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interactive Playground</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Try out the visualization tools directly in your browser. Adjust parameters and see how they affect the output in real-time.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-6 md:p-8">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Controls Panel */}
                  <div className="md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Parameters</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Number of Nodes</label>
                        <div className="flex items-center gap-3">
                          <input type="range" min="10" max="100" defaultValue="50" className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">50</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Connection Strength</label>
                        <div className="flex items-center gap-3">
                          <input type="range" min="1" max="10" defaultValue="5" className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">5</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Animation Speed</label>
                        <div className="flex items-center gap-3">
                          <input type="range" min="1" max="10" defaultValue="3" className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">3</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Visualization Type</label>
                        <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          <option>Force-Directed Graph</option>
                          <option>Hierarchical Tree</option>
                          <option>Radial Layout</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Color Scheme</label>
                        <div className="flex gap-2">
                          <button className="w-8 h-8 rounded-full bg-blue-500"></button>
                          <button className="w-8 h-8 rounded-full bg-purple-500"></button>
                          <button className="w-8 h-8 rounded-full bg-green-500"></button>
                          <button className="w-8 h-8 rounded-full bg-orange-500"></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visualization Area */}
                  <div className="md:w-2/3 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg h-96 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <motion.div
                            animate={{
                              rotate: [0, 0, 270, 270, 0],
                              scale: [1, 1.2, 1.2, 1, 1],
                            }}
                            transition={{
                              duration: 4,
                              ease: "easeInOut",
                              times: [0, 0.2, 0.5, 0.8, 1],
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          >
                            <Layers className="h-16 w-16 text-primary-500/40" />
                          </motion.div>
                          <motion.div
                            animate={{
                              rotate: [0, 90, 90, 0, 0],
                              scale: [1, 1, 1.2, 1.2, 1],
                              x: [0, 30, 30, 0, 0],
                              y: [0, 0, 30, 30, 0],
                            }}
                            transition={{
                              duration: 4,
                              ease: "easeInOut",
                              times: [0, 0.2, 0.5, 0.8, 1],
                              repeat: Infinity,
                              repeatDelay: 1,
                              delay: 0.5
                            }}
                            className="absolute"
                          >
                            <BarChart3 className="h-12 w-12 text-accent-500/40" />
                          </motion.div>
                          <motion.div
                            animate={{
                              rotate: [0, 0, 0, 180, 180, 0],
                              scale: [1, 1, 1, 1, 1.2, 1],
                              x: [0, -30, -30, 0, 0, 0],
                              y: [0, 0, 30, 30, 0, 0],
                            }}
                            transition={{
                              duration: 4,
                              ease: "easeInOut",
                              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                              repeat: Infinity,
                              repeatDelay: 1,
                              delay: 1
                            }}
                            className="absolute"
                          >
                            <Sliders className="h-10 w-10 text-secondary-500/40" />
                          </motion.div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">Interactive visualization will render here</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">Adjust parameters on the left to see changes</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <Button>
                        Reset
                      </Button>
                      <Button variant="outline" className="flex items-center gap-1">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>View Source</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}