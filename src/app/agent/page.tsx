'use client';

import { useState, useRef, useEffect } from 'react';

export default function Agent() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const botMessage = { role: 'bot', content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError('❌ Error: Failed to get response. Check API key or server.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-2 bg-white">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`px-4 py-2 max-w-xl rounded ${
              m.role === 'user' ? 'bg-blue-100 self-end' : 'bg-green-100 self-start'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="bg-yellow-100 px-4 py-2 max-w-xl rounded self-start">
            Thinking...
          </div>
        )}
        {error && (
          <div className="bg-red-100 px-4 py-2 max-w-xl rounded self-start">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-4 flex bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded p-2 mr-2"
          placeholder="Type your prompt..."
        />
        <button
          onClick={sendMessage}
          className={`px-4 py-2 rounded ${
            loading ? 'bg-gray-500' : 'bg-black'
          } text-white`}
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}