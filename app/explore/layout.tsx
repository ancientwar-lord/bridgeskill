import { StaticNav } from '@/ui/components/StaticNav';

const exploreNavLinks = [
  { href: '/explore', title: 'Explore' },
  { href: '/explore/findings', title: 'Findings' },
];

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-[#10141a] text-[#dfe2eb]">
      <StaticNav links={exploreNavLinks} />
      {children}
    </div>
  );
}
