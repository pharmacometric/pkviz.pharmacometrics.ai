import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';

const MobileWarning: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <Monitor className="w-16 h-16 text-blue-600 absolute top-0 left-4" />
            <Smartphone className="w-12 h-12 text-gray-400 absolute bottom-0 right-4" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Desktop Required
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            PKVis is optimized for desktop browsers to provide the best experience with complex pharmacokinetic modeling and data visualization.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              Please access PKVis from a desktop or laptop computer for full functionality.
            </p>
          </div>
        </div>
        
        <div className="space-y-3 text-sm text-gray-500">
          <p>✓ Interactive parameter adjustment</p>
          <p>✓ High-resolution plot visualization</p>
          <p>✓ Advanced model comparison tools</p>
          <p>✓ Comprehensive data analysis</p>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;