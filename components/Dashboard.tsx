
import React, { useState } from 'react';
import { User } from '../types';
import GeminiChat from './GeminiChat';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 w-full flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Developer <span className="text-[#00ff9d]">Console</span></h2>
            <p className="text-zinc-500 font-mono text-xs mt-1 uppercase tracking-widest">Active Session: {user.username} // Build v1.0.42-beta</p>
          </div>
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`px-6 py-2 rounded font-black text-xs uppercase tracking-widest transition-all border ${
              showAI ? 'bg-[#00ff9d] text-black' : 'bg-transparent text-[#00ff9d] border-[#00ff9d]/30'
            }`}
          >
            {showAI ? 'Close Assistant' : 'Launch Koda AI'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Workspace Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111] border border-white/5 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-indigo-500/10 rounded flex items-center justify-center text-indigo-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-xl font-black uppercase italic">Current Projects</h3>
              </div>
              
              <div className="border border-dashed border-zinc-800 rounded-lg p-12 text-center group cursor-pointer hover:border-[#00ff9d]/50 transition-all">
                <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.2em] mb-4">No projects detected in this workspace</p>
                <button className="px-8 py-3 bg-zinc-900 text-white rounded font-bold text-xs uppercase tracking-widest border border-zinc-800 hover:border-[#00ff9d] transition-all">
                  Create New Project
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-[#111] border border-white/5 p-6 rounded-lg">
                 <h4 className="text-[#00ff9d] text-xs font-mono uppercase tracking-widest mb-4">Resource Center</h4>
                 <ul className="space-y-3">
                   {['Sprites Library', 'Sound FX Pack', 'Particle Presets'].map((item) => (
                     <li key={item} className="flex justify-between items-center text-sm group cursor-pointer">
                       <span className="text-zinc-400 group-hover:text-white transition-colors">{item}</span>
                       <span className="text-zinc-700 font-mono text-[10px]">DOWNLOAD</span>
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="bg-[#111] border border-white/5 p-6 rounded-lg">
                 <h4 className="text-[#00ff9d] text-xs font-mono uppercase tracking-widest mb-4">Update Log</h4>
                 <div className="space-y-3 font-mono text-[10px] text-zinc-500">
                    <p className="text-zinc-300 underline underline-offset-4 decoration-[#00ff9d]/50">v1.0.42 - ADDED WEBGL 2.0 SUPPORT</p>
                    <p>v1.0.41 - FIXED COLLISION BUG IN TILEMAPS</p>
                    <p>v1.0.40 - NEW SHADER COMPILER ENGINE</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Sidebar / AI Chat Area */}
          <div className="lg:col-span-1 h-[600px]">
            <div className="bg-[#111] border border-white/5 rounded-lg h-full flex flex-col overflow-hidden relative">
              <div className="p-4 border-b border-white/5 bg-zinc-950 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#00ff9d] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00ff9d] rounded-full animate-pulse"></span>
                  AI Assistant Online
                </span>
                <span className="text-[10px] text-zinc-600 font-mono uppercase">KODA-CORE v2</span>
              </div>
              <GeminiChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
