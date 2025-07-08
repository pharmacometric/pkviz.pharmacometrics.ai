import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import WelcomeModal from './components/WelcomeModal';
import MobileWarning from './components/MobileWarning';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import Dashboard from './pages/Dashboard';
import SearchPage from './pages/SearchPage';
import ModelDetail from './pages/ModelDetail';
import LibraryPage from './pages/LibraryPage';
import DocsPage from './pages/DocsPage';
import HelpPage from './pages/HelpPage';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { isMobile, isTablet } = useDeviceDetection();

  useEffect(() => {
    console.log('Session began');
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem('pkvis-visited');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('pkvis-visited', 'true');
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Show mobile warning for mobile and tablet devices
  if (isMobile || isTablet) {
    return (
      <ThemeProvider>
        <MobileWarning />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            onToggle={toggleSidebar} 
          />
          
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/model/:id" element={<ModelDetail />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <WelcomeModal 
            isOpen={showWelcomeModal} 
            onClose={() => setShowWelcomeModal(false)} 
          />
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;