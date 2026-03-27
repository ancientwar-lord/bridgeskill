import mongoose, { Document } from 'mongoose';

export type MentorTag = 'personal' | 'founder' | 'research';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

export interface Chat extends Document {
  userId: mongoose.Types.ObjectId;
  mentorTag: MentorTag;
  sessionName: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const allowedMentorTags: MentorTag[] = ['personal', 'founder', 'research'];

const ChatMessageSchema = new mongoose.Schema<ChatMessage>(
  {
    role: {
      type: String,
      required: true,
      enum: ['user', 'assistant', 'system'],
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  { _id: false },
);

const ChatSchema = new mongoose.Schema<Chat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    mentorTag: {
      type: String,
      required: [true, 'Please select a mentor tag'],
      enum: {
        values: allowedMentorTags,
        message: 'mentorTag must be one of: personal, founder, research',
      },
      default: 'personal',
    },
    sessionName: {
      type: String,
      trim: true,
      required: false,
      default: 'New Chat',
      maxlength: [120, 'Session name cannot exceed 120 characters'],
    },
    messages: {
      type: [ChatMessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Chat || mongoose.model<Chat>('Chat', ChatSchema);
