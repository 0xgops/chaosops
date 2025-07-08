'use client';

import { useState } from 'react';

export default function AgentPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResponse(data.message || data.error || 'No response');
    } catch (err) {
      console.error(err);
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Agent Interface</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        className="w-full p-2 border rounded text-black"
      />

      <button
        onClick={handleAsk}
        className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-zinc-800 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Asking...' : 'Ask Agent'}
      </button>

      <div className="mt-4">
        <p className="text-green-400">🤖 Agent Response:</p>
        <pre className="mt-1 whitespace-pre-wrap">{response}</pre>
      </div>
    </div>
  );
}