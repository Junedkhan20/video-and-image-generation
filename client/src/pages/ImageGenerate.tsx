import { useState } from 'react';
import api from '../lib/api';

const MODELS = ['default', 'flux-pro', 'sdxl', 'midjourney'];
const STYLES = ['realistic', 'artistic', 'anime', 'photographic', '3d', 'cinematic'];
const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4', '9:21'];

export default function ImageGenerate() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('default');
  const [style, setStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/generations/image', { model, prompt, style, aspectRatio });
      setResult(data);
    } catch (e: any) {
      alert(e?.response?.data?.error || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Image Generation</h1>

      <div className="glass rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Image Description</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} required
            placeholder="A futuristic cityscape at night with neon lights reflecting on wet streets..."
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none resize-none" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Model</label>
            <select value={model} onChange={e => setModel(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none">
              {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none">
              {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Aspect Ratio</label>
            <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none">
              {ASPECT_RATIOS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <button onClick={generate} disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 font-bold text-lg disabled:opacity-50">
          {loading ? 'Generating...' : 'Generate Image'}
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
