import { useState } from 'react';

interface QualityData {
  quality: string;
  value: number;
  color: string;
}

const sampleData: QualityData[] = [
  { quality: 'Remux-1080p', value: 422, color: 'hsl(271, 60%, 60%)' },
  { quality: 'Bluray-1080p', value: 157, color: 'hsl(85, 50%, 45%)' },
  { quality: 'WEBDL-1080p', value: 96, color: 'hsl(45, 70%, 50%)' },
  { quality: 'WEBRip-1080p', value: 12, color: 'hsl(0, 65%, 55%)' },
  { quality: 'DVD', value: 4, color: 'hsl(30, 60%, 50%)' },
  { quality: 'Bluray-720p', value: 2, color: 'hsl(210, 70%, 55%)' },
  { quality: 'Bluray-2160p', value: 1, color: 'hsl(50, 80%, 55%)' },
  { quality: 'HDTV-1080p', value: 1, color: 'hsl(0, 55%, 50%)' },
  { quality: 'Remux-2160p', value: 1, color: 'hsl(120, 50%, 45%)' },
  { quality: 'WEBDL-480p', value: 1, color: 'hsl(200, 60%, 55%)' },
  { quality: 'WEBDL-720p', value: 1, color: 'hsl(25, 70%, 55%)' },
];

const QualityBarChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...sampleData.map(d => d.value));
  const total = sampleData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="quality-bar-chart">
      <h3 className="chart-title">Movie Quality: radarr</h3>
      
      <div className="chart-container">
        {sampleData.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;
          
          return (
            <div 
              key={item.quality}
              className={`bar-row ${isHovered ? 'bar-row--hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bar-label">{item.quality}</span>
              
              <div className="bar-track">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                    boxShadow: isHovered ? `0 0 20px ${item.color}80` : 'none'
                  }}
                />
              </div>
              
              <span className="bar-value">
                {item.value}
                <span className="bar-percent">
                  ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QualityBarChart;
