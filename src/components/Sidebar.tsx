import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  ChevronLeft,
  ChevronRight,
  Activity,
  BarChart3,
  Database
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', color: 'text-blue-600' },
    { icon: Search, label: 'Search Models', path: '/search', color: 'text-green-600' },
    { icon: BookOpen, label: 'Documentation', path: '/docs', color: 'text-indigo-600' },
    { icon: HelpCircle, label: 'Help', path: '/help', color: 'text-pink-600' },
  ];

  return (
    <motion.div
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-white dark:bg-gray-800 sidebar-shadow flex flex-col relative z-10 transition-colors duration-300"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold gradient-text">PKVis</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">PK Modeling</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : item.color} group-hover:scale-110 transition-transform duration-200`} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
        <div className="flex items-center justify-between mb-3 ml-2">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>
          {isCollapsed && <ThemeToggle />}
        </div>
      </nav>
      

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;