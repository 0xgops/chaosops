'use client';

import { useState, useRef, useEffect } from 'react';

export default function Agent() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');

    const userMessage = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      const assistantMessage = { role: 'assistant', content: data.response };
      setMessages((prev) => [...prev, assistantMessage]);
      setPrompt('');
    } catch (err) {
      console.error('Agent API error:', err);
      setError('❌ Error: Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-2 bg-white">
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
        {loading && (
          <div className="bg-yellow-100 rounded px-4 py-2 max-w-xl">
            🧠 Thinking…
          </div>
        )}
        {error && (
          <div className="bg-red-100 rounded px-4 py-2 max-w-xl text-red-800">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-4 flex bg-white">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded p-2 mr-2"
          placeholder={loading ? 'Agent is thinking...' : 'Type your prompt...'}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}