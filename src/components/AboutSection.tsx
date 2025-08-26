import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AboutSection: React.FC = () => {
  const { isDark } = useTheme();

  const skills = [
    'DIRECTING',
    'SCREENWRITING',
    'CINEMATOGRAPHY',
    'POST-PRODUCTION',
    'STORY DEVELOPMENT'
  ];

  return (
    <section className={`about-section ${isDark ? 'dark' : 'light'}`}>
      <div className="about-content">
        <h2 className="section-title">ABOUT</h2>
        <div className="about-text">
          <p>
            I believe in the power of storytelling to transform perspectives and connect
            human experiences across cultures and generations. My work explores the
            intersection of technology, humanity, and the stories we tell ourselves.
          </p>
          <p>
            With a background in both independent and commercial filmmaking, I bring
            a unique perspective that balances artistic vision with audience engagement.
            Every project is an opportunity to push boundaries and discover new ways
            to move people through the medium of film.
          </p>
        </div>
        <div className="skills">
          <h3>EXPERTISE</h3>
          <div className="skill-tags">
            {skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;