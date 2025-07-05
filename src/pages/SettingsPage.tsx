import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const settingSections = [
    {
      title: 'Profile Settings',
      description: 'Manage your account information and preferences',
      icon: User,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Notifications',
      description: 'Configure email and in-app notification preferences',
      icon: Bell,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Security',
      description: 'Update password and manage security settings',
      icon: Shield,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Appearance',
      description: 'Customize the interface theme and display options',
      icon: Palette,
      color: 'from-purple-500 to-purple-600'
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Customize your ModV experience and manage your account
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover-lift cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {section.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Application Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Version:</span>
              <p className="font-medium text-gray-900 dark:text-white">1.0.0</p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
              <p className="font-medium text-gray-900 dark:text-white">January 2025</p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">License:</span>
              <p className="font-medium text-gray-900 dark:text-white">Commercial</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;