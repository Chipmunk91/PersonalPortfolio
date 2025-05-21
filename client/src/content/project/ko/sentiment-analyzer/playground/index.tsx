import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SentimentAnalyzerProps {
  onChange?: (values: any) => void;
}

// Mock sentiment analysis function (in a real app, this would call an API)
const analyzeSentiment = (text: string) => {
  // Simple keyword-based analyzer for demo purposes
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
    'happy', 'joy', 'love', 'like', 'best', 'beautiful', 'perfect',
    'awesome', 'outstanding', 'superb', 'brilliant', 'delightful'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'poor',
    'hate', 'dislike', 'disappointed', 'disappointing', 'failure',
    'ugly', 'wrong', 'sad', 'angry', 'frustrating', 'mediocre'
  ];
  
  const neutralWords = [
    'the', 'a', 'is', 'are', 'and', 'or', 'but', 'because',
    'when', 'while', 'if', 'then', 'so', 'therefore', 'thus',
    'however', 'although', 'nonetheless', 'nevertheless'
  ];
  
  // Convert to lowercase and split into words
  const words = text.toLowerCase().split(/\W+/);
  
  // Count word occurrences
  const wordCounts: Record<string, number> = {};
  words.forEach(word => {
    if (word.trim().length > 0) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  
  // Calculate sentiment scores
  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;
  
  Object.keys(wordCounts).forEach(word => {
    if (positiveWords.includes(word)) {
      positiveScore += wordCounts[word];
    } else if (negativeWords.includes(word)) {
      negativeScore += wordCounts[word];
    } else if (neutralWords.includes(word)) {
      neutralScore += wordCounts[word];
    }
  });
  
  const totalScore = positiveScore + negativeScore + neutralScore;
  const sentiment = positiveScore > negativeScore ? 'positive' : 
                   negativeScore > positiveScore ? 'negative' : 'neutral';
  
  // Get most common words
  const wordArray = Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Calculate emotional dimensions (for demo)
  // In a real model, these would be calculated using more sophisticated methods
  const joy = Math.min(1, positiveScore / (totalScore || 1) * 2);
  const anger = Math.min(1, negativeScore / (totalScore || 1) * 1.5);
  const fear = Math.min(1, negativeScore / (totalScore || 1) * 0.8);
  const surprise = Math.min(1, (Math.random() * 0.5) + (positiveScore / (totalScore || 1) * 0.5));
  
  return {
    sentiment,
    score: {
      positive: positiveScore / (totalScore || 1),
      negative: negativeScore / (totalScore || 1),
      neutral: neutralScore / (totalScore || 1)
    },
    emotions: {
      joy,
      anger, 
      fear,
      surprise
    },
    keywords: wordArray
  };
};

export default function SentimentAnalyzer({ onChange }: SentimentAnalyzerProps) {
  const [text, setText] = useState<string>("");
  const [sampleMode, setSampleMode] = useState<'manual' | 'sample1' | 'sample2' | 'sample3'>('manual');
  const [analysis, setAnalysis] = useState<any>(null);
  const [visualizationMode, setVisualizationMode] = useState<'bar' | 'radar' | 'words'>('bar');
  const [threshold, setThreshold] = useState<number>(0.1);
  
  // SVG references for the visualizations
  const barChartRef = useRef<SVGSVGElement>(null);
  const radarChartRef = useRef<SVGSVGElement>(null);
  const wordCloudRef = useRef<SVGSVGElement>(null);
  
  // Sample texts
  const sampleTexts = {
    sample1: "이 제품은 정말 좋아요! 놀랍고 완벽하게 작동합니다. 디자인이 아름답고 기능성이 뛰어납니다. 구매에 매우 만족하며 누구에게나 강력히 추천합니다.",
    sample2: "이것은 끔찍한 경험이었습니다. 제품은 품질이 나쁘고 며칠 만에 고장났습니다. 고객 서비스는 도움이 되지 않고 무례했습니다. 매우 실망했으며 누구에게도 추천하지 않습니다.",
    sample3: "제품은 예정대로 도착했으며 설명대로 작동하는 것 같습니다. 포장은 표준적이었고 설명서에는 기본적인 지침이 제공되었습니다. 설명에 기초하여 예상했던 대로, 그 이상도 이하도 아닙니다."
  };
  
  // Analyze text when it changes or threshold changes
  useEffect(() => {
    if (text.trim().length > 0) {
      const result = analyzeSentiment(text);
      setAnalysis(result);
      
      // If we have onChange prop, call it
      if (onChange) {
        onChange({
          text,
          threshold,
          result
        });
      }
    } else {
      setAnalysis(null);
    }
  }, [text, threshold, onChange]);
  
  // Render visualizations when analysis changes
  useEffect(() => {
    if (analysis) {
      if (barChartRef.current && visualizationMode === 'bar') {
        renderBarChart();
      }
      if (radarChartRef.current && visualizationMode === 'radar') {
        renderRadarChart();
      }
      if (wordCloudRef.current && visualizationMode === 'words') {
        renderWordCloud();
      }
    }
  }, [analysis, visualizationMode]);
  
  // Handle sample text selection
  useEffect(() => {
    if (sampleMode === 'manual') {
      // Keep the current text
    } else {
      setText(sampleTexts[sampleMode]);
    }
  }, [sampleMode]);
  
  const renderBarChart = () => {
    const svg = d3.select(barChartRef.current);
    svg.selectAll("*").remove();
    
    const width = 300;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    
    const data = [
      { name: '긍정적', value: analysis.score.positive },
      { name: '중립적', value: analysis.score.neutral },
      { name: '부정적', value: analysis.score.negative }
    ];
    
    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .domain(data.map(d => d.name))
      .padding(0.1);
    
    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, 1]);
    
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
    
    // Add Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5, "%"));
    
    // Add bars
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.name)!)
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom - y(d.value))
      .attr("fill", d => d.name === '긍정적' ? '#4CAF50' : d.name === '부정적' ? '#F44336' : '#2196F3');
  };
  
  const renderRadarChart = () => {
    const svg = d3.select(radarChartRef.current);
    svg.selectAll("*").remove();
    
    const width = 300;
    const height = 300;
    const margin = 60;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - margin;
    
    const emotions = [
      { name: '기쁨', value: analysis.emotions.joy },
      { name: '분노', value: analysis.emotions.anger },
      { name: '두려움', value: analysis.emotions.fear },
      { name: '놀라움', value: analysis.emotions.surprise }
    ];
    
    const angleSlice = (Math.PI * 2) / emotions.length;
    
    // Create the straight lines radiating outward from the center
    emotions.forEach((_, i) => {
      const angle = i * angleSlice;
      svg.append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX + radius * Math.cos(angle - Math.PI / 2))
        .attr("y2", centerY + radius * Math.sin(angle - Math.PI / 2))
        .attr("stroke", "rgba(200, 200, 200, 0.5)")
        .attr("stroke-width", 1);
      
      // Add emotion labels
      svg.append("text")
        .attr("x", centerX + (radius + 10) * Math.cos(angle - Math.PI / 2))
        .attr("y", centerY + (radius + 10) * Math.sin(angle - Math.PI / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text(emotions[i].name);
    });
    
    // Create the concentric circles
    [0.2, 0.4, 0.6, 0.8, 1].forEach(d => {
      svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", radius * d)
        .attr("fill", "none")
        .attr("stroke", "rgba(200, 200, 200, 0.5)")
        .attr("stroke-width", 1);
    });
    
    // Create the path connecting the data points
    const lineGenerator = d3.lineRadial<any>()
      .angle((d, i) => i * angleSlice)
      .radius(d => radius * d.value)
      .curve(d3.curveLinearClosed);
    
    svg.append("path")
      .datum(emotions)
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr("d", lineGenerator)
      .attr("fill", "rgba(70, 130, 180, 0.5)")
      .attr("stroke", "rgba(70, 130, 180, 0.9)")
      .attr("stroke-width", 2);
    
    // Add data points
    emotions.forEach((d, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      svg.append("circle")
        .attr("cx", centerX + radius * d.value * Math.cos(angle))
        .attr("cy", centerY + radius * d.value * Math.sin(angle))
        .attr("r", 5)
        .attr("fill", "rgba(70, 130, 180, 0.9)");
    });
  };
  
  const renderWordCloud = () => {
    const svg = d3.select(wordCloudRef.current);
    svg.selectAll("*").remove();
    
    const width = 300;
    const height = 200;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Only show words that appear more than the threshold times
    const words = analysis.keywords
      .filter((d: any) => d.count >= threshold * 10)
      .map((d: any) => ({
        text: d.word,
        size: 10 + (d.count * 3),
        sentiment: d.word in analysis.score ? 'positive' : 
                   d.word in analysis.score ? 'negative' : 'neutral'
      }));
    
    // Create a simple word cloud layout
    const placeWords = () => {
      const result = [];
      const angleStep = (2 * Math.PI) / words.length;
      const radiusScale = d3.scaleLinear()
        .domain([10, 20])
        .range([height / 4, height / 2 - 20]);
      
      for (let i = 0; i < words.length; i++) {
        const angle = i * angleStep;
        const radius = radiusScale(words[i].size);
        result.push({
          ...words[i],
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        });
      }
      
      return result;
    };
    
    const placedWords = placeWords();
    
    // Add the words
    svg.selectAll("text")
      .data(placedWords)
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("font-size", d => `${d.size}px`)
      .attr("fill", d => d.sentiment === 'positive' ? '#4CAF50' : 
                       d.sentiment === 'negative' ? '#F44336' : '#2196F3')
      .text(d => d.text);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4 overflow-hidden">
        <h3 className="text-lg font-bold mb-4">텍스트 분석</h3>
        
        <Tabs value={sampleMode} onValueChange={(v) => setSampleMode(v as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="manual">사용자 입력</TabsTrigger>
            <TabsTrigger value="sample1">긍정 샘플</TabsTrigger>
            <TabsTrigger value="sample2">부정 샘플</TabsTrigger>
            <TabsTrigger value="sample3">중립 샘플</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Textarea 
          value={text}
          onChange={e => {
            setText(e.target.value);
            setSampleMode('manual');
          }}
          placeholder="감정 분석을 위한 텍스트를 입력하세요..."
          className="mb-4 min-h-[150px]"
        />
        
        <div className="flex items-center space-x-4 mb-4">
          <Label htmlFor="threshold">키워드 임계값: {threshold.toFixed(2)}</Label>
          <Slider 
            id="threshold"
            min={0.01}
            max={0.5}
            step={0.01}
            value={[threshold]}
            onValueChange={([value]) => setThreshold(value)}
            className="w-full"
          />
        </div>
        
        {analysis && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${
                analysis.sentiment === 'positive' ? 'bg-green-500' : 
                analysis.sentiment === 'negative' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>
              <span className="font-medium">
                전체 감정: {analysis.sentiment === 'positive' ? '긍정적' : 
                          analysis.sentiment === 'negative' ? '부정적' : '중립적'}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>긍정 점수: {(analysis.score.positive * 100).toFixed(1)}%</p>
              <p>부정 점수: {(analysis.score.negative * 100).toFixed(1)}%</p>
              <p>중립 점수: {(analysis.score.neutral * 100).toFixed(1)}%</p>
            </div>
          </div>
        )}
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">감정 시각화</h3>
        
        {!analysis && (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            시각화를 보려면 텍스트를 입력하세요
          </div>
        )}
        
        {analysis && (
          <>
            <Tabs value={visualizationMode} onValueChange={(v) => setVisualizationMode(v as any)}>
              <TabsList className="mb-4">
                <TabsTrigger value="bar">감정</TabsTrigger>
                <TabsTrigger value="radar">감정 분포</TabsTrigger>
                <TabsTrigger value="words">핵심 단어</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bar" className="flex justify-center">
                <svg ref={barChartRef} width="300" height="200"></svg>
              </TabsContent>
              
              <TabsContent value="radar" className="flex justify-center">
                <svg ref={radarChartRef} width="300" height="300"></svg>
              </TabsContent>
              
              <TabsContent value="words" className="flex justify-center">
                <svg ref={wordCloudRef} width="300" height="200"></svg>
              </TabsContent>
            </Tabs>
          </>
        )}
      </Card>
    </div>
  );
}