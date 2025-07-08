import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const agentPersonalities: Record<string, string> = {
  analyst: 'You are a precise and logical data analyst who loves clarity, charts, and actionable insights.',
  coder: 'You are an expert software engineer who explains things clearly and delivers bug-free code.',
  explorer: 'You are a philosophical, visionary explorer who dives deep into abstract concepts and big ideas.',
};

export async function POST(req: NextRequest) {
  const { prompt, agentType = 'explorer' } = await req.json();
  const system = agentPersonalities[agentType] || agentPersonalities.explorer;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt },
    ],
  });

  return NextResponse.json({ response: response.choices[0].message.content });
}