import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Video, ExternalLink } from 'lucide-react';

const DocsPage: React.FC = () => {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of pharmacokinetic modeling with Nixtio',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      items: ['Quick Start Guide', 'Basic Concepts', 'First Simulation']
    },
    {
      title: 'Model Reference',
      description: 'Detailed documentation for all available PK models',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      items: ['1-Compartment Models', '2-Compartment Models', 'TMDD Models']
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common workflows',
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      items: ['Model Selection', 'Parameter Estimation', 'Data Analysis']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Documentation</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive guides and references for pharmacokinetic modeling
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {docSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover-lift"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {section.description}
                </p>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <ExternalLink className="w-4 h-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Common Parameters</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">CL</code> - Clearance</li>
                <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">V</code> - Volume of Distribution</li>
                <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ka</code> - Absorption Rate Constant</li>
                <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">t½</code> - Half-life</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Model Types</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• 1-Compartment: Simple elimination</li>
                <li>• 2-Compartment: Distribution + elimination</li>
                <li>• 3-Compartment: Complex distribution</li>
                <li>• TMDD: Target-mediated disposition</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocsPage;