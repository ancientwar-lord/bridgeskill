export async function POST(request: Request): Promise<Response> {
  try {
    // Receive data (optional url and required goal) from frontend
    const body = await request.json();
    const { url, goal } = body as { url?: string; goal?: string };

    // Validation checks
    if (!goal) {
      return new Response(
        JSON.stringify({ success: false, error: 'Goal is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Call the TinyFish API
    const tinyfishResponse = await fetch(
      'https://agent.tinyfish.ai/v1/automation/run-sse',
      {
        method: 'POST',
        headers: {
          'X-API-Key': process.env.TINYFISH_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          goal: goal,
        }),
      },
    );

    if (!tinyfishResponse.ok) {
      throw new Error(`TinyFish API error: ${tinyfishResponse.statusText}`);
    }

    //Forward the stream to frontend (return it)
    // Since TinyFish uses SSE (Server-Sent Events), we can return the stream directly
    return new Response(tinyfishResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
