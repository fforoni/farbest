export const MARKETS = [
  {
    id: 1,
    title: "Best AI Coding Assistant (Q4 2025)",
    category: "Tech",
    volume: "452.4 SOL",
    participants: 1205,
    endsIn: "4d 12h",
    options: [
      { id: 'a', name: "Cursor", share: 45, color: "from-blue-500 to-purple-500" },
      { id: 'b', name: "Windsurf", share: 35, color: "from-cyan-400 to-blue-500" },
      { id: 'c', name: "GitHub Copilot", share: 15, color: "from-slate-500 to-slate-700" },
      { id: 'd', name: "Other", share: 5, color: "from-gray-500 to-gray-600" },
    ]
  },
  {
    id: 2,
    title: "Best Chain for DeFi Yields",
    category: "Crypto",
    volume: "128.1 SOL",
    participants: 432,
    endsIn: "2d 08h",
    options: [
      { id: 's', name: "Solana", share: 55, color: "from-green-400 to-emerald-600" },
      { id: 'a', name: "Base", share: 25, color: "from-blue-600 to-blue-800" },
      { id: 'b', name: "Arbitrum", share: 15, color: "from-indigo-500 to-purple-600" },
      { id: 'c', name: "Optimism", share: 5, color: "from-red-500 to-orange-500" },
    ]
  },
  {
    id: 3,
    title: "Best Solana Wallet UX",
    category: "Crypto",
    volume: "890.5 SOL",
    participants: 2100,
    endsIn: "12h 30m", // Urgent market
    options: [
      { id: 'a', name: "Phantom", share: 70, color: "from-purple-500 to-indigo-500" },
      { id: 'b', name: "Solflare", share: 25, color: "from-orange-500 to-yellow-500" },
      { id: 'c', name: "Backpack", share: 5, color: "from-red-500 to-red-700" },
    ]
  }
];

export const LEADERBOARD_USERS = [
  { rank: 1, user: "7Xw...9jL", profit: "+145.2 SOL", winRate: "82%", badges: ["👑", "🐳"] },
  { rank: 2, user: "Hu2...k3N", profit: "+98.5 SOL", winRate: "76%", badges: ["🧠"] },
  { rank: 3, user: "9Lq...m2P", profit: "+62.1 SOL", winRate: "65%", badges: [] },
  { rank: 4, user: "3Ax...p9L", profit: "+45.0 SOL", winRate: "58%", badges: ["🎯"] },
  { rank: 5, user: "E4r...s8K", profit: "+32.4 SOL", winRate: "52%", badges: [] },
];
