'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  href: string;
  title: string;
};

export function StaticNav({ links }: { links?: NavLink[] }) {
  const pathname = usePathname();
  const navLinks = links || [];

  return (
    <header className="sticky top-0 left-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-700 shadow-lg">
      <div className="mx-4 flex items-end justify-between pt-3">
        <div className="pl-16 flex gap-2 sm:gap-4">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`transition-all duration-300 font-bold text-xl px-4 py-2 ${
                  isActive
                    ? 'text-[#cad9f8] rounded-t-2xl relative border-t border-l border-r border-slate-700 bg-[#10141a] translate-y-px z-10'
                    : 'text-slate-500 hover:text-[#cad9f8] hover:bg-white/5 mb-2 rounded-xl'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
