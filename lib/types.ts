import type { auth } from '@/lib/auth/auth';

// Infer the session type from the auth configuration.
export type Session = typeof auth.$Infer.Session;

// Data Transfer Object for user information sent from server to client.
export type UserDTO = {
  id: string;
  name: string | null;
  email: string;
};

// Client-side user type, which can be null when not authenticated.
export type ClientUser = {
  id: string;
  name: string;
  email: string;
} | null;

// Standard shape for server action responses.
export type ActionResponse<T = Record<string, unknown>> = {
  success?: boolean;
  message?: string;
  errors?: {
    [K in keyof T]?: string[];
  };
};

// Chat history item type (shared by components and hooks)
export type ChatHistoryItem = {
  _id: string;
  sessionName: string;
  mentorTag: 'personal' | 'founder' | 'research';
  updatedAt: string;
};

// Configuration interface for agents, used to dynamically render UI and determine API routes.
export interface AgentConfig {
  slug?: string;
  title: string;
  subtitle: string;
  placeholder: string;
  suggestions: string[];
  agentName: string;
  agentInitials: string;
  apiRoute: string;
}

export interface ChatHistoryProps {
  chats: ChatHistoryItem[];
  chatsLoading: boolean;
  chatsError: string | null;
  activeChatId: string | null;
  onSelectChat: (chatId: string, sessionName: string) => void;
  setActiveChatId: (chatId: string) => void;
  deleteChat: (chatId: string) => Promise<boolean>;
}

export interface ChatFormProps {
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
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  placeholder?: string;
}
