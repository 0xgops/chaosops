import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    const output = response.choices[0]?.message?.content;

    return NextResponse.json({ response: output });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}