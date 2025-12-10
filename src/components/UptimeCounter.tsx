import { cn } from '@/lib/utils';

interface UptimeCounterProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'breathe';
}

const UptimeCounter = ({ variant = 'hd', edgeLit }: UptimeCounterProps) => {
  const uptime = { days: 88, hours: 14, minutes: 32, seconds: 15 };
  const isUhd = variant === 'uhd';

  const formatNumber = (num: number, digits: number = 2) => {
    return num.toString().padStart(digits, '0');
  };

  const segments = [
    { value: formatNumber(uptime.days), label: 'DAYS' },
    { value: formatNumber(uptime.hours), label: 'HRS' },
    { value: formatNumber(uptime.minutes), label: 'MIN' },
    { value: formatNumber(uptime.seconds), label: 'SEC' },
  ];

  return (
    <div className={cn(
      'uptime-counter',
      isUhd ? 'uptime-counter--uhd' : 'uptime-counter--hd',
      edgeLit && `uptime-counter--edge-lit uptime-counter--edge-${edgeLit}`
    )}>
      <p className="chart-title">{isUhd ? 'UHD' : 'HD'} Uptime</p>
      
      <div className="counter-display">
        {segments.map((segment, index) => (
          <div key={index} className="counter-segment">
            <div className="counter-digits">
              {segment.value.split('').map((digit, dIndex) => (
                <span key={dIndex} className="counter-digit">
                  {digit}
                </span>
              ))}
            </div>
            <span className="counter-label">{segment.label}</span>
            {index < segments.length - 1 && (
              <span className="counter-separator">:</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="uptime-footer">
        <span className="uptime-since">Since Dec 1, 2024</span>
      </div>
    </div>
  );
};

export default UptimeCounter;
