import React from 'react';
import { ArrowUpRight, Activity, Users, Clock, Zap } from 'lucide-react';

const MarketCard = ({ market, onSelect }) => {
  // Check if less than 24 hours (simple heuristic: no "d" in the string)
  const isUrgent = !market.endsIn.includes('d');

  return (
    <div 
      onClick={() => onSelect(market)}
      className="group relative bg-gray-900/50 border border-white/5 rounded-2xl p-6 hover:border-green-500/30 hover:bg-gray-900/80 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/0 via-green-500/0 to-green-500/0 group-hover:to-green-500/5 transition-all duration-500" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{market.title}</h3>
        <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
      </div>

      <div className="space-y-3 relative z-10">
        {market.options.slice(0, 2).map((opt, idx) => (
          <div key={idx} className="relative h-10 bg-black/40 rounded-lg overflow-hidden flex items-center px-3 border border-white/5">
            <div 
              className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r ${opt.color} opacity-20`} 
              style={{ width: `${opt.share}%` }} 
            />
            <span className="font-medium text-sm text-gray-200 relative z-10 flex-1">{opt.name}</span>
            <span className="font-bold text-sm text-green-400 relative z-10">{opt.share}%</span>
          </div>
        ))}
        {market.options.length > 2 && (
          <div className="text-xs text-gray-500 pl-1">+{market.options.length - 2} more options</div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-gray-400 font-mono border-t border-white/5 pt-4 relative z-10">
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          {market.volume} Vol
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {market.participants} Stakers
        </div>
        <div className={`flex items-center gap-1 ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-green-500'}`}>
          {isUrgent ? <Clock className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
          {isUrgent ? `Ends in ${market.endsIn}` : 'Live'}
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
