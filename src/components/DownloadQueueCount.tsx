import { cn } from '@/lib/utils';

interface DownloadQueueCountProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'breathe';
}

const DownloadQueueCount = ({ variant = 'hd', edgeLit }: DownloadQueueCountProps) => {
  const inQueue = 3;
  const totalDownloaded = 1247;
  const isUhd = variant === 'uhd';

  return (
    <div className={cn(
      'download-queue-count',
      isUhd ? 'download-queue-count--uhd' : 'download-queue-count--hd',
      edgeLit && `download-queue-count--edge-lit download-queue-count--edge-${edgeLit}`
    )}>
      <p className="chart-title">{isUhd ? 'UHD' : 'HD'} Downloads</p>
      
      <div className="queue-stats">
        <div className="queue-stat queue-stat--active">
          <span className="queue-stat-value">{inQueue}</span>
          <span className="queue-stat-label">In Queue</span>
        </div>
        
        <div className="queue-divider" />
        
        <div className="queue-stat queue-stat--complete">
          <span className="queue-stat-value">{totalDownloaded.toLocaleString()}</span>
          <span className="queue-stat-label">Downloaded</span>
        </div>
      </div>
    </div>
  );
};

export default DownloadQueueCount;
