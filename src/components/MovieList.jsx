import React from 'react';
import { Play, Trash } from 'lucide-react';

export default function MovieList({ movies, onPlay, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-400">
        No movies yet. Click Upload to add your first video.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((m) => (
          <div key={m.id} className="group rounded-xl overflow-hidden border border-slate-800 bg-slate-900/80 hover:bg-slate-900 transition">
            <div className="aspect-video bg-slate-800/60 flex items-center justify-center">
              <button
                onClick={() => onPlay(m)}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-slate-900/80 border border-slate-700 text-slate-100 hover:bg-slate-800"
              >
                <Play className="h-4 w-4" />
                Play
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-100 font-medium line-clamp-1">{m.name}</p>
                <p className="text-slate-400 text-xs">{(m.size / (1024 * 1024)).toFixed(1)} MB</p>
              </div>
              <button
                onClick={() => onDelete(m.id)}
                className="text-slate-400 hover:text-red-400 p-2 rounded-md hover:bg-slate-800"
                aria-label="Delete"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
