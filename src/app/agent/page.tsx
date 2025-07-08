'use client';

import { useState } from 'react';

export default function AgentPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('Default');

  const sendPrompt = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        body: JSON.stringify({ prompt: input, role }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setResponse(data.response || '⚠️ No response.');
    } catch {
      setResponse('❌ Error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">🧠 Multi-Agent Prompt</h1>

      <select
        className="border px-3 py-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Default">Default</option>
        <option value="Analyst">Analyst</option>
        <option value="Explorer">Explorer</option>
        <option value="Coder">Coder</option>
      </select>

      <textarea
        className="w-full border rounded p-2"
        rows={5}
        placeholder="Ask the agent something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendPrompt();
          }
        }}
      />

      <button
        onClick={sendPrompt}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>

      {response && (
        <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}