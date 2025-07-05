import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  BookOpen, 
  Settings, 
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { getModelById } from '../data/models';
import ModelVisualization from '../components/ModelVisualization';
import ParameterPanel from '../components/ParameterPanel';
import { PatientParameters } from '../types';
import ModelStructureCanvas from '../components/ModelStructureCanvas';

const ModelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [showExtendedDescription, setShowExtendedDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('plot');
  const [isParameterPanelCollapsed, setIsParameterPanelCollapsed] = useState(false);
  const [patient1Params, setPatient1Params] = useState<PatientParameters>({
    dose: 100,
    numberOfDoses: 1,
    frequency: 24,
    parameters: {}
  });
  const [patient2Params, setPatient2Params] = useState<PatientParameters>({
    dose: 75,
    numberOfDoses: 1,
    frequency: 24,
    parameters: {}
  });
  const [visualizationKey, setVisualizationKey] = useState(0);

  const model = id ? getModelById(id) : null;

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Model Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">The requested pharmacokinetic model could not be found.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'parameters', label: 'Parameters', icon: Settings },
    { id: 'structure', label: 'Model Structure', icon: Target },
    { id: 'plot', label: 'Visualization', icon: BarChart3 },
  ];

  const handleVisualize = () => {
    setVisualizationKey(prev => prev + 1);
  };

  // Initialize default parameter values when model changes
  useEffect(() => {
    if (model) {
      const getDefaultValue = (param: any): number => {
        const range = param.typicalRange;
        if (range.includes('-')) {
          const parts = range.split('-');
          const min = parseFloat(parts[0].trim());
          const max = parseFloat(parts[1].split(' ')[0].trim());
          return (min + max) / 2;
        }
        return 1;
      };

      const defaultParams1: PatientParameters = {
        dose: 100,
        numberOfDoses: 1,
        frequency: 24,
        parameters: {}
      };

      const defaultParams2: PatientParameters = {
        dose: 75,
        numberOfDoses: 1,
        frequency: 24,
        parameters: {}
      };

      model.parameters.forEach(param => {
        if (param.estimable) {
          const defaultValue = getDefaultValue(param);
          defaultParams1.parameters[param.symbol] = defaultValue;
          defaultParams2.parameters[param.symbol] = defaultValue * 0.8; // Slightly different for patient 2
        }
      });

      setPatient1Params(defaultParams1);
      setPatient2Params(defaultParams2);
    }
  }, [model?.id]);
  const renderTabContent = () => {
    switch (activeTab) {
      case 'parameters':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {model.parameters.map((param, index) => (
                <motion.div
                  key={param.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                        {param.symbol}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({param.unit})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {param.estimable ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {param.estimable ? 'Estimable' : 'Derived'}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">{param.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">{param.description}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    <strong>Typical Range:</strong> {param.typicalRange}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 transition-colors duration-300">Key Equations</h4>
              <div className="space-y-2">
                {model.equations.map((eq, index) => (
                  <div key={index} className="font-mono text-sm text-blue-800 dark:text-blue-200 bg-white dark:bg-gray-800 px-3 py-2 rounded border border-blue-200 dark:border-blue-700 transition-colors duration-300">
                    {eq}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'structure':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Model Characteristics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                  <p className="font-medium text-gray-900 dark:text-white capitalize transition-colors duration-300">{model.type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Compartments:</span>
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{model.compartments}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Category:</span>
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{model.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Parameters:</span>
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{model.parameters.length}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 transition-colors duration-300">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2 transition-colors duration-300">
                  <CheckCircle className="w-5 h-5" />
                  Advantages
                </h4>
                <ul className="space-y-2">
                  {model.advantages.map((advantage, index) => (
                    <li key={index} className="text-sm text-green-800 dark:text-green-200 flex items-start gap-2 transition-colors duration-300">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800 transition-colors duration-300">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center gap-2 transition-colors duration-300">
                  <XCircle className="w-5 h-5" />
                  Limitations
                </h4>
                <ul className="space-y-2">
                  {model.limitations.map((limitation, index) => (
                    <li key={index} className="text-sm text-orange-800 dark:text-orange-200 flex items-start gap-2 transition-colors duration-300">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 transition-colors duration-300">Applications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {model.applications.map((app, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200 transition-colors duration-300">
                    <Zap className="w-4 h-4" />
                    {app}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'plot':
        return (
          <div className="space-y-6">
            <ModelVisualization 
              key={visualizationKey}
              model={model} 
              patient1Params={patient1Params}
              patient2Params={patient2Params}
            />
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Plot Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                This semi-logarithmic plot shows the typical concentration-time profile for the {model.name}. 
                The curve demonstrates the characteristic elimination pattern for this model type.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                <span>• X-axis: Time (hours)</span>
                <span>• Y-axis: Concentration (mg/L, log scale)</span>
                <span>• Blue line: Model prediction</span>
                <span>• Blue dots: Sample data points</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar lg:mr-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{model.name}</h1>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">{model.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            <button
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Model Description</h2>
              </div>
              {isDescriptionOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              )}
            </button>
            
            <AnimatePresence>
              {isDescriptionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="px-6 py-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                      {model.longDescription}
                    </p>
                    
                    <AnimatePresence>
                      {showExtendedDescription && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 mb-4"
                        >
                          {model.extendedDescription.map((paragraph, index) => (
                            <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                              {paragraph}
                            </p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="flex justify-center mb-4">
                      <button
                        onClick={() => setShowExtendedDescription(!showExtendedDescription)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
                      >
                        {showExtendedDescription ? 'Show less' : 'Show more'}
                        {showExtendedDescription ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    {model.references.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">References</h3>
                        <ul className="space-y-2">
                          {model.references.map((ref, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2 transition-colors duration-300">
                              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                              {ref}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
          </div>
        </div>
        
        {/* Parameter Panel */}
        <ParameterPanel
          model={model}
          isCollapsed={isParameterPanelCollapsed}
          onToggle={() => setIsParameterPanelCollapsed(!isParameterPanelCollapsed)}
          onPatient1Change={setPatient1Params}
          onPatient2Change={setPatient2Params}
          onVisualize={handleVisualize}
          patient1Params={patient1Params}
          patient2Params={patient2Params}
        />
      </div>
    </div>
  );
};

export default ModelDetail;