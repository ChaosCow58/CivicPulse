"use client";

import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function ServerError() {
  return (
    <div className="h-screen w-full bg-white text-slate-900 font-sans overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex items-center justify-center w-20 h-20 bg-red-50 border border-red-100 rounded-2xl shadow-sm text-red-500 animate-pulse">
          <AlertCircle size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-7xl font-black tracking-tighter text-slate-900 mb-2 italic">Internal Server Error</h1>
        <p className="text-xl text-slate-500 font-medium tracking-tight mb-8 max-w-md">
          Something went wrong on our end. Our systems are working to restore the connection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black transition-all px-10 py-4 rounded-full text-white font-bold shadow-md"
          >
            <RefreshCcw size={18} />
            Try Refreshing
          </button>
        </div>
      </main>

      <footer className="relative z-10 py-8 px-10 w-full flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          System Incident Reported
        </div>
        <div>CivicPulse Intelligence</div>
      </footer>
    </div>
  );
}