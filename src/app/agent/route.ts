import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
        temperature: 0.7,
      }),
    });

    const data = await completion.json();

    return NextResponse.json({ message: data.choices?.[0]?.message?.content ?? 'No response' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error communicating with OpenAI' }, { status: 500 });
  }
}