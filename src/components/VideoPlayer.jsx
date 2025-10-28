import React, { useEffect, useRef, useState } from 'react'

function formatTime(t) {
  if (!isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function VideoPlayer({ movie, onBack }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    function onPlay() { setPlaying(true) }
    function onPause() { setPlaying(false) }
    function onTime() { setTime(v.currentTime) }
    function onLoaded() { setDuration(v.duration || 0) }
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onLoaded)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  function seekBy(seconds) {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.min(Math.max(0, v.currentTime + seconds), v.duration || v.currentTime + seconds)
  }

  function handleScrub(e) {
    const v = videoRef.current
    if (!v) return
    const newTime = Number(e.target.value)
    v.currentTime = newTime
    setTime(newTime)
  }

  async function toggleFullscreen() {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await el.requestFullscreen()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50">Back</button>
        <h2 className="text-lg font-semibold text-slate-900 truncate">{movie.name}</h2>
      </div>

      <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          src={movie.url}
          className="h-full w-full"
          controls
          playsInline
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="pointer-events-auto rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur hover:bg-white/20"
            aria-label="Play/Pause"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => seekBy(-10)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">-10s</button>
        <button onClick={togglePlay} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => seekBy(10)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">+10s</button>
        <div className="ml-auto flex items-center gap-2 text-sm text-slate-600">
          <span>{formatTime(time)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={handleScrub}
            className="w-56"
          />
          <span>{formatTime(duration)}</span>
        </div>
        <button onClick={toggleFullscreen} className="ml-2 rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Fullscreen</button>
      </div>
    </div>
  )
}

export default VideoPlayer
