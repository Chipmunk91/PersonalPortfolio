import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sliders, BarChart3, Layers, ArrowLeft, Github } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { projects } from '@/lib/data';
import { ProjectType } from '@/lib/types';

// Different playground control types based on project categories
const InteractiveControls = ({ project, onChange }: { project: ProjectType, onChange: (values: any) => void }) => {
  const [nodes, setNodes] = useState(50);
  const [strength, setStrength] = useState(5);
  const [speed, setSpeed] = useState(3);
  const [type, setType] = useState("Force-Directed Graph");
  
  useEffect(() => {
    onChange({
      nodes,
      strength,
      speed,
      type
    });
  }, [nodes, strength, speed, type, onChange]);
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Number of Nodes</label>
        <div className="flex items-center gap-3">
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={nodes} 
            onChange={e => setNodes(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">{nodes}</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Connection Strength</label>
        <div className="flex items-center gap-3">
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={strength}
            onChange={e => setStrength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">{strength}</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Animation Speed</label>
        <div className="flex items-center gap-3">
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={speed}
            onChange={e => setSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">{speed}</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Visualization Type</label>
        <select 
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option>Force-Directed Graph</option>
          <option>Hierarchical Tree</option>
          <option>Radial Layout</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Color Scheme</label>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-blue-500 transition-all"></button>
          <button className="w-8 h-8 rounded-full bg-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-purple-500 transition-all"></button>
          <button className="w-8 h-8 rounded-full bg-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-green-500 transition-all"></button>
          <button className="w-8 h-8 rounded-full bg-orange-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:ring-2 ring-orange-500 transition-all"></button>
        </div>
      </div>
    </div>
  );
};

const AIControls = ({ project, onChange }: { project: ProjectType, onChange: (values: any) => void }) => {
  const [model, setModel] = useState('gpt-3.5');
  const [temperature, setTemperature] = useState(0.7);
  const [maxLength, setMaxLength] = useState(100);
  const [prompt, setPrompt] = useState('Generate a creative story about...');

  useEffect(() => {
    onChange({
      model,
      temperature,
      maxLength,
      prompt
    });
  }, [model, temperature, maxLength, prompt, onChange]);
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Model</label>
        <select 
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          value={model}
          onChange={e => setModel(e.target.value)}
        >
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude">Claude</option>
          <option value="llama">Llama 2</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature: {temperature}</label>
        <div className="flex items-center gap-3">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={temperature}
            onChange={e => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">{temperature}</span>
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
            value={maxLength}
            onChange={e => setMaxLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">{maxLength}</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Prompt</label>
        <textarea 
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
          rows={3}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

// Placeholder visualization components
const InteractiveVisualization = ({ config }: { config: any }) => {
  const speed = config?.speed || 3;
  const type = config?.type || "Force-Directed Graph";
  
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium mb-2">{type} Visualization</h3>
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{
            rotate: [0, 0, 270, 270, 0],
            scale: [1, 1.2, 1.2, 1, 1],
          }}
          transition={{
            duration: 4 / speed * 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1 / speed
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
            duration: 4 / speed * 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1 / speed,
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
            duration: 4 / speed * 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1 / speed,
            delay: 1
          }}
          className="absolute"
        >
          <Sliders className="h-10 w-10 text-secondary-500/40" />
        </motion.div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Nodes: {config?.nodes || 50} | Strength: {config?.strength || 5}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500">Adjust parameters on the left to see changes</p>
    </div>
  );
};

const AIVisualization = ({ config }: { config: any }) => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium mb-2">AI Text Generation</h3>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-left mb-4 max-h-60 overflow-y-auto">
        <p className="text-xs text-gray-500 mb-2">Using model: {config?.model || 'gpt-3.5'} (Temperature: {config?.temperature || 0.7})</p>
        <div className="prose dark:prose-invert text-sm">
          <p>The quick brown fox jumps over the lazy dog. This is a sample output that would be generated by the selected AI model based on your prompt settings.</p>
          <p>Parameters like temperature affect how creative or deterministic the output is. Higher temperatures (closer to 1) produce more random, creative results, while lower ones keep the text more predictable.</p>
          <p>In a real implementation, this would connect to an actual AI API to generate content based on your prompt.</p>
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 text-left mb-2">Prompt:</div>
      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm text-gray-700 dark:text-gray-300 text-left max-h-20 overflow-y-auto">
        {config?.prompt || 'Generate a creative story about...'}
      </div>
    </div>
  );
};

export default function Playground() {
  const [params] = useParams();
  const projectId = parseInt(params?.id || '1');
  const [config, setConfig] = useState({});
  
  // Find the current project
  const project = projects.find(p => p.id === projectId) || projects[0];
  
  // Determine which controls to show based on project category
  const renderControls = () => {
    const category = project.categories[0];
    
    switch(category) {
      case 'ai':
        return <AIControls project={project} onChange={setConfig} />;
      case 'interactive':
      case 'visualization':
      default:
        return <InteractiveControls project={project} onChange={setConfig} />;
    }
  };
  
  // Render the appropriate visualization based on project category
  const renderVisualization = () => {
    const category = project.categories[0];
    
    switch(category) {
      case 'ai':
        return <AIVisualization config={config} />;
      case 'interactive':
      case 'visualization':
      default:
        return <InteractiveVisualization config={config} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/projects">
                <Button variant="ghost" className="mr-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {project.title} - Interactive Playground
              </h2>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
            Experiment with this {project.categories[0]} project by adjusting parameters to see how they affect the results in real-time.
          </p>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-6 md:p-8">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Controls Panel */}
                  <div className="md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Parameters</h4>
                    {renderControls()}
                  </div>
                  
                  {/* Visualization Area */}
                  <div className="md:w-2/3 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg h-96 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4">
                      {renderVisualization()}
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <Button>
                        Reset
                      </Button>
                      
                      <div className="flex gap-2">
                        <a 
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline">
                            View Full Demo
                          </Button>
                        </a>
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            <span>View Source</span>
                          </Button>
                        </a>
                      </div>
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