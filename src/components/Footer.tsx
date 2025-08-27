import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`footer ${isDark ? 'dark' : 'light'}`}>
      <div className="footer-content">
        <span>© 2025 Dinesu Directs</span>
        <div className="social-links">
          <a href="https://instagram.com/dinesu7" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;