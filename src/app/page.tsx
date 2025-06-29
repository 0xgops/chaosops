import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">🧠 ChaosOps Cockpit</h1>
      <p className="text-lg mb-8">
        Operator Control Center — Choose Your Module:
      </p>
      <div className="space-y-4">
        <Link
          href="/console"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          🚀 Enter Console
        </Link>
        <Link
          href="/agent"
          className="bg-black text-white px-6 py-3 rounded opacity-50 pointer-events-none"
        >
          🧠 Agent (Coming Soon)
        </Link>
      </div>
    </div>
  );
}