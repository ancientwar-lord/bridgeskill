'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ChatHistoryItem } from '@/lib/types';

export function useChatHistory(mentorTag: string) {
  const [chats, setChats] = useState<ChatHistoryItem[]>([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [chatsError, setChatsError] = useState<string | null>(null);

  const loadChats = useCallback(async () => {
    if (!mentorTag) {
      setChats([]);
      setChatsError(null);
      return;
    }

    setChatsLoading(true);
    setChatsError(null);

    try {
      const response = await fetch(
        `/api/chat?mentorTag=${encodeURIComponent(mentorTag)}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to load chats: ${response.status} ${text}`);
      }

      const payload = (await response.json()) as {
        success: boolean;
        chats?: ChatHistoryItem[];
      };

      if (!payload.success || !Array.isArray(payload.chats)) {
        throw new Error('Invalid response format');
      }

      setChats(payload.chats);
      setChatsError(null);
    } catch (err) {
      setChats([]);
      setChatsError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setChatsLoading(false);
    }
  }, [mentorTag]);

  useEffect(() => {
    loadChats();
  }, [mentorTag, loadChats]);

  const saveChat = useCallback(
    async (payload: {
      mentorTag: string;
      messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        createdAt: string;
      }>;
      chatId?: string | null;
    }) => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Save chat failed: ${response.status} ${text}`);
        }

        const result = await response.json();
        if (result.success && result.chatId) {
          await loadChats();
          return { success: true, chatId: result.chatId };
        }

        return { success: false, chatId: null };
      } catch (err) {
        console.error('Could not save chat', err);
        return { success: false, chatId: null };
      }
    },
    [loadChats],
  );

  const loadChatById = useCallback(
    async (chatId: string) => {
      try {
        const response = await fetch(
          `/api/chat?id=${chatId}&mentorTag=${encodeURIComponent(mentorTag)}`,
          {
            method: 'GET',
          },
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to load chat: ${response.status} ${text}`);
        }

        const payload = await response.json();
        if (!payload.success || !payload.chat) {
          throw new Error('Chat not found');
        }

        return {
          success: true,
          sessionName: payload.chat.sessionName,
          messages:
            (payload.chat.messages as Array<{
              role: 'user' | 'assistant' | 'system';
              content: string;
            }>) || [],
        };
      } catch (err) {
        console.error('Could not load chat by id', err);
        return { success: false, sessionName: '', messages: [] };
      }
    },
    [mentorTag],
  );

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat?id=${chatId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Delete failed: ${response.status} ${text}`);
      }

      setChats((prev) => prev.filter((chat) => chat._id !== chatId));
      return true;
    } catch (err) {
      console.error('Could not delete chat', err);
      return false;
    }
  }, []);

  return {
    chats,
    chatsLoading,
    chatsError,
    loadChats,
    saveChat,
    loadChatById,
    deleteChat,
  };
}
