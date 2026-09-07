import { useState } from 'react';
import api from '../lib/api';

const MODELS = ['kling-2.0', 'kling-1.6', 'runway-gen3', 'pika-2.2', 'luma-photon'];
const ASPECT_RATIOS = ['16:9', '9:16', '1:1', '4:3', '21:9'];
const DURATIONS = [5, 10, 15, 30, 60];
const RESOLUTIONS = ['720p', '1080p', '4K'];
const MOTIONS = ['left', 'right', 'up', 'down', 'zoom_in', 'zoom_out', 'pan', 'rotate', 'orbit', 'dolly'];

export default function VideoGenerate() {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [motion, setMotion] = useState('pan');
  const [motionDesc, setMotionDesc] = useState('');
  const [model, setModel] = useState('default');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState(5);
  const [resolution, setResolution] = useState('1080p');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generate = async () => {
    setLoading(true);
    setResult(null);
    try {
      let resolvedImageUrl = imageUrl;

      // Upload file if present
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const { data: uploadData } = await api.post('/generations/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        resolvedImageUrl = uploadData.url;
      }

      const payload = mode === 'text'
        ? { type: 'text', prompt, model, aspectRatio, duration, resolution }
        : { type: 'image', imageUrl: resolvedImageUrl, motion, motionDescription: motionDesc, model, aspectRatio, duration, resolution };
      const { data } = await api.post('/api/generations/video', payload);
      setResult(data);
    } catch (e: any) {
      alert(e?.response?.data?.error || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Video Generation</h1>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button onClick={() => setMode('text')} className={`px-4 py-2 rounded-lg ${mode === 'text' ? 'bg-violet-600' : 'bg-slate-800 hover:bg-slate-700'}`}>Text to Video</button>
        <button onClick={() => setMode('image')} className={`px-4 py-2 rounded-lg ${mode === 'image' ? 'bg-violet-600' : 'bg-slate-800 hover:bg-slate-700'}`}>Image to Video</button>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        {mode === 'text' ? (
          <>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Prompt</label>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} required
                placeholder="A cinematic shot of a dragon flying over mountains at sunset..."
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none resize-none" />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Start Image</label>
              <input type="file" accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                  if (file) setImageUrl('');
                }}
                className="w-full text-sm text-slate-300 file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-violet-600 file:text-white hover:file:opacity-90" />
              <p className="text-xs text-slate-500 mt-1">or provide a URL below</p>
              <input type="url" value={imageUrl} onChange={e => {
                setImageUrl(e.target.value);
                if (e.target.value) setImageFile(null);
              }} disabled={!!imageFile}
                placeholder="https://example.com/image.jpg"
                className="w-full mt-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none disabled:opacity-50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Motion</label>
                <select value={motion} onChange={e => setMotion(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none">
                  {MOTIONS.map(m => <option key={m} value={m}>{m.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Motion Description</label>
                <input type="text" value={motionDesc} onChange={e => setMotionDesc(e.target.value)}
                  placeholder="Camera slowly pans right"
                  className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none" />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Model</label>
            <select value={model} onChange={e => setModel(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none">
              {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Aspect Ratio</label>
            <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none">
              {ASPECT_RATIOS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Duration (s)</label>
            <select value={duration} onChange={e => setDuration(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none">
              {DURATIONS.map(d => <option key={d} value={d}>{d}s</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Resolution</label>
          <div className="flex gap-2">
            {RESOLUTIONS.map(r => (
              <button key={r} onClick={() => setResolution(r)}
                className={`px-4 py-2 rounded-lg ${resolution === r ? 'bg-violet-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 font-bold text-lg disabled:opacity-50">
          {loading ? 'Generating...' : 'Generate Video'}
        </button>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-slate-900 border border-slate-700">
            <p className="text-sm text-slate-400">Status: <span className="capitalize text-white">{result.status}</span></p>
            <p className="text-xs text-slate-500">ID: {result.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
