import RadarrHeader from '@/components/RadarrHeader';

const animations = [
  { class: 'radarr-logo--aura', name: 'Aura (Original)' },
  { class: 'radarr-logo--pulse', name: 'Pulse' },
  { class: 'radarr-logo--breathe', name: 'Breathe' },
  { class: 'radarr-logo--flicker', name: 'Flicker' },
  { class: 'radarr-logo--heartbeat', name: 'Heartbeat' },
  { class: 'radarr-logo--wave', name: 'Wave' },
  { class: 'radarr-logo--fade', name: 'Fade' },
  { class: 'radarr-logo--bounce', name: 'Bounce' },
];

const Index = () => {
  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main Comparison */}
        <section>
          <h1 className="section-title">HD vs UHD Variants</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <RadarrHeader variant="radarr" />
            <RadarrHeader variant="radarr-uhd" />
          </div>
        </section>

        {/* HD Animation Examples */}
        <section>
          <h2 className="section-title">HD — Animation Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {animations.map((anim) => (
              <div key={`hd-${anim.class}`}>
                <RadarrHeader variant="radarr" animationClass={anim.class} />
                <p className="animation-label">{anim.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* UHD Animation Examples */}
        <section>
          <h2 className="section-title">UHD — Animation Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {animations.map((anim) => (
              <div key={`uhd-${anim.class}`}>
                <RadarrHeader variant="radarr-uhd" animationClass={anim.class} />
                <p className="animation-label">{anim.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
