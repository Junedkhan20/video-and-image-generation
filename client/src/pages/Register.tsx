import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const nav = useNavigate();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      nav('/generate/video');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <form onSubmit={handle} className="glass rounded-2xl p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <div>
          <label className="block text-sm text-slate-400 mb-1">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-violet-500 outline-none" />
        </div>
        <button type="submit" className="w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-500 font-semibold">
          Create Account
        </button>
        <p className="text-center text-sm text-slate-400">
          Have an account? <a href="/login" className="text-violet-400 hover:underline">Sign in</a>
        </p>
      </form>
    </div>
  );
}
