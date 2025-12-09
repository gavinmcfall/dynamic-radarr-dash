import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Grouped by quality type for radar visualization
const radarData = [
  { category: 'Remux', value: 423, fullMark: 450 },
  { category: 'Bluray', value: 160, fullMark: 450 },
  { category: 'WEBDL', value: 98, fullMark: 450 },
  { category: 'WEBRip', value: 12, fullMark: 450 },
  { category: 'HDTV', value: 1, fullMark: 450 },
  { category: 'DVD', value: 4, fullMark: 450 },
];

const QualityRadarChart = () => {
  return (
    <div className="quality-radar-chart">
      <h3 className="chart-title">Quality Distribution: radarr</h3>
      
      <div className="radar-container">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid 
              stroke="hsl(var(--border))"
              strokeOpacity={0.3}
            />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              stroke="hsl(var(--border))"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 450]}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              stroke="hsl(var(--border))"
              strokeOpacity={0.5}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [value, 'Count']}
            />
            <Radar
              name="Movies"
              dataKey="value"
              stroke="hsl(210, 100%, 52%)"
              fill="hsl(210, 100%, 52%)"
              fillOpacity={0.4}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: 'hsl(210, 100%, 52%)',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: 'hsl(32, 100%, 50%)',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="radar-legend">
        {radarData.map((item) => (
          <div key={item.category} className="radar-legend-item">
            <span className="radar-legend-label">{item.category}</span>
            <span className="radar-legend-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualityRadarChart;
