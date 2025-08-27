import React, { useState, useEffect } from 'react';
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

  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to generate public photo URLs (no tokens needed)
  const generatePublicPhotoUrl = (index: number): string => {
    return `https://ueyhquelsbzfgunplzwm.supabase.co/storage/v1/object/public/dinesu/images/a${index}.jpeg`;
  };

  // Function to check if image exists
  const checkImageExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Dynamically detect available photos
  useEffect(() => {
    const detectPhotos = async () => {
      const availablePhotos: string[] = [];
      let index = 1;
      
      // Keep checking for photos until we find one that doesn't exist
      while (true) {
        const photoUrl = generatePublicPhotoUrl(index);
        const exists = await checkImageExists(photoUrl);
        
        if (exists) {
          availablePhotos.push(photoUrl);
          index++;
        } else {
          break;
        }
      }
      
      setPhotos(availablePhotos);
      setLoading(false);
    };

    detectPhotos();
  }, []);

  if (loading) {
    return (
      <section className={`about-section ${isDark ? 'dark' : 'light'}`}>
        <div className="about-content">
          <h2 className="section-title">ABOUT</h2>
          <div className="about-image">
            <p>Loading photos...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={`about-section ${isDark ? 'dark' : 'light'}`}>
      <div className="about-content">
        <h2 className="section-title">ABOUT</h2>
        <div className="about-image">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`About section image ${index + 1}`}
              className="about-photo"
              style={{
                width: '300px',
                height: '200px',
                objectFit: 'cover',
                margin: '10px',
                borderRadius: '8px'
              }}
            />
          ))}
        </div>
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