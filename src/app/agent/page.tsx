'use client';

import { useState } from 'react';

export default function Agent() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    // Simulated response — replace with real logic in v2
    setResponse(`🤖 Agent Response: You asked "${input}"`);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Agent Interface</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me something..."
        style={{ padding: 8, width: '60%' }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: 12, padding: 8 }}>
        Ask Agent
      </button>
      {response && <p style={{ marginTop: 16 }}>{response}</p>}
    </main>
  );
}