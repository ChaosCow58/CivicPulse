import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import LoginButton from '@/components/auth/LoginButton';
import Link from 'next/link';

export default function CivicPulseLanding() {
  return (
    <div className="h-screen w-full bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-hidden flex flex-col">
      {/* Subtle Light Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm text-white shadow-sm">
            C
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">CivicPulse</span>
        </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all px-5 py-2 rounded-full text-white font-bold shadow-md">
          <LoginButton />
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-slate-900 mb-4">
            CivicPulse
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium tracking-tight">
            Your city. <span className="text-blue-600">Smarter.</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 relative z-20">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all px-10 py-4 rounded-full text-white font-bold shadow-md">
            <Link href="/map">View Live Map</Link>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-10 py-8 w-full flex flex-col md:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-400 gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          © 2026 CivicPulse • Open Urban Intelligence
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Status</a>
        </div>
      </footer>
    </div>
  );
}
Map