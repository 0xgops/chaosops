'use client';

import { useState, useEffect } from 'react';

export default function Scratchpad() {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const addNote = () => {
    if (!input.trim()) return;
    setNotes((prev) => [...prev, input.trim()]);
    setInput('');
  };

  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (Array.isArray(parsed)) {
          setNotes(parsed);
        }
      } catch {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);
  };

  const clearAll = () => setNotes([]);
  const filteredNotes = notes.filter((note) => note.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Scratchpad 📒</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type note..."
        className="w-full p-2 border rounded"
      />

      <div className="flex gap-2">
        <button
          onClick={addNote}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
        >
          + Add
        </button>
        <button
          onClick={exportNotes}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          ⬇️ Export
        </button>
        <label className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer">
          ⬆️ Import
          <input type="file" accept=".json" onChange={importNotes} className="hidden" />
        </label>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes..."
        className="w-full p-2 border rounded"
      />

      <button
        onClick={clearAll}
        className="bg-red-600 text-white w-full py-1 rounded hover:bg-red-700"
      >
        🗑️ Clear All
      </button>

      <ul className="space-y-1 pt-2 max-h-64 overflow-y-auto text-sm">
        {filteredNotes.map((note, i) => (
          <li key={i} className="bg-gray-200 dark:bg-zinc-700 p-2 rounded">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}