'use client';

import { useState, useEffect, useRef } from 'react';
import { useMentorChat } from '@/ui/hooks/use-mentor-chat';
import { ChevronLeft, X, Settings } from 'lucide-react';

interface ChatFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  showUrlField: boolean;
  setShowUrlField: (show: boolean) => void;
  urls: string[];
  removeUrl: (url: string) => void;
  url: string;
  setUrl: (url: string) => void;
  addUrl: () => void;
  loading: boolean;
  goal: string;
  setGoal: (goal: string) => void;
  hasMessages: boolean;
  runId: string | null;
  streamingUrl: string | null;
  cancelRun: () => void;
}

const ChatForm = ({
  handleSubmit,
  showUrlField,
  setShowUrlField,
  urls,
  removeUrl,
  url,
  setUrl,
  addUrl,
  loading,
  goal,
  setGoal,
  hasMessages,
  runId,
  streamingUrl,
  cancelRun,
}: ChatFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [goal]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-4xl border border-white/10 bg-[#1c2026]/80 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 focus-within:border-[#adc7ff]/50 focus-within:ring-1 focus-within:ring-[#adc7ff]/30 w-full ${
        !hasMessages ? 'max-w-3xl mx-auto' : 'max-w-4xl mx-auto'
      }`}
    >
      {/* CONDITIONAL TOP AREA:
        If loading is true and a stream URL is available -> show interactive live browser area
        Otherwise -> show normal URL input fields
      */}
      {loading && streamingUrl ? (
        <div className="mb-3 rounded-2xl border border-white/10 bg-[#171f2a] overflow-hidden shadow-inner animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-[#0f1726] px-4 py-2.5 border-b border-[#2b3340] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-[#86fff8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#86fff8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#86fff8]"></span>
              </span>
              Live Browser Session( ID: {runId})
            </div>
            <div className="pointer-events-auto">
              {loading && runId && (
                <button
                  onClick={cancelRun}
                  className="rounded-full border border-[#ff7d7d]/40 bg-[#2f1e1e]/80 px-4 py-2 text-xs font-semibold text-[#ffb4ab] hover:bg-[#4a2626] backdrop-blur-md transition shadow-lg"
                >
                  ⏹ Stop Generating
                </button>
              )}
            </div>
          </div>
          {/* Constrained height so it doesn't cover the whole screen in sticky mode */}
          <div className="w-full bg-[#0a0f16] relative h-48 sm:h-64 lg:h-72">
            <iframe
              src={streamingUrl}
              className="absolute inset-0 w-full h-full border-0"
              title="Live Browser"
            />
          </div>
        </div>
      ) : showUrlField || urls.length > 0 ? (
        <div className="mb-3 flex flex-col gap-2 border-b border-white/5 pb-3 px-2">
          {urls.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {urls.map((existing) => (
                <span
                  key={existing}
                  className="flex items-center gap-1 rounded-full bg-[#0f1726] px-3 py-1.5 text-xs text-[#c4c8da] border border-white/5"
                >
                  <span className="max-w-50 truncate">{existing}</span>
                  <button
                    type="button"
                    onClick={() => removeUrl(existing)}
                    className="rounded-full pl-1 text-[#ff7d7d] hover:text-white transition"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
          {showUrlField && (
            <div className="flex items-center gap-2 mt-1">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 bg-black/20 rounded-xl px-4 py-2 text-sm text-[#e7ecf4] outline-none border border-transparent focus:border-[#adc7ff]/30"
              />
              <button
                type="button"
                onClick={addUrl}
                className="rounded-xl bg-[#2b3340] px-4 py-2 text-sm text-white hover:bg-[#3b4455] transition"
              >
                Add
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* Main Input Bar */}
      <div className="flex items-end gap-2 px-1">
        <button
          type="button"
          onClick={() => setShowUrlField(!showUrlField)}
          disabled={loading}
          title="Add Target URL"
          className="p-3.5 rounded-full bg-white/5 text-[#adc7ff] hover:bg-white/10 hover:text-white transition disabled:opacity-50 shrink-0"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Ask TinyFish to extract data or automate a workflow..."
          required
          disabled={loading}
          rows={1}
          className="flex-1 min-h-12.5 max-h-37.5 overflow-y-auto w-full resize-none bg-transparent px-3 py-3.5 text-[15px] text-[#e7ecf4] outline-none placeholder:text-slate-500 disabled:opacity-50 leading-relaxed custom-scrollbar"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (goal.trim() && !loading) {
                const form = e.currentTarget.form;
                if (form) form.requestSubmit();
              }
            }
          }}
        />

        <button
          type="submit"
          disabled={loading || !goal.trim()}
          className="p-3.5 rounded-full bg-[#adc7ff] text-[#032146] hover:bg-[#86fff8] transition disabled:opacity-50 disabled:bg-[#2b3340] disabled:text-slate-500 shrink-0"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin" />
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default function MentorComp() {
  const [showUrlField, setShowUrlField] = useState(false);
  const [showPreviousChats, setShowPreviousChats] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
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
    runId,
    streamingUrl,
    handleSubmit,
    cancelRun,
  } = useMentorChat();

  useEffect(() => {
    if (!loading) return;
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const hasMessages = messages.length > 0;

  const chatFormProps: ChatFormProps = {
    handleSubmit,
    showUrlField,
    setShowUrlField,
    urls,
    removeUrl,
    url,
    setUrl,
    addUrl,
    loading,
    goal,
    setGoal,
    hasMessages,
    runId,
    streamingUrl,
    cancelRun,
  };

  return (
    <div className="flex flex-col  bg-[#10141a] text-[#dfe2eb] relative z-0 selection:bg-[#adc7ff]/30">
      {/* Top-left settings button */}
      <div className=" relative z-50 pointer-events-auto">
        <button
          onClick={() => {
            /* add settings action here */
          }}
          className=" fixed top-20  flex items-center gap-2 rounded-full border border-white/10 bg-[#1f2937]/95 p-3 text-sm text-slate-200 shadow-lg shadow-black/30 backdrop-blur transition hover:bg-[#2f3a4e] ml-4"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Top-right sticky button for previous chats */}

      <div className="fixed right-0 top-20 z-50 pointer-events-auto ">
        <button
          onClick={() => setShowPreviousChats((prev) => !prev)}
          className="flex items-center gap-2 rounded-l-full border border-white/10 bg-[#1f2937]/95 px-3 py-2 text-sm text-slate-200 shadow-lg shadow-black/30 backdrop-blur transition hover:bg-[#2f3a4e]"
        >
          {showPreviousChats ? <X size={20} /> : <ChevronLeft size={20} />}
          <p className="m-0 text-sm text-slate-300 w-36">
            {' '}
            {showPreviousChats ? 'Hide' : 'Show'} Chats
          </p>
        </button>
        {showPreviousChats && (
          <div className="py-4  text-slate-300 overflow-y-auto h-[80vh] bg-[#1f2937]/95 backdrop-blur-xl border-l border-white/10 rounded-b-lg ml-4 w-44">
            <p className="text-sm p-4">conversations.</p>
          </div>
        )}
      </div>

      {/* --- TOPBAR IS NOW HANDLED IN app/mentor-ai/layout.tsx --- */}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col w-full h-full px-4 sm:px-6 relative z-10 overflow-hidden">
        {!hasMessages ? (
          /* --- INITIAL CENTERED STATE --- */
          <div className="flex-1 flex flex-col items-center justify-center mt-30 w-full max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
              What do you want to Learn?
            </h2>
            <div className="w-full relative z-20">
              <ChatForm {...chatFormProps} />
            </div>
            {error && (
              <p className="mt-6 rounded-xl bg-red-950/50 border border-red-500/20 px-4 py-2 text-sm text-red-200 backdrop-blur-md">
                {error}
              </p>
            )}
            <div className="mt-8 flex gap-3 flex-wrap justify-center">
              {[
                'Find the latest news articles on AI.',
                'Find the latest research papers on AI agents.',
                'Top 10 startsups in AI space.',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setGoal(suggestion)}
                  className="text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* --- CHAT STATE --- */
          <div
            className={`flex-1 ${loading && streamingUrl ? '' : 'min-h-120'}   w-full max-w-4xl mx-auto overflow-y-auto pt-4 scroll-smooth hide-scrollbar`}
          >
            <div className="flex flex-col gap-8 w-full">
              {messages.map((message) => {
                const isAssistant = message.role === 'assistant';

                return (
                  <div
                    key={message.id}
                    className={`flex w-full ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`flex flex-col gap-3 w-full ${isAssistant ? 'max-w-full' : 'max-w-[80%]'}`}
                    >
                      {/* User Bubble */}
                      {!isAssistant && (
                        <div className="self-end rounded-3xl rounded-tr-sm bg-linear-to-br from-[#2f394d] to-[#1f2633] border border-white/5 px-5 py-4 text-[15px] shadow-lg text-white wrap-break-word">
                          {message.text}
                        </div>
                      )}

                      {/* Assistant Bubble */}
                      {isAssistant && (
                        <div className="self-start w-full px-2">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#adc7ff] to-[#86fff8] flex items-center justify-center shrink-0 shadow-lg shadow-[#adc7ff]/20">
                              <span className="text-[#032146] text-xs font-bold">
                                TF
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-slate-300 tracking-wide">
                              TinyFish Agent
                            </span>
                          </div>

                          {/* Assistant Text Response */}
                          <div className="font-mono text-[14px] leading-relaxed text-[#c4c8da] whitespace-pre-wrap pl-11">
                            {message.text}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </main>

      {/* --- STICKY BOTTOM INPUT --- */}
      {hasMessages && (
        <div className=" sticky bottom-0 left-0 w-full z-20 bg-linear-to-t from-[#10141a] via-[#10141a] to-transparent pt-12 pb-6 px-4 pointer-events-none">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500 pointer-events-auto">
            {error && (
              <p className="mb-4 rounded-xl bg-red-950/80 border border-red-500/30 px-4 py-2 text-sm text-red-200 text-center w-max backdrop-blur-md">
                {error}
              </p>
            )}

            <div className="w-full   z-20">
              <ChatForm {...chatFormProps} />
            </div>
          </div>
        </div>
      )}

      {/* --- AMBIENT BACKGROUND EFFECTS --- */}
      <div className="fixed bottom-0 left-0 h-[40vh] w-full bg-linear-to-t from-[#adc7ff]/5 to-transparent pointer-events-none -z-10" />
      <div className="fixed top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#adc7ff]/10 blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#86fff8]/5 blur-[150px] pointer-events-none -z-10" />
    </div>
  );
}
