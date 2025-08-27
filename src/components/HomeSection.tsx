import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const HomeSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section className={`home-section ${isDark ? 'dark' : 'light'}`}>
      <div className="hero-content">
        <h1 className="hero-title">
          CRAFTING STORIES<br />
          THAT MOVE<br />
          <span className="highlight">AUDIENCES</span>
        </h1>
        <p className="hero-subtitle">
          Director and screenwriter with 10+ years of experience
          in creating compelling narratives for film, music, documentary and commercials.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">25+</span>
            <span className="stat-label">FILMS</span>
          </div>
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">MUSIC VIDEOS</span>
          </div>
          <div className="stat">
            <span className="stat-number">100M+</span>
            <span className="stat-label">VIEWS</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="film-strip">
          <div className="frame"></div>
          <div className="frame"></div>
          <div className="frame"></div>
          <div className="frame active"></div>
          <div className="frame"></div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;