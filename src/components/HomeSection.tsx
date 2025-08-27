import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const HomeSection: React.FC = () => {
  const { isDark } = useTheme();
  const videoIds = ['da6iVRSxAdE', 'gESHWPbFrvk', '3AFT0eEkyZ4', 'X-MZXIXPwFw', 'UF5dldjEXj4', 'CMyDCGS1fVg'];
  
  const contentData = [
    {
      title: "CRAFTING STORIES\nTHAT MOVE\nAUDIENCES",
      subtitle: "Director and screenwriter with 10+ years of experience in creating compelling narratives for film, music, documentary and commercials.",
      highlight: "AUDIENCES"
    },
    {
      title: "VISUAL POETRY\nIN EVERY\nFRAME",
      subtitle: "Transforming scripts into cinematic experiences through innovative storytelling techniques and visual mastery.",
      highlight: "FRAME"
    },
    {
      title: "FROM CONCEPT\nTO SCREEN\nMAGIC",
      subtitle: "Bringing ideas to life with meticulous attention to character development, plot structure, and emotional resonance.",
      highlight: "MAGIC"
    },
    {
      title: "DIRECTING\nWITH\nPURPOSE",
      subtitle: "Creating meaningful content that resonates with audiences while pushing the boundaries of traditional filmmaking.",
      highlight: "PURPOSE"
    },
    {
      title: "STORYTELLING\nTHAT\nINSPIRES",
      subtitle: "Crafting narratives that challenge perspectives, evoke emotions, and leave lasting impressions on viewers.",
      highlight: "INSPIRES"
    },
    {
      title: "CINEMATIC\nVISION\nREALIZED",
      subtitle: "Combining technical expertise with creative vision to deliver award-winning films and documentaries.",
      highlight: "REALIZED"
    }
  ];
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  useEffect(() => {
    // Auto-change video every 30 seconds
    const autoChangeInterval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
    }, 30000); // 30 seconds

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        // Cycle to next video on scroll
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Reset scrolling flag after 1 second to prevent rapid changes
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(autoChangeInterval);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoIds.length]);

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <section className={`home-section ${isDark ? 'dark' : 'light'}`} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <div className="video-background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <iframe
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw', // 16:9 aspect ratio
            minHeight: '100vh',
            minWidth: '177.78vh', // 16:9 aspect ratio
            transform: 'translate(-50%, -50%)',
          }}
          src={`https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&mute=1&loop=1&playlist=${videoIds[currentVideoIndex]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&playsinline=1&start=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Overlay Content */}
      <div className="hero-content" style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        background: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay for better text readability
        color: 'white'
      }}>
        <h1
          key={`title-${currentVideoIndex}`}
          className="hero-title"
          style={{
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            animation: 'fadeInUp 0.8s ease-out',
            opacity: 1
          }}
        >
          {contentData[currentVideoIndex].title.split('\n').map((line, index) => (
            <span key={index}>
              {line === contentData[currentVideoIndex].highlight ? (
                <span className="highlight">{line}</span>
              ) : (
                line
              )}
              {index < contentData[currentVideoIndex].title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p
          key={`subtitle-${currentVideoIndex}`}
          className="hero-subtitle"
          style={{
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
            opacity: 1
          }}
        >
          {contentData[currentVideoIndex].subtitle}
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>25+</span>
            <span className="stat-label" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>FILMS</span>
          </div>
          <div className="stat">
            <span className="stat-number" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>10+</span>
            <span className="stat-label" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>MUSIC VIDEOS</span>
          </div>
          <div className="stat">
            <span className="stat-number" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>100M+</span>
            <span className="stat-label" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>VIEWS</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HomeSection;