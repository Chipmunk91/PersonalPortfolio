import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as tf from '@tensorflow/tfjs';

// Neural Network Visualizer Playground Component
export default function NeuralNetworkPlayground({ config }: { config: any }) {
  const [learningRate, setLearningRate] = useState(config?.learningRate || 0.01);
  const [hiddenNeurons, setHiddenNeurons] = useState(config?.neurons || 8);
  const [activationFunction, setActivationFunction] = useState(config?.activationFunction || 'relu');
  const [epochs, setEpochs] = useState(config?.epochs || 100);
  const [isTraining, setIsTraining] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  
  const networkRef = useRef<HTMLDivElement>(null);
  const decisionBoundaryRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle config changes
  useEffect(() => {
    if (config) {
      setLearningRate(config.learningRate || learningRate);
      setHiddenNeurons(config.neurons || hiddenNeurons);
      setActivationFunction(config.activationFunction || activationFunction);
      setEpochs(config.epochs || epochs);
    }
  }, [config]);
  
  // Effect for network visualization
  useEffect(() => {
    if (networkRef.current) {
      drawNetwork();
    }
  }, [hiddenNeurons, activationFunction]);
  
  // Effect for decision boundary visualization
  useEffect(() => {
    if (decisionBoundaryRef.current) {
      drawDecisionBoundary();
    }
  }, [learningRate, hiddenNeurons, activationFunction, accuracy]);
  
  // Draw neural network structure
  const drawNetwork = () => {
    const width = networkRef.current?.clientWidth || 400;
    const height = 300;
    
    // Clear previous SVG
    d3.select(networkRef.current).selectAll("*").remove();
    
    // Create SVG
    const svg = d3.select(networkRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    // Define layers
    const layers = [
      { name: "Input", neurons: 2 },
      { name: "Hidden", neurons: hiddenNeurons },
      { name: "Output", neurons: 1 }
    ];
    
    // Calculate positions
    const layerSpacing = width / (layers.length + 1);
    
    // Draw neurons for each layer
    layers.forEach((layer, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1);
      const neuronSpacing = height / (layer.neurons + 1);
      
      // Draw layer label
      svg.append("text")
        .attr("x", x)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#666")
        .text(layer.name + (layerIndex === 1 ? ` (${activationFunction})` : ""));
      
      // Draw neurons
      for (let i = 0; i < layer.neurons; i++) {
        const y = neuronSpacing * (i + 1);
        
        // Draw neuron circle
        svg.append("circle")
          .attr("cx", x)
          .attr("cy", y + 30)
          .attr("r", 12)
          .attr("fill", layerIndex === 1 ? "#4f46e5" : "#64748b")
          .attr("stroke", "#fff")
          .attr("stroke-width", 2);
        
        // Draw connections to previous layer
        if (layerIndex > 0) {
          const prevLayer = layers[layerIndex - 1];
          const prevX = layerSpacing * layerIndex;
          const prevNeuronSpacing = height / (prevLayer.neurons + 1);
          
          for (let j = 0; j < prevLayer.neurons; j++) {
            const prevY = prevNeuronSpacing * (j + 1);
            
            svg.append("line")
              .attr("x1", prevX)
              .attr("y1", prevY + 30)
              .attr("x2", x)
              .attr("y2", y + 30)
              .attr("stroke", "#ddd")
              .attr("stroke-width", 1.5)
              .attr("stroke-opacity", 0.6);
          }
        }
      }
    });
  };
  
  // Draw decision boundary visualization
  const drawDecisionBoundary = () => {
    const width = decisionBoundaryRef.current?.clientWidth || 400;
    const height = 300;
    
    // Clear previous SVG
    d3.select(decisionBoundaryRef.current).selectAll("*").remove();
    
    // Create SVG
    const svg = d3.select(decisionBoundaryRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    // Draw gridlines
    const gridSize = 20;
    for (let i = 0; i <= width; i += gridSize) {
      svg.append("line")
        .attr("x1", i)
        .attr("y1", 0)
        .attr("x2", i)
        .attr("y2", height)
        .attr("stroke", "#f1f5f9")
        .attr("stroke-width", 1);
    }
    
    for (let i = 0; i <= height; i += gridSize) {
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", i)
        .attr("x2", width)
        .attr("y2", i)
        .attr("stroke", "#f1f5f9")
        .attr("stroke-width", 1);
    }
    
    // Draw axes
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width)
      .attr("y2", height / 2)
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2);
      
    svg.append("line")
      .attr("x1", width / 2)
      .attr("y1", 0)
      .attr("x2", width / 2)
      .attr("y2", height)
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2);
    
    // Simulated decision boundary based on parameters
    // In a real app, this would be the actual model's decision boundary
    const curviness = hiddenNeurons / 10;
    const slope = learningRate * 50;
    
    // Draw decision boundary line/curve
    const line = d3.line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveBasis);
    
    const curvePoints = [];
    for (let x = 0; x <= width; x += 10) {
      // Create a curved decision boundary that changes with parameters
      // This is a simplified visualization - real boundary would come from model
      const centerX = width / 2;
      const centerY = height / 2;
      const distFromCenter = x - centerX;
      
      // Different curve shapes based on activation function
      let y;
      if (activationFunction === 'relu') {
        y = centerY - (slope * distFromCenter) - Math.sign(distFromCenter) * curviness * Math.pow(Math.abs(distFromCenter / 50), 2);
      } else if (activationFunction === 'sigmoid') {
        y = centerY - (height / 3) * Math.tanh(slope * distFromCenter / 100);
      } else {
        y = centerY - slope * Math.sin(distFromCenter / (25 / curviness));
      }
      
      curvePoints.push([x, y]);
    }
    
    svg.append("path")
      .datum(curvePoints)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 3)
      .attr("d", line);
    
    // Draw data points (simulated)
    const numPoints = 50;
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      // Determine point class based on the curve
      const pointIndex = Math.floor(x / 10);
      const boundaryY = pointIndex < curvePoints.length ? curvePoints[pointIndex][1] : height / 2;
      const isClass1 = y < boundaryY;
      
      points.push({ x, y, isClass1 });
    }
    
    // Draw the points
    svg.selectAll("circle.datapoint")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 5)
      .attr("fill", d => d.isClass1 ? "#4f46e5" : "#f97316")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
    
    // Update accuracy based on how well the curve separates the points
    // In a real app, this would come from the model's evaluation
    const classificationSuccess = points.filter(p => {
      const pointIndex = Math.floor(p.x / 10);
      const boundaryY = pointIndex < curvePoints.length ? curvePoints[pointIndex][1] : height / 2;
      return (p.isClass1 && p.y < boundaryY) || (!p.isClass1 && p.y >= boundaryY);
    }).length;
    
    const newAccuracy = (classificationSuccess / numPoints) * 100;
    setAccuracy(newAccuracy);
  };
  
  // Handle training button click
  const handleTrain = () => {
    setIsTraining(true);
    
    // Simulate training process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress > epochs) {
        clearInterval(interval);
        setIsTraining(false);
        
        // Update visualizations after training
        drawNetwork();
        drawDecisionBoundary();
      }
    }, 100);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Network Architecture</h3>
          <div ref={networkRef} className="h-[300px] w-full"></div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Decision Boundary</h3>
          <div ref={decisionBoundaryRef} className="h-[300px] w-full"></div>
          <div className="mt-2 text-center text-sm text-gray-500">
            Model Accuracy: {accuracy.toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Learning Rate: {learningRate}
            </label>
            <input 
              type="range" 
              min="0.001" 
              max="0.1" 
              step="0.001"
              value={learningRate}
              onChange={e => setLearningRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Hidden Neurons: {hiddenNeurons}
            </label>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="1"
              value={hiddenNeurons}
              onChange={e => setHiddenNeurons(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Activation Function
            </label>
            <select
              value={activationFunction}
              onChange={e => setActivationFunction(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="relu">ReLU</option>
              <option value="sigmoid">Sigmoid</option>
              <option value="tanh">Tanh</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Training Epochs: {epochs}
            </label>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              step="10"
              value={epochs}
              onChange={e => setEpochs(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleTrain}
          disabled={isTraining}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 flex items-center gap-2 disabled:opacity-50"
        >
          {isTraining ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Training...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Train Model
            </>
          )}
        </button>
      </div>
    </div>
  );
}