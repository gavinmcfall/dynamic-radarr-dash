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
  { class: 'radarr-logo--strobe', name: 'Strobe' },
  { class: 'radarr-logo--ember', name: 'Ember' },
  { class: 'radarr-logo--firefly', name: 'Firefly' },
  { class: 'radarr-logo--orbit', name: 'Orbit' },
  { class: 'radarr-logo--ripple', name: 'Ripple' },
  { class: 'radarr-logo--shimmer', name: 'Shimmer' },
  { class: 'radarr-logo--pendulum', name: 'Pendulum' },
  { class: 'radarr-logo--neon', name: 'Neon' },
  { class: 'radarr-logo--plasma', name: 'Plasma' },
  { class: 'radarr-logo--glitch', name: 'Glitch' },
  { class: 'radarr-logo--aurora', name: 'Aurora' },
];

const Index = () => {
  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
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
      </div>
    </div>
  );
};

export default Index;
