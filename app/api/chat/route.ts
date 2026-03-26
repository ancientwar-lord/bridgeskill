import { auth } from '@/lib/auth/auth';
import dbConnect from '@/lib/dbConnect';
import Chat from '@/lib/models/Chat';

type IncomingChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: string;
};

type IncomingChatPayload = {
  mentorTag?: 'personal' | 'founder' | 'research';
  chatId?: string;
  messages: IncomingChatMessage[];
};

function deriveSessionName(messages: IncomingChatMessage[]): string {
  const firstUserMessage = messages.find(
    (message) => message.role === 'user' && message.content.trim().length > 0,
  );

  if (!firstUserMessage) {
    return 'New Chat';
  }

  const normalized = firstUserMessage.content.trim().replace(/\s+/g, ' ');
  return normalized.slice(0, 120);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const body = (await request.json()) as IncomingChatPayload;
    console.log('body', body);
    const { mentorTag = 'personal', chatId, messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'messages is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    await dbConnect();

    if (chatId) {
      const existingChat = await Chat.findOne({
        _id: chatId,
        userId: session.user.id,
      });

      if (!existingChat) {
        return new Response(
          JSON.stringify({ success: false, error: 'Existing chat not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      existingChat.messages.push(
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
          createdAt: message.createdAt
            ? new Date(message.createdAt)
            : new Date(),
        })),
      );

      await existingChat.save();
      return new Response(
        JSON.stringify({ success: true, chatId: existingChat._id }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const savedChat = await Chat.create({
      userId: session.user.id,
      mentorTag,
      sessionName: deriveSessionName(messages),
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
        createdAt: message.createdAt ? new Date(message.createdAt) : new Date(),
      })),
    });

    return new Response(
      JSON.stringify({ success: true, chatId: savedChat._id }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Failed to save Chat', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export async function GET(request: Request): Promise<Response> {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    await dbConnect();

    const url = new URL(request.url);
    const chatId = url.searchParams.get('id');
    const mentorTag = url.searchParams.get('mentorTag');

    if (chatId) {
      const chatQuery: { _id: string; userId: string; mentorTag?: string } = {
        _id: chatId,
        userId: session.user.id,
      };

      if (
        mentorTag === 'personal' ||
        mentorTag === 'founder' ||
        mentorTag === 'research'
      ) {
        chatQuery.mentorTag = mentorTag;
      }

      const chat = await Chat.findOne(chatQuery).lean();
      if (!chat) {
        return new Response(
          JSON.stringify({ success: false, error: 'Chat not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      return new Response(JSON.stringify({ success: true, chat }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const query: { userId: string; mentorTag?: string } = {
      userId: session.user.id,
    };
    if (
      mentorTag === 'personal' ||
      mentorTag === 'founder' ||
      mentorTag === 'research'
    ) {
      query.mentorTag = mentorTag;
    }

    const chats = await Chat.find(query)
      .sort({ updatedAt: -1 })
      .select('sessionName mentorTag updatedAt')
      .lean();

    return new Response(JSON.stringify({ success: true, chats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch chat history', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export async function DELETE(request: Request): Promise<Response> {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const url = new URL(request.url);
    const chatId = url.searchParams.get('id');
    if (!chatId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Chat ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    await dbConnect();

    const deleted = await Chat.findOneAndDelete({
      _id: chatId,
      userId: session.user.id,
    });

    if (!deleted) {
      return new Response(
        JSON.stringify({ success: false, error: 'Chat not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to delete chat', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
