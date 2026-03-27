export default function BridgeMapRoadmapPage() {
  const roadmaps = [
    {
      id: 1,
      name: 'Frontend Developer Path',
      description:
        'A step-by-step learning path from HTML/CSS to advanced React + state management.',
      completion: 32,
    },
    {
      id: 2,
      name: 'Data Engineering Track',
      description:
        'ETL pipelines, warehousing, and real-time streaming architecture guideline.',
      completion: 57,
    },
  ];

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">BridgeMap Roadmap</h1>
      <p className="mt-2 text-slate-300">
        Active roadmaps to follow and track progress.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {roadmaps.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {item.name}
                </h2>
                <p className="text-slate-300">{item.description}</p>
              </div>
              <span className="text-sm font-bold text-indigo-300">
                {item.completion}%
              </span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                style={{ width: `${item.completion}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
