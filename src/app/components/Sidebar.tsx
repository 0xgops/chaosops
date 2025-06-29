'use client';

import { useEffect, useState } from 'react';

interface Note {
  text: string;
  timestamp: string;
}

export default function Sidebar() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chaosops-notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('chaosops-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!input.trim()) return;
    const newNote: Note = {
      text: input,
      timestamp: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
    setInput('');
  };

  const deleteNote = (index: number) => {
    if (confirm('Delete this note?')) {
      const newNotes = [...notes];
      newNotes.splice(index, 1);
      setNotes(newNotes);
    }
  };

  const clearAll = () => {
    if (confirm('⚠️ Delete ALL notes?')) {
      setNotes([]);
    }
  };

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const truncate = (text: string) => {
    const lines = text.split('\n');
    const firstLine = lines[0];
    return firstLine.length > 100 ? firstLine.slice(0, 100) + '...' : firstLine;
  };

  const exportNotes = () => {
    const content = notes
      .map((n) => `[${n.timestamp}]\n${n.text}\n`)
      .join('\n---\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chaosops_notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          const validNotes = imported.filter(
            (n) => n.text && n.timestamp
          );
          setNotes([...validNotes, ...notes]);
        } else {
          alert('Invalid file format.');
        }
      } catch {
        alert('Failed to parse file.');
      }
    };
    reader.readAsText(file);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="bg-gray-100 w-64 p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-2">Scratchpad 🗂️</h2>

      <input
        className="border p-2 mb-2 rounded"
        placeholder="Type note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addNote();
          if (e.key === 'Escape') setInput('');
        }}
      />

      <div className="flex gap-2 mb-2">
        <button
          className="bg-black text-white px-3 py-1 rounded"
          onClick={addNote}
        >
          + Add
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={exportNotes}
        >
          ⬇️ Export
        </button>
        <label className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">
          ⬆️ Import
          <input type="file" accept=".json" className="hidden" onChange={importNotes} />
        </label>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-1 rounded w-full"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-red-500 text-white px-2 rounded"
          onClick={clearAll}
        >
          🗑️ Clear All
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-2">
        {filteredNotes.map((note, i) => (
          <div
            key={i}
            className="bg-white p-2 rounded shadow flex flex-col gap-1"
          >
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                [{note.timestamp}]
              </span>
              <button
                className="text-red-500 ml-2"
                onClick={() => deleteNote(i)}
              >
                ✕
              </button>
            </div>
            <div className="text-sm">
              {expanded === i ? note.text : truncate(note.text)}
            </div>
            {note.text.length > 100 || note.text.includes('\n') ? (
              <button
                className="text-blue-500 text-xs self-start"
                onClick={() => toggleExpand(i)}
              >
                {expanded === i ? '▲ Collapse' : '▼ Expand'}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}