import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Mail, Phone, FileText } from 'lucide-react';

const HelpPage: React.FC = () => {
  const helpOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-600',
      action: 'Start Chat'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      icon: Mail,
      color: 'from-green-500 to-green-600',
      action: 'Send Email'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      icon: Phone,
      color: 'from-purple-500 to-purple-600',
      action: 'Call Now'
    },
    {
      title: 'Knowledge Base',
      description: 'Browse our comprehensive help articles',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      action: 'Browse Articles'
    }
  ];

  const faqs = [
    {
      question: 'How do I select the right pharmacokinetic model?',
      answer: 'The choice depends on your drug properties and study design. Start with a 1-compartment model for simple drugs, and consider 2-compartment or TMDD models for more complex disposition patterns.'
    },
    {
      question: 'Can I import my own concentration-time data?',
      answer: 'Yes, you can upload CSV files with your experimental data through the Datasets section. The platform supports standard PK data formats.'
    },
    {
      question: 'How accurate are the differential equation solvers?',
      answer: 'We use 4th-order Runge-Kutta methods for high precision numerical integration, ensuring accurate simulation results for all model types.'
    },
    {
      question: 'Can I export my simulation results?',
      answer: 'Absolutely! You can download plots as PNG images and export numerical results as CSV files for further analysis.'
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get the help you need to make the most of Nixtio
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {helpOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover-lift text-center"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {option.description}
                </p>
                <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                  {option.action}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;