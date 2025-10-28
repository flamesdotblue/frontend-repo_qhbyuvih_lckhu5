import React from 'react'

function Navbar({ onUploadClick }) {
  return (
    <header className="w-full sticky top-0 z-10 backdrop-blur bg-black/40 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 text-white grid place-items-center font-bold">🎬</div>
          <div>
            <h1 className="text-xl font-semibold text-slate-100">Movie Share</h1>
            <p className="text-xs text-slate-400 leading-none">Watch and share from anywhere</p>
          </div>
        </div>
        <button
          onClick={onUploadClick}
          className="inline-flex items-center gap-2 rounded-md bg-sky-500 text-white px-4 py-2 text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          Upload Movie
        </button>
      </div>
    </header>
  )
}

export default Navbar
