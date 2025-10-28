import React, { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import UploadModal from './components/UploadModal'
import MovieList from './components/MovieList'
import VideoPlayer from './components/VideoPlayer'

function App() {
  const [movies, setMovies] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [current, setCurrent] = useState(null)

  function handleUpload({ name, file }) {
    const url = URL.createObjectURL(file)
    const newMovie = { id: crypto.randomUUID(), name, url }
    setMovies((prev) => [newMovie, ...prev])
    setShowUpload(false)
    // Immediately open the player for the newly uploaded video
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar onUploadClick={() => setShowUpload(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">All Movies</h2>
          <p className="text-sm text-slate-600">Uploaded items appear here for quick access and playback.</p>
        </div>
        {content}
      </main>

      <UploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onSubmit={handleUpload}
      />

      <footer className="mt-12 border-t border-slate-200 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-slate-500">
          Tip: To make uploads visible worldwide and persistent, connect this UI to a backend with storage. This demo keeps files locally in your browser session.
        </div>
      </footer>
    </div>
  )
}

export default App
