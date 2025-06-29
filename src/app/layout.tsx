import './globals.css';
import Sidebar from './components/Sidebar';
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
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex flex-col h-screen">

          {/* 🔳 Top Navigation */}
          <header className="bg-black text-white p-4 flex justify-between items-center">
            <h1 className="text-xl">ChaosOps 🧠🦾</h1>
            <div className="space-x-4 text-sm">
              <span>🟢 Connected</span>
              <span>Operator: 0xGOPS</span>
              <span>Project: ChaosOps</span>
            </div>
          </header>

          {/* 🔥 Main App Layout */}
          <div className="flex flex-1">
            {/* Sidebar for Notes */}
            <Sidebar />

            {/* Dynamic Content */}
            <main className="flex-1 p-4 bg-white overflow-auto">
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}