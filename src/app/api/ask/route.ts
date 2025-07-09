import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const reply = `🤖 Agent Response: You asked "${prompt}"`;
  return NextResponse.json({ reply });
}