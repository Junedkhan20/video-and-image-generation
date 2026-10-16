import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoGenerate from './pages/VideoGenerate';
import ImageGenerate from './pages/ImageGenerate';
import History from './pages/History';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/generate/video" replace /> : <Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/generate/video" element={user ? <VideoGenerate /> : <Navigate to="/login" replace />} />
          <Route path="/generate/image" element={user ? <ImageGenerate /> : <Navigate to="/login" replace />} />
          <Route path="/history" element={user ? <History /> : <Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
