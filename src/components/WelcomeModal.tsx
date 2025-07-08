import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, TrendingUp, Target, BarChart3, BookOpen } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced PK Models',
      description: 'Explore 1, 2, and 3-compartment models plus TMDD for comprehensive drug analysis'
    },
    {
      icon: BarChart3,
      title: 'Interactive Simulations',
      description: 'Run real-time simulations with customizable parameters and dosing regimens'
    },
    {
      icon: Target,
      title: 'Patient Comparisons',
      description: 'Compare concentration-time profiles between different patient populations'
    },
    {
      icon: BookOpen,
      title: 'Educational Resources',
      description: 'Access comprehensive documentation and model descriptions for learning'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-2xl text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Activity className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Welcome to PKVis</h1>
                  <p className="text-blue-100 text-lg">Learn Pharmacokinetic Modeling</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Explore and learn about PK models and effect of parameters
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  PKVis is a comprehensive platform for learning abou tpharmacokinetic models and the effect of altering parameters on PK. 
                  Whether you're a researcher, clinician, or student, our tools help you understand PK models.
                </p>
              </div>

             

              

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;