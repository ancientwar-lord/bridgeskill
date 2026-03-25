import { AgentConfig } from './types';

export const agentConfigs: Array<AgentConfig & { slug: string }> = [
  {
    slug: 'founder',
    title: 'Founder Mentor',
    subtitle: 'Insights and strategies for startup founders.',
    placeholder:
      'Ask your Founder Mentor for fundraising, go-to-market strategy, and pitch deck feedback...',
    suggestions: [
      'Help me write a pitch deck',
      'How do I validate a startup idea?',
      'Best go-to-market plan for SaaS startup',
    ],
    agentName: 'Founder Mentor',
    agentInitials: 'FM',
    apiRoute: '/api/tinyfish',
  },
  {
    slug: 'research',
    title: 'Research Mentor',
    subtitle: 'Advanced research support and guidance.',
    placeholder:
      'Ask your Research Mentor to find relevant papers, analyze results, or summarize the latest AI research...',
    suggestions: [
      'Find latest AI agent papers',
      'Summarize a research paper',
      'Suggest reproducible experiments',
    ],
    agentName: 'Research Mentor',
    agentInitials: 'RM',
    apiRoute: '/api/tinyfish',
  },
  {
    slug: 'personal',
    title: 'Personal Mentor',
    subtitle:
      'A one-on-one personalized mentor for life, learning, and career goals.',
    placeholder:
      'Ask your Personal Mentor for advice on next steps, routines, planning, and reflection...',
    suggestions: [
      'Create a personal learning plan for the next 90 days',
      'Give me feedback on my weekly goal setup',
      'How can I stay productive with remote work?',
    ],
    agentName: 'Personal Mentor',
    agentInitials: 'PM',
    apiRoute: '/api/tinyfish',
  },
];
