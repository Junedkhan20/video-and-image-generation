import { useState, useEffect } from 'react';
import api from '../lib/api';

type Filter = 'all' | 'video' | 'image' | 'processing';

interface Gen {
  id: string;
  type: 'video' | 'image';
  prompt?: string;
  imageUrl?: string;
  videoUrl?: string;
  status: 'processing' | 'completed' | 'failed';
  modelUsed?: string;
  aspectRatio?: string;
  duration?: number;
  resolution?: string;
  createdAt: string;
}

const TABS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'video', label: 'Video' },
  { key: 'image', label: 'Image' },
  { key: 'processing', label: 'Processing' },
];

export default function History() {
  const [filter, setFilter] = useState<Filter>('all');
  const [items, setItems] = useState<Gen[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (f: Filter) => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/generations', { params: { filter: f === 'all' ? '' : f } });
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(filter); }, [filter]);

  // Live polling for processing items
  useEffect(() => {
    if (filter !== 'processing') return;
    const interval = setInterval(async () => {
      try {
        const { data } = await api.get('/api/generations', { params: { filter: 'processing' } });
        const updated = data.filter((d: Gen) => d.status === 'processing');
        if (updated.length === 0) {
          load('all');
        } else {
          setItems((prev) => {
            const merged = prev.map((p) => {
              const match = updated.find((u: Gen) => u.id === p.id);
              return match ? { ...p, ...match } : p;
            });
            return merged;
          });
        }
      } catch (e) {
        console.error('Poll error', e);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [filter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">History</h1>

      <div className="flex gap-2 border-b border-slate-800">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-5 py-2 font-medium transition border-b-2 ${
              filter === t.key
                ? 'border-violet-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400 text-center py-12">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500 text-center py-12">No items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="glass rounded-xl overflow-hidden">
              <div className="aspect-video bg-slate-800 flex items-center justify-center relative">
                {item.status === 'completed' && item.type === 'image' && item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.prompt || ''} className="w-full h-full object-cover" />
                ) : item.status === 'completed' && item.type === 'video' && item.videoUrl ? (
                  <video src={item.videoUrl} controls className="w-full h-full object-cover" />
                ) : item.status === 'processing' ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-400 text-xs">Processing...</span>
                  </div>
                ) : item.status === 'failed' ? (
                  <span className="text-red-400 text-sm">Failed</span>
                ) : (
                  <span className="text-slate-500 text-sm">{item.type === 'image' ? 'Image preview' : 'Video preview'}</span>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-slate-400">{item.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === 'completed' ? 'bg-green-900 text-green-300' :
                    item.status === 'processing' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>{item.status}</span>
                </div>
                {item.prompt && <p className="text-sm text-slate-300 line-clamp-2">{item.prompt}</p>}
                <div className="flex gap-2 text-xs text-slate-500">
                  {item.aspectRatio && <span>{item.aspectRatio}</span>}
                  {item.duration && <span>{item.duration}s</span>}
                  {item.resolution && <span>{item.resolution}</span>}
                </div>
                <p className="text-xs text-slate-600">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
