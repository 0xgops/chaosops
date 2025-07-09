import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o', // or 'gpt-3.5-turbo'
        messages: [
          { role: 'system', content: 'You are a helpful assistant who jokes a little.' },
          { role: 'user', content: input },
        ],
        temperature: 0.7,
      }),
    });

    if (!chatResponse.ok) {
      const errorData = await chatResponse.json();
      return NextResponse.json({ error: errorData.error.message }, { status: 500 });
    }

    const data = await chatResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'No reply';

    return NextResponse.json({ message: reply });
  } catch (err: any) {
    console.error('Agent route error:', err);
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 });
  }
}