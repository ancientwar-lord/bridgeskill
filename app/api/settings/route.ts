import { auth } from '@/lib/auth/auth';
import dbConnect from '@/lib/dbConnect';
import MentorSetting from '@/lib/models/Setting';

const defaults = [
  { title: 'Personal Mentor', href: '/mentor-ai', order: 0, active: true },
  {
    title: 'Founder Mentor',
    href: '/mentor-ai/founder',
    order: 1,
    active: false,
  },
  {
    title: 'Research Mentor',
    href: '/mentor-ai/research',
    order: 2,
    active: false,
  },
];

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } },
      );
    }

    await dbConnect();
    const userId = session.user.id;
    let data = await MentorSetting.findOne({ userId });
    if (!data) {
      data = await MentorSetting.create({ userId, mentorConfig: defaults });
    }

    return new Response(
      JSON.stringify({ success: true, mentorConfig: data.mentorConfig }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('GET /mentor-settings error', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch mentor settings',
      }),
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    const mentorConfig = body.mentorConfig;

    if (!Array.isArray(mentorConfig)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'mentorConfig must be an array',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    await dbConnect();
    const userId = session.user.id;
    let data = await MentorSetting.findOne({ userId });
    if (!data) {
      data = await MentorSetting.create({ userId, mentorConfig });
    } else {
      data.mentorConfig = mentorConfig;
      await data.save();
    }

    return new Response(
      JSON.stringify({ success: true, mentorConfig: data.mentorConfig }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('POST /mentor-settings error', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to save mentor settings',
      }),
      { status: 500 },
    );
  }
}
