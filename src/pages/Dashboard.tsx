import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Layers, 
  Target, 
  BookOpen, 
  BarChart3, 
  Users,
  Clock,
  Zap,
  ArrowRight,
  Play,
  FileText,
  Database
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
      icon: BarChart3, 
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

  const featuredModels = [
    { 
      ...pharmacokineticModels[0], 
      icon: TrendingUp, 
      gradient: 'from-blue-400 to-blue-600' 
    },
    { 
      ...pharmacokineticModels[1], 
      icon: Layers, 
      gradient: 'from-green-400 to-green-600' 
    },
    { 
      ...pharmacokineticModels[2], 
      icon: Layers, 
      gradient: 'from-purple-400 to-purple-600' 
    },
    { 
      ...pharmacokineticModels[3], 
      icon: Target, 
      gradient: 'from-orange-400 to-orange-600' 
    },
  ];

  const quickActions = [];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Welcome to <span className="gradient-text">ModV</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto transition-colors duration-300 px-4">
              Advanced pharmacokinetic modeling platform for drug development and research. 
              Explore, analyze, and simulate drug disposition with industry-leading models.
            </p>
            <div className="mb-6 sm:mb-8 px-4">
              <SearchBar />
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
          className="responsive-grid mb-8 sm:mb-12"
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

        {/* Quick Actions */}
        {/* Featured Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Featured Models</h2>
            <Link
              to="/library"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              View All Models →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {featuredModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Link
                  key={model.id}
                  to={`/model/${model.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 group-hover:border-blue-200 dark:group-hover:border-blue-600">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${model.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {model.name}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            {model.compartments} compartment{model.compartments > 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2 transition-colors duration-300">
                          {model.description}
                        </p>
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                            {model.parameters.length} parameters
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                            {model.applications.length} applications
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;