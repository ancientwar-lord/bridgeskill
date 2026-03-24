import Link from 'next/link';
import BaseAgentChat from '@/ui/components/BaseAgentChat';
import { agentConfigs } from '@/lib/agentConfigs';

const mentors = agentConfigs;

type MentorRouteParams = { mentor?: string | string[] | undefined };

interface MentorPageProps {
  params: MentorRouteParams | Promise<MentorRouteParams>;
}

export function generateStaticParams() {
  return mentors.map((mentor) => ({ mentor: mentor.slug }));
}

export default async function DynamicMentorPage({ params }: MentorPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const rawMentor = resolvedParams?.mentor;
  const mentorSlug = Array.isArray(rawMentor)
    ? rawMentor.filter(Boolean).join('/').toLowerCase()
    : (rawMentor ?? '').toLowerCase();
  const mentorParam = mentorSlug.trim();
  const mentorConfig = mentors.find(
    (item) => item.slug.toLowerCase() === mentorParam,
  );

  if (!mentorConfig) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">Mentor not found</h1>
        <p className="mt-2 text-slate-300">
          No mentor route matches &ldquo;{mentorParam}&rdquo;.
        </p>
        <p className="mt-2 text-slate-400">
          Available mentors: {mentors.map((m) => m.slug).join(', ')}
        </p>
        <Link
          href="/mentor-ai"
          className="mt-4 inline-block rounded-lg bg-[#1f2937] px-4 py-2 text-sm text-[#c4c8da] hover:bg-[#2f3a4e]"
        >
          Back to Mentor Home
        </Link>
      </main>
    );
  }

  return <BaseAgentChat config={mentorConfig} />;
}
