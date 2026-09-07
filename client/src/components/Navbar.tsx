import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          AI Forge
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/generate/video" className="hover:text-violet-400 transition">Video</Link>
          <Link to="/generate/image" className="hover:text-violet-400 transition">Image</Link>
          <Link to="/history" className="hover:text-violet-400 transition">History</Link>
          {user ? (
            <button onClick={() => { logout(); nav('/login'); }} className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700">
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
