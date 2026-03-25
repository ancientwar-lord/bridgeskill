'use client';

import type { DragEvent } from 'react';
import { Check, X } from 'lucide-react';
import type { AgentConfig } from '@/lib/types';

interface MentorItem {
  title: string;
  href: string;
  order: number;
  active: boolean;
}

interface SelectMentorProps {
  config: AgentConfig;
  open: boolean;
  onClose: () => void;
  mentors: MentorItem[];
  selected: MentorItem;
  setActive: (href: string) => void;
  onDragStart: (index: number, event: DragEvent<HTMLLIElement>) => void;
  onDragOver: (index: number, event: DragEvent<HTMLLIElement>) => void;
  saveSettings: (mentors: MentorItem[]) => Promise<void>;
  save: (onClose: () => void) => Promise<void>;
  saving: boolean;
}

export default function SelectMentor({
  config,
  open,
  onClose,
  mentors,
  selected,
  setActive,
  onDragStart,
  onDragOver,
  save,
  saving,
}: SelectMentorProps) {
  const handleSave = async () => {
    try {
      await save(() => onClose());
    } catch (err) {
      console.error('Save mentor settings failed', err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#121827] border border-white/10 p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-white/10 p-2 hover:bg-white/20"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <h2 className="text-lg font-bold mb-2">{config.title} Settings</h2>
        <p className="text-sm text-slate-300 mb-2">
          Currently selected: {selected?.title} (order {selected?.order + 1})
        </p>
        <p className="text-xs text-slate-400 mb-4">
          Note: you can drag and drop to change the order preference.
        </p>

        <ul className="space-y-2">
          {mentors
            .sort((a, b) => a.order - b.order)
            .map((mentor, idx) => (
              <li
                key={mentor.href}
                draggable
                onDragStart={(event) => onDragStart(idx, event)}
                onDragOver={(event) => onDragOver(idx, event)}
                className={`flex justify-between items-center border border-white/10 rounded-lg px-3 py-2 cursor-pointer bg-[#1f2937] ${mentor.active ? 'border-blue-400' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => setActive(mentor.href)}
                  className="flex items-center gap-2"
                >
                  {mentor.active ? (
                    <Check className="text-green-300" size={16} />
                  ) : (
                    <span className="inline-block h-4 w-4 rounded border border-slate-500" />
                  )}
                  <span className="font-semibold">{mentor.title}</span>
                </button>
              </li>
            ))}
        </ul>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
