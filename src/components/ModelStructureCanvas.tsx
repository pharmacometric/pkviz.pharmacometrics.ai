import React, { useRef, useEffect } from 'react';
import { ChevronDown, X, Palette } from 'lucide-react';
import { ModelStructureRenderer } from '../utils/ModelStructureRenderer';
import { PharmacokineticModel } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface StructureSettings {
  compartmentColor: string;
  textColor: string;
  lineColor: string;
  backgroundColor: string;
  fontSize: number;
}

interface ModelStructureCanvasProps {
  model: PharmacokineticModel;
  width?: number;
  height?: number;
}

const ModelStructureCanvas: React.FC<ModelStructureCanvasProps> = ({ 
  model, 
  width = 500, 
  height = 300 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ModelStructureRenderer | null>(null);
  const { isDark } = useTheme();
  const [showSettings, setShowSettings] = React.useState(false);
  const [structureSettings, setStructureSettings] = React.useState<StructureSettings>({
    compartmentColor: '#3b82f6',
    textColor: isDark ? '#ffffff' : '#000000',
    lineColor: '#ef4444',
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    fontSize: 14
  });

  // Update settings when theme changes
  useEffect(() => {
    setStructureSettings(prev => ({
      ...prev,
      textColor: isDark ? '#ffffff' : '#000000',
      backgroundColor: isDark ? '#1f2937' : '#ffffff'
    }));
  }, [isDark]);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!rendererRef.current) {
      rendererRef.current = new ModelStructureRenderer(canvasRef.current, isDark, structureSettings);
    } else {
      rendererRef.current.updateSettings(isDark, structureSettings);
    }

    const structure = rendererRef.current.getModelStructure(model.id);
    rendererRef.current.render(structure);
  }, [model.id, isDark, width, height, structureSettings]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Model Structure Diagram
        </h3>
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
          >
            <Palette className="w-4 h-4" />
            Customize
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showSettings && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Structure Settings</h4>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Compartment Color
                    </label>
                    <input
                      type="color"
                      value={structureSettings.compartmentColor}
                      onChange={(e) => setStructureSettings(prev => ({ ...prev, compartmentColor: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={structureSettings.textColor}
                      onChange={(e) => setStructureSettings(prev => ({ ...prev, textColor: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Line Color
                    </label>
                    <input
                      type="color"
                      value={structureSettings.lineColor}
                      onChange={(e) => setStructureSettings(prev => ({ ...prev, lineColor: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={structureSettings.backgroundColor}
                      onChange={(e) => setStructureSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Font Size: {structureSettings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={structureSettings.fontSize}
                    onChange={(e) => setStructureSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <button
                  onClick={() => setStructureSettings({
                    compartmentColor: '#3b82f6',
                    textColor: isDark ? '#ffffff' : '#000000',
                    lineColor: '#ef4444',
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    fontSize: 14
                  })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto border border-gray-200 dark:border-gray-600 rounded"
        style={{ backgroundColor: structureSettings.backgroundColor }}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p className="mb-2">
          <strong>Model Structure:</strong> This diagram shows the compartmental structure of the {model.name}.
        </p>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: structureSettings.compartmentColor }}></div>
            Central Compartment
          </span>
          {model.compartments > 1 && (
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
              Peripheral Compartment
            </span>
          )}
          <span className="flex items-center gap-1">
            <div className="w-3 h-1" style={{ backgroundColor: structureSettings.lineColor }}></div>
            Distribution
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-1" style={{ backgroundColor: structureSettings.lineColor }}></div>
            Elimination
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelStructureCanvas;