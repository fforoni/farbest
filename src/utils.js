// Helper to calculate staked amount from volume string
export const getStakedAmount = (volumeStr, sharePct) => {
  const vol = parseFloat(volumeStr.split(' ')[0]);
  return (vol * sharePct / 100).toFixed(1);
};
