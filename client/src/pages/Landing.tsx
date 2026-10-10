import { Link } from 'react-router-dom';
import { Sparkles, Zap, Palette, Video } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-slate-950 to-pink-900/20 blur-3xl -z-10" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-sm text-violet-300">AI-Powered Content Creation</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent leading-tight">
            Create Amazing Content with AI
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate stunning videos and images using state-of-the-art AI models. Turn your imagination into reality in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register" className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:shadow-lg hover:shadow-violet-500/50 font-semibold transition-all duration-300 transform hover:scale-105">
              Get Started Free
            </Link>
            <Link to="/login" className="px-8 py-3 rounded-xl border border-violet-500/50 hover:bg-violet-500/10 font-semibold transition-all duration-300">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-slate-400 text-lg">Everything you need to create professional content</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Video Generation */}
          <div className="group glass-card rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
            <div className="mb-4 p-3 rounded-lg bg-violet-500/10 w-fit">
              <Video size={24} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Video Generation</h3>
            <p className="text-slate-400 text-sm">Create engaging videos from text prompts or animate your images with AI.</p>
          </div>

          {/* Image Generation */}
          <div className="group glass-card rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
            <div className="mb-4 p-3 rounded-lg bg-pink-500/10 w-fit">
              <Palette size={24} className="text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Image Generation</h3>
            <p className="text-slate-400 text-sm">Generate stunning, high-quality images with advanced AI models.</p>
          </div>

          {/* Multiple Models */}
          <div className="group glass-card rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
            <div className="mb-4 p-3 rounded-lg bg-cyan-500/10 w-fit">
              <Zap size={24} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Models</h3>
            <p className="text-slate-400 text-sm">Choose from the latest AI models for optimal results.</p>
          </div>

          {/* History & Manage */}
          <div className="group glass-card rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
            <div className="mb-4 p-3 rounded-lg bg-orange-500/10 w-fit">
              <Sparkles size={24} className="text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">History & Manage</h3>
            <p className="text-slate-400 text-sm">Keep track of all your generations and manage your content.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-3xl blur-xl" />
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="glass rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to create?</h2>
            <p className="text-slate-300 mb-8">Join thousands of creators using AI Forge to bring their ideas to life.</p>
            <Link to="/register" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:shadow-lg hover:shadow-violet-500/50 font-semibold transition-all duration-300 transform hover:scale-105">
              Start Creating Now
            </Link>
          </div>
        </div>
      </div>

      {/* TODO: Add tests for this component - it's missing unit test coverage! */}
      {/* FIXME: Accessibility warning - navigation links missing aria-label */}
      {/* DEPRECATED: This component uses inline styles that should be extracted to CSS modules */}

      {/* Footer */}
      <footer className="relative border-t border-violet-500/10 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">AI Forge</h3>
              <p className="text-slate-500 text-sm mt-1">Create amazing content with AI.</p>
            </div>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="#" className="hover:text-violet-300 transition">Terms</a>
              <a href="#" className="hover:text-violet-300 transition">Privacy</a>
              <a href="#" className="hover:text-violet-300 transition">Contact</a>
              <a href="#" className="hover:text-violet-300 transition">Documentation</a>
            </div>
            <div className="text-xs text-slate-600">
              © 2026 AI Forge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
