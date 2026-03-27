import { agentConfigs } from '@/lib/agentConfigs';
import BaseAgentChat from '@/ui/components/BaseAgentChat';

export default function MentorHomePage() {
  const personalMentor = agentConfigs.find(
    (mentor) => mentor.slug === 'personal',
  );

  return (
    <main className="p-8">
      <BaseAgentChat key={personalMentor?.slug} config={personalMentor!} />
    </main>
  );
}
