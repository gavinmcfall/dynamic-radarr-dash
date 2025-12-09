import RadarrHeader from '@/components/RadarrHeader';
import QualityBarChart from '@/components/QualityBarChart';
import DraggableGrid from '@/components/DraggableGrid';

const animations = [
  { class: 'radarr-logo--shimmer', name: 'Shimmer' },
];

const Index = () => {
  const standardPanels = [
    { id: 'bar-hd', content: <QualityBarChart variant="hd" /> },
    { id: 'bar-uhd', content: <QualityBarChart variant="uhd" /> },
  ];

  const edgeLitAnimations = ['breathe'] as const;

  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Shimmer Animation Showcase */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <p className="section-title text-center">HD</p>
          <p className="section-title text-center">UHD</p>
        </div>

        {animations.map((anim) => (
          <div key={anim.class} className="space-y-2">
            <p className="animation-label !mt-0 !mb-3">{anim.name}</p>
            <div className="grid grid-cols-2 gap-4">
              <RadarrHeader variant="radarr" animationClass={anim.class} />
              <RadarrHeader variant="radarr-uhd" animationClass={anim.class} />
            </div>
          </div>
        ))}

        {/* Standard Bar Charts - Draggable */}
        <div className="pt-8 border-t border-border">
          <p className="section-title mb-2">Standard Bar Charts</p>
          <p className="text-xs text-muted-foreground mb-6">Drag panels to reorder</p>
          
          <DraggableGrid panels={standardPanels} columns={2} />
        </div>

        {/* Edge-Lit Bar Charts */}
        {edgeLitAnimations.map((animType) => (
          <div key={animType} className="pt-8 border-t border-border">
            <p className="section-title mb-2">Edge-Lit: {animType.charAt(0).toUpperCase() + animType.slice(1)}</p>
            <p className="text-xs text-muted-foreground mb-6">Thin glowing animated border</p>
            
            <DraggableGrid 
              panels={[
                { id: `edge-${animType}-hd`, content: <QualityBarChart variant="hd" edgeLit={animType} /> },
                { id: `edge-${animType}-uhd`, content: <QualityBarChart variant="uhd" edgeLit={animType} /> },
              ]} 
              columns={2} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
