export default function BridgeMapStrategyPage() {
  const strategies = [
    {
      id: 1,
      title: 'AI-powered roadmap suggestions',
      details:
        'Use usage patterns and skill progress to auto-generate personalized roadmap paths.',
    },
    {
      id: 2,
      title: 'Quarterly skill milestones',
      details:
        'Set evolving learning milestones and trigger notifications when new resources are available.',
    },
    {
      id: 3,
      title: 'Cross-domain collaboration',
      details:
        'Allow teams to link related roadmaps and align goals for mentorship cohorts.',
    },
  ];

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">BridgeMap Strategy</h1>
      <p className="mt-2 text-slate-300">
        High-level strategy for creating and managing roadmaps.
      </p>

      <div className="mt-6 space-y-4">
        {strategies.map((item) => (
          <section
            key={item.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-slate-300">{item.details}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
