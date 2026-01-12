
import React from 'react';
import { View, User } from '../types';

interface NavbarProps {
  currentView: View;
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, user, onNavigate, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex items-center justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onNavigate(user ? View.DASHBOARD : View.LANDING)}
      >
        <div className="w-9 h-9 bg-[#00ff9d] rounded flex items-center justify-center font-black text-black text-xl transform group-hover:rotate-90 transition-transform duration-500">
          K
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-lg font-black tracking-tighter uppercase italic">Koda <span className="text-[#00ff9d]">Engine</span></span>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Development Suite</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs text-zinc-500 font-mono uppercase">Developer</span>
              <span className="text-sm font-bold text-zinc-200">{user.username}</span>
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all text-xs font-bold uppercase tracking-tighter"
            >
              Exit
            </button>
          </div>
        ) : (
          <>
            <button 
              onClick={() => onNavigate(View.LOGIN)}
              className="text-zinc-400 hover:text-[#00ff9d] transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate(View.REGISTER)}
              className="px-6 py-2 rounded bg-[#00ff9d] hover:bg-[#00cc7e] text-black transition-all text-xs font-black uppercase tracking-widest neon-glow"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
