'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold mb-6">🚀 ChaosOps Cockpit</h1>
      <p className="mb-8 text-gray-600">Select your destination:</p>

      <div className="space-y-4">
        <Link href="/console">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            🧠 Open Console
          </button>
        </Link>

        <Link href="/agent">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            🤖 Open Agent
          </button>
        </Link>
      </div>
    </div>
  );
}