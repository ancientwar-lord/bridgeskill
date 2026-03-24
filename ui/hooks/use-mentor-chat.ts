'use client';

import { FormEvent, useCallback, useState, useRef } from 'react';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

type MentorChatState = {
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
};

export function useMentorChat(): MentorChatState {
  const [goal, setGoal] = useState('');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string>('');
  const [runId, setRunId] = useState<string | null>(null);
  const [streamingUrl, setStreamingUrl] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messageIdCounterRef = useRef<number>(0);
  const nextMessageId = () => {
    const now = Date.now();
    messageIdCounterRef.current = (messageIdCounterRef.current + 1) % 1000;
    return now * 1000 + messageIdCounterRef.current;
  };

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

      // Setup abort controller in case user cancels
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

      setMessages((prev) => [...prev, userMessage, assistantMessage]);

      const trimmedUrl = url.trim();
      const requestUrls = trimmedUrl ? [...urls, trimmedUrl] : urls;
      const targetUrl = requestUrls.length > 0 ? requestUrls[0] : undefined;

      try {
        const response = await fetch('/api/tinyfish', {
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
                      accumulatedText += `\n✅ Completed!\nResult: ${JSON.stringify(eventPayload.result, null, 2)}`;
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
              } catch (parseError) {
                console.warn('Could not parse SSE JSON line:', line);
              }
            }
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
    [goal, url, urls],
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
  };
}
