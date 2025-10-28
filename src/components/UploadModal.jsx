import React, { useRef, useState } from 'react';

export default function UploadModal({ open, onClose, onUpload }) {
  const [name, setName] = useState('');
  const fileRef = useRef(null);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpload({ name: name || file.name, url, size: file.size, type: file.type });
    setName('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
        <form onSubmit={handleSubmit} className="p-6">
          <h3 className="text-lg font-semibold text-slate-100">Upload a video</h3>
          <p className="text-sm text-slate-400 mt-1">Select a video file from your device. We only load when you hit play to prevent heavy buffering.</p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="My awesome clip"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Video file</label>
              <input
                ref={fileRef}
                type="file"
                accept="video/*"
                className="w-full text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-white hover:file:bg-cyan-400 file:cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-400">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
