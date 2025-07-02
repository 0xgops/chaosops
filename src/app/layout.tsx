import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Sidebar from './components/Sidebar';

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-screen">

            {/* 🔳 Top Bar */}
            <header className="bg-black text-white p-4 flex justify-between items-center">
              <h1 className="text-xl">ChaosOps 🧠</h1>
              <div className="space-x-4 text-sm">
                <span className="hidden sm:inline">🟢 Connected</span>
                <span>Operator: 0xGOPS</span>
                <span>Project: ChaosOps</span>
              </div>
            </header>

            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-4 bg-white dark:bg-zinc-900 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}