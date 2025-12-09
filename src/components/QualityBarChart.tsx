import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface QualityData {
  quality: string;
  value: number;
  color: string;
}

interface QualityBarChartProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'pulse' | 'chase' | 'breathe' | 'flicker' | 'rainbow';
}

const hdData: QualityData[] = [
  { quality: 'Remux-1080p', value: 422, color: '#a78bfa' },
  { quality: 'Bluray-1080p', value: 157, color: '#86efac' },
  { quality: 'WEBDL-1080p', value: 96, color: '#fcd34d' },
  { quality: 'WEBRip-1080p', value: 12, color: '#f87171' },
  { quality: 'DVD', value: 4, color: '#fdba74' },
  { quality: 'Bluray-720p', value: 2, color: '#60a5fa' },
  { quality: 'Bluray-2160p', value: 1, color: '#facc15' },
  { quality: 'HDTV-1080p', value: 1, color: '#fb7185' },
  { quality: 'Remux-2160p', value: 1, color: '#4ade80' },
  { quality: 'WEBDL-480p', value: 1, color: '#38bdf8' },
  { quality: 'WEBDL-720p', value: 1, color: '#fb923c' },
];

const uhdData: QualityData[] = [
  { quality: 'Bluray-2160p', value: 37, color: '#86efac' },
  { quality: 'Remux-2160p', value: 21, color: '#fcd34d' },
  { quality: 'WEBDL-2160p', value: 13, color: '#60a5fa' },
];

const QualityBarChart = ({ variant = 'hd', edgeLit }: QualityBarChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const data = variant === 'uhd' ? uhdData : hdData;
  const maxValue = Math.max(...data.map(d => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const title = variant === 'uhd' ? 'Movie Quality: radarr-uhd' : 'Movie Quality: radarr';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScrollable = () => {
      const isScrollable = container.scrollHeight > container.clientHeight;
      setShowScrollHint(isScrollable && !hasScrolled);
    };

    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
        setShowScrollHint(false);
      }
    };

    checkScrollable();
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollable);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);
    };
  }, [hasScrolled]);

  const getContainerClass = () => {
    if (!edgeLit) return 'quality-bar-chart';
    return `quality-bar-chart quality-bar-chart--edge-lit quality-bar-chart--edge-${edgeLit}`;
  };

  return (
    <div className={getContainerClass()}>
      <h3 className="chart-title">{title}</h3>
      
      <div className="chart-wrapper">
        <div ref={containerRef} className="chart-container">
          {data.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={item.quality}
                className="bar-row"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  background: isHovered ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
              >
                <span 
                  className="bar-label"
                  style={{ color: isHovered ? item.color : undefined }}
                >
                  {item.quality}
                </span>
                
                <div className="bar-track">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: `${percentage}%`,
                      background: item.color,
                      boxShadow: isHovered ? `0 0 16px ${item.color}, 0 0 4px ${item.color}` : 'none',
                      transform: isHovered ? 'scaleY(1.2)' : 'scaleY(1)',
                    }}
                  />
                </div>
                
                <span className="bar-value" style={{ color: isHovered ? item.color : undefined }}>
                  {item.value}
                  <span className="bar-percent">
                    ({((item.value / total) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        
        {showScrollHint && (
          <div className="scroll-hint">
            <ChevronDown className="scroll-hint-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityBarChart;
