'use client';

import { useState, useRef, useEffect } from 'react';

async function sendPrompt(prompt: string) {
  const res = await fetch('/api/agent', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.response;
}

export default function AgentPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = await sendPrompt(input);
    const assistantMessage = { role: 'assistant', content: response || '❌ No response' };

    setMessages((prev) => [...prev, assistantMessage]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">🤖 Agent</h1>

      <div className="flex-1 overflow-auto space-y-2 bg-white rounded p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.role === 'user' ? 'bg-blue-100' : 'bg-green-100'
            } rounded px-4 py-2 max-w-xl`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-4 flex bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your prompt..."
          className="flex-1 border rounded p-2 mr-2"
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}