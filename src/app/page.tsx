export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">ChaosOps 🧠</h1>
      <p className="mb-4 text-lg">Welcome to the ChaosOps Control Center</p>
      <div className="space-x-4">
        <a href="/console" className="px-4 py-2 bg-black text-white rounded">
          🧠 Console
        </a>
        <a href="/agent" className="px-4 py-2 bg-black text-white rounded">
          🤖 Agent
        </a>
      </div>
    </div>
  );
}