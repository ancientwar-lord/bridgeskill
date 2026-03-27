'use client';

import { FormEvent, useCallback, useState, useRef, useEffect } from 'react';

export type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

export type MentorChatState = {
  goal: string;
  setGoal: (value: string) => void;
  url: string;
  setUrl: (value: string) => void;
  urls: string[];
  addUrl: () => void;
  removeUrl: (value: string) => void;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  rawResponse: string;
  runId: string | null;
  streamingUrl: string | null;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  cancelRun: () => Promise<void>;
  loadMessages: (
    historyMessages: Array<{ role: 'user' | 'assistant'; content: string }>,
  ) => void;
  currentChatId: string | null;
  setCurrentChatId: (chatId: string | null) => void;
  resetChat: () => void;
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
  showUrlField: boolean;
  setShowUrlField: React.Dispatch<React.SetStateAction<boolean>>;
  showPreviousChats: boolean;
  setShowPreviousChats: React.Dispatch<React.SetStateAction<boolean>>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export function useAgentChat(
  apiRoute: string,
  mentorTag = 'personal',
  onSaveChat?: (payload: {
    mentorTag: string;
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      createdAt: string;
    }>;
    chatId?: string | null;
  }) => Promise<{ success: boolean; chatId: string | null }>,
): MentorChatState {
  const [goal, setGoal] = useState('');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string>('');
  const [runId, setRunId] = useState<string | null>(null);
  const [streamingUrl, setStreamingUrl] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showUrlField, setShowUrlField] = useState(false);
  const [showPreviousChats, setShowPreviousChats] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messageIdCounterRef = useRef<number>(0);
  const nextMessageId = () => {
    const now = Date.now();
    messageIdCounterRef.current = (messageIdCounterRef.current + 1) % 1000;
    return now * 1000 + messageIdCounterRef.current;
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, messagesEndRef]);

  const addUrl = useCallback(() => {
    const normalized = url.trim();
    if (!normalized) return;
    if (urls.includes(normalized)) {
      setError('URL already added.');
      return;
    }
    setUrls((prev) => [...prev, normalized]);
    setUrl('');
    setError(null);
  }, [url, urls]);

  const removeUrl = useCallback((value: string) => {
    setUrls((prev) => prev.filter((u) => u !== value));
  }, []);

  const loadMessages = useCallback(
    (
      historyMessages: Array<{ role: 'user' | 'assistant'; content: string }>,
    ) => {
      const mapped: ChatMessage[] = historyMessages.map((message) => ({
        id: nextMessageId(),
        role: message.role,
        text: message.content,
      }));
      setMessages(mapped);
    },
    [],
  );

  const resetChat = useCallback(() => {
    setGoal('');
    setUrl('');
    setUrls([]);
    setMessages([]);
    setLoading(false);
    setError(null);
    setRawResponse('');
    setRunId(null);
    setStreamingUrl(null);
    setCurrentChatId(null);
    setActiveChatId(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const cancelRun = useCallback(async () => {
    if (!runId) return;
    try {
      await fetch('/api/cancel-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ run_id: runId }),
      });

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setLoading(false);
      setError('Automation was cancelled.');
    } catch (err) {
      console.error('Failed to cancel run:', err);
    }
  }, [runId]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Submitting with goal:', goal, 'and url:', url);
      const trimmedGoal = goal.trim();
      if (!trimmedGoal) {
        setError('Please provide a goal or question.');
        return;
      }

      setError(null);
      setLoading(true);
      setRawResponse('');
      setRunId(null);
      setStreamingUrl(null);

      abortControllerRef.current = new AbortController();

      const userMessage: ChatMessage = {
        id: nextMessageId(),
        role: 'user',
        text: trimmedGoal,
      };

      const assistantMessage: ChatMessage = {
        id: nextMessageId(),
        role: 'assistant',
        text: 'Starting automation...',
      };

      let completedChatText = '';
      let isCompleted = false;

      setMessages((prev) => [...prev, userMessage, assistantMessage]);

      const trimmedUrl = url.trim();
      const requestUrls = trimmedUrl ? [...urls, trimmedUrl] : urls;
      const targetUrl = requestUrls.length > 0 ? requestUrls[0] : undefined;

      try {
        const response = await fetch(apiRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goal: trimmedGoal, url: targetUrl }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`API error: ${response.status} ${text}`);
        }

        if (!response.body) throw new Error('No readable stream available');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accumulatedText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          setRawResponse((prev) => prev + chunk);
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim().startsWith('data: ')) {
              try {
                const eventPayload = JSON.parse(line.trim().slice(6));

                switch (eventPayload.type) {
                  case 'STARTED':
                    setRunId(eventPayload.run_id);
                    accumulatedText += `🟢 Run Started (ID: ${eventPayload.run_id})\n`;
                    break;
                  case 'STREAMING_URL':
                    setStreamingUrl(eventPayload.streaming_url);
                    accumulatedText += `📺 Live stream available\n`;
                    break;
                  case 'PROGRESS':
                    accumulatedText += `👉 Action: ${eventPayload.purpose}\n`;
                    break;
                  case 'COMPLETE':
                    if (eventPayload.status === 'COMPLETED') {
                      isCompleted = true;
                      completedChatText = `${accumulatedText}\n✅ Completed!\nResult: ${JSON.stringify(eventPayload.result, null, 2)}`;
                      accumulatedText = completedChatText;
                    } else {
                      accumulatedText += `\n❌ Failed: ${eventPayload.error?.message || 'Automation failed'}`;
                    }
                    setLoading(false);
                    break;
                  case 'HEARTBEAT':
                    break;
                }

                setMessages((prev) =>
                  prev.map((message) =>
                    message.id === assistantMessage.id
                      ? { ...message, text: accumulatedText }
                      : message,
                  ),
                );
              } catch {
                console.warn('Could not parse SSE JSON line:', line);
              }
            }
          }
        }

        if (isCompleted && onSaveChat) {
          const saveResult = await onSaveChat({
            mentorTag,
            messages: [
              {
                role: 'user',
                content: trimmedGoal,
                createdAt: new Date().toISOString(),
              },
              {
                role: 'assistant',
                content: completedChatText || 'Completed response.',
                createdAt: new Date().toISOString(),
              },
            ],
            chatId: currentChatId,
          });

          if (saveResult.success && saveResult.chatId) {
            setCurrentChatId(saveResult.chatId);
            setActiveChatId(saveResult.chatId);
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;

        const message = err instanceof Error ? err.message : 'Unexpected error';
        setError(message);
        setLoading(false);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, text: `Error: ${message}` }
              : m,
          ),
        );
      } finally {
        setGoal('');
        setUrl('');
      }
    },
    [apiRoute, goal, url, urls, currentChatId, mentorTag, onSaveChat],
  );

  return {
    goal,
    setGoal,
    url,
    setUrl,
    urls,
    addUrl,
    removeUrl,
    messages,
    loading,
    error,
    rawResponse,
    runId,
    streamingUrl,
    handleSubmit,
    cancelRun,
    loadMessages,
    resetChat,
    currentChatId,
    setCurrentChatId,
    activeChatId,
    setActiveChatId,
    showUrlField,
    setShowUrlField,
    showPreviousChats,
    setShowPreviousChats,
    messagesEndRef,
  };
}
