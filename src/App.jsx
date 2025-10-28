import React, { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import UploadModal from './components/UploadModal'
import MovieList from './components/MovieList'
import VideoPlayer from './components/VideoPlayer'
import Hero from './components/Hero'

function App() {
  const [movies, setMovies] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [current, setCurrent] = useState(null)

  function handleUpload({ name, file }) {
    const url = URL.createObjectURL(file)
    const newMovie = { id: crypto.randomUUID(), name, url }
    setMovies((prev) => [newMovie, ...prev])
    setShowUpload(false)
    setCurrent(newMovie)
  }

  function handleDelete(id) {
    setMovies((prev) => prev.filter((m) => m.id !== id))
    if (current?.id === id) setCurrent(null)
  }

  const content = useMemo(() => {
    if (current) {
      return (
        <VideoPlayer
          movie={current}
          onBack={() => setCurrent(null)}
        />
      )
    }
    return (
      <MovieList
        movies={movies}
        onPlay={(m) => setCurrent(m)}
        onDelete={handleDelete}
      />
    )
  }, [current, movies])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 text-slate-100">
      <Navbar onUploadClick={() => setShowUpload(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Hero />
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">All Movies</h2>
            <p className="text-sm text-slate-400">Uploaded items appear here for quick access and playback.</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Upload Movie
          </button>
        </div>
        {content}
      </main>

      <UploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onSubmit={handleUpload}
      />

      <footer className="mt-12 border-t border-slate-800 bg-black/40">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-slate-400">
          Tip: To make uploads visible worldwide and persistent, connect this UI to a backend with storage. This demo keeps files locally in your browser session.
        </div>
      </footer>
    </div>
  )
}

export default App
