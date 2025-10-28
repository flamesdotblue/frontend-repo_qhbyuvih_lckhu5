import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Maximize, Minimize } from 'lucide-react';

export default function VideoPlayer({ movie, onBack }) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isFs, setIsFs] = useState(false);

  // Ensure we don't aggressively buffer: use preload="none" and load src explicitly
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.preload = 'none';
    v.src = movie.url;
    v.load();
    const onLoadedMeta = () => setDuration(v.duration || 0);
    const onTime = () => setCurrent(v.currentTime || 0);
    const onEnded = () => setPlaying(false);
    v.addEventListener('loadedmetadata', onLoadedMeta);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('loadedmetadata', onLoadedMeta);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
    };
  }, [movie]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const skip = (sec) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min((v.currentTime || 0) + sec, duration || v.duration || 0));
  };

  const onScrub = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const value = Number(e.target.value);
    v.currentTime = value;
    setCurrent(value);
  };

  const format = (s) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const toggleFs = async () => {
    const container = document.getElementById('player-container');
    if (!container) return;
    if (!document.fullscreenElement) {
      await container.requestFullscreen();
      setIsFs(true);
    } else {
      await document.exitFullscreen();
      setIsFs(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-slate-300 hover:text-white">
        <ArrowLeft className="h-5 w-5" /> Back
      </button>

      <div id="player-container" className="rounded-xl overflow-hidden border border-slate-800 bg-black">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            controls={false}
            playsInline
            disablePictureInPicture
            className="absolute inset-0 h-full w-full bg-black"
            // src set via effect to keep preload none
          />
          {/* Controls */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
            <input
              ref={progressRef}
              type="range"
              min={0}
              max={duration || 0}
              value={current}
              onChange={onScrub}
              step={0.1}
              className="w-full accent-cyan-400"
            />
            <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
              <span>{format(current)}</span>
              <span>{format(duration)}</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <button onClick={() => skip(-10)} className="px-3 py-2 rounded-md bg-slate-900/80 border border-slate-700 hover:bg-slate-800">
                <SkipBack className="h-5 w-5" />
              </button>
              <button onClick={togglePlay} className="px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-400">
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button onClick={() => skip(10)} className="px-3 py-2 rounded-md bg-slate-900/80 border border-slate-700 hover:bg-slate-800">
                <SkipForward className="h-5 w-5" />
              </button>
              <button onClick={toggleFs} className="ml-3 px-3 py-2 rounded-md bg-slate-900/80 border border-slate-700 hover:bg-slate-800">
                {isFs ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-slate-300">
        <p className="font-medium">{movie.name}</p>
      </div>
    </div>
  );
}
