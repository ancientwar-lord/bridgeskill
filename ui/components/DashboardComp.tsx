const explorationData = [
  {
    id: 1,
    title: 'New AI Use Cases',
    description:
      'Discover 10 fresh ways to apply AI in product features and automation.',
  },
  {
    id: 2,
    title: 'Technical Research Paths',
    description:
      'Explore system design topics: microfrontends, edge compute, and distributed logging.',
  },
];

const opportunityData = [
  {
    id: 1,
    title: 'Apply to Startup Accelerator',
    notes: 'Deadline in 14 days: 5k stipend + mentor grants.',
  },
  {
    id: 2,
    title: 'Freelance Senior Frontend Role',
    notes: 'Remote, contract with equity options in lead UI team.',
  },
];

const planData = [
  {
    id: 1,
    title: '60-Day Backend Strategy',
    status: 'In progress',
    progress: 48,
  },
  {
    id: 2,
    title: 'Security Improvements',
    status: 'Pending',
    progress: 10,
  },
];

const roadmapData = [
  { id: 1, title: 'Fullstack Roadmap', stage: 'Design' },
  { id: 2, title: 'ML Certification Path', stage: 'Research' },
];

const mentorData = [
  {
    id: 1,
    name: 'Personal mentor',
    focus: 'DevOps/Cloud architecture',
  },
  {
    id: 2,
    name: 'Founder mentor',
    focus: 'AI product strategy',
  },
];

export default function DashboardComp() {
  return (
    <main className="p-8 pt-4 min-h-screen bg-slate-900 text-white">
      <p className="mt-2 text-slate-300">
        Quick summary of key workstreams and recommendations.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-slate-800 bg-opacity-60 border border-slate-700 p-5">
          <h2 className="text-xl font-semibold">Explorations</h2>
          <div className="mt-4 space-y-3">
            {explorationData.map((item) => (
              <article
                key={item.id}
                className="rounded-lg bg-slate-950 p-3 border border-slate-700"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-800 bg-opacity-60 border border-slate-700 p-5">
          <h2 className="text-xl font-semibold">Opportunities</h2>
          <div className="mt-4 space-y-3">
            {opportunityData.map((item) => (
              <article
                key={item.id}
                className="rounded-lg bg-slate-950 p-3 border border-slate-700"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-slate-300">{item.notes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-800 bg-opacity-60 border border-slate-700 p-5">
          <h2 className="text-xl font-semibold">Plan & Strategy</h2>
          <div className="mt-4 space-y-3">
            {planData.map((item) => (
              <article
                key={item.id}
                className="rounded-lg bg-slate-950 p-3 border border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <span className="text-xs uppercase text-indigo-300">
                    {item.status}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-md bg-slate-700">
                  <div
                    className="h-full rounded-md bg-gradient-to-r from-purple-500 to-indigo-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Progress: {item.progress}%
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-800 bg-opacity-60 border border-slate-700 p-5">
          <h2 className="text-xl font-semibold">Roadmap Status</h2>
          <div className="mt-4 space-y-3">
            {roadmapData.map((item) => (
              <article
                key={item.id}
                className="rounded-lg bg-slate-950 p-3 border border-slate-700"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-slate-300">Stage: {item.stage}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 rounded-xl bg-slate-800 bg-opacity-60 border border-slate-700 p-5">
          <h2 className="text-xl font-semibold">Mentor Recommendations</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {mentorData.map((mentor) => (
              <article
                key={mentor.id}
                className="rounded-lg bg-slate-950 p-3 border border-slate-700"
              >
                <h3 className="font-semibold text-white">{mentor.name}</h3>
                <p className="text-slate-300">Focus: {mentor.focus}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
