import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DataVisualizationDashboardProps {
  onChange?: (values: any) => void;
}

// Sample data for the dashboard
const generateSampleData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const categories = ['Product A', 'Product B', 'Product C', 'Product D'];
  const regions = ['North', 'South', 'East', 'West'];
  
  const sales = [];
  
  // Generate 3 years of monthly data
  for (let year = 2021; year <= 2023; year++) {
    months.forEach((month, monthIndex) => {
      categories.forEach(category => {
        regions.forEach(region => {
          const date = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`;
          const value = Math.floor(Math.random() * 1000) + 100;
          const growth = Math.random() * 0.4 - 0.2; // -20% to +20%
          
          sales.push({
            date,
            month: `${month} ${year}`,
            category,
            region,
            value,
            growth
          });
        });
      });
    });
  }
  
  return sales;
};

export default function DataVisualizationDashboard({ onChange }: DataVisualizationDashboardProps) {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('All Categories');
  const [region, setRegion] = useState<string>('All Regions');
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 36]); // 0-36 months (3 years)
  const [activeTab, setActiveTab] = useState<string>('line');
  const [animation, setAnimation] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // SVG refs for chart rendering
  const lineChartRef = useRef<SVGSVGElement>(null);
  const barChartRef = useRef<SVGSVGElement>(null);
  const heatmapRef = useRef<SVGSVGElement>(null);
  
  // Initialize data
  useEffect(() => {
    // Simulate loading data from an API
    setTimeout(() => {
      const sampleData = generateSampleData();
      setData(sampleData);
      setFilteredData(sampleData);
      setIsLoading(false);
      
      // If we have onChange prop, call it
      if (onChange) {
        onChange({
          totalRecords: sampleData.length,
          categories: ['Product A', 'Product B', 'Product C', 'Product D'],
          regions: ['North', 'South', 'East', 'West'],
          timeRange: [new Date('2021-01-01'), new Date('2023-12-01')]
        });
      }
    }, 1000);
  }, [onChange]);
  
  // Apply filters when they change
  useEffect(() => {
    if (data.length === 0) return;
    
    // Map time range to actual dates
    const allMonths = Array.from(new Set(data.map(d => d.date))).sort();
    const startMonth = allMonths[timeRange[0]];
    const endMonth = allMonths[Math.min(timeRange[1], allMonths.length - 1)];
    
    let result = [...data];
    
    // Filter by time range
    result = result.filter(d => {
      return d.date >= startMonth && d.date <= endMonth;
    });
    
    // Filter by category
    if (category !== 'All Categories') {
      result = result.filter(d => d.category === category);
    }
    
    // Filter by region
    if (region !== 'All Regions') {
      result = result.filter(d => d.region === region);
    }
    
    setFilteredData(result);
  }, [data, category, region, timeRange]);
  
  // Render charts when filtered data or active tab changes
  useEffect(() => {
    if (filteredData.length === 0) return;
    
    if (activeTab === 'line' && lineChartRef.current) {
      renderLineChart();
    } else if (activeTab === 'bar' && barChartRef.current) {
      renderBarChart();
    } else if (activeTab === 'heatmap' && heatmapRef.current) {
      renderHeatmap();
    }
  }, [filteredData, activeTab, animation]);
  
  const renderLineChart = () => {
    const svg = d3.select(lineChartRef.current);
    svg.selectAll("*").remove();
    
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 100, bottom: 50, left: 50 };
    
    // Prepare data: aggregate by month and category
    const aggregated = Array.from(
      d3.group(filteredData, d => d.date),
      ([date, values]) => ({
        date,
        values: Array.from(
          d3.group(values, d => d.category),
          ([category, items]) => ({
            category,
            value: d3.sum(items, d => d.value)
          })
        )
      })
    ).sort((a, b) => d3.ascending(a.date, b.date));
    
    // Set up scales
    const x = d3.scaleTime()
      .domain(d3.extent(aggregated, d => new Date(d.date)) as [Date, Date])
      .range([margin.left, width - margin.right]);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(aggregated, d => d3.max(d.values, v => v.value)) as number * 1.1])
      .range([height - margin.bottom, margin.top]);
    
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Draw axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => {
        const date = new Date(d as Date);
        return `${date.getMonth()+1}/${date.getFullYear().toString().substr(2)}`;
      }));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
    
    // Get all categories
    const categories = Array.from(new Set(filteredData.map(d => d.category)));
    
    // Draw lines for each category
    categories.forEach(cat => {
      const categoryData = aggregated.map(d => ({
        date: new Date(d.date),
        value: d.values.find(v => v.category === cat)?.value || 0
      }));
      
      // Define line
      const line = d3.line<{date: Date, value: number}>()
        .x(d => x(d.date))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);
      
      // Draw path
      const path = svg.append("path")
        .datum(categoryData)
        .attr("fill", "none")
        .attr("stroke", color(cat as string))
        .attr("stroke-width", 2)
        .attr("d", line);
      
      // Add animation if enabled
      if (animation) {
        const totalLength = path.node()?.getTotalLength() || 0;
        path.attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(1000)
          .attr("stroke-dashoffset", 0);
      }
      
      // Add circles for data points
      svg.selectAll(`.dot-${cat}`)
        .data(categoryData)
        .enter()
        .append("circle")
        .attr("class", `dot-${cat}`)
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 4)
        .attr("fill", color(cat as string))
        .style("opacity", 0)
        .transition()
        .delay(animation ? 1000 : 0)
        .duration(500)
        .style("opacity", 0.8);
    });
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);
    
    categories.forEach((cat, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 20})`);
      
      legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color(cat as string));
      
      legendRow.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .text(cat as string);
    });
    
    // Add axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Month");
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Sales");
  };
  
  const renderBarChart = () => {
    const svg = d3.select(barChartRef.current);
    svg.selectAll("*").remove();
    
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    
    // Aggregate data by category and region
    const aggregated = Array.from(
      d3.group(filteredData, d => d.category),
      ([category, values]) => ({
        category,
        regions: Array.from(
          d3.group(values, d => d.region),
          ([region, items]) => ({
            region,
            value: d3.sum(items, d => d.value)
          })
        )
      })
    );
    
    // Get all regions
    const regions = Array.from(new Set(filteredData.map(d => d.region)));
    const color = d3.scaleOrdinal(d3.schemeSet2).domain(regions);
    
    // Set up scales
    const x0 = d3.scaleBand()
      .domain(aggregated.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.2);
    
    const x1 = d3.scaleBand()
      .domain(regions)
      .range([0, x0.bandwidth()])
      .padding(0.05);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(aggregated, d => d3.max(d.regions, r => r.value)) as number * 1.1])
      .range([height - margin.bottom, margin.top]);
    
    // Draw axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em");
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
    
    // Draw grouped bars
    const categoryGroups = svg.selectAll(".category-group")
      .data(aggregated)
      .enter()
      .append("g")
      .attr("class", "category-group")
      .attr("transform", d => `translate(${x0(d.category)},0)`);
    
    // Add bars for each region within category
    categoryGroups.selectAll("rect")
      .data(d => d.regions)
      .enter()
      .append("rect")
      .attr("x", d => x1(d.region) || 0)
      .attr("y", height - margin.bottom)
      .attr("width", x1.bandwidth())
      .attr("height", 0)
      .attr("fill", d => color(d.region) as string)
      .transition()
      .duration(animation ? 1000 : 0)
      .attr("y", d => y(d.value))
      .attr("height", d => height - margin.bottom - y(d.value));
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom + 40})`);
    
    regions.forEach((region, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(${i * 120}, 0)`);
      
      legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color(region) as string);
      
      legendRow.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .style("font-size", "10px")
        .attr("text-anchor", "start")
        .text(region);
    });
    
    // Add axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Product Category");
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Total Sales");
  };
  
  const renderHeatmap = () => {
    const svg = d3.select(heatmapRef.current);
    svg.selectAll("*").remove();
    
    const width = 600;
    const height = 300;
    const margin = { top: 30, right: 50, bottom: 60, left: 70 };
    
    // Aggregate data by category and region for heatmap
    const categories = Array.from(new Set(filteredData.map(d => d.category)));
    const regions = Array.from(new Set(filteredData.map(d => d.region)));
    
    // Create a matrix of values
    const matrix = [];
    for (const category of categories) {
      for (const region of regions) {
        const value = d3.sum(
          filteredData.filter(d => d.category === category && d.region === region),
          d => d.value
        );
        matrix.push({ category, region, value });
      }
    }
    
    // Set up scales
    const x = d3.scaleBand()
      .domain(regions)
      .range([margin.left, width - margin.right])
      .padding(0.05);
    
    const y = d3.scaleBand()
      .domain(categories)
      .range([margin.top, height - margin.bottom])
      .padding(0.05);
    
    const maxValue = d3.max(matrix, d => d.value) || 0;
    const color = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, maxValue]);
    
    // Draw heatmap cells
    const cells = svg.selectAll("rect")
      .data(matrix)
      .enter()
      .append("rect")
      .attr("x", d => x(d.region) || 0)
      .attr("y", d => y(d.category) || 0)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("fill", "white")
      .transition()
      .duration(animation ? 800 : 0)
      .attr("fill", d => color(d.value));
    
    // Add text labels for values
    svg.selectAll("text.value")
      .data(matrix)
      .enter()
      .append("text")
      .attr("class", "value")
      .attr("x", d => (x(d.region) || 0) + x.bandwidth() / 2)
      .attr("y", d => (y(d.category) || 0) + y.bandwidth() / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "10px")
      .style("fill", d => d.value > maxValue * 0.7 ? "white" : "black")
      .style("opacity", 0)
      .text(d => d.value.toLocaleString())
      .transition()
      .delay(animation ? 800 : 0)
      .duration(500)
      .style("opacity", 1);
    
    // Draw axes
    svg.append("g")
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "start");
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
    
    // Add legend (color scale)
    const legendWidth = 20;
    const legendHeight = height - margin.top - margin.bottom;
    
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "heatmap-gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%");
    
    // Define gradient stops
    const stops = 10;
    for (let i = 0; i <= stops; i++) {
      const offset = i / stops;
      gradient.append("stop")
        .attr("offset", offset)
        .attr("stop-color", color(offset * maxValue))
        .attr("stop-opacity", 1);
    }
    
    // Draw legend rectangle
    svg.append("rect")
      .attr("x", width - margin.right + 20)
      .attr("y", margin.top)
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#heatmap-gradient)");
    
    // Add legend axis
    const legendScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([legendHeight + margin.top, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(${width - margin.right + 20 + legendWidth},0)`)
      .call(d3.axisRight(legendScale).ticks(5).tickFormat(d => d3.format(",.0f")(d)));
    
    // Add legend title
    svg.append("text")
      .attr("x", width - margin.right + 20 + legendWidth / 2)
      .attr("y", margin.top - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text("Sales");
    
    // Add axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Region");
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - margin.bottom + margin.top) / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Product Category");
  };
  
  // Reset all filters to default
  const resetFilters = () => {
    setCategory('All Categories');
    setRegion('All Regions');
    setTimeRange([0, 36]);
  };
  
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">Sales Analytics Dashboard</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Filter controls */}
          <div>
            <Label htmlFor="category-select" className="mb-2 block">Product Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                <SelectItem value="Product A">Product A</SelectItem>
                <SelectItem value="Product B">Product B</SelectItem>
                <SelectItem value="Product C">Product C</SelectItem>
                <SelectItem value="Product D">Product D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="region-select" className="mb-2 block">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region-select">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Regions">All Regions</SelectItem>
                <SelectItem value="North">North</SelectItem>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="animation-switch"
                checked={animation}
                onCheckedChange={setAnimation}
              />
              <Label htmlFor="animation-switch">Animation</Label>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <Label className="mb-2 block">Time Range: {timeRange[0]} - {timeRange[1]} months</Label>
          <Slider
            min={0}
            max={36}
            step={1}
            value={timeRange as [number, number]}
            onValueChange={(value) => setTimeRange(value as [number, number])}
            className="my-4"
          />
        </div>
      </Card>
      
      <Card className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Loading visualization data...</p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="line" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="line">Line Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              </TabsList>
              
              <TabsContent value="line" className="h-[350px] w-full overflow-auto">
                <svg ref={lineChartRef} width="600" height="300" className="mx-auto"></svg>
              </TabsContent>
              
              <TabsContent value="bar" className="h-[350px] w-full overflow-auto">
                <svg ref={barChartRef} width="600" height="300" className="mx-auto"></svg>
              </TabsContent>
              
              <TabsContent value="heatmap" className="h-[350px] w-full overflow-auto">
                <svg ref={heatmapRef} width="600" height="300" className="mx-auto"></svg>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                {filteredData.length} records displayed. 
                Showing data for {category === 'All Categories' ? 'all categories' : category} in {region === 'All Regions' ? 'all regions' : region}.
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}