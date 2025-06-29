'use client';

import { useEffect, useState } from 'react';

export default function Console() {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('chaosops-console-logs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chaosops-console-logs', JSON.stringify(logs));
  }, [logs]);

  const appendLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    setLogs((prev) => [...prev, logEntry]);
  };

  const handleCommand = () => {
    if (!input.trim()) return;
    appendLog(`> ${input}`);

    parseCommand(input.trim().toLowerCase());

    setInput('');
  };

  const parseCommand = (cmd: string) => {
    if (cmd === 'help') {
      appendLog('Available commands: help, ping, status, clear, about');
    } else if (cmd === 'ping') {
      appendLog('Pinging... ✅ Success. Latency: 23ms');
    } else if (cmd === 'status') {
      appendLog('🟢 System Status: Operational. No errors detected.');
    } else if (cmd === 'about') {
      appendLog('ChaosOps Console v0.1 — Built by 0xGOPS 🧠');
    } else if (cmd === 'clear') {
      setLogs([]);
    } else {
      appendLog(`Unknown command: "${cmd}". Type "help" for assistance.`);
    }
  };

  const clearLogs = () => setLogs([]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCommand();
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold mb-2">🧠 Console</h2>

      <div className="flex gap-2 mb-2">
        <button
          className="bg-gray-300 px-2 rounded text-xs"
          onClick={() => alert('Logs saved (export coming soon)')}
        >
          🗄️ Save
        </button>
        <button
          className="bg-gray-300 px-2 rounded text-xs"
          onClick={clearLogs}
        >
          🗑️ Clear
        </button>
      </div>

      <div className="bg-black text-green-400 font-mono flex-1 rounded p-2 overflow-auto">
        {logs.length === 0 ? (
          <p className="opacity-50">Awaiting input...</p>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>

      <input
        className="border mt-2 p-2 rounded"
        placeholder="Type command..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-black text-white mt-1 p-2 rounded"
        onClick={handleCommand}
      >
        Run
      </button>
    </div>
  );
}