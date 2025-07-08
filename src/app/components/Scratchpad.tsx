'use client';
import { useState } from 'react';

export default function Scratchpad() {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (!input.trim()) return;
    setNotes([...notes, input]);
    setInput('');
  };

  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json';
    a.click();
  };

  const importNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string);
        if (Array.isArray(imported)) setNotes(imported);
      } catch (err) {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);
  };

  const clearAll = () => setNotes([]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Scratchpad 🧳</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addNote()}
        placeholder="Type note..."
        className="w-full p-2 rounded border border-gray-300 mb-2 text-black"
      />
      <div className="flex gap-2 mb-2">
        <button onClick={addNote} className="bg-black text-white px-4 py-1 rounded">+ Add</button>
        <button onClick={exportNotes} className="bg-blue-500 text-white px-4 py-1 rounded">Export</button>
        <label className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer">
          <input type="file" accept="application/json" onChange={importNotes} className="hidden" />
          Import
        </label>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full p-2 rounded border border-gray-300 mb-2 text-black"
      />
      <button onClick={clearAll} className="bg-red-500 text-white px-4 py-1 rounded w-full">Clear All</button>
    </div>
  );
}