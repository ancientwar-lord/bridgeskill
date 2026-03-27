import { StaticNav } from '@/ui/components/StaticNav';

const opportunitiesNavLinks = [
  { href: '/opportunities', title: 'Opportunities' },
  { href: '/opportunities/actions', title: 'Actions' },
];

export default function OpportunitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-[#10141a] text-[#dfe2eb]">
          <StaticNav links={opportunitiesNavLinks} />
          {children}
        </div>
  );
}
