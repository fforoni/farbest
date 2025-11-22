import React from 'react';
import { Trophy, Wallet } from 'lucide-react';
import { SOLANA_CONFIG } from '../solana/config';
import { SolanaService } from '../solana/SolanaService';

const Navbar = ({ walletConnected, setWalletConnected, setView }) => {
  const handleConnect = async () => {
    if (walletConnected) {
      setWalletConnected(false); 
    } else {
      await SolanaService.connect();
      setWalletConnected(true);
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-[50] transition-all duration-500">
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
        onClick={() => setView('home')}
      >
        <div className="w-8 h-8 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.5)]">
          <Trophy className="w-5 h-5 text-black fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">far.best</span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-white/10 text-gray-400 font-mono border border-white/5 uppercase">
          {SOLANA_CONFIG.network}
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <button onClick={() => setView('home')} className="hover:text-green-400 transition-colors">Markets</button>
        <button onClick={() => setView('leaderboard')} className="hover:text-green-400 transition-colors">Leaderboard</button>
        <button className="hover:text-green-400 transition-colors">How it Works</button>
      </div>

      <button 
        onClick={handleConnect}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-500 ${
          walletConnected 
          ? 'bg-white/10 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]' 
          : 'bg-white text-black hover:bg-green-400 hover:scale-105'
        }`}
      >
        <Wallet className="w-4 h-4" />
        {walletConnected ? '82.4 SOL' : 'Connect Wallet'}
      </button>
    </nav>
  );
};

export default Navbar;
