export default function OpportunitiesActionsPage() {
  const actions = [
    {
      id: 1,
      title: 'Apply to AI Mentor Program',
      description:
        'Submit your resume and project portfolio for the next cohort.',
      due: '3 days',
    },
    {
      id: 2,
      title: 'Complete assessment task',
      description:
        'Finish the front-end challenge to unlock the interview stage.',
      due: '1 week',
    },
    {
      id: 3,
      title: 'Follow up with network',
      description:
        'Reach out to potential collaborators who expressed interest.',
      due: '2 days',
    },
  ];

  return (
    <main className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">Opportunities Actions</h1>
      <p className="mt-2 text-slate-300">
        Actionable items for your current opportunities.
      </p>

      <div className="mt-6 space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-white">
                {action.title}
              </h2>
              <span className="text-xs uppercase tracking-widest text-indigo-300">
                Due {action.due}
              </span>
            </div>
            <p className="mt-2 text-slate-300">{action.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
