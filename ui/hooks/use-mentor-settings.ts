import { useCallback, useEffect, useState } from 'react';
import type { DragEvent } from 'react';

export interface MentorItem {
  title: string;
  href: string;
  order: number;
  active: boolean;
}

const DEFAULT_MENTORS: MentorItem[] = [
  { title: 'Personal Mentor', href: '/mentor-ai', order: 0, active: true },
];

export function useMentorSettings() {
  const [mentors, setMentors] = useState<MentorItem[]>(DEFAULT_MENTORS);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = mentors.find((item) => item.active) ?? mentors[0];

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to load mentor settings');
      const data = await res.json();
      if (data?.success && Array.isArray(data.mentorConfig)) {
        const merged = [
          DEFAULT_MENTORS[0],
          ...data.mentorConfig.filter(
            (item: MentorItem) => item.href !== '/mentor-ai',
          ),
        ];
        setMentors(merged.sort((a, b) => a.order - b.order));
      } else {
        setMentors(DEFAULT_MENTORS);
      }
    } catch (err) {
      console.error('useMentorSettings load error', err);
      setError('Could not load mentor settings');
      setMentors(DEFAULT_MENTORS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setActive = useCallback((href: string) => {
    setMentors((prev) =>
      prev.map((mentor) => ({
        ...mentor,
        active: mentor.href === href ? !mentor.active : mentor.active,
      })),
    );
  }, []);

  const onDragStart = useCallback(
    (index: number, event: DragEvent<HTMLLIElement>) => {
      event.dataTransfer.effectAllowed = 'move';
      setDragIndex(index);
    },
    [],
  );

  const onDragOver = useCallback(
    (index: number, event: DragEvent<HTMLLIElement>) => {
      event.preventDefault();
      if (dragIndex === null || dragIndex === index) return;

      const updated = [...mentors];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(index, 0, moved);
      const reordered = updated.map((item, idx) => ({ ...item, order: idx }));
      setMentors(reordered);
      setDragIndex(index);
    },
    [dragIndex, mentors],
  );

  const updateOrder = useCallback((updated: MentorItem[]) => {
    setMentors(updated.sort((a, b) => a.order - b.order));
  }, []);

  const saveSettings = useCallback(
    async (nextMentors: MentorItem[]) => {
      setSaving(true);
      setError(null);
      const previous = mentors;
      setMentors(nextMentors);

      try {
        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mentorConfig: nextMentors }),
        });

        if (!res.ok) {
          throw new Error('Failed to save mentor settings');
        }

        const data = await res.json();
        if (!data?.success || !Array.isArray(data.mentorConfig)) {
          throw new Error('Server responded with invalid mentor config');
        }

        setMentors(
          data.mentorConfig.sort(
            (a: MentorItem, b: MentorItem) => a.order - b.order,
          ),
        );
      } catch (err) {
        console.error('useMentorSettings save error', err);
        setError('Could not save mentor settings');
        setMentors(previous);
      } finally {
        setSaving(false);
      }
    },
    [mentors],
  );

  const save = useCallback(
    async (onClose: () => void) => {
      try {
        await saveSettings(mentors);
        onClose();
      } catch (err) {
        console.error('Save mentor settings failed', err);
      }
    },
    [mentors, saveSettings],
  );

  const visibleMentors = mentors
    .filter((mentor) => mentor.active !== false)
    .sort((a, b) => a.order - b.order);

  return {
    mentors,
    visibleMentors,
    selected,
    loading,
    saving,
    error,
    setActive,
    onDragStart,
    onDragOver,
    updateOrder,
    saveSettings,
    save,
    reload: load,
  };
}
