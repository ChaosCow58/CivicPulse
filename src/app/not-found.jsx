import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-white text-slate-900 font-sans overflow-hidden flex flex-col relative">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex items-center justify-center w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm text-slate-400">
          <Search size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-8xl font-black tracking-tighter text-slate-900 mb-2">404</h1>
        <p className="text-xl text-slate-500 font-medium tracking-tight mb-8">
          The page you’re looking for has moved or doesn't exist.
        </p>

        <Link href="/" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all px-10 py-4 rounded-full text-white font-bold shadow-md hover:shadow-lg hover:shadow-blue-100">
          <Home size={18} />
          Back to Dashboard
        </Link>
      </main>

      <footer className="relative z-10 py-8 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
        CivicPulse Support • Error Code: ERR_NOT_FOUND
      </footer>
    </div>
  );
}