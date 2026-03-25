'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SelectMentor from '@/ui/components/SelectMentor';
import { useMentorSettings } from '@/ui/hooks/use-mentor-settings';

export function MentorNav() {
  const pathname = usePathname();

  const [exploreOpen, setExploreOpen] = useState(false);
  const {
    mentors,
    visibleMentors,
    selected,
    setActive,
    onDragStart,
    onDragOver,
    saveSettings,
    save,
    saving,
  } = useMentorSettings();

  return (
    <>
      <header className="sticky top-0 left-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-700 shadow-lg">
        <div className="mx-4 flex items-end justify-between pt-3">
          <div className="pl-16 flex gap-2 sm:gap-4">
            {visibleMentors.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`transition-all duration-300 font-bold text-xl px-4 py-2  ${
                    isActive
                      ? 'text-[#cad9f8] rounded-t-2xl relative border-t border-l border-r border-slate-700 bg-[#10141a] translate-y-px z-10'
                      : 'text-slate-500 hover:text-[#cad9f8] hover:bg-white/5 mb-2 rounded-xl'
                  }`}
                >
                  {isActive ? item.title : item.title.split(' ')[0]}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pb-1 pr-10">
            <button
              onClick={() => setExploreOpen(true)}
              className=" cursor p-2 font-semibold  text-slate-300 hover:text-white hover:bg-white/10  rounded-xl px-4"
            >
              Select Mentors
            </button>
          </div>
        </div>
      </header>
      <SelectMentor
        config={{
          slug: 'personal',
          title: 'Personal Mentor',
          subtitle: '',
          placeholder: '',
          suggestions: [],
          agentName: '',
          agentInitials: '',
          apiRoute: '',
        }}
        open={exploreOpen}
        mentors={mentors}
        selected={selected}
        setActive={setActive}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        saveSettings={saveSettings}
        save={save}
        saving={saving}
        onClose={() => setExploreOpen(false)}
      />
    </>
  );
}
