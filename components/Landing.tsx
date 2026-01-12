
import React from 'react';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00ff9d]/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1 border border-[#00ff9d]/30 rounded-full bg-[#00ff9d]/5">
            <span className="text-[#00ff9d] text-[10px] font-mono font-bold tracking-[0.3em] uppercase">
              Next-Gen 2D Workflow
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter italic uppercase">
            MAKE GAMES.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00ff9d] to-white/20">
              FAST & PRO.
            </span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            The ultimate development suite for 2D pixel-perfect experiences. 
            From visual logic blocks to high-performance JavaScript.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="group relative w-full sm:w-auto px-10 py-5 bg-[#00ff9d] text-black rounded-sm font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,157,0.3)]"
            >
              Download Beta
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black group-hover:bg-white transition-colors"></div>
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-sm font-black text-sm uppercase tracking-[0.2em] transition-all">
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 bg-[#111] border border-white/5 p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-32 h-32 text-[#00ff9d]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="text-3xl font-black uppercase italic mb-4">Visual Logic Engine</h3>
            <p className="text-zinc-500 max-w-md">Create complex behaviors without code. Our drag-and-drop event system is as powerful as writing JS, but twice as fast.</p>
            <div className="mt-8 flex gap-2">
              <span className="px-3 py-1 bg-black rounded text-[10px] font-mono text-zinc-400 uppercase tracking-widest border border-white/5">Event-Based</span>
              <span className="px-3 py-1 bg-black rounded text-[10px] font-mono text-[#00ff9d] uppercase tracking-widest border border-[#00ff9d]/20">Pro Level</span>
            </div>
          </div>
          
          <div className="md:col-span-4 bg-[#111] border border-white/5 p-8 rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black uppercase italic mb-2 text-[#00ff9d]">Multiplatform</h3>
              <p className="text-zinc-500 text-sm">Export to Android, iOS, and Web with a single click. Our native runners ensure 60fps performance.</p>
            </div>
            <div className="pt-8 border-t border-white/5 mt-8">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-600">
                <span>EXPORT STATUS</span>
                <span className="text-[#00ff9d]">READY</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-zinc-900 p-8 rounded-lg border border-white/5">
             <h3 className="text-xl font-black uppercase italic mb-2">Sprite Suite</h3>
             <p className="text-zinc-500 text-sm">Built-in pixel art editor with animation timelines and automatic atlas generation.</p>
          </div>

          <div className="md:col-span-8 bg-[#1a1a1a] p-8 rounded-lg border border-[#00ff9d]/10 relative">
             <div className="flex items-center gap-4 mb-4">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
               <h3 className="text-xl font-black uppercase italic">Koda AI Assistant</h3>
             </div>
             <p className="text-zinc-400 text-sm mb-4 italic">"Generating platformer physics script... Done. Optimizing collision mask... Ready."</p>
             <p className="text-zinc-600 text-xs font-mono uppercase">Integrated LLM for rapid prototyping</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
