export default function ExploreFindingsPage() {
  const findings = [
    {
      id: 1,
      title: 'User journey bottlenecks in onboarding',
      summary:
        'Drop rate at step 3 is 27% higher than average for first-time signups.',
    },
    {
      id: 2,
      title: 'High demand for skill-specific mentorship',
      summary:
        '70% of users requested mentors in Rust and ML within the last 2 weeks.',
    },
    {
      id: 3,
      title: 'Feature request: bridgeskill API access',
      summary:
        'Product team recommends prioritizing public API for roadmap management.',
    },
  ];

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">Explore Findings</h1>
      <p className="mt-2 text-slate-300">
        Data-driven observations from exploration sessions.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {findings.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-slate-300">{item.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
