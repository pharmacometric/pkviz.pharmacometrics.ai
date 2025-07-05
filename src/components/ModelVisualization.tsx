import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import { Download, BarChart3, ChevronDown, X } from 'lucide-react';
import { PharmacokineticModel, PatientParameters, PlotSettings } from '../types';
import { PKSolver } from '../utils/PKSolver';

interface ModelVisualizationProps {
  model: PharmacokineticModel;
  width?: number;
  height?: number;
  patient1Params: PatientParameters;
  patient2Params: PatientParameters;
}

const ModelVisualization: React.FC<ModelVisualizationProps> = ({ 
  model, 
  width = 600, 
  height = 400,
  patient1Params,
  patient2Params
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scaleType, setScaleType] = useState<'linear' | 'log'>('linear');
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [plotSettings, setPlotSettings] = useState<PlotSettings>({
    title: `${model.name} - Concentration vs Time`,
    xAxisTitle: 'Time (hours)',
    yAxisTitle: 'Concentration (mg/L)',
    fontSize: 12,
    xAxisMin: 0,
    xAxisMax: 24,
    yAxisMin: 0.1,
    yAxisMax: 100,
    width: 800,
    height: 600,
    patient1Color: '#3b82f6',
    patient2Color: '#ef4444'
  });
  const solver = PKSolver.getInstance();

  // Auto-redraw when plot settings change
  useEffect(() => {
    // Force re-render when any plot setting changes
    const timeoutId = setTimeout(() => {
      // This effect will trigger the main useEffect below
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [plotSettings]);

  const generatePatientData = (patientParams: PatientParameters) => {
    const { dose, numberOfDoses, frequency, parameters } = patientParams;
    
    // Generate time points for simulation
    const totalTime = Math.max(24, numberOfDoses * frequency + 12);
    const timePoints: number[] = [];
    const concentrations: number[] = [];
    
    // Simulate each dose
    for (let doseNum = 0; doseNum < numberOfDoses; doseNum++) {
      const doseTime = doseNum * frequency;
      
      // Solve for this dose
      const result = solver.solveModel(model.id, parameters, dose, {
        tStart: 0,
        tEnd: totalTime - doseTime,
        stepSize: 0.1,
        method: 'rk4'
      });
      
      // Add to overall profile
      result.time.forEach((t, i) => {
        const actualTime = t + doseTime;
        if (actualTime <= totalTime) {
          const existingIndex = timePoints.findIndex(time => Math.abs(time - actualTime) < 0.05);
          if (existingIndex >= 0) {
            concentrations[existingIndex] += result.concentration[i];
          } else {
            timePoints.push(actualTime);
            concentrations.push(result.concentration[i]);
          }
        }
      });
    }
    
    // Sort by time
    const sortedData = timePoints.map((time, i) => ({ time, concentration: concentrations[i] }))
      .sort((a, b) => a.time - b.time);
    
    return sortedData.filter(d => 
      !isNaN(d.time) && 
      !isNaN(d.concentration) && 
      isFinite(d.concentration) && 
      d.concentration > 0
    );
  };

  const downloadPlot = () => {
    if (!svgRef.current) return;

    // Create a new SVG with custom settings
    const customSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    customSvg.setAttribute('width', plotSettings.width.toString());
    customSvg.setAttribute('height', plotSettings.height.toString());
    customSvg.style.backgroundColor = 'white';
    customSvg.style.fontFamily = 'Arial, sans-serif';

    // Recreate the plot with custom settings
    const margin = { top: 60, right: 80, bottom: 80, left: 80 };
    const innerWidth = plotSettings.width - margin.left - margin.right;
    const innerHeight = plotSettings.height - margin.top - margin.bottom;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    customSvg.appendChild(g);

    // Generate data
    const patient1Data = generatePatientData(patient1Params);
    const patient2Data = generatePatientData(patient2Params);

    if (patient1Data.length === 0 && patient2Data.length === 0) return;

    // Scales
    const allData = [...patient1Data, ...patient2Data];
    const timeExtent = d3.extent(allData, d => d.time) as [number, number];
    const concExtent = d3.extent(allData, d => d.concentration) as [number, number];

    const xScale = d3.scaleLinear()
      .domain([plotSettings.xAxisMin, plotSettings.xAxisMax])
      .range([0, innerWidth]);

    const yScale = scaleType === 'log' 
      ? d3.scaleLog().domain([plotSettings.yAxisMin, plotSettings.yAxisMax]).range([innerHeight, 0])
      : d3.scaleLinear().domain([plotSettings.yAxisMin, plotSettings.yAxisMax]).range([innerHeight, 0]);

    // Add title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', (plotSettings.width / 2).toString());
    title.setAttribute('y', '25');
    title.setAttribute('text-anchor', 'middle');
    title.style.fontSize = `${plotSettings.fontSize + 4}px`;
    title.style.fontWeight = 'bold';
    title.style.fill = 'black';
    title.textContent = plotSettings.title;
    customSvg.appendChild(title);

    // Add axes labels
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', (margin.left + innerWidth / 2).toString());
    xLabel.setAttribute('y', (plotSettings.height - 20).toString());
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.style.fontSize = `${plotSettings.fontSize}px`;
    xLabel.style.fill = 'black';
    xLabel.textContent = plotSettings.xAxisTitle;
    customSvg.appendChild(xLabel);

    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('transform', `translate(20, ${margin.top + innerHeight / 2}) rotate(-90)`);
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.style.fontSize = `${plotSettings.fontSize}px`;
    yLabel.style.fill = 'black';
    yLabel.textContent = plotSettings.yAxisTitle;
    customSvg.appendChild(yLabel);

    // Draw lines for each patient
    const line = d3.line<{ time: number; concentration: number }>()
      .x(d => xScale(d.time))
      .y(d => yScale(d.concentration))
      .curve(d3.curveMonotoneX);

    if (patient1Data.length > 0) {
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', line(patient1Data) || '');
      path1.setAttribute('fill', 'none');
      path1.setAttribute('stroke', plotSettings.patient1Color);
      path1.setAttribute('stroke-width', '3');
      g.appendChild(path1);
    }

    if (patient2Data.length > 0) {
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', line(patient2Data) || '');
      path2.setAttribute('fill', 'none');
      path2.setAttribute('stroke', plotSettings.patient2Color);
      path2.setAttribute('stroke-width', '3');
      g.appendChild(path2);
    }

    // Add legend
    const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    legend.setAttribute('transform', `translate(${plotSettings.width - 150}, ${margin.top + 20})`);
    
    // Patient 1 legend
    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('x', '0');
    rect1.setAttribute('y', '0');
    rect1.setAttribute('width', '20');
    rect1.setAttribute('height', '3');
    rect1.setAttribute('fill', plotSettings.patient1Color);
    legend.appendChild(rect1);
    
    const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text1.setAttribute('x', '30');
    text1.setAttribute('y', '12');
    text1.style.fontSize = `${plotSettings.fontSize}px`;
    text1.style.fill = 'black';
    text1.textContent = 'Patient 1';
    legend.appendChild(text1);
    
    // Patient 2 legend
    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('x', '0');
    rect2.setAttribute('y', '20');
    rect2.setAttribute('width', '20');
    rect2.setAttribute('height', '3');
    rect2.setAttribute('fill', plotSettings.patient2Color);
    legend.appendChild(rect2);
    
    const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text2.setAttribute('x', '30');
    text2.setAttribute('y', '32');
    text2.style.fontSize = `${plotSettings.fontSize}px`;
    text2.style.fill = 'black';
    text2.textContent = 'Patient 2';
    legend.appendChild(text2);
    
    customSvg.appendChild(legend);

    // Convert to blob and download
    const svgData = new XMLSerializer().serializeToString(customSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = plotSettings.width * 2;
    canvas.height = plotSettings.height * 2;
    
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${model.name.replace(/\s+/g, '_')}_comparison_plot.png`);
        }
      });
      
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
    
    setShowDownloadOptions(false);
  };

  // Auto-redraw when plot settings change
  useEffect(() => {
    // This will trigger a re-render of the main plot when settings change
  }, [plotSettings]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Generate data for both patients
    const patient1Data = generatePatientData(patient1Params);
    const patient2Data = generatePatientData(patient2Params);

    if (patient1Data.length === 0 && patient2Data.length === 0) return;

    // Combine data for scaling
    const allData = [...patient1Data, ...patient2Data];
    const timeExtent = d3.extent(allData, d => d.time) as [number, number];
    const concExtent = d3.extent(allData, d => d.concentration) as [number, number];

    if (!timeExtent[0] && timeExtent[0] !== 0) timeExtent[0] = 0;
    if (!timeExtent[1]) timeExtent[1] = 24;
    if (!concExtent[0] || concExtent[0] <= 0) concExtent[0] = 0.1;
    if (!concExtent[1] || concExtent[1] <= 0) concExtent[1] = 100;

    // Scales
    const xScale = d3.scaleLinear()
      .domain(timeExtent)
      .range([0, innerWidth]);

    const yScale = scaleType === 'log' 
      ? d3.scaleLog().domain(concExtent).range([innerHeight, 0])
      : d3.scaleLinear().domain([0, concExtent[1]]).range([innerHeight, 0]);

    // Line generator
    const line = d3.line<{ time: number; concentration: number }>()
      .x(d => xScale(d.time))
      .y(d => yScale(d.concentration))
      .curve(d3.curveMonotoneX)
      .defined(d => !isNaN(d.concentration) && d.concentration > 0);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 35)
      .attr('fill', 'black')
      .style('text-anchor', 'middle')
      .text('Time (hours)');

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .style('text-anchor', 'middle')
      .text(`Concentration (mg/L) ${scaleType === 'log' ? '- Log Scale' : '- Linear Scale'}`);

    // Add grid
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3);

    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3);

    // Add lines for each patient
    if (patient1Data.length > 0) {
      g.append('path')
        .datum(patient1Data)
        .attr('fill', 'none')
        .attr('stroke', plotSettings.patient1Color)
        .attr('stroke-width', 3)
        .attr('d', line);
    }

    if (patient2Data.length > 0) {
      g.append('path')
        .datum(patient2Data)
        .attr('fill', 'none')
        .attr('stroke', plotSettings.patient2Color)
        .attr('stroke-width', 3)
        .attr('d', line);
    }

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text(`${model.name} - Patient Comparison`);

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 140}, ${margin.top + 20})`);

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 3)
      .attr('fill', plotSettings.patient1Color);

    legend.append('text')
      .attr('x', 30)
      .attr('y', 12)
      .style('font-size', '12px')
      .text('Patient 1');

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 20)
      .attr('width', 20)
      .attr('height', 3)
      .attr('fill', plotSettings.patient2Color);

    legend.append('text')
      .attr('x', 30)
      .attr('y', 32)
      .style('font-size', '12px')
      .text('Patient 2');

  }, [model, width, height, patient1Params, patient2Params, scaleType, plotSettings]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Scale:
            </label>
            <select
              value={scaleType}
              onChange={(e) => setScaleType(e.target.value as 'linear' | 'log')}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="linear">Linear</option>
              <option value="log">Semi-log</option>
            </select>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
          >
            <Download className="w-4 h-4" />
            Download Plot
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showDownloadOptions && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Plot Settings</h3>
                <button
                  onClick={() => setShowDownloadOptions(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={plotSettings.title}
                    onChange={(e) => {
                      setPlotSettings(prev => ({ ...prev, title: e.target.value }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      X-Axis Title
                    </label>
                    <input
                      type="text"
                      value={plotSettings.xAxisTitle}
                      onChange={(e) => {
                        setPlotSettings(prev => ({ ...prev, xAxisTitle: e.target.value }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Y-Axis Title
                    </label>
                    <input
                      type="text"
                      value={plotSettings.yAxisTitle}
                      onChange={(e) => {
                        setPlotSettings(prev => ({ ...prev, yAxisTitle: e.target.value }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Font Size
                    </label>
                    <input
                      type="number"
                      value={plotSettings.fontSize}
                      onChange={(e) => {
                        setPlotSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) || 12 }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      min="8"
                      max="24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Width × Height
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={plotSettings.width}
                        onChange={(e) => {
                          setPlotSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 800 }));
                        }}
                        className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        min="400"
                      />
                      <span className="text-gray-500 self-center">×</span>
                      <input
                        type="number"
                        value={plotSettings.height}
                        onChange={(e) => {
                          setPlotSettings(prev => ({ ...prev, height: parseInt(e.target.value) || 600 }));
                        }}
                        className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        min="300"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      X-Axis Range
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={plotSettings.xAxisMin}
                        onChange={(e) => {
                          setPlotSettings(prev => ({ ...prev, xAxisMin: parseFloat(e.target.value) || 0 }));
                        }}
                        className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        step="0.1"
                      />
                      <span className="text-gray-500 self-center">-</span>
                      <input
                        type="number"
                        value={plotSettings.xAxisMax}
                        onChange={(e) => {
                          setPlotSettings(prev => ({ ...prev, xAxisMax: parseFloat(e.target.value) || 24 }));
                        }}
                        className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        step="0.1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Y-Axis Range
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={plotSettings.yAxisMin}
                        onChange={(e) => {
                          setPlotSettings(prev => ({ ...prev, yAxisMin: parseFloat(e.target.value) || 0.1 }));
                        }}
                        className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        step="0.1"
                      />
                      <span className="text-gray-500 self-center">-</span>
                      <input
                        type="number"
                        value={plotSettings.yAxisMax}
                        onChange={(e) => {
                          setPlotSettings(prev => ({ ...prev, yAxisMax: parseFloat(e.target.value) || 100 }));
                        }}
                        className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Patient 1 Color
                    </label>
                    <input
                      type="color"
                      value={plotSettings.patient1Color}
                      onChange={(e) => {
                        setPlotSettings(prev => ({ ...prev, patient1Color: e.target.value }));
                      }}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Patient 2 Color
                    </label>
                    <input
                      type="color"
                      value={plotSettings.patient2Color}
                      onChange={(e) => {
                        setPlotSettings(prev => ({ ...prev, patient2Color: e.target.value }));
                      }}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <button
                  onClick={downloadPlot}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm mt-4"
                >
                  <Download className="w-4 h-4" />
                  Download Plot
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
};

export default ModelVisualization;