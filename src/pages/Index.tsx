import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RadarrHeader from '@/components/RadarrHeader';
import QualityBarChart from '@/components/QualityBarChart';
import DraggableGrid from '@/components/DraggableGrid';
import DownloadProgressRing from '@/components/DownloadProgressRing';
import DownloadQueueCount from '@/components/DownloadQueueCount';
import MovieStateStack from '@/components/MovieStateStack';
import CodecBarChart from '@/components/CodecBarChart';
import StatusBeacon from '@/components/StatusBeacon';
import UptimeCounter from '@/components/UptimeCounter';
import StorageTank from '@/components/StorageTank';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const animations = [
  { class: 'radarr-logo--shimmer', name: 'Shimmer' },
];

interface CollapsibleSectionProps {
  title: string;
  subtitle: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const CollapsibleSection = ({ title, subtitle, isOpen, onOpenChange, children }: CollapsibleSectionProps) => (
  <Collapsible open={isOpen} onOpenChange={onOpenChange}>
    <div className="pt-8 border-t border-border">
      <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity w-full">
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? '' : '-rotate-90'}`} />
        <p className="section-title mb-0">{title}</p>
      </CollapsibleTrigger>
      <p className="text-xs text-muted-foreground mb-6 ml-6">{subtitle}</p>
      
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </div>
  </Collapsible>
);

const Index = () => {
  const [standardOpen, setStandardOpen] = useState(true);
  const [edgeLitOpen, setEdgeLitOpen] = useState(true);
  const [downloadsOpen, setDownloadsOpen] = useState(true);
  const [moviesOpen, setMoviesOpen] = useState(true);
  const [codecsOpen, setCodecsOpen] = useState(true);
  const [statusOpen, setStatusOpen] = useState(true);
  const [uptimeOpen, setUptimeOpen] = useState(true);
  const [storageOpen, setStorageOpen] = useState(true);

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

        {/* Standard Bar Charts */}
        <CollapsibleSection
          title="Quality Distribution"
          subtitle="Drag panels to reorder"
          isOpen={standardOpen}
          onOpenChange={setStandardOpen}
        >
          <DraggableGrid panels={standardPanels} columns={2} />
        </CollapsibleSection>

        {/* Edge-Lit Bar Charts */}
        {edgeLitAnimations.map((animType) => (
          <CollapsibleSection
            key={animType}
            title={`Edge-Lit: ${animType.charAt(0).toUpperCase() + animType.slice(1)}`}
            subtitle="Thin glowing animated border"
            isOpen={edgeLitOpen}
            onOpenChange={setEdgeLitOpen}
          >
            <DraggableGrid 
              panels={[
                { id: `edge-${animType}-hd`, content: <QualityBarChart variant="hd" edgeLit={animType} /> },
                { id: `edge-${animType}-uhd`, content: <QualityBarChart variant="uhd" edgeLit={animType} /> },
              ]} 
              columns={2} 
            />
          </CollapsibleSection>
        ))}

        {/* Downloads: Progress Ring */}
        <CollapsibleSection
          title="Downloads: Progress Ring"
          subtitle="Animated circular progress indicators"
          isOpen={downloadsOpen}
          onOpenChange={setDownloadsOpen}
        >
          <DraggableGrid 
            panels={[
              { id: 'downloads-hd', content: <DownloadProgressRing variant="hd" edgeLit="breathe" /> },
              { id: 'downloads-uhd', content: <DownloadProgressRing variant="uhd" edgeLit="breathe" /> },
              { id: 'downloads-count-hd', content: <DownloadQueueCount variant="hd" edgeLit="breathe" /> },
              { id: 'downloads-count-uhd', content: <DownloadQueueCount variant="uhd" edgeLit="breathe" /> },
            ]} 
            columns={2} 
          />
        </CollapsibleSection>

        {/* Movies: State Stack */}
        <CollapsibleSection
          title="Movies: State Stack"
          subtitle="Traffic light style state indicators"
          isOpen={moviesOpen}
          onOpenChange={setMoviesOpen}
        >
          <DraggableGrid 
            panels={[
              { id: 'movies-hd', content: <MovieStateStack variant="hd" edgeLit="breathe" /> },
              { id: 'movies-uhd', content: <MovieStateStack variant="uhd" edgeLit="breathe" /> },
            ]} 
            columns={2} 
          />
        </CollapsibleSection>

        {/* Codecs: Bar Chart */}
        <CollapsibleSection
          title="Codecs: Bar Chart"
          subtitle="Codec distribution visualization"
          isOpen={codecsOpen}
          onOpenChange={setCodecsOpen}
        >
          <DraggableGrid 
            panels={[
              { id: 'codecs-hd', content: <CodecBarChart variant="hd" edgeLit="breathe" /> },
              { id: 'codecs-uhd', content: <CodecBarChart variant="uhd" edgeLit="breathe" /> },
            ]} 
            columns={2} 
          />
        </CollapsibleSection>

        {/* Status: Beacon */}
        <CollapsibleSection
          title="Status: Beacon"
          subtitle="Pulsing service health indicators"
          isOpen={statusOpen}
          onOpenChange={setStatusOpen}
        >
          <DraggableGrid 
            panels={[
              { id: 'status-hd', content: <StatusBeacon variant="hd" edgeLit="breathe" /> },
              { id: 'status-uhd', content: <StatusBeacon variant="uhd" edgeLit="breathe" /> },
            ]} 
            columns={2} 
          />
        </CollapsibleSection>

        {/* Uptime: Counter */}
        <CollapsibleSection
          title="Uptime: Counter"
          subtitle="Animated flip-style counter display"
          isOpen={uptimeOpen}
          onOpenChange={setUptimeOpen}
        >
          <DraggableGrid 
            panels={[
              { id: 'uptime-hd', content: <UptimeCounter variant="hd" edgeLit="breathe" /> },
              { id: 'uptime-uhd', content: <UptimeCounter variant="uhd" edgeLit="breathe" /> },
            ]} 
            columns={2} 
          />
        </CollapsibleSection>

        {/* Storage: Tank Gauge */}
        <CollapsibleSection
          title="Storage: Tank Gauge"
          subtitle="Liquid tank visualization with wave animation"
          isOpen={storageOpen}
          onOpenChange={setStorageOpen}
        >
          <DraggableGrid 
            panels={[
              { id: 'storage-hd', content: <StorageTank variant="hd" edgeLit="breathe" /> },
              { id: 'storage-uhd', content: <StorageTank variant="uhd" edgeLit="breathe" /> },
            ]} 
            columns={2} 
          />
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default Index;
