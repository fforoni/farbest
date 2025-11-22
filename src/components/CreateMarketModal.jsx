import React, { useState } from 'react';
import { X, CheckCircle2, Plus, AlertCircle } from 'lucide-react';
import { SolanaService } from '../solana/SolanaService';

const CreateMarketModal = ({ onClose, walletConnected, setWalletConnected }) => {
  const [title, setTitle] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreate = async () => {
    try {
      if (!walletConnected) {
        // Auto-connect logic if trying to create without wallet
        await SolanaService.connect();
        if (setWalletConnected) setWalletConnected(true);
        // For demo purposes, we allow flow to continue or user to click again
        return; 
      }
      
      if (!title) return;
      
      setIsAnimating(true);
      await SolanaService.createMarket(title);
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to create market:", error);
      // Optionally set an error state here to show to the user
    } finally {
      setIsAnimating(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
        <div className="bg-gray-900 border border-green-500/30 p-8 rounded-2xl max-w-md w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none"></div>
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Market Created!</h3>
          <p className="text-gray-400 mb-6">
            You paid <span className="text-white font-bold">0.1 SOL</span>. Your market "{title}" is now live for voting.
          </p>
          <button 
             onClick={onClose}
             className="w-full py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-green-500" />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-white">Create New Market</h2>
               <p className="text-sm text-gray-400">Define a new "Best X" category.</p>
             </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Market Title</label>
            <input 
              type="text" 
              placeholder="e.g. Best Pizza Topping"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex gap-3">
             <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
             <div className="text-sm text-yellow-200/80">
               <span className="font-bold text-yellow-400">Cost: 0.1 SOL</span>
               <br />
               This fee goes directly to the community pool.
             </div>
          </div>

          <button 
            disabled={!title || isAnimating}
            onClick={handleCreate}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              isAnimating
                ? 'bg-green-600 text-white scale-95'
                : !walletConnected 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-black hover:bg-green-400 hover:scale-105'
            }`}
          >
            {isAnimating ? 'Creating...' : !walletConnected ? 'Connect Wallet to Create' : 'Create & Pay 0.1 SOL'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMarketModal;
