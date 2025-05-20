import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MapExplorerProps {
  onChange?: (values: any) => void;
}

// This is a simplified map visualization since we don't have mapbox-gl
// In a real implementation, we would use a proper mapping library
export default function MapExplorer({ onChange }: MapExplorerProps) {
  // Map state
  const [mapMode, setMapMode] = useState<'standard' | 'satellite' | 'terrain'>('standard');
  const [dataLayer, setDataLayer] = useState<'population' | 'income' | 'education' | 'none'>('population');
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // SVG refs
  const mapRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);
  
  // Sample geo data - in a real app, this would be GeoJSON
  const regions = [
    { id: 'region1', name: 'Northern District', center: [150, 100], population: 1250000, income: 85000, education: 76 },
    { id: 'region2', name: 'Central District', center: [250, 200], population: 3450000, income: 92000, education: 82 },
    { id: 'region3', name: 'Eastern District', center: [350, 150], population: 870000, income: 65000, education: 68 },
    { id: 'region4', name: 'Southern District', center: [200, 300], population: 1980000, income: 78000, education: 73 },
    { id: 'region5', name: 'Western District', center: [100, 250], population: 1340000, income: 70000, education: 71 }
  ];
  
  const points = [
    { id: 'point1', name: 'City A', position: [140, 90], region: 'region1', value: 120 },
    { id: 'point2', name: 'City B', position: [160, 110], region: 'region1', value: 85 },
    { id: 'point3', name: 'City C', position: [240, 190], region: 'region2', value: 210 },
    { id: 'point4', name: 'City D', position: [260, 210], region: 'region2', value: 180 },
    { id: 'point5', name: 'City E', position: [340, 140], region: 'region3', value: 65 },
    { id: 'point6', name: 'City F', position: [360, 160], region: 'region3', value: 70 },
    { id: 'point7', name: 'City G', position: [190, 290], region: 'region4', value: 130 },
    { id: 'point8', name: 'City H', position: [210, 310], region: 'region4', value: 110 },
    { id: 'point9', name: 'City I', position: [90, 240], region: 'region5', value: 95 },
    { id: 'point10', name: 'City J', position: [110, 260], region: 'region5', value: 105 }
  ];
  
  // Paths connecting regions - in a real app, this would be real routes or boundaries
  const paths = [
    { id: 'path1', from: 'region1', to: 'region2', points: [[150, 100], [200, 150], [250, 200]] },
    { id: 'path2', from: 'region2', to: 'region3', points: [[250, 200], [300, 175], [350, 150]] },
    { id: 'path3', from: 'region2', to: 'region4', points: [[250, 200], [225, 250], [200, 300]] },
    { id: 'path4', from: 'region4', to: 'region5', points: [[200, 300], [150, 275], [100, 250]] },
    { id: 'path5', from: 'region5', to: 'region1', points: [[100, 250], [125, 175], [150, 100]] }
  ];
  
  // Simulated data for the selected region
  const getRegionData = (regionId: string | null) => {
    if (!regionId) return [];
    
    const monthlyData = [];
    let baseValue = regions.find(r => r.id === regionId)?.population || 1000000;
    baseValue = baseValue / 10000;
    
    for (let i = 1; i <= 12; i++) {
      const variation = (Math.random() * 0.4) - 0.2; // -20% to +20%
      monthlyData.push({
        month: i,
        value: baseValue * (1 + variation)
      });
    }
    
    return monthlyData;
  };
  
  // Initialize map
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
      
      // If we have onChange prop, call it
      if (onChange) {
        onChange({
          mapMode,
          dataLayer,
          zoomLevel,
          showLabels,
          showPoints
        });
      }
    }, 1000);
  }, [onChange]);
  
  // Render map when settings change
  useEffect(() => {
    if (isLoading) return;
    
    renderMap();
    if (selectedRegion) {
      renderChart(getRegionData(selectedRegion));
    }
  }, [mapMode, dataLayer, zoomLevel, showLabels, showPoints, selectedRegion, isLoading]);
  
  const renderMap = () => {
    const svg = d3.select(mapRef.current);
    svg.selectAll("*").remove();
    
    const width = 500;
    const height = 400;
    
    // Create background based on selected mode
    const background = svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", mapMode === 'standard' ? "#f0f0f0" : 
                   mapMode === 'satellite' ? "#2e4c5a" : 
                   "#e8e0d8");
      
    // Add texture pattern for satellite view
    if (mapMode === 'satellite') {
      // Add a pattern for satellite texture
      const defs = svg.append("defs");
      const pattern = defs.append("pattern")
        .attr("id", "satellite-pattern")
        .attr("width", 5)
        .attr("height", 5)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("patternTransform", "rotate(45)");
        
      pattern.append("rect")
        .attr("width", 5)
        .attr("height", 5)
        .attr("fill", "#2e4c5a");
        
      pattern.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", 5)
        .attr("stroke", "#3a5c6c")
        .attr("stroke-width", 1);
        
      background.attr("fill", "url(#satellite-pattern)");
    }
    
    // Add texture for terrain mode
    if (mapMode === 'terrain') {
      // Add contour lines
      for (let i = 0; i < 10; i++) {
        const y = i * 40 + 20;
        svg.append("path")
          .attr("d", `M0,${y} C100,${y+20} 200,${y-20} 300,${y+10} S400,${y-5} 500,${y-15}`)
          .attr("fill", "none")
          .attr("stroke", "#c0b090")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.5);
      }
    }
    
    // Draw connecting paths (routes)
    const lineGenerator = d3.line();
    
    paths.forEach(path => {
      svg.append("path")
        .attr("d", lineGenerator(path.points as [number, number][]))
        .attr("fill", "none")
        .attr("stroke", "#8895a7")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", mapMode === 'standard' ? "0" : "5,5") // Dashed lines for satellite/terrain
        .attr("opacity", 0.6);
    });
    
    // Draw regions
    regions.forEach(region => {
      // Determine fill color based on data layer
      let fillColor = "#a0c8f0"; // Default
      
      if (dataLayer === 'population') {
        // Blue gradient based on population
        const popScale = d3.scaleLinear()
          .domain([500000, 4000000])
          .range([0.2, 0.8]);
        fillColor = `rgba(65, 105, 225, ${popScale(region.population)})`;
      } else if (dataLayer === 'income') {
        // Green gradient based on income
        const incomeScale = d3.scaleLinear()
          .domain([60000, 100000])
          .range([0.2, 0.8]);
        fillColor = `rgba(46, 139, 87, ${incomeScale(region.income)})`;
      } else if (dataLayer === 'education') {
        // Purple gradient based on education
        const eduScale = d3.scaleLinear()
          .domain([65, 85])
          .range([0.2, 0.8]);
        fillColor = `rgba(138, 43, 226, ${eduScale(region.education)})`;
      }
      
      // Draw region circle
      const regionCircle = svg.append("circle")
        .attr("cx", region.center[0])
        .attr("cy", region.center[1])
        .attr("r", 30 * (zoomLevel / 5)) // Adjust size based on zoom
        .attr("fill", fillColor)
        .attr("stroke", region.id === selectedRegion ? "#ff6b6b" : "#6b7f99")
        .attr("stroke-width", region.id === selectedRegion ? 3 : 1)
        .style("cursor", "pointer")
        .on("click", () => {
          setSelectedRegion(region.id === selectedRegion ? null : region.id);
        });
      
      // Add hover effect
      regionCircle
        .on("mouseover", function() {
          d3.select(this)
            .attr("stroke-width", 2)
            .attr("stroke", "#ff6b6b");
        })
        .on("mouseout", function() {
          d3.select(this)
            .attr("stroke-width", region.id === selectedRegion ? 3 : 1)
            .attr("stroke", region.id === selectedRegion ? "#ff6b6b" : "#6b7f99");
        });
      
      // Add region labels if enabled
      if (showLabels) {
        svg.append("text")
          .attr("x", region.center[0])
          .attr("y", region.center[1])
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("font-size", 10 * (zoomLevel / 5))
          .attr("fill", "#333")
          .attr("pointer-events", "none")
          .text(region.name);
      }
    });
    
    // Draw points if enabled
    if (showPoints) {
      points.forEach(point => {
        // Only show points for selected region, or all if none selected
        if (selectedRegion && point.region !== selectedRegion) return;
        
        const pointCircle = svg.append("circle")
          .attr("cx", point.position[0])
          .attr("cy", point.position[1])
          .attr("r", 5 * (zoomLevel / 5))
          .attr("fill", "#ff7f50")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .style("cursor", "pointer");
          
        // Add hover effect
        pointCircle
          .on("mouseover", function() {
            d3.select(this)
              .attr("r", 7 * (zoomLevel / 5))
              .attr("stroke-width", 2);
              
            // Show tooltip
            svg.append("rect")
              .attr("class", "tooltip")
              .attr("x", point.position[0] + 10)
              .attr("y", point.position[1] - 30)
              .attr("width", 80)
              .attr("height", 20)
              .attr("fill", "#333")
              .attr("rx", 3)
              .attr("ry", 3);
              
            svg.append("text")
              .attr("class", "tooltip")
              .attr("x", point.position[0] + 15)
              .attr("y", point.position[1] - 15)
              .attr("font-size", 10)
              .attr("fill", "#fff")
              .text(`${point.name}: ${point.value}`);
          })
          .on("mouseout", function() {
            d3.select(this)
              .attr("r", 5 * (zoomLevel / 5))
              .attr("stroke-width", 1);
              
            // Remove tooltip
            svg.selectAll(".tooltip").remove();
          });
          
        // Add point labels if enabled and zoomed in enough
        if (showLabels && zoomLevel > 7) {
          svg.append("text")
            .attr("x", point.position[0])
            .attr("y", point.position[1] - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", 8 * (zoomLevel / 5))
            .attr("fill", "#333")
            .attr("pointer-events", "none")
            .text(point.name);
        }
      });
    }
    
    // Add compass
    const compassG = svg.append("g")
      .attr("transform", `translate(${width - 40}, 40)`);
      
    compassG.append("circle")
      .attr("r", 15)
      .attr("fill", "#fff")
      .attr("stroke", "#333")
      .attr("stroke-width", 1);
      
    compassG.append("path")
      .attr("d", "M0,-12 L2,-5 L-2,-5 Z")
      .attr("fill", "#d00")
      .attr("transform", "rotate(0)"); // North
      
    compassG.append("path")
      .attr("d", "M0,-12 L2,-5 L-2,-5 Z") 
      .attr("fill", "#333")
      .attr("transform", "rotate(90)"); // East
      
    compassG.append("path")
      .attr("d", "M0,-12 L2,-5 L-2,-5 Z")
      .attr("fill", "#333")
      .attr("transform", "rotate(180)"); // South
      
    compassG.append("path")
      .attr("d", "M0,-12 L2,-5 L-2,-5 Z")
      .attr("fill", "#333")
      .attr("transform", "rotate(270)"); // West
      
    // Add scale bar
    const scaleG = svg.append("g")
      .attr("transform", `translate(${width - 100}, ${height - 30})`);
      
    scaleG.append("rect")
      .attr("width", 50)
      .attr("height", 5)
      .attr("fill", "#333");
      
    scaleG.append("text")
      .attr("x", 25)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#333")
      .text(`${10 / zoomLevel} km`);
      
    // Add map mode indicator
    svg.append("text")
      .attr("x", 20)
      .attr("y", 20)
      .attr("font-size", 12)
      .attr("fill", "#333")
      .text(`${mapMode.charAt(0).toUpperCase() + mapMode.slice(1)} Map`);
      
    // Add data layer indicator if active
    if (dataLayer !== 'none') {
      svg.append("text")
        .attr("x", 20)
        .attr("y", 40)
        .attr("font-size", 12)
        .attr("fill", "#333")
        .text(`${dataLayer.charAt(0).toUpperCase() + dataLayer.slice(1)} Data`);
    }
  };
  
  const renderChart = (data: any[]) => {
    if (!data.length) return;
    
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();
    
    const width = 500;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    
    // Create scales
    const x = d3.scaleLinear()
      .domain([1, 12])
      .range([margin.left, width - margin.right]);
      
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number * 1.2])
      .range([height - margin.bottom, margin.top]);
      
    // Draw axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(12).tickFormat(d => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[+d - 1];
      }));
      
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
      
    // Create line
    const line = d3.line<any>()
      .x(d => x(d.month))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
      
    // Draw line
    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
      
    // Add data points
    svg.selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => x(d.month))
      .attr("cy", d => y(d.value))
      .attr("r", 4)
      .attr("fill", "steelblue");
      
    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      .attr("font-weight", "bold")
      .text(`Monthly Data: ${regions.find(r => r.id === selectedRegion)?.name || ''}`);
      
    // Add axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text("Month");
      
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text(dataLayer === 'population' ? "Population (thousands)" : 
           dataLayer === 'income' ? "Avg. Income ($)" : 
           dataLayer === 'education' ? "Education Index" : "Value");
  };
  
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">Interactive Map Explorer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Map controls */}
          <div>
            <Label className="mb-2 block">Map Type</Label>
            <Select value={mapMode} onValueChange={(value) => setMapMode(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Map Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="mb-2 block">Data Layer</Label>
            <Select value={dataLayer} onValueChange={(value) => setDataLayer(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Data Layer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="population">Population Density</SelectItem>
                <SelectItem value="income">Income Levels</SelectItem>
                <SelectItem value="education">Education Index</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="labels-switch" checked={showLabels} onCheckedChange={setShowLabels} />
              <Label htmlFor="labels-switch">Show Labels</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="points-switch" checked={showPoints} onCheckedChange={setShowPoints} />
              <Label htmlFor="points-switch">Show Points</Label>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <Label className="mb-2 block">Zoom Level: {zoomLevel}</Label>
          <Slider
            min={1}
            max={10}
            step={1}
            value={[zoomLevel]}
            onValueChange={(value) => setZoomLevel(value[0])}
          />
        </div>
      </Card>
      
      <Card className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">Loading map data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <svg ref={mapRef} width="500" height="400" className="mx-auto" />
            </div>
            
            {selectedRegion && (
              <div className="space-y-2">
                <h4 className="font-medium">
                  Selected Region: {regions.find(r => r.id === selectedRegion)?.name}
                </h4>
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <svg ref={chartRef} width="500" height="200" className="mx-auto" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <p className="text-xs text-muted-foreground">Population</p>
                    <p className="font-medium">
                      {regions.find(r => r.id === selectedRegion)?.population.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <p className="text-xs text-muted-foreground">Avg. Income</p>
                    <p className="font-medium">
                      ${regions.find(r => r.id === selectedRegion)?.income.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                    <p className="text-xs text-muted-foreground">Education Index</p>
                    <p className="font-medium">
                      {regions.find(r => r.id === selectedRegion)?.education}/100
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRegion(null)}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            )}
            
            {!selectedRegion && (
              <div className="text-center text-muted-foreground text-sm p-4">
                <p>Click on a region to view detailed information</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}