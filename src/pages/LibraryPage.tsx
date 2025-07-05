import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const LibraryPage: React.FC = () => {
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Model Library</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Browse and explore our comprehensive collection of pharmacokinetic models
          </p>
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center"
        >
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Advanced Model Library
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Use the search bar above to find specific pharmacokinetic models, or browse by category and complexity.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LibraryPage;