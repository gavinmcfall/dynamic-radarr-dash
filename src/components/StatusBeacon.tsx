import { cn } from '@/lib/utils';

interface StatusBeaconProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'breathe';
}

const StatusBeacon = ({ variant = 'hd', edgeLit }: StatusBeaconProps) => {
  const services = [
    { name: 'Radarr', status: 'healthy', lastCheck: '2s ago' },
    { name: 'Indexers', status: 'healthy', lastCheck: '5s ago' },
    { name: 'Download Client', status: 'degraded', lastCheck: '12s ago' },
  ];

  const isUhd = variant === 'uhd';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'hsl(142, 71%, 45%)';
      case 'degraded': return 'hsl(45, 93%, 47%)';
      case 'error': return 'hsl(0, 84%, 60%)';
      default: return 'hsl(200, 18%, 46%)';
    }
  };

  const getStatusAnimation = (status: string) => {
    switch (status) {
      case 'healthy': return 'beacon-pulse';
      case 'degraded': return 'beacon-flicker';
      case 'error': return '';
      default: return '';
    }
  };

  return (
    <div className={cn(
      'status-beacon',
      isUhd ? 'status-beacon--uhd' : 'status-beacon--hd',
      edgeLit && `status-beacon--edge-lit status-beacon--edge-${edgeLit}`
    )}>
      <p className="chart-title">{isUhd ? 'UHD' : 'HD'} Status</p>
      
      <div className="beacon-container">
        {services.map((service, index) => {
          const color = getStatusColor(service.status);
          const animation = getStatusAnimation(service.status);
          
          return (
            <div key={index} className="beacon-row">
              <div className="beacon-indicator-wrapper">
                <div 
                  className={cn('beacon-indicator', animation)}
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`
                  }}
                />
                <div 
                  className="beacon-ring"
                  style={{ borderColor: color }}
                />
              </div>
              <div className="beacon-info">
                <span className="beacon-name">{service.name}</span>
                <span className="beacon-status" style={{ color }}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </span>
              </div>
              <span className="beacon-time">{service.lastCheck}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusBeacon;
