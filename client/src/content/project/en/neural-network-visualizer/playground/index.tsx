import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as tf from '@tensorflow/tfjs';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NeuralNetworkVisualizerProps {
  onChange?: (values: any) => void;
}

export default function NeuralNetworkVisualizer({ onChange }: NeuralNetworkVisualizerProps) {
  // Network architecture state
  const [layers, setLayers] = useState([4, 6, 6, 2]);
  const [learningRate, setLearningRate] = useState(0.03);
  const [epochs, setEpochs] = useState(100);
  const [isTraining, setIsTraining] = useState(false);
  const [showActivations, setShowActivations] = useState(true);
  const [showWeights, setShowWeights] = useState(true);
  const [dataset, setDataset] = useState<Array<{x: number, y: number, isClass1: boolean}>>([]);
  const [loss, setLoss] = useState<number[]>([]);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [model, setModel] = useState<tf.Sequential | null>(null);
  
  // SVG Container refs
  const networkRef = useRef<SVGSVGElement>(null);
  const plotRef = useRef<SVGSVGElement>(null);
  const lossPlotRef = useRef<SVGSVGElement>(null);
  
  // Initialize network
  useEffect(() => {
    createModel();
  }, [layers]);

  // Render visualization
  useEffect(() => {
    if (networkRef.current) {
      renderNetwork();
    }
    if (plotRef.current && dataset.length > 0) {
      renderDataset();
    }
    if (lossPlotRef.current && loss.length > 0) {
      renderLossPlot();
    }
  }, [layers, dataset, loss, showActivations, showWeights]);
  
  const createModel = () => {
    if (model) {
      model.dispose();
    }
    
    const newModel = tf.sequential();
    
    // Add layers
    newModel.add(tf.layers.dense({
      inputShape: [2],
      units: layers[0],
      activation: 'relu'
    }));
    
    // Add hidden layers
    for (let i = 1; i < layers.length - 1; i++) {
      newModel.add(tf.layers.dense({
        units: layers[i],
        activation: 'relu'
      }));
    }
    
    // Add output layer
    newModel.add(tf.layers.dense({
      units: layers[layers.length - 1],
      activation: 'softmax'
    }));
    
    newModel.compile({
      optimizer: tf.train.adam(learningRate),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
    
    setModel(newModel);
    setLoss([]);
    
    // If we have onChange prop, call it
    if (onChange) {
      onChange({
        layers,
        learningRate,
        epochs
      });
    }
  };
  
  const trainModel = async () => {
    if (!model || dataset.length < 10) {
      alert("Please add at least 10 data points before training.");
      return;
    }
    
    setIsTraining(true);
    setLoss([]);
    setCurrentEpoch(0);
    
    // Prepare training data
    const xs = tf.tensor2d(dataset.map(d => [d.x, d.y]));
    const ys = tf.tensor2d(dataset.map(d => d.isClass1 ? [1, 0] : [0, 1]));
    
    // Train model
    await model.fit(xs, ys, {
      epochs: epochs,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (logs && logs.loss) {
            setLoss(prev => [...prev, logs.loss]);
            setCurrentEpoch(epoch + 1);
          }
        }
      }
    });
    
    setIsTraining(false);
    
    // Cleanup tensors
    xs.dispose();
    ys.dispose();
  };
  
  const clearData = () => {
    setDataset([]);
    setLoss([]);
  };
  
  const addDataPoint = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isTraining) return;
    
    const svg = plotRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    
    // Determine which class based on right or left mouse button
    const isClass1 = e.button === 0;
    
    setDataset([...dataset, { x, y, isClass1 }]);
  };
  
  const renderNetwork = () => {
    const svg = d3.select(networkRef.current);
    svg.selectAll("*").remove();
    
    const width = 600;
    const height = 400;
    
    // Calculate node positions
    const layerSpacing = width / (layers.length + 1);
    const layerPositions: number[][] = [];
    
    for (let i = 0; i < layers.length; i++) {
      const layerSize = layers[i];
      const nodeSpacing = height / (layerSize + 1);
      
      const layerNodes: number[] = [];
      for (let j = 0; j < layerSize; j++) {
        layerNodes.push(nodeSpacing * (j + 1));
      }
      
      layerPositions.push(layerNodes);
    }
    
    // Draw connections between layers
    for (let i = 0; i < layers.length - 1; i++) {
      const sourceLayer = layerPositions[i];
      const targetLayer = layerPositions[i + 1];
      
      for (let s = 0; s < sourceLayer.length; s++) {
        for (let t = 0; t < targetLayer.length; t++) {
          svg.append("line")
            .attr("x1", layerSpacing * (i + 1))
            .attr("y1", sourceLayer[s])
            .attr("x2", layerSpacing * (i + 2))
            .attr("y2", targetLayer[t])
            .attr("stroke", showWeights ? "rgba(120, 120, 220, 0.4)" : "rgba(180, 180, 220, 0.2)")
            .attr("stroke-width", 1);
        }
      }
    }
    
    // Draw nodes
    for (let i = 0; i < layers.length; i++) {
      const layer = layerPositions[i];
      
      layer.forEach(y => {
        svg.append("circle")
          .attr("cx", layerSpacing * (i + 1))
          .attr("cy", y)
          .attr("r", 10)
          .attr("fill", showActivations ? "rgba(70, 130, 180, 0.8)" : "rgba(70, 130, 180, 0.4)")
          .attr("stroke", "white")
          .attr("stroke-width", 2);
      });
    }
  };
  
  const renderDataset = () => {
    const svg = d3.select(plotRef.current);
    svg.selectAll("*").remove();
    
    const width = 300;
    const height = 300;
    
    // Plot points
    dataset.forEach(point => {
      svg.append("circle")
        .attr("cx", point.x * width)
        .attr("cy", (1 - point.y) * height)
        .attr("r", 5)
        .attr("fill", point.isClass1 ? "rgba(65, 105, 225, 0.7)" : "rgba(220, 20, 60, 0.7)")
        .attr("stroke", "white")
        .attr("stroke-width", 1);
    });
    
    // If model is trained, add decision boundary
    if (model && !isTraining && dataset.length > 0) {
      const gridSize = 50;
      const stepX = 1.0 / gridSize;
      const stepY = 1.0 / gridSize;
      
      const points: [number, number][] = [];
      
      for (let x = 0; x < 1; x += stepX) {
        for (let y = 0; y < 1; y += stepY) {
          points.push([x, y]);
        }
      }
      
      // Run prediction on grid points
      tf.tidy(() => {
        const predInput = tf.tensor2d(points);
        const pred = model!.predict(predInput) as tf.Tensor;
        const predArray = pred.arraySync() as number[][];
        
        for (let i = 0; i < points.length; i++) {
          const [x, y] = points[i];
          const confidence = predArray[i][0];
          
          svg.append("rect")
            .attr("x", x * width)
            .attr("y", (1 - y) * height - stepY * height)
            .attr("width", stepX * width)
            .attr("height", stepY * height)
            .attr("fill", `rgba(${confidence > 0.5 ? "65, 105, 225" : "220, 20, 60"}, ${Math.abs(confidence - 0.5) * 0.5})`);
        }
      });
    }
    
    // Re-render data points on top
    dataset.forEach(point => {
      svg.append("circle")
        .attr("cx", point.x * width)
        .attr("cy", (1 - point.y) * height)
        .attr("r", 5)
        .attr("fill", point.isClass1 ? "rgba(65, 105, 225, 0.9)" : "rgba(220, 20, 60, 0.9)")
        .attr("stroke", "white")
        .attr("stroke-width", 1);
    });
  };
  
  const renderLossPlot = () => {
    const svg = d3.select(lossPlotRef.current);
    svg.selectAll("*").remove();
    
    const width = 300;
    const height = 100;
    
    // Create X scale
    const xScale = d3.scaleLinear()
      .domain([0, loss.length - 1])
      .range([0, width]);
    
    // Create Y scale
    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...loss) * 1.1])
      .range([height, 0]);
    
    // Create line generator
    const line = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);
    
    // Draw line
    svg.append("path")
      .datum(loss)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
      
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .selectAll("text")
      .style("font-size", "8px");
    
    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll("text")
      .style("font-size", "8px");
      
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text("Training Loss");
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4 overflow-hidden">
        <h3 className="text-lg font-bold mb-4">Neural Network Architecture</h3>
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="learning-rate">Learning Rate: {learningRate}</Label>
            <Slider 
              id="learning-rate"
              min={0.001}
              max={0.1}
              step={0.001}
              value={[learningRate]}
              onValueChange={([value]) => setLearningRate(value)}
              disabled={isTraining}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Label htmlFor="epochs">Epochs: {epochs}</Label>
            <Slider 
              id="epochs"
              min={10}
              max={500}
              step={10}
              value={[epochs]}
              onValueChange={([value]) => setEpochs(value)}
              disabled={isTraining}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Label htmlFor="show-activations">Show Activations</Label>
            <Switch 
              id="show-activations" 
              checked={showActivations} 
              onCheckedChange={setShowActivations} 
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Label htmlFor="show-weights">Show Weights</Label>
            <Switch 
              id="show-weights" 
              checked={showWeights} 
              onCheckedChange={setShowWeights} 
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <svg 
            ref={networkRef} 
            width="100%" 
            height="300" 
            viewBox="0 0 600 400" 
            preserveAspectRatio="xMidYMid meet"
          />
          
          <div className="flex space-x-2 mt-4">
            <Button 
              size="sm"
              onClick={createModel}
              disabled={isTraining}
            >
              Reset Model
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">Training Data & Visualization</h3>
        <Tabs defaultValue="data">
          <TabsList className="mb-4">
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="loss">Loss</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data" className="space-y-4">
            <div className="text-center mb-2">
              <p className="text-sm text-muted-foreground">
                Click to add points (left: class A, right: class B)
              </p>
            </div>
            
            <div className="flex justify-center">
              <svg 
                ref={plotRef} 
                width="300" 
                height="300" 
                className="border border-gray-200 dark:border-gray-700"
                onMouseDown={addDataPoint}
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                size="sm" 
                variant="outline"
                onClick={clearData}
                disabled={isTraining}
              >
                Clear Data
              </Button>
              
              <Button 
                size="sm"
                variant={dataset.length < 10 ? "outline" : "default"}
                onClick={trainModel}
                disabled={isTraining || dataset.length < 10}
              >
                {isTraining ? `Training (${currentEpoch}/${epochs})` : 'Train Model'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="loss">
            <div className="flex justify-center mb-4">
              <svg 
                ref={lossPlotRef} 
                width="300" 
                height="100" 
              />
            </div>
            
            {loss.length > 0 && (
              <div className="text-center">
                <p className="text-sm">Final loss: {loss[loss.length - 1].toFixed(4)}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}