// app/api/agent/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { input } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: input },
        ],
      }),
    });

    const data = await openaiRes.json();
    const message = data.choices?.[0]?.message?.content || 'No response';
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to contact OpenAI' }, { status: 500 });
  }
}