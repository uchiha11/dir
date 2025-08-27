import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface VideoData {
  title: string;
  publishedAt: string;
  viewCount: string;
  videoId: string;
  loading: boolean;
}

interface VideoInfo {
  videoId: string;
  title: string;
  year: string;
}

// Cache for view counts to prevent re-fetching
const viewCountCache = new Map<string, string>();
const cacheExpiry = new Map<string, number>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const WorkSection: React.FC = () => {
  const { isDark } = useTheme();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  const videoInfoList: VideoInfo[] = useMemo(() => [
    {
      videoId: "gESHWPbFrvk",
      title: "Asal Kolaar - Paiya Dei (Music Video) | Dinesu | Think Indie",
      year: "2025"
    },
    {
      videoId: "da6iVRSxAdE",
      title: "Asal Kolaar - Champagini (Music Video) | Urban Thozha | Dinesu | Think Indie",
      year: "2025"
    },
    {
      videoId: "CMyDCGS1fVg",
      title: "Asal Kolaar - Sigma Paiyan (Music Video) | Think Indie",
      year: "2025"
    },
    {
      videoId: "C9V9ORJ6ltY",
      title: "Asal Kolaar - Karuppu Car ft.Bank Rolls Young (Music Video)",
      year: "2025"
    },
    {
      videoId: "3AFT0eEkyZ4",
      title: "Vazhiyiraen - Video Song | Madharaasi | Sivakarthikeyan | Rukmini Vasanth",
      year: "2025"
    },
    {
      videoId: "X-MZXIXPwFw",
      title: "King of Kotha - Kotha Raja Video | Feat. Asal Kolaar, Dabzee, Roll Rida & Mu. Ri...",
      year: "2023"
    },
    {
      videoId: "UF5dldjEXj4",
      title: "VETRIVEL - kelithee x ofRO x Santhosh Narayanan I Dinesu I @AttiCulture",
      year: "2025"
    },
    {
      videoId: "lDZmQp1Khmo",
      title: "EMIWAY BANTAI - TRIBUTE TO SIDHU MOOSEWALA | (PROD BY TONY JAMES ) | OFFICIAL MU...",
      year: "2025"
    },
    {
      videoId: "ze4z7s9VhQI",
      title: "Sahi Siva | Dabbu Dabbu (feat. @HaripriyaSinger ) | Official Music Video (2025)",
      year: "2025"
    },
    {
      videoId: "89Vq4NcUGZI",
      title: "Sahi Siva | Marankothi (feat. Sinduri Vishal) | Official Music Video (2025)",
      year: "2025"
    },
    {
      videoId: "yjxh8PyYz1I",
      title: "Vathshan - Jiginnu Jilla (Music Video) | Tamil Song",
      year: "2025"
    }
  ], []);

  const videoIds = useMemo(() => videoInfoList.map(video => video.videoId), [videoInfoList]);

  const fetchSingleVideoData = useCallback(async (videoId: string): Promise<VideoData> => {
    // Get title and year from our predefined list
    const videoInfo = videoInfoList.find(v => v.videoId === videoId);
    const title = videoInfo?.title || `YouTube Video ${videoId}`;
    const publishedAt = `${videoInfo?.year || "2025"}-01-01T00:00:00Z`;
    
    // Check cache first
    const now = Date.now();
    const cachedViewCount = viewCountCache.get(videoId);
    const cacheTime = cacheExpiry.get(videoId);
    
    if (cachedViewCount && cacheTime && now < cacheTime) {
      return {
        title,
        publishedAt,
        viewCount: cachedViewCount,
        videoId,
        loading: false
      };
    }
    
    // Only fetch view count dynamically if not cached
    let viewCount = "";
    
    // Try multiple YouTube APIs for better success rate
    const apis = [
      {
        name: 'AllOrigins',
        url: `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`
      },
      {
        name: 'CodeTabs',
        url: `https://api.codetabs.com/v1/proxy?quest=https://www.youtube.com/watch?v=${videoId}`
      },
      {
        name: 'CorsProxy',
        url: `https://corsproxy.io/?https://www.youtube.com/watch?v=${videoId}`
      }
    ];

    for (const api of apis) {
      try {
        const scrapeResponse = await Promise.race([
          fetch(api.url),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 4000)
          )
        ]);

        if (scrapeResponse.ok) {
          let html = '';
          
          if (api.name === 'AllOrigins') {
            const data = await scrapeResponse.json();
            html = data.contents || '';
          } else if (api.name === 'CodeTabs') {
            html = await scrapeResponse.text();
          } else {
            html = await scrapeResponse.text();
          }
          
          // Extract view count with multiple patterns
          const viewMatches = [
            /"viewCount":"(\d+)"/,
            /"viewCount":{"simpleText":"([\d,]+)"/,
            /viewCount.*?(\d{1,3}(?:,\d{3})*)/,
            /"views":{"simpleText":"([\d,]+)/,
            /(\d{1,3}(?:,\d{3})*)\s*views/i,
            /"viewCountText":{"simpleText":"([\d,]+)/,
            /viewCount[^}]*?(\d+)/
          ];
          
          for (const regex of viewMatches) {
            const match = html.match(regex);
            if (match && match[1]) {
              viewCount = match[1].replace(/,/g, '');
              if (viewCount) {
                break;
              }
            }
          }
          
          // If we found a valid view count, stop trying other APIs
          if (viewCount) {
            break;
          }
        }
      } catch (error) {
        continue; // Try next API
      }
    }
    
    // Cache the result
    if (viewCount) {
      viewCountCache.set(videoId, viewCount);
      cacheExpiry.set(videoId, now + CACHE_DURATION);
    }

    return {
      title,
      publishedAt,
      viewCount,
      videoId,
      loading: false
    };
  }, [videoInfoList]);

  const fetchAllVideosData = useCallback(async () => {
    try {
      // Initialize with actual titles and years immediately
      const initialVideos = videoIds.map(videoId => {
        const videoInfo = videoInfoList.find(v => v.videoId === videoId);
        return {
          title: videoInfo?.title || `YouTube Video ${videoId}`,
          publishedAt: `${videoInfo?.year || "2025"}-01-01T00:00:00Z`,
          viewCount: "...",
          videoId,
          loading: true
        };
      });
      
      setVideos(initialVideos);
      setLoading(false);

      // Fetch view counts in parallel
      const videoPromises = videoIds.map(videoId => fetchSingleVideoData(videoId));
      
      // Update videos as they complete
      const results = await Promise.allSettled(videoPromises);
      
      const finalVideos = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          const videoInfo = videoInfoList.find(v => v.videoId === videoIds[index]);
          return {
            title: videoInfo?.title || `YouTube Video ${videoIds[index]}`,
            publishedAt: `${videoInfo?.year || "2025"}-01-01T00:00:00Z`,
            viewCount: "",
            videoId: videoIds[index],
            loading: false
          };
        }
      });

      setVideos(finalVideos);
    } catch (error) {
      setLoading(false);
    }
  }, [videoIds, videoInfoList, fetchSingleVideoData]);

  useEffect(() => {
    fetchAllVideosData();
  }, [fetchAllVideosData]);

  const formatViewCount = useCallback((viewCount: string): string => {
    if (viewCount === "" || viewCount === "..." || viewCount === "Loading...") return "";
    
    const count = parseInt(viewCount);
    if (isNaN(count)) return "";
    
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  }, []);

  const formatDate = useCallback((publishedAt: string): string => {
    try {
      const date = new Date(publishedAt);
      return date.getFullYear().toString();
    } catch {
      return "2023";
    }
  }, []);

  return (
    <section className={`work-section ${isDark ? 'dark' : 'light'}`}>
      <h2 className="section-title">SELECTED WORKS</h2>
      <div className="work-grid">
        {loading ? (
          <div className="loading">Initializing videos...</div>
        ) : (
          videos.map((video) => (
            <div key={video.videoId} className="work-item">
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="work-video">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0&showinfo=0&controls=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ pointerEvents: 'none' }}
                  ></iframe>
                </div>
                <div className="work-info">
                  <h3>{video.title}</h3>
                  <p>
                    {formatDate(video.publishedAt)}{formatViewCount(video.viewCount) && ` • ${formatViewCount(video.viewCount)}`}
                  </p>
                  <span className="work-role">
                    Music Video
                  </span>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default WorkSection;
