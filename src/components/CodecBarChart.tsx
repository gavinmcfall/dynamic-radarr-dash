import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CodecBarChartProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'breathe';
}

const CodecBarChart = ({ variant = 'hd', edgeLit }: CodecBarChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTopHint, setShowTopHint] = useState(false);
  const [showBottomHint, setShowBottomHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const codecData = [
    { codec: 'x264', value: 423, color: 'hsl(217, 91%, 60%)' },
    { codec: 'x265/HEVC', value: 312, color: 'hsl(262, 83%, 58%)' },
    { codec: 'AV1', value: 89, color: 'hsl(142, 71%, 45%)' },
    { codec: 'VP9', value: 45, color: 'hsl(45, 93%, 47%)' },
    { codec: 'MPEG-4', value: 28, color: 'hsl(0, 84%, 60%)' },
    { codec: 'VC-1', value: 12, color: 'hsl(280, 87%, 65%)' },
    { codec: 'Other', value: 8, color: 'hsl(200, 18%, 46%)' },
  ];

  const maxValue = Math.max(...codecData.map(d => d.value));
  const isUhd = variant === 'uhd';

  const checkScrollability = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const hasScrollableContent = container.scrollHeight > container.clientHeight;
    const isAtTop = container.scrollTop <= 5;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
    
    setShowTopHint(hasScrollableContent && !isAtTop);
    setShowBottomHint(hasScrollableContent && !isAtBottom);
  }, []);

  const handleScroll = useCallback(() => {
    checkScrollability();
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      checkScrollability();
    }, 10000);
  }, [checkScrollability]);

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => {
      window.removeEventListener('resize', checkScrollability);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [checkScrollability]);

  return (
    <div className={cn(
      'quality-bar-chart',
      isUhd ? 'quality-bar-chart--uhd' : 'quality-bar-chart--hd',
      edgeLit && `quality-bar-chart--edge-lit quality-bar-chart--edge-${edgeLit}`
    )}>
      <p className="chart-title">{isUhd ? 'UHD' : 'HD'} Codecs</p>
      
      <div className="chart-wrapper">
        {showTopHint && (
          <div className="scroll-hint scroll-hint--top">
            <ChevronUp size={14} />
          </div>
        )}
        
        <div 
          ref={containerRef}
          className="chart-container"
          onScroll={handleScroll}
        >
          {codecData.map((item, index) => (
            <div
              key={item.codec}
              className={cn('bar-row', hoveredIndex === index && 'bar-row--hovered')}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="bar-label">{item.codec}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color,
                    boxShadow: hoveredIndex === index ? `0 0 12px ${item.color}` : `0 0 6px ${item.color}`,
                  }}
                />
              </div>
              <span className="bar-value">{item.value}</span>
            </div>
          ))}
        </div>
        
        {showBottomHint && (
          <div className="scroll-hint scroll-hint--bottom">
            <ChevronDown size={14} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodecBarChart;
