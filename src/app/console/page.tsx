import Console from '../components/Console';

export default function ConsolePage() {
  return (
    <main className="flex-1 p-4 bg-white overflow-auto flex flex-col h-screen">
      <Console />
    </main>
  );
}