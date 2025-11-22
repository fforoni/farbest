import React, { useState } from 'react';
import { TrendingUp, Plus, Trophy } from 'lucide-react';
import Navbar from './components/Navbar';
import MarketCard from './components/MarketCard';
import Leaderboard from './components/Leaderboard';
import TradingModal from './components/TradingModal';
import CreateMarketModal from './components/CreateMarketModal';
import { MARKETS } from './mock/mockData';

export default function App() {
  const [activeMarket, setActiveMarket] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isCreatingMarket, setIsCreatingMarket] = useState(false);
  const [view, setView] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMarkets = activeCategory === 'All' 
    ? MARKETS 
    : MARKETS.filter(m => m.category === activeCategory); 

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-green-500/30 relative">
      <Navbar walletConnected={walletConnected} setWalletConnected={setWalletConnected} setView={setView} />

      {view === 'home' ? (
        <>
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/20 blur-[120px] rounded-full opacity-30 pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-green-400 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live on Solana DEMO
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent animate-in zoom-in-90 duration-1000">
                By far, the best.
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200">
                Traditional markets ask "Will X happen?". We ask "What is the best X?". 
                Stake SOL on your conviction and rank the world's best tools, projects, and assets.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
                <button 
                  onClick={() => setIsCreatingMarket(true)}
                  className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <Plus className="w-5 h-5" /> Create Market
                </button>
                <button 
                  onClick={() => setView('leaderboard')}
                  className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-colors"
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Markets Grid */}
          <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="text-green-500" /> Trending Markets
              </h2>
              <div className="flex gap-2">
                {['All', 'Tech', 'Crypto'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat 
                        ? 'bg-white/10 text-white' 
                        : 'bg-transparent text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market, idx) => (
                <div key={market.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 100}ms` }}>
                  <MarketCard market={market} onSelect={setActiveMarket} />
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        <Leaderboard setView={setView} onSelectMarket={setActiveMarket} />
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Trophy className="w-5 h-5" />
            <span className="font-bold">far.best</span>
          </div>
          <div className="text-sm text-gray-600">
            Built for IndieFun Hackathon • Powered by Solana
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeMarket && (
        <TradingModal 
          market={activeMarket} 
          walletConnected={walletConnected}
          onClose={() => setActiveMarket(null)} 
        />
      )}

      {isCreatingMarket && (
        <CreateMarketModal 
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
          onClose={() => setIsCreatingMarket(false)}
        />
      )}
    </div>
  );
}
