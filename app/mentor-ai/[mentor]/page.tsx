import Link from 'next/link';

const mentors = [
  {
    title: 'Founder Mentor',
    slug: 'founder',
    description: 'Insights and strategies for startup founders.',
  },
  {
    title: 'Research Mentor',
    slug: 'research',
    description: 'Advanced research support and guidance.',
  },
];

interface MentorPageProps {
  params: Promise<{ mentor: string }>;
}

export default async function DynamicMentorPage({ params }: MentorPageProps) {
  const { mentor: mentorparam } = await params;
  const mentor = mentors.find((m) => m.slug === mentorparam);

  if (!mentor) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">Mentor not found</h1>
        <p className="mt-2 text-slate-300">
          No mentor route matches &ldquo;{mentorparam}&rdquo;.
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

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{mentor.title}</h1>
      <p className="mt-4 text-slate-300">{mentor.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">All mentors</h2>
        <ul className="space-y-2">
          {mentors.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/mentor-ai/${m.slug}`}
                className="text-[#adc7ff] hover:text-white"
              >
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
