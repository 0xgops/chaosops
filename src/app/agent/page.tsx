'use client';

import { useState } from 'react';

export default function AgentPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentType, setAgentType] = useState('explorer');

  const agents = {
    explorer: '🛰️ Explorer',
    analyst: '🧠 Analyst',
    coder: '💻 Coder',
  };

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        body: JSON.stringify({ prompt, agentType }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch {
      setResponse('⚠️ Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Agent Console</h1>

      <div className="flex gap-2">
        {Object.entries(agents).map(([key, label]) => (
          <button
            key={key}
            className={`px-3 py-1 rounded border ${
              agentType === key
                ? 'bg-black text-white'
                : 'bg-white dark:bg-zinc-700 text-black dark:text-white'
            }`}
            onClick={() => setAgentType(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <textarea
        className="w-full p-2 border rounded h-32 dark:bg-zinc-900"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
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
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Thinking...' : 'Submit'}
      </button>

      {response && (
        <pre className="whitespace-pre-wrap mt-4 p-3 bg-gray-100 dark:bg-zinc-800 rounded">
          {response}
        </pre>
      )}
    </div>
  );
}