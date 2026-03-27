const insights = [
  {
    id: 1,
    title: 'AI Mentor Usage Trends',
    summary: 'You used mentorship features 74% more this week than last week.',
    value: '74% growth',
  },
  {
    id: 2,
    title: 'Top Skill Gap Detected',
    summary:
      'Your Rust project indicates growth opportunities in async patterns.',
    value: 'Async Patterns',
  },
  {
    id: 3,
    title: 'Study Progress',
    summary: 'You completed 12 of 15 plan checkpoints in 8 days.',
    value: '80% complete',
  },
];

const resources = [
  {
    id: 1,
    type: 'Article',
    title: 'How to build resilient microservices with Kubernetes',
    link: 'https://example.com/k8s-microservices',
  },
  {
    id: 2,
    type: 'Video',
    title: 'Design systems that scale in 2026',
    link: 'https://example.com/scaling-design-systems',
  },
  {
    id: 3,
    type: 'Course',
    title: 'Fullstack TypeScript from scratch',
    link: 'https://example.com/fullstack-ts-course',
  },
];

export default function ExploreComp() {
  return (
    <main className="p-8 min-h-screen flex flex-col bg-[#10141a] text-white">
      <header>
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="mt-4 text-slate-300">
          Your personalized insights and curated learning resources.
        </p>
      </header>

      <div className="mt-8 flex-1 flex flex-col gap-6">
        <section className="flex-1 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-slate-100">
            Recent Insights
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-700 bg-slate-950 p-4"
              >
                <div className="text-sm text-indigo-400">{item.value}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-slate-300">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex-1 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-slate-100">
            Resources to Go Through
          </h2>
          <div className="grid gap-4 md:grid-cols-1">
            {resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-950 p-4 transition hover:border-indigo-300"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                  {resource.type}
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {resource.title}
                </h3>
                <p className="mt-2 text-slate-400">Open resource</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
