import React from 'react';

// Dummy data array containing various opportunity types
const opportunitiesData = [
  {
    id: 1,
    title: 'Global Tech Scholarship 2026',
    description:
      'Full tuition coverage for undergraduate students pursuing a degree in computer science or related fields.',
    tag: 'Scholarship',
    date: 'Apply by May 15, 2026',
  },
  {
    id: 2,
    title: 'Summer UI/UX Internship',
    description:
      'A 3-month intensive internship program focusing on user-centered design and prototyping.',
    tag: 'Internship',
    date: 'Starts June 1, 2026',
  },
  {
    id: 3,
    title: 'Junior Frontend Engineer',
    description:
      'Join our fast-growing startup to build next-generation web applications using React and Tailwind.',
    tag: 'Job',
    date: 'Rolling Applications',
  },
  {
    id: 4,
    title: 'Web3 Global Hackathon',
    description:
      'Build innovative decentralized applications. Over $50k in prizes to be won.',
    tag: 'Hackathon',
    date: 'April 10 - April 12, 2026',
  },
  {
    id: 5,
    title: 'Startup Incubation Cohort 4',
    description:
      'Get seed funding, mentorship, and workspace for your early-stage tech startup.',
    tag: 'Incubation',
    date: 'Apply by April 30, 2026',
  },
  {
    id: 6,
    title: 'AI in Healthcare Grant',
    description:
      'Funding available for research proposals exploring the ethical use of AI in patient diagnostics.',
    tag: 'Research Proposal',
    date: 'Deadline: June 30, 2026',
  },
  {
    id: 7,
    title: 'Future of Web Development',
    description:
      'An interactive session with industry leaders discussing Server Components and Edge computing.',
    tag: 'Seminar',
    date: 'May 5, 2026',
  },
];

export default function OpportunitiesComp() {
  return (
    <main className="p-8 min-h-screen RoadmapsComp text-white">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <p className="mt-4 text-slate-400">
          Discover and apply for the latest opportunities tailored for you.
        </p>
      </header>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunitiesData.map((opp) => (
          <article
            key={opp.id}
            className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors flex flex-col"
          >
            {/* Tag and Date */}
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-900 text-indigo-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                {opp.tag}
              </span>
              <span className="text-xs text-slate-500">{opp.date}</span>
            </div>

            {/* Content */}
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              {opp.title}
            </h2>
            <p className="text-slate-400 text-sm mb-6 flex-1">
              {opp.description}
            </p>

            {/* Action Button */}
            <button className="mt-auto w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium rounded-lg transition-colors">
              View Details
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
