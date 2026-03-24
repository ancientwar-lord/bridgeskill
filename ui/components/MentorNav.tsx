'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MentorNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800 shadow-lg">
      <div className="mx-4 flex items-center justify-between py-3">
        <div className="pl-4 flex gap-4">
          {[
            { title: 'Personal Mentor', href: '/mentor-ai', order: 0 },
            { title: 'Founder Mentor', href: '/mentor-ai/founder', order: 1 },
            { title: 'Research Mentor', href: '/mentor-ai/research', order: 3 },
          ]
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`text-xl font-bold ${
                    isActive
                      ? 'text-[#f6efef] underline underline-offset-4 decoration-[#86fff8] decoration-2'
                      : 'text-transparent bg-clip-text bg-linear-to-r from-[#adc7ff] to-[#86fff8] hover:text-white'
                  }`}
                >
                  {isActive ? item.title : item.title.split(' ')[0]}
                </Link>
              );
            })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/mentor-ai/explore"
            className="rounded-lg border-2  border-amber-50/30 p-2 font-semibold text-transparent bg-clip-text bg-linear-to-r from-[#adc7ff]/40 to-[#86fff8]/30 hover:text-white"
          >
            Explore All Mentors
          </Link>
        </div>
      </div>
    </header>
  );
}
