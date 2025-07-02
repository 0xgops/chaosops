'use client';

import { useState, useRef, useEffect } from 'react';

export default function Console() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* 💬 Message Window */}
      <div className="flex-1 overflow-auto p-4 space-y-2 
          bg-white/70 dark:bg-zinc-900/50 
          backdrop-blur-md border border-white/20 dark:border-zinc-700 
          rounded-xl shadow-xl transition-all">
        
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="bg-blue-100 dark:bg-blue-900/40 
              rounded px-4 py-2 max-w-xl 
              border border-white/10 dark:border-zinc-700 
              shadow-sm"
          >
            {msg}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 🔤 Input Bar */}
      <div className="border-t border-white/20 dark:border-zinc-700 p-4 flex 
          bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 dark:border-zinc-700 
              rounded p-2 mr-2 
              bg-white/70 dark:bg-zinc-900/60 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your command..."
        />
        <button
          onClick={sendMessage}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded 
            shadow transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}