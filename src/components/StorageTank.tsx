import { cn } from '@/lib/utils';

interface StorageTankProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'breathe';
}

const StorageTank = ({ variant = 'hd', edgeLit }: StorageTankProps) => {
  const storage = { used: 2.4, total: 4, unit: 'TB' };
  const percentage = (storage.used / storage.total) * 100;
  const isWarning = percentage > 80;
  const isUhd = variant === 'uhd';
  
  const fillColor = isWarning 
    ? 'hsl(0, 84%, 60%)' 
    : isUhd 
      ? 'hsl(var(--radarr-uhd))' 
      : 'hsl(var(--radarr-hd))';

  return (
    <div className={cn(
      'storage-tank',
      isUhd ? 'storage-tank--uhd' : 'storage-tank--hd',
      edgeLit && `storage-tank--edge-lit storage-tank--edge-${edgeLit}`,
      isWarning && 'storage-tank--warning'
    )}>
      <p className="chart-title">{isUhd ? 'UHD' : 'HD'} Storage</p>
      
      <div className="tank-container">
        <div className="tank-visual">
          <svg className="tank-svg" viewBox="0 0 100 160">
            {/* Tank outline */}
            <path
              className="tank-outline"
              d="M10,20 Q10,10 20,10 L80,10 Q90,10 90,20 L90,140 Q90,150 80,150 L20,150 Q10,150 10,140 Z"
              fill="none"
              strokeWidth="2"
            />
            
            {/* Tank fill with wave */}
            <defs>
              <clipPath id={`tank-clip-${variant}`}>
                <path d="M12,22 Q12,14 20,14 L80,14 Q88,14 88,22 L88,138 Q88,146 80,146 L20,146 Q12,146 12,138 Z" />
              </clipPath>
              <linearGradient id={`tank-gradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={fillColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor={fillColor} stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            <g clipPath={`url(#tank-clip-${variant})`}>
              <rect
                x="12"
                y={146 - (percentage / 100) * 132}
                width="76"
                height={(percentage / 100) * 132}
                fill={`url(#tank-gradient-${variant})`}
              />
              {/* Wave effect */}
              <path
                className="tank-wave"
                d={`M12,${146 - (percentage / 100) * 132} Q30,${143 - (percentage / 100) * 132} 50,${146 - (percentage / 100) * 132} T88,${146 - (percentage / 100) * 132}`}
                fill={fillColor}
                opacity="0.5"
              />
            </g>
            
            {/* Percentage marks */}
            {[25, 50, 75].map((mark) => (
              <g key={mark}>
                <line
                  x1="8"
                  y1={146 - (mark / 100) * 132}
                  x2="14"
                  y2={146 - (mark / 100) * 132}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <text
                  x="4"
                  y={148 - (mark / 100) * 132}
                  fontSize="6"
                  fill="hsl(var(--muted-foreground))"
                  textAnchor="end"
                  opacity="0.5"
                >
                  {mark}%
                </text>
              </g>
            ))}
          </svg>
          
          <div className="tank-percentage">
            <span className="tank-percent-value">{Math.round(percentage)}%</span>
          </div>
        </div>
        
        <div className="tank-info">
          <div className="tank-usage">
            <span className="tank-used">{storage.used}</span>
            <span className="tank-separator">/</span>
            <span className="tank-total">{storage.total} {storage.unit}</span>
          </div>
          <div className="tank-free">
            {(storage.total - storage.used).toFixed(1)} {storage.unit} free
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageTank;
