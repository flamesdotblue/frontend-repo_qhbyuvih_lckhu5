import React from 'react'
import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-black">
      <div className="h-[360px] md:h-[500px]">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Soft gradient + copy (doesn't block Spline) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-violet-400">
          Share Movies. Watch Anywhere.
        </h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300">
          Upload from your device, get a link, and play instantly with a sleek AI‑inspired player.
        </p>
      </div>
    </section>
  )
}

export default Hero
