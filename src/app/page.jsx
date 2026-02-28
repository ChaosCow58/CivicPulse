import React from 'react';
import { MapPin, ArrowRight, Radio, Target, BarChart3, Users } from 'lucide-react';

export default function CivicPulseLanding() {
  return (
    // h-screen and overflow-hidden prevent scrolling
    <div className="h-screen w-full bg-[#05070a] text-white font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center font-bold text-sm">C</div>
          <span className="text-xl font-semibold tracking-tight">CivicPulse</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg font-medium text-sm">
          Sign In
        </button>
      </nav>

      {/* Main Content Area - flex-1 pushes footer to bottom */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-6xl mx-auto w-full">
        
        {/* Hero Section - Reduced margins for tight fit */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2">
            Your City. <br />
            <span className="text-blue-500">Smarter.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Where citizen feedback becomes real solutions for the city.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all px-8 py-3 rounded-xl font-semibold text-sm">
            <MapPin size={16} />
            Report an Issue
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-8 py-3 rounded-xl font-semibold text-sm group">
            View Live Map
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Grid - Grid items are more compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.bgColor} p-5 lg:p-6 rounded-2xl border border-white/5 flex flex-col items-start text-left transition-all hover:bg-white/[0.08] cursor-default`}
            >
              <div className={`${feature.iconColor} mb-3 p-1.5 bg-white/5 rounded-lg`}>
                {React.cloneElement(feature.icon, { size: 18 })}
              </div>
              <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer - Positioned at absolute bottom */}
      <footer className="relative z-10 max-w-7xl mx-auto px-8 py-6 w-full flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 gap-4">
        <div className="opacity-60">© 2026 CivicPulse. Open urban intelligence.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Status</a>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Real-Time Reporting",
    description: "Geotagged citizen reports on potholes, flooding, and more.",
    icon: <Radio />,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/10"
  },
  {
    title: "Hotspot Detection",
    description: "AI clusters recurring issues into prioritized problem zones.",
    icon: <Target />,
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-900/10"
  },
  {
    title: "City Insights",
    description: "Trend dashboards and predictive models for urban planning.",
    icon: <BarChart3 />,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-900/10"
  },
  {
    title: "Civic Governance",
    description: "Data-backed transparency between residents and officials.",
    icon: <Users />,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-900/10"
  }
];