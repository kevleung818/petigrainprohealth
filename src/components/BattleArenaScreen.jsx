import React, { useState } from 'react';

export default function BattleArenaScreen() {
  const [votes, setVotes] = useState({ creatorA: 1842, creatorB: 2105 });
  const [hasVoted, setHasVoted] = useState(false);

  const total = votes.creatorA + votes.creatorB;
  const pctA = Math.round((votes.creatorA / total) * 100);
  const pctB = Math.round((votes.creatorB / total) * 100);

  const castArenaVote = (target) => {
    if (hasVoted) return;
    setVotes(prev => ({ ...prev, [target]: prev[target] + 1 }));
    setHasVoted(true);
  };

  return (
    <div className="w-full h-full bg-[#0A0A0C] p-4 pt-14 flex flex-col justify-between overflow-y-auto pb-24">
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <h2 className="text-white text-xs font-black tracking-widest uppercase">BATTLE ARENA</h2>
          <p className="text-gray-400 text-[9px] mt-0.5">Tap to vote on trending transformation clashes.</p>
        </div>
        <div className="bg-[#FF007F]/10 px-3 py-1 rounded-full border border-[#FF007F]/20 text-[#FF007F] text-[9px] font-black tracking-wider animate-pulse">LIVE VOTING</div>
      </div>

      <div className="flex-1 w-full flex flex-col gap-2 rounded-2xl overflow-hidden border border-white/10 min-h-[400px]">
        <div className="flex-1 bg-neutral-900 relative flex items-center justify-center p-4 border-b border-white/5">
          <div className="text-white/10 font-bold text-[10px] uppercase tracking-widest">[ Competitor Cut A ]</div>
          <div className="absolute bottom-4 left-4 z-20">
            <span className="text-white text-xs font-black">@Alpha_Valkyrie</span>
            <span className="block text-[#00FFCC] text-[10px] font-bold">Score: {hasVoted ? `${pctA}%` : votes.creatorA}</span>
          </div>
          <button onClick={() => castArenaVote('creatorA')} disabled={hasVoted} className="absolute right-4 bottom-4 bg-[#00FFCC] text-[#0A0A0C] text-[10px] font-black px-4 py-2.5 rounded-full z-20 shadow-lg active:scale-95 disabled:opacity-40">⚡ VOTE</button>
        </div>

        <div className="flex-1 bg-neutral-800 relative flex items-center justify-center p-4">
          <div className="text-white/10 font-bold text-[10px] uppercase tracking-widest">[ Competitor Cut B ]</div>
          <div className="absolute bottom-4 left-4 z-20">
            <span className="text-white text-xs font-black">@Cyber_Ronin_X</span>
            <span className="block text-[#FF007F] text-[10px] font-bold">Score: {hasVoted ? `${pctB}%` : votes.creatorB}</span>
          </div>
          <button onClick={() => castArenaVote('creatorB')} disabled={hasVoted} className="absolute right-4 bottom-4 bg-[#FF007F] text-white text-[10px] font-black px-4 py-2.5 rounded-full z-20 shadow-lg active:scale-95 disabled:opacity-40">🔥 VOTE</button>
        </div>
      </div>
    </div>
  );
}
