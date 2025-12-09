const sampleData = [
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

const QualityPieChart = () => {
  const total = sampleData.reduce((sum, d) => sum + d.value, 0);
  
  // Calculate pie slices
  let currentAngle = 0;
  const slices = sampleData.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...item, startAngle, angle };
  });

  const createArcPath = (startAngle: number, angle: number, radius: number) => {
    const start = polarToCartesian(100, 100, radius, startAngle);
    const end = polarToCartesian(100, 100, radius, startAngle + angle);
    const largeArc = angle > 180 ? 1 : 0;
    return `M 100 100 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <div className="quality-pie-chart">
      <h3 className="chart-title">Episode Quality: radarr (Current)</h3>
      
      <div className="pie-container">
        <svg viewBox="0 0 200 200" className="pie-svg">
          {slices.map((slice) => (
            <path
              key={slice.quality}
              d={createArcPath(slice.startAngle, slice.angle, 80)}
              fill={slice.color}
              stroke="#1f2937"
              strokeWidth="1"
            />
          ))}
        </svg>
        
        <div className="pie-legend">
          <div className="pie-legend-header">
            <span>Quality</span>
            <span>Value</span>
          </div>
          {sampleData.map((item) => (
            <div key={item.quality} className="pie-legend-row">
              <span className="pie-legend-color" style={{ background: item.color }} />
              <span className="pie-legend-label">{item.quality}</span>
              <span className="pie-legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualityPieChart;
