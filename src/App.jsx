import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadModal from './components/UploadModal';
import MovieList from './components/MovieList';
import VideoPlayer from './components/VideoPlayer';

export default function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(null);

  const addMovie = ({ name, url, size, type }) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const movie = { id, name, url, size, type };
    setMovies((prev) => [movie, ...prev]);
    setShowUpload(false);
  };

  const deleteMovie = (id) => {
    setMovies((prev) => {
      const m = prev.find((x) => x.id === id);
      if (m) {
        try { URL.revokeObjectURL(m.url); } catch {}
      }
      const next = prev.filter((x) => x.id !== id);
      if (current && current.id === id) setCurrent(null);
      return next;
    });
  };

  const onPlay = (movie) => setCurrent(movie);

  const content = useMemo(() => {
    if (current) return <VideoPlayer movie={current} onBack={() => setCurrent(null)} />;
    return (
      <>
        <Hero />
        <MovieList movies={movies} onPlay={onPlay} onDelete={deleteMovie} />
      </>
    );
  }, [current, movies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 text-slate-100">
      <Navbar onOpenUpload={() => setShowUpload(true)} />
      {content}
      <UploadModal open={showUpload} onClose={() => setShowUpload(false)} onUpload={addMovie} />
    </div>
  );
}
