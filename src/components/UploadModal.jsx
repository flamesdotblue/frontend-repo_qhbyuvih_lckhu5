import React, { useEffect, useRef, useState } from 'react'

function UploadModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKey)
    }
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  function handleBackdrop(e) {
    if (e.target === dialogRef.current) onClose()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!file) return
    const finalName = name?.trim() || file.name
    onSubmit({ name: finalName, file })
    setName('')
    setFile(null)
  }

  if (!open) return null

  return (
    <div ref={dialogRef} onMouseDown={handleBackdrop} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-slate-100">Upload a Movie</h2>
          <p className="text-sm text-slate-400">Choose a video file and give it a name.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Movie name</label>
            <input
              type="text"
              placeholder="e.g., The Great Adventure"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Select video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-sky-600/10 file:px-4 file:py-2 file:text-sky-300 hover:file:bg-sky-600/20"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!file}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal
