import React, { useState } from 'react';
import { X, CheckCircle2, PieChart, Plus, Coins, Wallet, Shield } from 'lucide-react';
import { SolanaService } from '../solana/SolanaService';

const TradingModal = ({ market, onClose, walletConnected }) => {
  const [selectedOption, setSelectedOption] = useState(market.options[0]);
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [addingOptionMode, setAddingOptionMode] = useState(false);
  const [newOptionName, setNewOptionName] = useState('');

  // Payout Calculations
  const currentPool = parseFloat(market.volume.split(' ')[0]);
  const currentOptionStake = (currentPool * selectedOption.share) / 100;
  const userStake = parseFloat(amount) || 0;
  
  // "Greed Hook" Calculation (Revised for 5% Fee)
  const totalPoolAfter = currentPool + userStake;
  const winnerStakeAfter = currentOptionStake + userStake;
  const platformFee = totalPoolAfter * 0.05;
  const winnerPool = totalPoolAfter - platformFee;
  const yourShare = userStake > 0 ? userStake / winnerStakeAfter : 0;
  
  const projectedWin = (winnerPool * yourShare).toFixed(2);

  const roi = userStake > 0 
    ? (((projectedWin - userStake) / userStake) * 100).toFixed(0) 
    : 0;

  const handleStake = async () => {
    if (!walletConnected || isAnimating) return; 
    setIsAnimating(true);
    await SolanaService.stake(market.id, selectedOption.id, amount);
    setIsAnimating(false);
    setIsSuccess(true);
  };

  const handleAddOption = async () => {
    if (!walletConnected || !newOptionName) return;
    setIsAnimating(true);
    await SolanaService.addOption(market.id, newOptionName);
    setIsAnimating(false);
    setAddingOptionMode(false);
    setSelectedOption({ id: 'new', name: newOptionName, share: 0, color: 'from-gray-500 to-white' });
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
        <div className="bg-gray-900 border border-green-500/30 p-8 rounded-2xl max-w-md w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          <div className="absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none"></div>
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{addingOptionMode ? "Option Added!" : "Stake Placed!"}</h3>
          <p className="text-gray-400 mb-6">
            {addingOptionMode 
              ? <span>You paid <span className="text-white font-bold">0.1 SOL</span> to add "{newOptionName}".</span>
              : <span>You successfully staked <span className="text-white font-bold">{amount} SOL</span> on <span className="text-green-400 font-bold">{selectedOption.name}</span>.</span>
            }
          </p>
          <div className="flex flex-col gap-3">
            <button 
               onClick={onClose}
               className="w-full py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Close
            </button>
            <button className="text-sm text-gray-500 hover:text-white">View Transaction on Solscan</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="grid md:grid-cols-2 h-full">
          {/* Left Side: Market Info */}
          <div className="p-6 md:p-8 bg-black/20 border-r border-white/5 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider">Ranking Market</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6 leading-tight">{market.title}</h2>
            
            <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              {market.options.map((opt) => (
                <button 
                  key={opt.id}
                  disabled={isAnimating || addingOptionMode}
                  onClick={() => setSelectedOption(opt)}
                  className={`w-full text-left relative p-3 rounded-xl transition-all duration-200 border ${
                    selectedOption.id === opt.id && !addingOptionMode
                    ? 'bg-white/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'bg-black/20 border-transparent hover:bg-white/5'
                  } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-medium ${selectedOption.id === opt.id ? 'text-white' : 'text-gray-400'}`}>{opt.name}</span>
                    <span className="text-sm font-mono text-gray-500 flex items-center gap-1">
                       <PieChart className="w-3 h-3" /> {opt.share}% of Pool
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${opt.color}`} style={{ width: `${opt.share}%` }}></div>
                  </div>
                </button>
              ))}
              
              <button 
                onClick={() => setAddingOptionMode(true)}
                className={`w-full p-3 rounded-xl border border-dashed border-gray-700 text-gray-500 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm font-bold ${addingOptionMode ? 'bg-white/5 text-white border-white/20' : ''}`}
              >
                <Plus className="w-4 h-4" /> Add Custom Option
              </button>
            </div>
          </div>

          {/* Right Side: Action */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-gray-900 to-black">
            
            {addingOptionMode ? (
               // ADD OPTION MODE
               <div className="flex flex-col h-full justify-center">
                 <h3 className="text-xl font-bold text-white mb-4">Add New Option</h3>
                 <p className="text-gray-400 text-sm mb-6">Create a new candidate for this market. It will start with 0% share.</p>
                 
                 <div className="mb-6">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Option Name</label>
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="e.g. My New Tool"
                      value={newOptionName}
                      onChange={(e) => setNewOptionName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-green-500/50 outline-none"
                    />
                 </div>

                 <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                   <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-1">
                     <Coins className="w-4 h-4" /> Cost: 0.1 SOL
                   </div>
                   <p className="text-xs text-yellow-200/70">Fee goes to the community pool.</p>
                 </div>

                 <div className="flex gap-3 mt-auto">
                   <button 
                     onClick={() => setAddingOptionMode(false)}
                     className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white"
                   >
                     Cancel
                   </button>
                   <button 
                     disabled={!newOptionName || !walletConnected || isAnimating}
                     onClick={handleAddOption}
                     className="flex-1 bg-white text-black font-bold rounded-xl py-3 hover:bg-green-400 transition-colors disabled:opacity-50"
                   >
                     {isAnimating ? 'Adding...' : 'Add & Pay 0.1 SOL'}
                   </button>
                 </div>
               </div>
            ) : (
              // STAKE MODE
              <>
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 text-sm">Your Stake</span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Wallet className="w-3 h-3" /> 
                      {walletConnected ? '82.4 SOL' : 'Not Connected'}
                    </span>
                  </div>
                  
                  <div className="relative mb-2">
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={amount}
                      disabled={isAnimating}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`w-full bg-black/40 border border-white/10 rounded-xl p-4 text-3xl font-bold text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">SOL</span>
                  </div>

                  {/* Projected Payout - THE GREED HOOK */}
                  <div className="mt-2 mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-xs text-green-400 font-bold uppercase block">Projected Payout</span>
                      <span className="text-[10px] text-gray-500">If {selectedOption.name} wins (after 5% fee)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white leading-none">{projectedWin} SOL</div>
                      <div className="text-[10px] text-green-500 font-bold">+{roi}% ROI</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[0.1, 0.5, 1, 5].map((val) => (
                      <button 
                        key={val}
                        disabled={isAnimating}
                        onClick={() => setAmount(val.toString())}
                        className={`py-2 bg-white/5 rounded-lg text-xs font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-colors ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {val} SOL
                      </button>
                    ))}
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-blue-300">Winner Takes All</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          If <span className="text-white font-bold">'{selectedOption.name}'</span> is #1 when the timer ends, you split the entire market pool. If it loses, you get <span className="text-red-400 font-bold">0 SOL</span>.
                        </p>
                        <p className="text-[10px] text-blue-300/60 mt-2 pt-2 border-t border-blue-500/20">
                          *Platform takes 5% of final pool at weekly close.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  disabled={(!amount || !walletConnected) || isAnimating}
                  onClick={handleStake}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    (!walletConnected || (!amount && !isAnimating))
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : isAnimating
                      ? 'bg-green-600 text-white scale-95'
                      : 'bg-gradient-to-r from-green-400 to-emerald-600 text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                  }`}
                >
                  {isAnimating ? (
                    <>Processing...</>
                  ) : !walletConnected ? (
                    <>Connect Wallet to Stake</>
                  ) : (
                    <>Stake on {selectedOption.name}</>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingModal;
