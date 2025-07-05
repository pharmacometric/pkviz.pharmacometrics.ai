import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc, Grid, List } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { pharmacokineticModels } from '../data/models';
import { PharmacokineticModel } from '../types';
import { Link } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<PharmacokineticModel[]>(pharmacokineticModels);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'compartments' | 'category'>('name');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(pharmacokineticModels.map(model => model.category))];

  const handleSearch = (model: PharmacokineticModel) => {
    // Search functionality is handled by the SearchBar component
  };

  const filteredAndSortedModels = searchResults
    .filter(model => filterCategory === 'all' || model.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'compartments':
          return a.compartments - b.compartments;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const ModelCard: React.FC<{ model: PharmacokineticModel; isGridView: boolean }> = ({ model, isGridView }) => {
    if (isGridView) {
      return (
        <Link to={`/model/${model.id}`} className="group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover-lift transition-all duration-300 group-hover:border-blue-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {model.compartments} compartment{model.compartments > 1 ? 's' : ''}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  {model.category}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
              {model.name}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {model.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{model.parameters.length} parameters</span>
              <span>{model.applications.length} applications</span>
            </div>
          </motion.div>
        </Link>
      );
    }

    return (
      <Link to={`/model/${model.id}`} className="group">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200 hover-lift transition-all duration-300 group-hover:border-blue-200"
        >
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {model.name}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {model.compartments} compartment{model.compartments > 1 ? 's' : ''}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  {model.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">
                {model.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>{model.parameters.length} parameters</span>
                <span>{model.applications.length} applications</span>
                <span>Type: {model.type}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Models</h1>
          <SearchBar onModelSelect={handleSearch} />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <SortAsc className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'compartments' | 'category')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="compartments">Sort by Compartments</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Found {filteredAndSortedModels.length} model{filteredAndSortedModels.length !== 1 ? 's' : ''}
            </h2>
          </div>
          
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredAndSortedModels.map((model, index) => (
              <ModelCard
                key={model.id}
                model={model}
                isGridView={viewMode === 'grid'}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;