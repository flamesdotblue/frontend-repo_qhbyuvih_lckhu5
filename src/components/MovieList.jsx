import React from 'react'

function MovieList({ movies, onPlay, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-slate-500">No movies yet. Click "Upload Movie" to add one.</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((m) => (
        <li key={m.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3">
            <button
              onClick={() => onPlay(m)}
              className="text-left flex-1"
              title="Play movie"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 truncate">
                {m.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">Click to play</p>
            </button>
            <button
              onClick={() => onDelete(m.id)}
              className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
              title="Delete movie"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
