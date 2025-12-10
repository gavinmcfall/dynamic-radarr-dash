import { cn } from '@/lib/utils';
import { AlertCircle, Eye, CheckCircle, ArrowUpCircle } from 'lucide-react';

interface MovieStateStackProps {
  variant?: 'hd' | 'uhd';
  edgeLit?: 'breathe';
}

const MovieStateStack = ({ variant = 'hd', edgeLit }: MovieStateStackProps) => {
  const states = [
    { name: 'Missing', count: 23, icon: AlertCircle, color: 'hsl(0, 84%, 60%)' },
    { name: 'Monitored', count: 156, icon: Eye, color: 'hsl(45, 93%, 47%)' },
    { name: 'Downloaded', count: 892, icon: CheckCircle, color: 'hsl(142, 71%, 45%)' },
    { name: 'Upgrading', count: 12, icon: ArrowUpCircle, color: 'hsl(217, 91%, 60%)' },
  ];

  const total = states.reduce((sum, s) => sum + s.count, 0);
  const isUhd = variant === 'uhd';

  return (
    <div className={cn(
      'movie-state-stack',
      isUhd ? 'movie-state-stack--uhd' : 'movie-state-stack--hd',
      edgeLit && `movie-state-stack--edge-lit movie-state-stack--edge-${edgeLit}`
    )}>
      <p className="chart-title">{isUhd ? 'UHD' : 'HD'} Movie States</p>
      
      <div className="state-stack-container">
        {states.map((state, index) => {
          const Icon = state.icon;
          const percentage = (state.count / total) * 100;
          
          return (
            <div key={index} className="state-row">
              <div className="state-icon" style={{ color: state.color }}>
                <Icon size={18} />
              </div>
              <span className="state-name">{state.name}</span>
              <div className="state-bar-track">
                <div 
                  className="state-bar-fill"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: state.color,
                    boxShadow: `0 0 10px ${state.color}`
                  }}
                />
              </div>
              <span className="state-count">{state.count}</span>
            </div>
          );
        })}
      </div>
      
      <div className="state-total">
        <span>Total</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default MovieStateStack;
