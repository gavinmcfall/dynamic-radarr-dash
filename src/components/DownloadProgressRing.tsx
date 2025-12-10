import { cn } from '@/lib/utils';

interface DownloadProgressRingProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'breathe';
}

const DownloadProgressRing = ({ variant = 'hd', edgeLit }: DownloadProgressRingProps) => {
  const downloads = [
    { name: 'Movie.Title.2024.1080p.BluRay', progress: 73, speed: '12.4 MB/s' },
    { name: 'Another.Film.2023.720p.WEB', progress: 45, speed: '8.2 MB/s' },
    { name: 'Series.S01E05.1080p', progress: 91, speed: '15.1 MB/s' },
  ];

  const isUhd = variant === 'uhd';
  const strokeColor = isUhd ? 'hsl(var(--radarr-uhd))' : 'hsl(var(--radarr-hd))';
  const glowColor = isUhd ? 'var(--radarr-uhd)' : 'var(--radarr-hd)';

  return (
    <div className={cn(
      'download-progress-ring',
      isUhd ? 'download-progress-ring--uhd' : 'download-progress-ring--hd',
      edgeLit && `download-progress-ring--edge-lit download-progress-ring--edge-${edgeLit}`
    )}>
      <p className="chart-title">{isUhd ? 'UHD' : 'HD'} Downloads</p>
      
      <div className="progress-rings-container">
        {downloads.map((download, index) => {
          const circumference = 2 * Math.PI * 40;
          const strokeDashoffset = circumference - (download.progress / 100) * circumference;
          
          return (
            <div key={index} className="progress-ring-item">
              <div className="progress-ring-visual">
                <svg className="progress-ring-svg" viewBox="0 0 100 100">
                  <circle
                    className="progress-ring-track"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    strokeWidth="6"
                  />
                  <circle
                    className="progress-ring-fill"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    strokeWidth="6"
                    stroke={strokeColor}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                      filter: `drop-shadow(0 0 8px hsl(${glowColor} / 0.6))`,
                      transition: 'stroke-dashoffset 0.5s ease-out'
                    }}
                  />
                </svg>
                <div className="progress-ring-center">
                  <span className="progress-ring-percent">{download.progress}%</span>
                  <span className="progress-ring-speed">{download.speed}</span>
                </div>
              </div>
              <p className="progress-ring-name" title={download.name}>
                {download.name.length > 20 ? download.name.slice(0, 20) + '...' : download.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DownloadProgressRing;
