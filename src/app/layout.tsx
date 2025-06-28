import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChaosOps',
  description: 'Operator Control Center',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          {/* 🔳 Pin Bar */}
          <header className="bg-black text-white p-4">
            <h1 className="text-xl">ChaosOps 🧠🦾</h1>
          </header>

          <div className="flex flex-1">
            {/* 🗂️ Sidebar */}
            <aside className="bg-gray-100 w-64 p-4">
              <h2 className="text-lg font-bold mb-2">Scratchpad</h2>
              <p className="text-sm">Notes, Pins, Memory...</p>
            </aside>

            {/* 💬 Main Chat Window */}
            <main className="flex-1 p-4 bg-white overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}