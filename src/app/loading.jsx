"use client";

import React from 'react';

export default function Loading() {
  return (
    <div className="h-screen w-full bg-white text-slate-900 font-sans overflow-hidden flex flex-col relative">
      {/* Subtle Light Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-xl shadow-blue-200 animate-bounce">
            C
          </div>
          {/* Decorative ping effect */}
          <div className="absolute inset-0 w-16 h-16 bg-blue-400 rounded-2xl animate-ping opacity-20" />
        </div>
        
        <h2 className="text-2xl font-black tracking-tighter text-slate-900 mb-2">
          CivicPulse
        </h2>
        
        {/* Modern Minimalist Loading Bar */}
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full w-1/3 animate-[loading_1.5s_infinite_ease-in-out]" />
        </div>

        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 animate-pulse">
          Initializing Urban Intelligence
        </p>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-8 text-center text-[11px] font-bold uppercase tracking-widest text-slate-300">
        Connecting to City Grid...
      </footer>

      {/* Custom Keyframe Animation for the Loading Bar */}
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}