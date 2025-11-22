import { SOLANA_CONFIG } from './config';

export const SolanaService = {
  connect: async () => {
    console.log(`[SolanaService] Connecting to ${SOLANA_CONFIG.network}...`);
    // Mock Delay - Replace with real wallet adapter logic
    return new Promise(resolve => setTimeout(() => resolve("82.4 SOL"), 1000)); 
  },
  stake: async (marketId, optionId, amount) => {
    console.log(`[SolanaService] Staking ${amount} SOL on OptionID: ${optionId} (Market: ${marketId})`);
    // Mock Delay - Replace with program.methods.stake()
    return new Promise(resolve => setTimeout(resolve, 2000));
  },
  createMarket: async (title) => {
    console.log(`[SolanaService] Creating Market: "${title}" - Cost: 0.1 SOL`);
    // Mock Delay - Replace with program.methods.initializeMarket()
    return new Promise(resolve => setTimeout(resolve, 2000));
  },
  addOption: async (marketId, optionName) => {
    console.log(`[SolanaService] Adding Option: "${optionName}" to Market: ${marketId} - Cost: 0.1 SOL`);
    // Mock Delay - Replace with program.methods.addOption()
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
};
