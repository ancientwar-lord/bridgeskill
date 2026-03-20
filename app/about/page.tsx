'use client';
import {
  BrainCircuit,
  Briefcase,
  MapPinned,
  BellIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Explore and Research',
    description: 'Get the best resource from the web.',
    icon: BellIcon,
  },
  {
    title: 'Learn with Roadmaps',
    description:
      'Follow curated paths that make skill-building clear, structured, and measurable. Mark milestones and visualize growth so you always know what comes next.',
    icon: MapPinned,
  },
  {
    title: 'Apply in the Real World',
    description:
      'Translate skills into action with opportunities matched to your growth and tailored to the industry/market demand.',
    icon: Briefcase,
  },
  {
    title: 'Different Modes for Different Needs',
    description:
      'Whether you are a learner, researcher, or founder, our specialized modes and mentors adapt to your unique goals and challenges.',
    icon: BrainCircuit,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto my-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500 mb-4"
          >
            About BridgeSkill
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Career Navigator AI follows a multi-agent architecture where each
            mode is powered by a specialized Mentor AI supported by an
            orchestrated system of agents.
          </p>
        </div>
        {/* Modes Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
          {/* Learner Mode */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/40 transition">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Learner Mode
            </h3>
            <p className="text-slate-400 leading-relaxed">
              A <span className="text-white">Learning Mentor AI</span> guides
              users in choosing the right career path, resolving doubts, and
              orchestrating the journey.
              <br />
              <br />
              <span className="text-purple-300">Explorer Agent</span> discovers
              courses, resources, and builds structured roadmaps.
              <br />
              <span className="text-purple-300">Opportunity Agent</span> finds
              personalized jobs and internships, even assisting with
              applications.
            </p>
          </div>

          {/* Researcher Mode */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-blue-500/40 transition">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Researcher Mode
            </h3>
            <p className="text-slate-400 leading-relaxed">
              A <span className="text-white">Research Mentor AI</span> helps
              refine ideas, overcome beginner challenges, and guide research
              direction.
              <br />
              <br />
              <span className="text-blue-300">Explorer Agent</span> discovers
              papers and builds research roadmaps.
              <br />
              <span className="text-blue-300">Opportunity Agent</span>{' '}
              identifies conferences, grants, and collaborations.
            </p>
          </div>

          {/* Founder Mode */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-green-500/40 transition">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Founder Mode
            </h3>
            <p className="text-slate-400 leading-relaxed">
              A <span className="text-white">Startup Mentor AI</span> helps
              refine ideas and orchestrate execution.
              <br />
              <br />
              <span className="text-green-300">Explorer Agent</span> handles
              market research, validation, and compliance insights.
              <br />
              <span className="text-green-300">Opportunity Agent</span> connects
              users with investors, incubators, and accelerators.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative bg-slate-900/90 p-6 rounded-xl shadow-2xl shadow-zinc-500/30 border border-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-500/30"
            >
              <div className="w-12 h-12 bg-purple-950/30 rounded-lg flex items-center justify-center text-purple-300 mb-4 border border-purple-900/70">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-slate-400">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
