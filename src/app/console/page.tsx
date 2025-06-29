'use client';

import Console from './Console';

export default function ConsolePage() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">🧠 Console</h1>
      <Console />
    </div>
  );
}