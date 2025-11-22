import React, { useState } from 'react';
import { ArrowLeft, Star, Medal, BarChart3, Users, Trophy, ArrowUpRight, Coins, Activity } from 'lucide-react';
import { MARKETS, LEADERBOARD_USERS } from '../mock/mockData';
import { getStakedAmount } from '../utils';

const Leaderboard = ({ setView, onSelectMarket }) => {
  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'users'

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <button 
        onClick={() => setView('home')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Markets
      </button>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          {activeTab === 'items' ? (
            <Star className="w-10 h-10 text-yellow-400 animate-[spin_3s_linear_infinite]" />
          ) : (
            <Medal className="w-10 h-10 text-green-400 animate-bounce" />
          )}
          {activeTab === 'items' ? 'Category Rankings' : 'Top Curators'}
        </h2>
        <p className="text-gray-400">
          {activeTab === 'items' 
            ? "The crowd's verdict based on total staked SOL." 
            : "The sharpest minds earning the highest yields."}
        </p>
      </div>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-900 p-1 rounded-xl border border-white/10 flex relative">
          <button 
            onClick={() => setActiveTab('items')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 z-10 ${
              activeTab === 'items' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Best Things
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 z-10 ${
              activeTab === 'users' ? 'bg-green-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Top Curators
          </button>
        </div>
      </div>

      {/* Leaderboard Container */}
      <div className="bg-gray-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm min-h-[400px]">
        
        {/* Main Header Row */}
        <div className="grid grid-cols-12 gap-4 p-6 text-sm font-bold text-gray-500 border-b border-white/5 uppercase tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-5">{activeTab === 'items' ? 'Asset Name' : 'User'}</div>
          <div className="col-span-3 text-right">{activeTab === 'items' ? 'Total Staked' : 'Profit'}</div>
          <div className="col-span-2 text-right">{activeTab === 'items' ? 'Pool %' : 'Win Rate'}</div>
        </div>
        
        {/* Content Rows */}
        {activeTab === 'users' ? (
          LEADERBOARD_USERS.map((entry, idx) => (
            <div 
              key={idx} 
              className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 animate-in slide-in-from-bottom-2 fade-in duration-300"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="col-span-2 flex justify-center">
                {idx + 1 === 1 ? (
                  <div className="w-8 h-8 bg-green-400/20 text-green-400 rounded-full flex items-center justify-center font-bold border border-green-400/50 shadow-[0_0_10px_rgba(74,222,128,0.2)]">1</div>
                ) : idx + 1 === 2 ? (
                  <div className="w-8 h-8 bg-gray-300/20 text-gray-300 rounded-full flex items-center justify-center font-bold border border-gray-300/50">2</div>
                ) : idx + 1 === 3 ? (
                  <div className="w-8 h-8 bg-amber-600/20 text-amber-600 rounded-full flex items-center justify-center font-bold border border-amber-600/50">3</div>
                ) : (
                  <span className="text-gray-500 font-bold">#{idx + 1}</span>
                )}
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full" />
                <span className="font-mono font-medium text-white">{entry.user}</span>
                <div className="flex gap-1">
                  {entry.badges.map((b, i) => <span key={i} title="Badge" className="animate-pulse">{b}</span>)}
                </div>
              </div>
              <div className="col-span-3 text-right font-mono text-green-400 font-bold">{entry.profit}</div>
              <div className="col-span-2 text-right font-mono text-white">{entry.winRate}</div>
            </div>
          ))
        ) : (
          MARKETS.map((market) => (
            <React.Fragment key={market.id}>
              <div 
                onClick={() => onSelectMarket(market)}
                className="col-span-12 bg-white/5 px-6 py-3 border-b border-white/5 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors group"
              >
                <div className="p-1.5 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Trophy className="w-4 h-4 text-green-400" />
                </div>
                <span className="font-bold text-gray-200 tracking-wide group-hover:text-white transition-colors">{market.title}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto transition-colors" />
              </div>

              {market.options.sort((a, b) => b.share - a.share).map((entry, idx) => (
                <div 
                  key={`${market.id}-${entry.id}`}
                  onClick={() => onSelectMarket(market)}
                  className="grid grid-cols-12 gap-4 p-4 px-6 items-center hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer"
                >
                  <div className="col-span-2 flex justify-center">
                    {idx + 1 === 1 ? (
                      <div className="w-6 h-6 bg-yellow-400/20 text-yellow-400 rounded text-xs flex items-center justify-center font-bold border border-yellow-400/50">1</div>
                    ) : (
                      <span className="text-gray-600 font-mono text-sm">#{idx + 1}</span>
                    )}
                  </div>

                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${entry.color}`} />
                    <span className={`font-bold ${idx === 0 ? 'text-white' : 'text-gray-400'}`}>{entry.name}</span>
                    {idx === 0 && <Medal className="w-3 h-3 text-yellow-500" />}
                  </div>

                  <div className="col-span-3 text-right font-mono text-sm text-gray-500 flex items-center justify-end gap-1">
                     <Coins className="w-3 h-3 opacity-50" /> 
                     {getStakedAmount(market.volume, entry.share)} SOL
                  </div>

                  <div className="col-span-2 text-right font-mono font-bold">
                    <span className={idx === 0 ? 'text-green-400' : 'text-gray-500'}>{entry.share}%</span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))
        )}
      </div>
      
      <div className="mt-8 flex justify-center">
        <div className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-500 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Live Data • Updates every 5 minutes
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
