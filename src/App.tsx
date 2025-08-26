import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import WorkSection from './components/WorkSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

const LoadingScreen: React.FC = () => (
  <div className="loading-screen">
    <div className="loading-text">
      <span>LIGHTS CAMERA</span>
      <div className="dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <Navigation 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection} 
      />

      <main className="main-content">
        {currentSection === 'home' && <HomeSection />}
        {currentSection === 'work' && <WorkSection />}
        {currentSection === 'about' && <AboutSection />}
        {currentSection === 'contact' && <ContactSection />}
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;