import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/lib/data';
import { ProjectType } from '@/lib/types';
import { motion } from 'framer-motion';
import { Sliders, BarChart3, Layers, Github, PlayCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function ProjectsSection() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [playgroundConfig, setPlaygroundConfig] = useState<any>({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoProject, setCurrentVideoProject] = useState<ProjectType | null>(null);
  
  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.categories.includes(filter)
  );
  
  // Select the first project by default when component mounts
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, []);

  // When a project is selected, update the playground configuration
  useEffect(() => {
    if (selectedProject) {
      // Default configurations based on project type
      if (selectedProject.categories.includes('ai')) {
        setPlaygroundConfig({
          model: 'gpt-3.5',
          temperature: 0.7,
          maxLength: 100,
          prompt: 'Generate a creative story about...'
        });
      } else {
        setPlaygroundConfig({
          nodes: 50,
          strength: 5,
          speed: 3,
          type: 'Force-Directed Graph'
        });
      }
    }
  }, [selectedProject]);
  
  // Handle project selection for the playground
  const handleProjectSelect = (project: ProjectType) => {
    setSelectedProject(project);
    
    // Scroll to the playground section
    document.getElementById('playground-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  // Handle video preview for a project
  const handleVideoPreview = (project: ProjectType) => {
    setCurrentVideoProject(project);
    setShowVideoModal(true);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Interactive visualizations and tools that make complex AI systems more interpretable and accessible.
          </p>
        </motion.div>
        
        {/* Project Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setFilter('all')}
          >
            All Projects
          </Button>
          <Button
            variant={filter === 'visualization' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setFilter('visualization')}
          >
            Visualization
          </Button>
          <Button
            variant={filter === 'ai' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setFilter('ai')}
          >
            AI/ML
          </Button>
          <Button
            variant={filter === 'interactive' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setFilter('interactive')}
          >
            Interactive
          </Button>
        </motion.div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              onSelect={handleProjectSelect}
              onVideoPreview={handleVideoPreview}
            />
          ))}
        </div>
        
        {/* Live Playground Section */}
        <motion.div 
          id="playground-section"
          className="mt-16 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedProject ? `${selectedProject.title} - Interactive Playground` : 'Interactive Playground'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedProject 
                ? `Experiment with this ${selectedProject.categories[0]} project by adjusting parameters to see how they affect the results in real-time.`
                : 'Click on any project above to try it out directly in your browser. Adjust parameters and see how they affect the output in real-time.'}
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Controls Panel */}
                <div className="md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Parameters</h4>
                  
                  {selectedProject && selectedProject.categories.includes('ai') ? (
                    // AI Project Controls
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Model</label>
                        <select 
                          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          value={playgroundConfig.model || 'gpt-3.5'}
                          onChange={e => setPlaygroundConfig({...playgroundConfig, model: e.target.value})}
                        >
                          <option value="gpt-3.5">GPT-3.5</option>
                          <option value="gpt-4">GPT-4</option>
                          <option value="claude">Claude</option>
                          <option value="llama">Llama 2</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Temperature: {playgroundConfig.temperature || 0.7}
                        </label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1"
                            value={playgroundConfig.temperature || 0.7}
                            onChange={e => setPlaygroundConfig({...playgroundConfig, temperature: parseFloat(e.target.value)})}
                            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">
                            {playgroundConfig.temperature || 0.7}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Max Length</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="50" 
                            max="500" 
                            step="10"
                            value={playgroundConfig.maxLength || 100}
                            onChange={e => setPlaygroundConfig({...playgroundConfig, maxLength: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">
                            {playgroundConfig.maxLength || 100}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Prompt</label>
                        <textarea 
                          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                          rows={3}
                          value={playgroundConfig.prompt || 'Generate a creative story about...'}
                          onChange={e => setPlaygroundConfig({...playgroundConfig, prompt: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                  ) : (
                    // Default Visualization Controls
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Number of Nodes</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            value={playgroundConfig.nodes || 50}
                            onChange={e => setPlaygroundConfig({...playgroundConfig, nodes: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">
                            {playgroundConfig.nodes || 50}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Connection Strength</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={playgroundConfig.strength || 5}
                            onChange={e => setPlaygroundConfig({...playgroundConfig, strength: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">
                            {playgroundConfig.strength || 5}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Animation Speed</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={playgroundConfig.speed || 3}
                            onChange={e => setPlaygroundConfig({...playgroundConfig, speed: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">
                            {playgroundConfig.speed || 3}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Visualization Type</label>
                        <select 
                          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          value={playgroundConfig.type || "Force-Directed Graph"}
                          onChange={e => setPlaygroundConfig({...playgroundConfig, type: e.target.value})}
                        >
                          <option>Force-Directed Graph</option>
                          <option>Hierarchical Tree</option>
                          <option>Radial Layout</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Color Scheme</label>
                        <div className="flex gap-2">
                          <button 
                            className={`w-8 h-8 rounded-full bg-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-blue-500 transition-all ${playgroundConfig.colorScheme === 'blue' ? 'ring-2' : ''}`}
                            onClick={() => setPlaygroundConfig({...playgroundConfig, colorScheme: 'blue'})}
                          ></button>
                          <button 
                            className={`w-8 h-8 rounded-full bg-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-purple-500 transition-all ${playgroundConfig.colorScheme === 'purple' ? 'ring-2' : ''}`}
                            onClick={() => setPlaygroundConfig({...playgroundConfig, colorScheme: 'purple'})}
                          ></button>
                          <button 
                            className={`w-8 h-8 rounded-full bg-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-green-500 transition-all ${playgroundConfig.colorScheme === 'green' ? 'ring-2' : ''}`}
                            onClick={() => setPlaygroundConfig({...playgroundConfig, colorScheme: 'green'})}
                          ></button>
                          <button 
                            className={`w-8 h-8 rounded-full bg-orange-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-orange-500 transition-all ${playgroundConfig.colorScheme === 'orange' ? 'ring-2' : ''}`}
                            onClick={() => setPlaygroundConfig({...playgroundConfig, colorScheme: 'orange'})}
                          ></button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Visualization Area */}
                <div className="md:w-2/3 p-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg h-96 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    {selectedProject && selectedProject.categories.includes('ai') ? (
                      // AI Project Visualization
                      <div className="w-full p-4">
                        <div className="text-center mb-2">
                          <h3 className="text-lg font-medium">AI Text Generation</h3>
                          <div className="text-xs text-gray-500 mb-2">
                            Using model: {playgroundConfig.model || 'gpt-3.5'} (Temperature: {playgroundConfig.temperature || 0.7})
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-left mb-4 max-h-60 overflow-y-auto">
                          <div className="prose dark:prose-invert text-sm">
                            <p>The quick brown fox jumps over the lazy dog. This is a sample output that would be generated by the selected AI model based on your prompt settings.</p>
                            <p>Parameters like temperature affect how creative or deterministic the output is. Higher temperatures (closer to 1) produce more random, creative results, while lower ones keep the text more predictable.</p>
                            <p>In a real implementation, this would connect to an actual AI API to generate content based on your prompt.</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-left mb-2">Prompt:</div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm text-gray-700 dark:text-gray-300 text-left max-h-20 overflow-y-auto">
                          {playgroundConfig.prompt || 'Generate a creative story about...'}
                        </div>
                      </div>
                    ) : selectedProject ? (
                      // Default Interactive Visualization
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">{playgroundConfig.type || "Force-Directed Graph"} Visualization</h3>
                        <div className="flex justify-center mb-4 relative h-48">
                          <motion.div
                            animate={{
                              rotate: [0, 0, 270, 270, 0],
                              scale: [1, 1.2, 1.2, 1, 1],
                            }}
                            transition={{
                              duration: 4 / (playgroundConfig.speed || 3) * 3,
                              ease: "easeInOut",
                              times: [0, 0.2, 0.5, 0.8, 1],
                              repeat: Infinity,
                              repeatDelay: 1 / (playgroundConfig.speed || 3)
                            }}
                            className={playgroundConfig.colorScheme === 'blue' ? "text-blue-500/70" : 
                                       playgroundConfig.colorScheme === 'purple' ? "text-purple-500/70" :
                                       playgroundConfig.colorScheme === 'green' ? "text-green-500/70" :
                                       playgroundConfig.colorScheme === 'orange' ? "text-orange-500/70" :
                                       "text-primary-500/70"}
                          >
                            <Layers className="h-16 w-16" />
                          </motion.div>
                          
                          {Array.from({ length: playgroundConfig.nodes / 10 || 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                rotate: [0, 90 * (i % 4), 180 * (i % 3), 270 * (i % 2), 360],
                                scale: [0.5 + (i % 5) * 0.1, 0.6 + (i % 5) * 0.1, 0.8 + (i % 5) * 0.1, 0.6 + (i % 5) * 0.1, 0.5 + (i % 5) * 0.1],
                                x: [0, 30 * Math.sin(i), 60 * Math.cos(i), 30 * Math.sin(i + 2), 0],
                                y: [0, 30 * Math.cos(i), 60 * Math.sin(i), 30 * Math.cos(i + 2), 0],
                              }}
                              transition={{
                                duration: 6 / (playgroundConfig.speed || 3) * 3,
                                ease: "easeInOut",
                                times: [0, 0.25, 0.5, 0.75, 1],
                                repeat: Infinity,
                                repeatDelay: 0.5 / (playgroundConfig.speed || 3),
                                delay: i * 0.2
                              }}
                              className="absolute"
                              style={{
                                opacity: 0.2 + (Math.min(playgroundConfig.strength, 10) / 20) || 0.5
                              }}
                            >
                              <div className={`h-${3 + (i % 3)} w-${3 + (i % 3)} rounded-full 
                                ${playgroundConfig.colorScheme === 'blue' ? "bg-blue-500" : 
                                playgroundConfig.colorScheme === 'purple' ? "bg-purple-500" :
                                playgroundConfig.colorScheme === 'green' ? "bg-green-500" :
                                playgroundConfig.colorScheme === 'orange' ? "bg-orange-500" :
                                "bg-primary-500"}`} />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Nodes: {playgroundConfig.nodes || 50} | Strength: {playgroundConfig.strength || 5} | Speed: {playgroundConfig.speed || 3}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">Adjust parameters on the left to see changes</p>
                      </div>
                    ) : (
                      // Default placeholder visualization
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
                        <p className="text-gray-500 dark:text-gray-400">Select a project above to explore its interactive demo</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">Click on any project card to get started</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <Button onClick={() => {
                      // Reset to default configuration for the selected project type
                      if (selectedProject?.categories.includes('ai')) {
                        setPlaygroundConfig({
                          model: 'gpt-3.5',
                          temperature: 0.7,
                          maxLength: 100,
                          prompt: 'Generate a creative story about...'
                        });
                      } else {
                        setPlaygroundConfig({
                          nodes: 50,
                          strength: 5,
                          speed: 3,
                          type: 'Force-Directed Graph'
                        });
                      }
                    }}>
                      Reset Parameters
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
            
            {selectedProject && (
              <div className="mt-6 flex justify-end items-center">
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank"
                  className="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>View Source Code</span>
                  <Github className="h-4 w-4" />
                </a>
              </div>
            )}
            
            {/* Video Preview Modal */}
            <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
              <DialogContent className="w-full sm:w-4/5 max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    {currentVideoProject?.title} Demo
                  </DialogTitle>
                </DialogHeader>
                
                <div className="aspect-video bg-black rounded-md overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    {/* This would be a real video in production */}
                    <div className="text-center p-8">
                      <div className="mb-4 flex justify-center">
                        <PlayCircle className="h-20 w-20 text-white/50" />
                      </div>
                      <p className="text-gray-300 font-medium">
                        Project Demo Video
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        This is where a demo video for {currentVideoProject?.title} would play.
                        <br />
                        In a production environment, this would show a real video demonstrating the project capabilities.
                      </p>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button onClick={() => setShowVideoModal(false)}>Close</Button>
                  {currentVideoProject && (
                    <a href={currentVideoProject.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">Visit Live Demo</Button>
                    </a>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
