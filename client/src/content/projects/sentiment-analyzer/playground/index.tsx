import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Sentiment Analysis Dashboard Playground Component
export default function SentimentAnalyzerPlayground({ config }: { config: any }) {
  // State for playground configuration
  const [textInput, setTextInput] = useState('');
  const [modelType, setModelType] = useState(config?.modelType || 'transformer');
  const [confidenceThreshold, setConfidenceThreshold] = useState(config?.confidenceThreshold || 0.5);
  const [language, setLanguage] = useState(config?.language || 'english');
  const [analyzedResults, setAnalyzedResults] = useState<any[]>([]);
  
  // Refs for charts
  const sentimentChartRef = useRef<HTMLDivElement>(null);
  const timelineChartRef = useRef<HTMLDivElement>(null);
  
  // Sample texts for quick analysis
  const sampleTexts = [
    "I absolutely love this product! It's amazing and has exceeded all my expectations.",
    "This service was disappointing. The customer support was unresponsive and the quality was poor.",
    "The movie was okay. It had some good moments but also some scenes that could have been better.",
    "I can't believe how terrible my experience was. Never using this again!",
    "The new update includes several improvements and fixes some minor bugs."
  ];
  
  // Effect to update charts when results change
  useEffect(() => {
    if (sentimentChartRef.current && analyzedResults.length > 0) {
      drawSentimentChart();
    }
    
    if (timelineChartRef.current && analyzedResults.length > 0) {
      drawTimelineChart();
    }
  }, [analyzedResults]);
  
  // Draw sentiment distribution chart
  const drawSentimentChart = () => {
    const width = sentimentChartRef.current?.clientWidth || 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    
    // Clear previous SVG
    d3.select(sentimentChartRef.current).selectAll("*").remove();
    
    // Create SVG
    const svg = d3.select(sentimentChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    // Count sentiment distribution
    const sentimentCounts = {
      positive: analyzedResults.filter(r => r.sentiment === 'positive').length,
      neutral: analyzedResults.filter(r => r.sentiment === 'neutral').length,
      negative: analyzedResults.filter(r => r.sentiment === 'negative').length
    };
    
    const data = [
      { sentiment: 'Positive', count: sentimentCounts.positive, color: '#16a34a' },
      { sentiment: 'Neutral', count: sentimentCounts.neutral, color: '#3b82f6' },
      { sentiment: 'Negative', count: sentimentCounts.negative, color: '#ef4444' }
    ];
    
    // Set up scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.sentiment))
      .range([margin.left, width - margin.right])
      .padding(0.3);
    
    const total = d3.sum(data, d => d.count);
    const maxCount = d3.max(data, d => d.count) || 0;
    
    const y = d3.scaleLinear()
      .domain([0, maxCount])
      .range([height - margin.bottom, margin.top]);
    
    // Draw bars
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.sentiment)!)
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom - y(d.count))
      .attr("fill", d => d.color);
    
    // Add labels
    svg.selectAll("text.bar-label")
      .data(data)
      .join("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.sentiment)! + x.bandwidth() / 2)
      .attr("y", d => y(d.count) - 5)
      .attr("text-anchor", "middle")
      .text(d => d.count > 0 ? `${d.count} (${((d.count / total) * 100).toFixed(0)}%)` : '')
      .attr("fill", "#4b5563")
      .attr("font-size", "12px");
    
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
    
    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };
  
  // Draw sentiment timeline chart (for multiple entries)
  const drawTimelineChart = () => {
    const width = timelineChartRef.current?.clientWidth || 400;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    
    // Clear previous SVG
    d3.select(timelineChartRef.current).selectAll("*").remove();
    
    if (analyzedResults.length <= 1) {
      d3.select(timelineChartRef.current)
        .append("div")
        .attr("class", "text-center text-gray-500 text-sm mt-4")
        .text("Add more entries to see sentiment trends over time");
      return;
    }
    
    // Create SVG
    const svg = d3.select(timelineChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    // Timeline data - convert sentiment to numeric score
    const timelineData = analyzedResults.map((result, index) => {
      let score = 0;
      if (result.sentiment === 'positive') score = result.score;
      else if (result.sentiment === 'negative') score = -result.score;
      
      return {
        index,
        score,
        sentiment: result.sentiment
      };
    });
    
    // Set up scales
    const x = d3.scaleLinear()
      .domain([0, timelineData.length - 1])
      .range([margin.left, width - margin.right]);
    
    const y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height - margin.bottom, margin.top]);
    
    // Define line generator
    const line = d3.line<any>()
      .x(d => x(d.index))
      .y(d => y(d.score))
      .curve(d3.curveMonotoneX);
    
    // Add neutral line
    svg.append("line")
      .attr("x1", margin.left)
      .attr("y1", y(0))
      .attr("x2", width - margin.right)
      .attr("y2", y(0))
      .attr("stroke", "#9ca3af")
      .attr("stroke-dasharray", "3,3")
      .attr("stroke-width", 1);
    
    // Draw line
    svg.append("path")
      .datum(timelineData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", line);
    
    // Add points
    svg.selectAll("circle")
      .data(timelineData)
      .join("circle")
      .attr("cx", d => x(d.index))
      .attr("cy", d => y(d.score))
      .attr("r", 5)
      .attr("fill", d => {
        if (d.sentiment === 'positive') return '#16a34a';
        if (d.sentiment === 'negative') return '#ef4444';
        return '#3b82f6';
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);
    
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(timelineData.length).tickFormat((d: any) => `#${d+1}`));
    
    // Add y-axis labels
    svg.append("text")
      .attr("x", margin.left - 10)
      .attr("y", margin.top)
      .attr("text-anchor", "end")
      .attr("fill", "#16a34a")
      .attr("font-size", "12px")
      .text("Positive");
    
    svg.append("text")
      .attr("x", margin.left - 10)
      .attr("y", height - margin.bottom)
      .attr("text-anchor", "end")
      .attr("fill", "#ef4444")
      .attr("font-size", "12px")
      .text("Negative");
  };
  
  // Analyze sentiment with simulated algorithm
  const analyzeSentiment = (text: string) => {
    // In a real app, this would call a sentiment analysis API or model
    // Here we're using a simple rule-based simulation for demo purposes
    
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'love', 'best', 'fantastic', 'happy', 'improved'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'poor', 'hate', 'worst', 'disappointing', 'disappointed', 'broken'];
    
    const lowerText = text.toLowerCase();
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    // Count positive and negative words
    positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) positiveScore += matches.length;
    });
    
    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) negativeScore += matches.length;
    });
    
    // Apply model bias based on selected model
    if (modelType === 'transformer') {
      positiveScore *= 1.2; // Transformer models tend to be more accurate at detecting positive sentiment
    } else if (modelType === 'naive-bayes') {
      negativeScore *= 1.1; // Naive Bayes can be more sensitive to negative words
    }
    
    // Calculate overall score
    const total = positiveScore + negativeScore;
    let score = 0.5; // Default neutral
    let sentiment = 'neutral';
    
    if (total > 0) {
      score = positiveScore / total;
      
      // Apply confidence threshold
      if (score > 0.5 + (confidenceThreshold / 2)) {
        sentiment = 'positive';
      } else if (score < 0.5 - (confidenceThreshold / 2)) {
        sentiment = 'negative';
      }
    }
    
    // Normalize score to 0-1
    const normalizedScore = Math.min(Math.max(score, 0), 1);
    
    // Add some randomness to make it more realistic
    const jitter = (Math.random() * 0.2) - 0.1;
    const finalScore = Math.min(Math.max(normalizedScore + jitter, 0), 1);
    
    // Get key entities (simulated)
    const words = text.split(/\s+/);
    const entities = words
      .filter(word => word.length > 4 && !['about', 'above', 'after', 'again'].includes(word.toLowerCase()))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    return {
      text,
      sentiment,
      score: finalScore,
      entities,
      timestamp: new Date().toISOString()
    };
  };
  
  // Handle analysis button click
  const handleAnalyze = () => {
    if (!textInput.trim()) return;
    
    const result = analyzeSentiment(textInput);
    setAnalyzedResults([...analyzedResults, result]);
    setTextInput('');
  };
  
  // Handle sample text selection
  const handleSampleSelect = (text: string) => {
    setTextInput(text);
  };
  
  // Clear all results
  const handleClear = () => {
    setAnalyzedResults([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Sentiment Analysis Input</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Enter text to analyze:
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              rows={3}
              placeholder="Enter text for sentiment analysis..."
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              Sample texts:
            </label>
            {sampleTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => handleSampleSelect(text)}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Sample {index + 1}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Model Type
              </label>
              <select
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="transformer">Transformer</option>
                <option value="naive-bayes">Naive Bayes</option>
                <option value="rnn">Recurrent Neural Network</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Confidence Threshold: {confidenceThreshold.toFixed(2)}
              </label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                value={confidenceThreshold}
                onChange={e => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-center space-x-3">
            <button
              onClick={handleAnalyze}
              disabled={!textInput.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              Analyze Sentiment
            </button>
            
            {analyzedResults.length > 0 && (
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Clear Results
              </button>
            )}
          </div>
        </div>
      </div>
      
      {analyzedResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
            <div ref={sentimentChartRef} className="h-[300px] w-full"></div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Sentiment Timeline</h3>
            <div ref={timelineChartRef} className="h-[200px] w-full"></div>
            <div className="text-sm text-gray-500 mt-2 text-center">
              Timeline shows sentiment score change across multiple entries
            </div>
          </div>
        </div>
      )}
      
      {analyzedResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Text</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sentiment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Key Entities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {analyzedResults.map((result, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm max-w-xs truncate">{result.text}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        result.sentiment === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        result.sentiment === 'negative' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {result.score.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {result.entities.map((entity: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {entity}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}