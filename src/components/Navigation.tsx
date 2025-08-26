import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, setCurrentSection }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`navigation ${isDark ? 'dark' : 'light'}`}>
      <div className="nav-brand">
        <span className="director-name">DINESU</span>
        <span className="title">DIRECTOR / WRITER</span>
      </div>
      <div className="nav-links">
        <button 
          className={currentSection === 'home' ? 'active' : ''}
          onClick={() => setCurrentSection('home')}
        >
          HOME
        </button>
        <button 
          className={currentSection === 'work' ? 'active' : ''}
          onClick={() => setCurrentSection('work')}
        >
          WORK
        </button>
        <button 
          className={currentSection === 'about' ? 'active' : ''}
          onClick={() => setCurrentSection('about')}
        >
          ABOUT
        </button>
        <button 
          className={currentSection === 'contact' ? 'active' : ''}
          onClick={() => setCurrentSection('contact')}
        >
          CONTACT
        </button>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;