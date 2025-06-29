'use client';

import Console from './Console';
import Sidebar from '../components/Sidebar';

export default function ConsolePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-white overflow-auto">
        <h1 className="text-2xl mb-4">🧠 Console</h1>
        <Console />
      </main>
    </div>
  );
}