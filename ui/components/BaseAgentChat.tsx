'use client';

import { useState, useEffect, useRef } from 'react';
import { useAgentChat } from '@/ui/hooks/use-agent-chat';
import ChatForm from '@/ui/components/ChatForm';
import { ChevronLeft, X, Settings } from 'lucide-react';
import { AgentConfig } from '@/lib/types';

interface BaseAgentChatProps {
  config: AgentConfig;
}

export default function BaseAgentChat({ config }: BaseAgentChatProps) {
  const [showUrlField, setShowUrlField] = useState(false);
  const [showPreviousChats, setShowPreviousChats] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatProps = useAgentChat(config.apiRoute);
  const { goal, setGoal, messages, loading, streamingUrl, error } = chatProps;

  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  return (
    <div className="flex flex-col bg-[#10141a] text-[#dfe2eb] relative z-0 selection:bg-[#adc7ff]/30">
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
      <main className="flex-1 flex flex-col w-full h-full px-4 sm:px-6 relative z-10 overflow-hidden">
        {!hasMessages ? (
          <div className="flex-1 flex flex-col items-center justify-center mt-30 w-full max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            {/* DYNAMIC TEXTS */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-[#adc7ff] mb-4">
                {config.title}
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {config.subtitle}
              </p>
            </div>

            <div className="w-full relative z-20">
              <ChatForm
                {...chatProps}
                showUrlField={showUrlField}
                setShowUrlField={setShowUrlField}
                hasMessages={hasMessages}
                placeholder={config.placeholder}
              />
            </div>

            {/* Dynamic Suggestions */}
            <div className="mt-8 flex gap-3 flex-wrap justify-center">
              {config.suggestions.map((suggestion) => (
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
          <div
            className={`flex-1 ${loading && streamingUrl ? '' : 'min-h-120'} w-full max-w-4xl mx-auto overflow-y-auto pt-4 scroll-smooth hide-scrollbar`}
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
                      {!isAssistant && (
                        <div className="self-end rounded-3xl rounded-tr-sm bg-linear-to-br from-[#2f394d] to-[#1f2633] border border-white/5 px-5 py-4 text-[15px] shadow-lg text-white break-words">
                          {message.text}
                        </div>
                      )}

                      {isAssistant && (
                        <div className="self-start w-full px-2">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#adc7ff] to-[#86fff8] flex items-center justify-center shrink-0 shadow-lg shadow-[#adc7ff]/20">
                              <span className="text-[#032146] text-xs font-bold">
                                {config.agentInitials} {/* Dynamic Initials */}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-slate-300 tracking-wide">
                              {config.agentName} {/* Dynamic Agent Name */}
                            </span>
                          </div>
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

      {hasMessages && (
        <div className="sticky bottom-0 left-0 w-full z-20 bg-linear-to-t from-[#10141a] via-[#10141a] to-transparent pt-12 pb-6 px-4 pointer-events-none">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500 pointer-events-auto">
            {error && (
              <p className="mb-4 rounded-xl bg-red-950/80 border border-red-500/30 px-4 py-2 text-sm text-red-200 text-center w-max backdrop-blur-md">
                {error}
              </p>
            )}
            <div className="w-full z-20">
              <ChatForm
                {...chatProps}
                showUrlField={showUrlField}
                setShowUrlField={setShowUrlField}
                hasMessages={hasMessages}
                placeholder={config.placeholder}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
