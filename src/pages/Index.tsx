import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RadarrHeader from '@/components/RadarrHeader';
import QualityBarChart from '@/components/QualityBarChart';
import DraggableGrid from '@/components/DraggableGrid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const animations = [
  { class: 'radarr-logo--shimmer', name: 'Shimmer' },
];

const Index = () => {
  const [standardOpen, setStandardOpen] = useState(true);
  const [edgeLitOpen, setEdgeLitOpen] = useState(true);

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

        {/* Standard Bar Charts - Collapsible */}
        <Collapsible open={standardOpen} onOpenChange={setStandardOpen}>
          <div className="pt-8 border-t border-border">
            <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity w-full">
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${standardOpen ? '' : '-rotate-90'}`} />
              <p className="section-title mb-0">Standard Bar Charts</p>
            </CollapsibleTrigger>
            <p className="text-xs text-muted-foreground mb-6 ml-6">Drag panels to reorder</p>
            
            <CollapsibleContent>
              <DraggableGrid panels={standardPanels} columns={2} />
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Edge-Lit Bar Charts - Collapsible */}
        {edgeLitAnimations.map((animType) => (
          <Collapsible key={animType} open={edgeLitOpen} onOpenChange={setEdgeLitOpen}>
            <div className="pt-8 border-t border-border">
              <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity w-full">
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${edgeLitOpen ? '' : '-rotate-90'}`} />
                <p className="section-title mb-0">Edge-Lit: {animType.charAt(0).toUpperCase() + animType.slice(1)}</p>
              </CollapsibleTrigger>
              <p className="text-xs text-muted-foreground mb-6 ml-6">Thin glowing animated border</p>
              
              <CollapsibleContent>
                <DraggableGrid 
                  panels={[
                    { id: `edge-${animType}-hd`, content: <QualityBarChart variant="hd" edgeLit={animType} /> },
                    { id: `edge-${animType}-uhd`, content: <QualityBarChart variant="uhd" edgeLit={animType} /> },
                  ]} 
                  columns={2} 
                />
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default Index;
