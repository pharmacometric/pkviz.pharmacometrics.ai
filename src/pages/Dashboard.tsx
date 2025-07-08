import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users,
  Clock,
  Zap,
  Play,
  FileText,
  ArrowRight
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { pharmacokineticModels } from '../data/models';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      icon: BookOpen, 
      label: 'Available Models', 
      value: pharmacokineticModels.length, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      darkBgColor: 'dark:bg-blue-900/20'
    },
    { 
      icon: Users, 
      label: 'Active Users', 
      value: '1,234', 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      darkBgColor: 'dark:bg-green-900/20'
    },
    { 
      icon: Zap, 
      label: 'Simulations Run', 
      value: '5,678', 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      darkBgColor: 'dark:bg-purple-900/20'
    },
    { 
      icon: Clock, 
      label: 'Uptime', 
      value: '99.9%', 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      darkBgColor: 'dark:bg-orange-900/20'
    },
  ];

  const quickActions = [
    {
      title: 'Start New Simulation',
      description: 'Create and run pharmacokinetic simulations with custom parameters', 
      icon: Play, 
      color: 'blue', 
      path: '/library'
    },
    {
      title: 'Browse Documentation',
      description: 'Access comprehensive guides and API documentation',
      icon: FileText,
      color: 'purple',
      path: '/docs'
    }
  ];

  const searchExamples = [
    "1-compartment", 
    "2-compartment", 
    "3-compartment", 
    "TMDD", 
    "oral absorption", 
    "IV bolus", 
    "Michaelis-Menten"
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 dfsf" >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              <span className="gradient-text">PKVis</span>: Educational & Interactive
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto transition-colors duration-300 px-4">
            Comprehensive platform for learning about pharmacokinetic models and the effect of altering parameters on PK.
            </p>
            <div className="mb-6 sm:mb-8 px-4 w-full max-w-4xl mx-auto">
              <SearchBar />
              
              {/* Search Examples */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {searchExamples.map((example, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover-lift transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                      {stat.label}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bgColor} ${stat.darkBgColor} flex items-center justify-center transition-colors duration-300`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;