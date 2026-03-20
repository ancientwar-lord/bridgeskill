import FeatureOrb from '@/ui/components/FeatureOrb';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center max-w-3xl mt-12 mb-4">
        <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500 my-10">
          BridgeSkill
        </p>

        <p className="text-slate-400 text-lg">
          Learn, research, and apply skills with{' '}
          <span className="text-blue-400 font-semibold">Agentic AI</span>
        </p>
      </div>

      {/* Interactive Feature Orb Component */}
      <FeatureOrb />
    </div>
  );
}
