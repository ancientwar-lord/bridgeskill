'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAgentChat } from '@/ui/hooks/use-agent-chat';
import { useChatHistory } from '@/ui/hooks/use-chat-history';

export function useChatUI(
  apiRoute: string,
  mentorTag: string = 'personal',
  sessionName: string = 'Mentor Chat',
) {
  const {
    chats,
    chatsLoading,
    chatsError,
    loadChatById: historyLoadChatById,
    saveChat,
    deleteChat,
  } = useChatHistory(mentorTag);

  const chatProps = useAgentChat(
    apiRoute,
    mentorTag,
    sessionName,
    async (payload) => {
      const result = await saveChat(payload);
      if (!result.success) {
        console.error('failed to save chat', result);
      }
      return result;
    },
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [chatProps.goal]);

  const handleSelectChat = useCallback(
    async (chatId: string, selectedSessionName?: string) => {
      const result = await historyLoadChatById(chatId);
      if (!result.success) return;

      const historyMessages = result.messages
        .filter(
          (
            m,
          ): m is typeof m & { role: 'user' | 'assistant'; content: string } =>
            m.role === 'user' || m.role === 'assistant',
        )
        .map((m) => ({ role: m.role, content: m.content }));

      chatProps.loadMessages(historyMessages);
      chatProps.setCurrentChatId(chatId);
      chatProps.setActiveChatId(chatId);

      if (selectedSessionName) {
        // optional: keep session title updated if needed.
      }
    },
    [chatProps, historyLoadChatById],
  );

  const hasMessages = useMemo(
    () => chatProps.messages.length > 0,
    [chatProps.messages],
  );

  const goNewChat = useCallback(() => {
    chatProps.resetChat();
    chatProps.setGoal('');
    chatProps.setCurrentChatId(null);
    chatProps.setActiveChatId(null);
    chatProps.setShowPreviousChats(false);
  }, [chatProps]);

  return {
    chatProps,
    chats,
    chatsLoading,
    chatsError,
    handleSelectChat,
    hasMessages,
    goNewChat,
    deleteChat,
    textareaRef,
    settingsOpen,
    setSettingsOpen,
  };
}
