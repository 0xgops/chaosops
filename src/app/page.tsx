// src/app/page.tsx
'use client';

import Scratchpad from './components/Scratchpad';

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Scratchpad />
    </div>
  );
}