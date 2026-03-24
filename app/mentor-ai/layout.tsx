import { MentorNav } from '@/ui/components/MentorNav';
export default function MentorAiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-[#10141a] text-[#dfe2eb]">
      <MentorNav />

      <main className="pt-20">{children}</main>
    </div>
  );
}
