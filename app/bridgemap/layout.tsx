import { StaticNav } from '@/ui/components/StaticNav';

const bridgeMapNavLinks = [
  { href: '/bridgemap', title: 'Plans' },
  { href: '/bridgemap/strategies', title: 'Strategies' },
  { href: '/bridgemap/roadmaps', title: 'Roadmaps' },
];

export default function BridgeMapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-[#10141a] text-[#dfe2eb]">
      <StaticNav links={bridgeMapNavLinks} />
      {children}
    </div>
  );
}
