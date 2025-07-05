import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Zap, Target, Layers } from 'lucide-react';
import { searchModels } from '../data/models';
import { PharmacokineticModel } from '../types';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onModelSelect?: (model: PharmacokineticModel) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onModelSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<PharmacokineticModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const getModelIcon = (model: PharmacokineticModel) => {
    switch (model.id) {
      case '1-compartment':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case '2-compartment':
        return <Layers className="w-5 h-5 text-green-500" />;
      case '3-compartment':
        return <Layers className="w-5 h-5 text-purple-500" />;
      case 'tmdd':
        return <Target className="w-5 h-5 text-orange-500" />;
      default:
        return <Zap className="w-5 h-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchModels(query);
      setResults(searchResults);
      setSelectedIndex(-1);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleModelSelect = (model: PharmacokineticModel) => {
    setQuery(model.name);
    setIsOpen(false);
    setResults([]);
    if (onModelSelect) {
      onModelSelect(model);
    }
    navigate(`/model/${model.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleModelSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search PK models..."
          className="w-full pl-10 pr-10 py-2 sm:py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="py-2 max-h-96 overflow-y-auto custom-scrollbar">
              {results.map((model, index) => (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    index === selectedIndex ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getModelIcon(model)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">
                          {model.name}
                        </h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {model.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {model.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;