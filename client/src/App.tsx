import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoGenerate from './pages/VideoGenerate';
import ImageGenerate from './pages/ImageGenerate';
import History from './pages/History';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-white">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/generate/video" element={<VideoGenerate />} />
              <Route path="/generate/image" element={<ImageGenerate />} />
              <Route path="/history" element={<History />} />
              <Route path="/" element={<Navigate to="/generate/video" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
