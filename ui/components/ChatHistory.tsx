'use client';

import { Trash } from 'lucide-react';

import type { ChatHistoryProps } from '@/lib/types';

export default function ChatHistory({
  chats,
  chatsLoading,
  chatsError,
  activeChatId,
  onSelectChat,
  setActiveChatId,
  deleteChat,
}: ChatHistoryProps) {
  if (chatsLoading) {
    return <p className="text-sm p-4 text-slate-300">Loading chats...</p>;
  }

  if (chatsError) {
    return <p className="text-sm p-4 text-red-300">Error: {chatsError}</p>;
  }

  if (chats.length === 0) {
    return (
      <p className="text-sm p-4 text-slate-300">No conversations found yet.</p>
    );
  }

  return (
    <ul className="space-y-2 p-2 text-slate-200">
      {chats.map((chat) => {
        const isActive = chat._id === activeChatId;
        return (
          <li
            key={chat._id}
            className={`group relative rounded-lg border border-white/10 p-3 text-xs cursor-pointer ${isActive ? 'bg-[#315a80] border-[#4f8bbb]' : 'bg-[#1b2431] hover:bg-[#263147]'}`}
          >
            <button
              onClick={() => {
                setActiveChatId(chat._id);
                onSelectChat(chat._id, chat.sessionName);
              }}
              className="w-full text-left"
            >
              <div className="cursor-pointer font-medium text-slate-100 truncate">
                {chat.sessionName}
              </div>
            </button>

            <Trash
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat._id);
              }}
              className="absolute right-2 top-2 hidden rounded  text-[10px] text-white  hover:bg-red-700 group-hover:block p-1"
              aria-label="Delete chat"
            ></Trash>
          </li>
        );
      })}
    </ul>
  );
}
