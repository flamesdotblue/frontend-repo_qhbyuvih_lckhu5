import React from 'react';
import { Upload } from 'lucide-react';

export default function Navbar({ onOpenUpload }) {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
          <span className="text-slate-100 font-semibold tracking-tight">AIVid Share</span>
        </div>
        <button
          onClick={onOpenUpload}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-cyan-500 text-white hover:bg-cyan-400 active:bg-cyan-600 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
      </div>
    </header>
  );
}
