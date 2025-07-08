import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rolePrompts: Record<string, string> = {
  Analyst: 'You are an expert data analyst. Provide concise, clear insights using structured logic.',
  Explorer: 'You are a curious explorer of ideas and concepts. Offer creative, open-ended interpretations.',
  Coder: 'You are a skilled software engineer. Provide clean, efficient code with brief explanations.',
  Default: 'You are a helpful AI assistant. Respond clearly and helpfully.',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, role = 'Default' } = body;

    const systemPrompt = rolePrompts[role] || rolePrompts.Default;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || '⚠️ No response generated.';
    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}