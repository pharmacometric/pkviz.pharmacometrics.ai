import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, RotateCcw, Eye, ChevronLeft, ChevronRight, User, Pill, Clock, Hash } from 'lucide-react';
import { PharmacokineticModel, Parameter, PatientParameters } from '../types';

interface ParameterPanelProps {
  model: PharmacokineticModel;
  isCollapsed: boolean;
  onToggle: () => void;
  onPatient1Change: (params: PatientParameters) => void;
  onPatient2Change: (params: PatientParameters) => void;
  onVisualize: () => void;
  patient1Params: PatientParameters;
  patient2Params: PatientParameters;
}

const ParameterPanel: React.FC<ParameterPanelProps> = ({
  model,
  isCollapsed,
  onToggle,
  onPatient1Change,
  onPatient2Change,
  onVisualize,
  patient1Params,
  patient2Params
}) => {
  const [activePatient, setActivePatient] = useState<1 | 2>(1);

  const getDefaultValue = (param: Parameter): number => {
    const range = param.typicalRange;
    if (range.includes('-')) {
      const parts = range.split('-');
      const min = parseFloat(parts[0].trim());
      const max = parseFloat(parts[1].split(' ')[0].trim());
      return (min + max) / 2;
    }
    return 1;
  };

  const resetToDefaults = (patientNum: 1 | 2) => {
    const defaultParams: PatientParameters = {
      dose: patientNum === 1 ? 100 : 75,
      numberOfDoses: 1,
      frequency: 24,
      parameters: {}
    };

    model.parameters.forEach(param => {
      if (param.estimable) {
        defaultParams.parameters[param.symbol] = getDefaultValue(param);
      }
    });

    if (patientNum === 1) {
      onPatient1Change(defaultParams);
    } else {
      onPatient2Change(defaultParams);
    }
  };

  const updatePatientParameter = (patientNum: 1 | 2, paramSymbol: string, value: number) => {
    const currentParams = patientNum === 1 ? patient1Params : patient2Params;
    const updatedParams = {
      ...currentParams,
      parameters: {
        ...currentParams.parameters,
        [paramSymbol]: value
      }
    };

    if (patientNum === 1) {
      onPatient1Change(updatedParams);
    } else {
      onPatient2Change(updatedParams);
    }
  };

  const updatePatientDosing = (patientNum: 1 | 2, field: keyof Omit<PatientParameters, 'parameters'>, value: number) => {
    const currentParams = patientNum === 1 ? patient1Params : patient2Params;
    const updatedParams = {
      ...currentParams,
      [field]: value
    };

    if (patientNum === 1) {
      onPatient1Change(updatedParams);
    } else {
      onPatient2Change(updatedParams);
    }
  };

  const currentParams = activePatient === 1 ? patient1Params : patient2Params;

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 400 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300"
    >
      {!isCollapsed && (
        <>
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Patient Parameters
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {model.name}
                </p>
              </div>
            </div>
            
            {/* Patient Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActivePatient(1)}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  activePatient === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <User className="w-4 h-4" />
                Patient 1
              </button>
              <button
                onClick={() => setActivePatient(2)}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  activePatient === 2
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <User className="w-4 h-4" />
                Patient 2
              </button>
            </div>
          </div>

          {/* Parameters - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Dosing Parameters */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Pill className="w-5 h-5" />
                Dosing Regimen
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dose (mg)
                  </label>
                  <input
                    type="number"
                    value={currentParams.dose}
                    onChange={(e) => updatePatientDosing(activePatient, 'dose', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Doses
                  </label>
                  <input
                    type="number"
                    value={currentParams.numberOfDoses}
                    onChange={(e) => updatePatientDosing(activePatient, 'numberOfDoses', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    step="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frequency (hours between doses)
                  </label>
                  <input
                    type="number"
                    value={currentParams.frequency}
                    onChange={(e) => updatePatientDosing(activePatient, 'frequency', parseFloat(e.target.value) || 24)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0.1"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Model Parameters */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Model Parameters
              </h3>
              
              {model.parameters.filter(param => param.estimable).map((param) => {
                const currentValue = currentParams.parameters[param.symbol] || getDefaultValue(param);
                
                return (
                  <div key={param.symbol} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                            {param.symbol}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({param.unit})
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {param.name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                          {currentValue.toFixed(3)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {param.description}
                    </p>
                    
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={getDefaultValue(param) * 0.1}
                        max={getDefaultValue(param) * 5}
                        step={getDefaultValue(param) * 0.01}
                        value={currentValue}
                        onChange={(e) => updatePatientParameter(activePatient, param.symbol, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                      
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{(getDefaultValue(param) * 0.1).toFixed(2)}</span>
                        <span>Typical: {param.typicalRange}</span>
                        <span>{(getDefaultValue(param) * 5).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={currentValue}
                        onChange={(e) => updatePatientParameter(activePatient, param.symbol, parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.001"
                        min="0"
                      />
                      <button
                        onClick={() => updatePatientParameter(activePatient, param.symbol, getDefaultValue(param))}
                        className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        Default
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Note:</strong> Configure parameters separately for each patient to compare their concentration-time profiles.
            </div>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => resetToDefaults(activePatient)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Toggle Button at Bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ParameterPanel;