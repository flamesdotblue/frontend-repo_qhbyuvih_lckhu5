import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950/90" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 h-full flex flex-col justify-end pb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Share movies with an AI-inspired vibe
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl">
          Upload your video, get instant playback, and share with a link. Smooth controls, fullscreen, and a cinematic dark theme.
        </p>
      </div>
    </section>
  );
}
