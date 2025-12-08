import RadarrHeader from '@/components/RadarrHeader';

const animations = [
  { class: 'radarr-logo--shimmer', name: 'Shimmer' },
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
