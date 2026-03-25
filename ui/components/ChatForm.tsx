'use client';

import type { ChatFormProps } from '@/lib/types';

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
  textareaRef,
  placeholder = 'Ask TinyFish to extract data or automate a workflow...',
}: ChatFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-4xl border border-white/10 bg-[#1c2026]/80 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 focus-within:border-[#adc7ff]/50 focus-within:ring-1 focus-within:ring-[#adc7ff]/30 w-full ${
        !hasMessages ? 'max-w-3xl mx-auto' : 'max-w-4xl mx-auto'
      }`}
    >
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
          <div className="w-full bg-[#0a0f16] relative h-48 sm:h-64 lg:h-72">
            <iframe
              src={streamingUrl ?? undefined}
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
          placeholder={placeholder}
          required
          disabled={loading}
          rows={2}
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

export default ChatForm;
