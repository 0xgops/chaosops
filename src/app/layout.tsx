// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChaosOps',
  description: 'Operator Control Center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br 
        from-gray-100 to-white dark:from-zinc-900 dark:to-black
        text-black dark:text-white transition-colors`}
      >
        <div className="flex flex-col h-screen">
          {/* 🔳 Top Bar */}
          <header
            className="bg-black/80 dark:bg-zinc-950/80 
            backdrop-blur-md border-b border-white/10 dark:border-zinc-800 
            text-white p-4 flex justify-between items-center 
            shadow-md"
          >
            <h1 className="text-xl font-bold">
              ChaosOps 🧠🦾
            </h1>
            <div className="space-x-4 text-sm">
              <span className="text-green-400">🟢 Connected</span>
              <span>Operator: 0xGOPS</span>
              <span>Project: ChaosOps</span>
            </div>
          </header>

          {/* 🔥 Main */}
          <main className="flex-1 p-4 
            bg-white/70 dark:bg-zinc-900/50 
            backdrop-blur-md rounded-xl shadow-xl 
            border border-white/10 dark:border-zinc-800 
            overflow-auto flex flex-col gap-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}