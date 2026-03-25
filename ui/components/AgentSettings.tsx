'use client';

import { X } from 'lucide-react';
import type { AgentConfig } from '@/lib/types';

interface AgentSettingsProps {
  config: AgentConfig;
  open: boolean;
  onClose: () => void;
}

type MentorSlug = 'personal' | 'founder' | 'research';

const dummySettings: Record<
  MentorSlug,
  { key: string; label: string; value: string }[]
> = {
  personal: [
    { key: 'responseSpeed', label: 'Response speed', value: 'balanced' },
    { key: 'personality', label: 'Personality', value: 'friendly' },
  ],
  founder: [
    { key: 'responseSpeed', label: 'Response speed', value: 'fast' },
    { key: 'strategy', label: 'Strategy mode', value: 'business' },
  ],
  research: [
    { key: 'responseSpeed', label: 'Response speed', value: 'slow' },
    { key: 'depth', label: 'Research depth', value: 'deep' },
  ],
};

export default function AgentSettings({
  config,
  open,
  onClose,
}: AgentSettingsProps) {
  if (!open) return null;

  const slug =
    config.slug === 'founder' || config.slug === 'research'
      ? config.slug
      : 'personal';

  const settings = dummySettings[slug];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#0f1726] border border-white/10 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 p-2 hover:bg-white/20"
          aria-label="Close settings"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold mb-4">{config.title} Settings</h2>
        <p className="text-sm text-slate-300 mb-4">
          Adjust settings for {config.slug} mentor mode.
        </p>
        <div className="space-y-3">
          {settings.map((item) => (
            <div
              key={item.key}
              className="flex justify-between rounded-lg border border-white/10 bg-[#1b2431] px-4 py-3"
            >
              <span>{item.label}</span>
              <span className="font-semibold text-slate-100">{item.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#3c4b63] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5a6d8d]"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
}
