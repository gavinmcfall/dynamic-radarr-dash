interface RadarrHeaderProps {
  variant: 'radarr' | 'radarr-uhd';
  animationClass?: string;
}

const RadarrHeader = ({ variant, animationClass = 'radarr-logo--aura' }: RadarrHeaderProps) => {
  const isUHD = variant === 'radarr-uhd';

  return (
    <div className={`radarr-header radarr-header--${variant}`}>
      <div className={`radarr-logo ${animationClass}`} />

      <div className="radarr-main">
        <div className="radarr-title-row">
          <span>Radarr</span>
          <span className="radarr-slash">/</span>
          <span className="radarr-badge">{isUHD ? 'UHD' : 'HD'}</span>
        </div>

        <div className="radarr-subtitle">
          {isUHD 
            ? '4K movie monitoring, queue & health overview'
            : '1080p & 720p movie monitoring, queue & health overview'
          }
        </div>
      </div>

      <div className="radarr-pills">
        <span className="radarr-pill radarr-pill--mode">Movies</span>
        <span className={`radarr-pill ${isUHD ? 'radarr-pill--quality-uhd' : 'radarr-pill--quality-hd'}`}>
          {isUHD ? '4K Only' : 'HD Only'}
        </span>
        <span className="radarr-pill radarr-pill--k8s">Kubernetes</span>
      </div>
    </div>
  );
};

export default RadarrHeader;
