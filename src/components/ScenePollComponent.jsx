import React, { useState } from 'react';

export default function ScenePollComponent() {
  const [votes, setVotes] = useState({ optionA: 142, optionB: 89 });
  const [voted, setVoted] = useState(false);

  const sum = votes.optionA + votes.optionB;
  const pctA = Math.round((votes.optionA / sum) * 100);
  const pctB = Math.round((votes.optionB / sum) * 100);

  const processVote = (target) => {
    if (voted) return;
    setVotes(prev => ({ ...prev, [target]: prev[target] + 1 }));
    setVoted(true);
  };

  return (
    <div className="w-full bg-cyberBlack/85 backdrop-blur-md rounded-2xl p-4 border border-white/10 select-none shadow-2xl">
      <h3 className="text-white text-xs font-black tracking-wider uppercase mb-1">CHOOSE THE NEXT PRODUCTION CUT</h3>
      <p className="text-gray-400 text-[10px] mb-4">Public votes decide the official scene variation.</p>

      {/* BUTTON A: THE HERO INTERPRETATION TRACK */}
      <button onClick={() => processVote('optionA')} disabled={voted} className="w-full h-12 rounded-xl border border-white/20 mb-3 text-left relative overflow-hidden bg-white/[0.02] cursor-pointer disabled:border-white/5 disabled:cursor-default flex items-center">
        {voted && <div className="absolute top-0 left-0 bottom-0 bg-cyberTeal/25 transition-all duration-500" style={{ width: `${pctA}%` }} />}
        <div className="w-full px-4 flex justify-between items-center z-10">
          <span className="text-white text-xs font-semibold">😇 Option A: Sci-Fi Hero</span>
          {voted && <span className="text-cyberTeal text-xs font-black">{pctA}%</span>}
        </div>
      </button>

      {/* BUTTON B: THE VILLAIN INTERPRETATION TRACK */}
      <button onClick={() => processVote('optionB')} disabled={voted} className="w-full h-12 rounded-xl border border-white/20 text-left relative overflow-hidden bg-white/[0.02] cursor-pointer disabled:border-white/5 disabled:cursor-default flex items-center">
        {voted && <div className="absolute top-0 left-0 bottom-0 bg-cyberPink/25 transition-all duration-500" style={{ width: `${pctB}%` }} />}
        <div className="w-full px-4 flex justify-between items-center z-10">
          <span className="text-white text-xs font-semibold">😈 Option B: Rogue Villain</span>
          {voted && <span className="text-cyberPink text-xs font-black">{pctB}%</span>}
        </div>
      </button>
    </div>
  );
}
