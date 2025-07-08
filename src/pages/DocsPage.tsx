import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Target, 
  BarChart3, 
  Layers,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Download,
  Code,
  Github
} from 'lucide-react';

const DocsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PKVis User Manual
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive guide to pharmacokinetic modeling and simulation
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Version 2.2
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              Last Updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Table of Contents
              </h3>
              <nav className="space-y-1">
                <a href="#introduction" className="block px-3 py-2 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium">
                  Introduction
                </a>
                <a href="#getting-started" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Getting Started
                </a>
                <a href="#models" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Pharmacokinetic Models
                </a>
                <a href="#compartmental" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors pl-6 text-sm">
                  Compartmental Models
                </a>
                <a href="#tmdd" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors pl-6 text-sm">
                  TMDD Models
                </a>
                <a href="#simulations" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Running Simulations
                </a>
                <a href="#parameters" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Parameter Adjustment
                </a>
                <a href="#visualization" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Data Visualization
                </a>
                <a href="#export" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Exporting Results
                </a>
                <a href="#faq" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  FAQ
                </a>
                <a href="#support" className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Support & Contact
                </a>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Resources</h4>
                <div className="space-y-2">
                  <a href="https://github.com/modv-pk/issues" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub Repository
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <FileText className="w-4 h-4 mr-2" />
                    API Documentation
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Manual
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              {/* Introduction Section */}
              <section id="introduction" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <BookOpen className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Introduction to PKVis
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PKVis is an advanced pharmacokinetic modeling platform designed for researchers, clinicians, and students in the field of drug development and clinical pharmacology. This comprehensive tool allows users to explore, analyze, and simulate drug disposition with industry-leading PK models.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    With PKVis, you can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                    <li>Simulate drug concentration-time profiles using various pharmacokinetic models</li>
                    <li>Compare different dosing regimens and patient parameters</li>
                    <li>Visualize pharmacokinetic data with interactive plots</li>
                    <li>Export simulation results for further analysis</li>
                    <li>Understand complex drug-target interactions through TMDD models</li>
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <p className="text-blue-800 dark:text-blue-200 font-medium">
                      PKVis is created by William H. All rights reserved. Contributions are allowed by opening an issue in our GitHub repository.
                    </p>
                  </div>
                </div>
              </section>

              {/* Getting Started Section */}
              <section id="getting-started" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Getting Started
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Navigating the Interface</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The PKVis interface is designed to be intuitive and user-friendly. Here's a quick overview of the main components:
                  </p>
                  <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300 mb-6">
                    <li>
                      <strong>Dashboard:</strong> The main landing page provides a search bar for finding specific models and displays key statistics.
                    </li>
                    <li>
                      <strong>Model Library:</strong> Browse all available pharmacokinetic models categorized by type.
                    </li>
                    <li>
                      <strong>Model Detail:</strong> View comprehensive information about a specific model, including parameters, equations, and interactive simulations.
                    </li>
                    <li>
                      <strong>Parameter Panel:</strong> Adjust model parameters and dosing regimens to customize simulations.
                    </li>
                    <li>
                      <strong>Visualization:</strong> Interactive plots showing concentration-time profiles based on selected parameters.
                    </li>
                  </ol>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Start Guide</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                      <li>From the dashboard, use the search bar to find a specific model (e.g., "1-compartment", "TMDD")</li>
                      <li>Click on a model to view its detailed information</li>
                      <li>Navigate to the "Visualization" tab to see the default concentration-time profile</li>
                      <li>Use the parameter panel on the right to adjust dosing and model parameters</li>
                      <li>Click "Update Visualization" to refresh the plot with your new parameters</li>
                      <li>Use the "Plot Settings" dropdown to customize the plot appearance and export results</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Pharmacokinetic Models Section */}
              <section id="models" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Layers className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Pharmacokinetic Models
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    PKVis provides a comprehensive library of pharmacokinetic models to simulate various drug disposition scenarios. Each model is designed to address specific pharmacokinetic behaviors and can be customized with relevant parameters.
                  </p>

                  <h3 id="compartmental" className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Compartmental Models</h3>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">1-Compartment Models</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      The simplest PK model that assumes the body acts as a single homogeneous compartment. Drug distributes instantaneously throughout the body.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Parameters:</h5>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                        <li><strong>V:</strong> Volume of distribution (L or L/kg)</li>
                        <li><strong>CL:</strong> Clearance (L/h or L/h/kg)</li>
                        <li><strong>ke:</strong> Elimination rate constant (h⁻¹)</li>
                        <li><strong>t½:</strong> Half-life (h)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Equations:</h5>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                        <li><code>C(t) = C₀ × e^(-ke×t)</code></li>
                        <li><code>ke = CL/V</code></li>
                        <li><code>t½ = 0.693/ke</code></li>
                        <li><code>AUC = Dose/CL</code></li>
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">2-Compartment Models</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      A more complex model that divides the body into central (highly perfused tissues) and peripheral (poorly perfused tissues) compartments. This model better captures distribution phases.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Parameters:</h5>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                        <li><strong>V1:</strong> Central volume of distribution (L)</li>
                        <li><strong>V2:</strong> Peripheral volume of distribution (L)</li>
                        <li><strong>CL:</strong> Clearance from central compartment (L/h)</li>
                        <li><strong>Q:</strong> Intercompartmental clearance (L/h)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Equations:</h5>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                        <li><code>C(t) = A × e^(-α×t) + B × e^(-β×t)</code></li>
                        <li><code>α, β = hybrid rate constants</code></li>
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">3-Compartment Models</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      An extension of the two-compartment model with an additional peripheral compartment. Useful for drugs with complex distribution patterns.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Parameters:</h5>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                        <li><strong>V1:</strong> Central volume (L)</li>
                        <li><strong>V2, V3:</strong> Peripheral volumes (L)</li>
                        <li><strong>CL:</strong> Clearance (L/h)</li>
                        <li><strong>Q2, Q3:</strong> Intercompartmental clearances (L/h)</li>
                      </ul>
                    </div>
                  </div>

                  <h3 id="tmdd" className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Target-Mediated Drug Disposition (TMDD) Models</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    TMDD models describe the pharmacokinetics of drugs that bind with high affinity to their pharmacological target. This binding significantly affects the drug's disposition, especially for biologics and monoclonal antibodies.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Parameters:</h5>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                      <li><strong>kel:</strong> Elimination rate constant for free drug (h⁻¹)</li>
                      <li><strong>kon:</strong> Association rate constant (nM⁻¹h⁻¹)</li>
                      <li><strong>koff:</strong> Dissociation rate constant (h⁻¹)</li>
                      <li><strong>kint:</strong> Internalization rate constant for drug-target complex (h⁻¹)</li>
                      <li><strong>R0:</strong> Baseline target concentration (nM)</li>
                      <li><strong>ksyn:</strong> Target synthesis rate (nM/h)</li>
                      <li><strong>kdeg:</strong> Target degradation rate (h⁻¹)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Equations:</h5>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                      <li><code>dL/dt = -kel×L - kon×L×R + koff×P</code> (Free drug)</li>
                      <li><code>dR/dt = ksyn - kdeg×R - kon×L×R + koff×P</code> (Free target)</li>
                      <li><code>dP/dt = kon×L×R - koff×P - kint×P</code> (Drug-target complex)</li>
                    </ul>
                  </div>

                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">TMDD Variants</h4>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-1">TMDD with Oral Absorption</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        Combines TMDD with oral absorption kinetics, adding an absorption compartment to model orally administered drugs that exhibit target-mediated disposition.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-1">TMDD with Michaelis-Menten Elimination</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        Incorporates saturable elimination pathways alongside target-mediated disposition, useful for drugs that undergo both specific target binding and saturable metabolism or transport.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Model Selection Guide:</h5>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                      <li><strong>1-Compartment:</strong> Use for drugs with rapid distribution throughout the body</li>
                      <li><strong>2-Compartment:</strong> Use for drugs showing distinct distribution and elimination phases</li>
                      <li><strong>3-Compartment:</strong> Use for drugs with complex distribution patterns or deep tissue penetration</li>
                      <li><strong>TMDD:</strong> Use for biologics, monoclonal antibodies, and drugs with significant target binding</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Running Simulations Section */}
              <section id="simulations" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Running Simulations
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PKVis allows you to run sophisticated pharmacokinetic simulations to predict drug concentration-time profiles under various scenarios. Here's how to get started:
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Simulation Workflow</h3>
                  <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                    <li>Select a pharmacokinetic model from the library</li>
                    <li>Configure patient parameters (see Parameter Adjustment section)</li>
                    <li>Set dosing regimen (dose amount, frequency, number of doses)</li>
                    <li>Click "Update Visualization" to run the simulation</li>
                    <li>Analyze the resulting concentration-time profile</li>
                    <li>Optionally, compare multiple parameter sets by configuring Patient 1 and Patient 2</li>
                  </ol>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Simulation Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Single-Dose Simulations</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Simulate the concentration-time profile after a single dose administration. Useful for understanding basic PK parameters like half-life and volume of distribution.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Multiple-Dose Simulations</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Predict drug accumulation with repeated dosing by setting the number of doses and dosing interval. Evaluate time to steady state and accumulation ratios.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Patient Comparison</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Compare concentration-time profiles between two different parameter sets, representing different patients or scenarios on the same plot.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Dose Optimization</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Adjust dosing regimens to achieve target concentrations or exposure metrics. Useful for dose selection and personalized medicine approaches.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Note:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      PKVis simulations are intended for educational and research purposes. Clinical decisions should not be based solely on these simulations without appropriate validation and clinical judgment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Parameter Adjustment Section */}
              <section id="parameters" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Parameter Adjustment
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PKVis provides an intuitive interface for adjusting pharmacokinetic parameters and dosing regimens. The Parameter Panel on the right side of the Model Detail page allows you to customize all aspects of your simulation.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Dosing Parameters</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                      <li><strong>Dose (mg):</strong> Amount of drug administered</li>
                      <li><strong>Number of Doses:</strong> Total number of doses to administer</li>
                      <li><strong>Frequency (hours):</strong> Time interval between consecutive doses</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Model-Specific Parameters</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Each model has specific parameters that can be adjusted. These parameters are displayed with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                    <li>Parameter symbol and name</li>
                    <li>Units of measurement</li>
                    <li>Brief description</li>
                    <li>Typical value range</li>
                    <li>Slider for easy adjustment</li>
                    <li>Numeric input for precise values</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Patient Comparison</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PKVis allows you to compare two different parameter sets (Patient 1 and Patient 2) on the same plot:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                    <li>Use the tabs at the top of the Parameter Panel to switch between Patient 1 and Patient 2</li>
                    <li>Configure different parameter values for each patient</li>
                    <li>Click "Update Visualization" to see both profiles on the same plot</li>
                    <li>Patient 1 is displayed in blue, and Patient 2 in red by default (colors can be customized)</li>
                  </ol>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Pro Tip:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Use the "Reset" button to quickly return to default parameter values if you want to start over. Each parameter also has a "Default" button to reset individual values.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Visualization Section */}
              <section id="visualization" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Data Visualization
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PKVis provides powerful visualization tools to help you understand and interpret pharmacokinetic data. The interactive plots allow you to explore concentration-time profiles in detail.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Plot Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Scale Options</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Toggle between linear and semi-logarithmic (log) scale to better visualize elimination phases and identify multi-compartmental behavior.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Patient Comparison</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        View two concentration-time profiles simultaneously to compare different dosing regimens or patient characteristics.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Interactive Elements</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Hover over data points to see exact concentration values at specific time points. Zoom and pan to explore regions of interest.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Customization Options</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Adjust plot titles, axis labels, colors, and other visual elements through the Plot Settings menu.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Plot Settings</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Click the "Plot Settings" button to access a dropdown menu with the following customization options:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                    <li><strong>Title:</strong> Customize the plot title</li>
                    <li><strong>Axis Titles:</strong> Set custom X and Y axis labels</li>
                    <li><strong>Font Size:</strong> Adjust text size for better readability</li>
                    <li><strong>Plot Dimensions:</strong> Change the width and height of the plot</li>
                    <li><strong>Axis Ranges:</strong> Set custom minimum and maximum values for X and Y axes</li>
                    <li><strong>Colors:</strong> Customize the colors for Patient 1 and Patient 2 lines</li>
                    <li><strong>Redraw Plot:</strong> Apply all changes to update the visualization</li>
                    <li><strong>Download Plot:</strong> Save the current plot as an image file</li>
                  </ul>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Pro Tip:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      When comparing elimination phases or visualizing large concentration ranges, switch to log scale by clicking the "Scale" toggle above the plot.
                    </p>
                  </div>
                </div>
              </section>

              {/* Exporting Results Section */}
              <section id="export" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Download className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Exporting Results
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PKVis allows you to export your simulation results for further analysis, reporting, or presentation purposes.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Export Options</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>
                        <strong>Plot Image:</strong> Export the concentration-time plot as a PNG image file
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Click the "Plot Settings" button</li>
                          <li>Customize the plot appearance as needed</li>
                          <li>Click "Download Plot" at the bottom of the dropdown</li>
                          <li>The image will be saved with your browser's default download settings</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Future Export Features</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We are continuously improving PKVis's export capabilities. The following features are planned for upcoming releases:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                    <li>CSV export of numerical simulation data</li>
                    <li>PDF report generation with simulation details and plots</li>
                    <li>Direct export to statistical analysis software</li>
                    <li>Batch simulation and export capabilities</li>
                  </ul>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Feature Request:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      If you need specific export functionality, please open an issue on our GitHub repository with your requirements.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FileText className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Frequently Asked Questions
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">How do I select the right pharmacokinetic model?</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        The choice depends on your drug properties and study design. Start with a 1-compartment model for simple drugs, and consider 2-compartment or TMDD models for more complex disposition patterns. Review the literature for similar compounds to guide your selection.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Can I import my own concentration-time data?</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        This feature is planned for a future release. Currently, PKVis focuses on simulation rather than data fitting. Stay tuned for updates on data import capabilities.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">How accurate are the differential equation solvers?</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        PKVis uses 4th-order Runge-Kutta methods for high precision numerical integration, ensuring accurate simulation results for all model types. For most applications, the default solver settings provide an excellent balance of accuracy and performance.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">What units are used in the simulations?</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        By default, PKVis uses the following units:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>Time: hours (h)</li>
                        <li>Concentration: mg/L</li>
                        <li>Volume: liters (L)</li>
                        <li>Clearance: L/h</li>
                        <li>Dose: mg</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Is PKVis suitable for teaching purposes?</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Absolutely! PKVis was designed with educational applications in mind. The intuitive interface and visual representation of pharmacokinetic concepts make it an excellent tool for teaching PK principles to students and trainees.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Support & Contact Section */}
              <section id="support" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Code className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Support & Contact
                </h2>
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    If you encounter any issues or have questions about PKVis, there are several ways to get support:
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">GitHub Issues</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      For bug reports, feature requests, or technical questions, please open an issue on our GitHub repository:
                    </p>
                    <a 
                      href="https://github.com/pkvis-pk/issues" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Open GitHub Issue
                    </a>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Legal Information</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      PKVis is created by William H. All rights reserved.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Contributions are allowed by opening an issue in our GitHub repository. Please note that PKVis is intended for educational and research purposes only.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Acknowledgments</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      PKVis builds upon decades of pharmacokinetic modeling research. We would like to acknowledge the following resources that have influenced the development of this platform:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Mager DE, Jusko WJ. General pharmacokinetic model for drugs exhibiting target-mediated drug disposition. J Pharmacokinet Pharmacodyn, 2001</li>
                      <li>Gibaldi M, Perrier D. Pharmacokinetics, 2nd ed. Marcel Dekker, 1982</li>
                      <li>Rowland M, Tozer TN. Clinical Pharmacokinetics and Pharmacodynamics: Concepts and Applications, 4th ed. Lippincott Williams & Wilkins, 2010</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;