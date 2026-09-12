import React from 'react';

const COMMUNITY_WINNERS = [
  {
    id: 'w1',
    title: 'SHADOWSTRIKE: CITY UNDER SIEGE',
    creator: 'testuser@example.com',
    thumbnail: 'https://unsplash.com'
  },
  {
    id: 'w2',
    title: 'GROOVE ODYSSEY: NEON STAGE',
    creator: 'testuser@example.com',
    thumbnail: 'https://unsplash.com'
  }
];

export default function CommunityView({ onNavigate }) {
  return (
    <div className="w-full min-h-screen bg-[#0e0e12] text-white font-sans flex flex-col antialiased select-none">
      
      {/* 🌐 TOP APP HEADER NAVIGATION BAR */}
      <header className="w-full h-16 bg-[#070709] border-b border-white/5 px-6 flex justify-between items-center shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-[#00ffcc] flex items-center justify-center text-black font-black text-[10px]">R</div>
            <span className="font-sans font-black text-xs tracking-[0.2em] text-gray-500">ROLEVERSE</span>
          </div>
          <nav className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <button onClick={() => onNavigate?.('profile')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Home</button>
            <button onClick={() => onNavigate?.('explore')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Explore</button>
            <button onClick={() => onNavigate?.('community')} className="text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Community</button>
            <button className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Campaigns</button>
            <button onClick={() => onNavigate?.('store')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Store</button>
          </nav>
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider bg-transparent border-0 outline-none">Log Out</button>
      </header>

      {/* LOWER NAVIGATION DIVISION LAYOUT CONTROLLER */}
      <div className="w-full flex flex-1 overflow-hidden">
        
        {/* 🧭 STATIC LEFT SIDE PANEL ROW */}
        <aside className="w-60 bg-[#070709] border-r border-white/5 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-black text-white truncate">testuser@example.com</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Creator</span>
            </div>

            <nav className="flex flex-col gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">
              <button onClick={() => onNavigate?.('avatar_builder')} className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">My Avatar</button>
              <button className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">📋 My Scenes</button>
              <button className="text-left text-[#00ffcc] transition-colors cursor-pointer bg-transparent border-0 outline-none">✔ My Feed</button>
              <button className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">📍 Active Campaigns</button>
              <button onClick={() => onNavigate?.('store')} className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Merchandise Store</button>
            </nav>

            {/* STEAL THE SPOTLIGHT PANEL DISPLAY MODULE */}
            <div className="w-full bg-[#a239ea] text-white p-5 rounded-lg mt-4 flex flex-col gap-2 shadow-lg">
              <h4 className="text-[11px] font-black tracking-widest uppercase">STEAL THE SPOTLIGHT</h4>
              <p className="text-white/80 text-[10px] leading-relaxed font-medium">Cast yourself into a new scene and climb today's leaderboard.</p>
              <button className="text-left text-white/90 hover:text-white text-[10px] font-black tracking-wider uppercase bg-black/20 px-3 py-1.5 rounded mt-1 transition-colors self-start">Cast a Scene</button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
            <button className="text-left hover:text-white">Community Hub</button>
            <button className="text-left hover:text-white">Account Settings</button>
          </div>
        </aside>

        {/* 💻 MAIN HUB SUB-PAGE VIEWPORT */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col gap-8 w-full max-w-7xl mx-auto">
          
          {/* COMMUNITY HEADER STREAM PROMOTION BANNER */}
          <section className="w-full bg-[#15141b] border border-white/5 p-6 rounded-xl flex flex-col lg:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col gap-3 max-w-xl z-10">
              <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest">Community Stage</span>
              <h2 className="text-3xl font-black tracking-wide text-white uppercase">WATCH, VOTE & CROWN THE BEST CUTS</h2>
              <p className="text-gray-400 text-xs leading-relaxed max-w-md">Step into the spotlight. Vote for your favorite creator submissions and help crown each scene's Official Community Cut.</p>
            </div>
            {/* Stage Visual Reference Canvas Box Element Layout Container */}
            <div className="w-[300px] aspect-[16/10] bg-[#070709] border border-white/10 flex flex-col justify-center items-center text-center rounded-lg shrink-0 shadow-2xl relative overflow-hidden">
              <img src="https://unsplash.com" alt="Stage Frame" className="w-full h-full object-cover opacity-40 blur-xs" />
              <div className="absolute font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase select-none">[ Live Arena Active ]</div>
            </div>
          </section>

          {/* OFFICIAL COMMUNITY CUTS MATRIX GRIDS */}
          <section className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-end border-b border-white/5 pb-2">
              <h3 className="text-white font-black text-xs tracking-widest uppercase">OFFICIAL COMMUNITY CUTS</h3>
              <span className="text-gray-500 text-[10px] font-mono tracking-wider">Recently crowned winners</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMMUNITY_WINNERS.map((winner) => (
                <div key={winner.id} className="bg-[#070709] border border-white/5 p-5 rounded-xl flex flex-col gap-4 shadow-xl">
                  {/* Media Content Display Slot */}
                  <div className="w-full aspect-[16/10] bg-[#14131a] border border-white/5 rounded-lg overflow-hidden relative group">
                    <img src={winner.thumbnail} alt={winner.title} className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-500" />
                  </div>

                  {/* Gold Crown Badge Row Component */}
                  <div className="w-full bg-gradient-to-r from-[#ffb703] to-[#ffb703]/70 text-black font-black text-[9px] tracking-widest py-2 px-3 rounded-md uppercase flex items-center gap-1.5 shadow-md shadow-[#ffb703]/5">
                    👑 Official Cut
                  </div>

                  {/* Description Info Lines Block */}
                  <div className="flex flex-col gap-3 mt-1">
                    <h4 className="text-white font-black text-xs tracking-wide uppercase truncate">{winner.title}</h4>
                    <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] border border-white/10">👤</div>
                      <span className="text-gray-400 font-mono text-[11px] truncate">{winner.creator}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACTIVE POLLS FOOTER SUMMARY BADGE ROW */}
          <section className="w-full flex flex-col gap-2 mt-4 border-t border-white/5 pt-6">
            <div className="w-full flex justify-between items-center">
              <h3 className="text-white font-black text-xs tracking-widest uppercase">ACTIVE POLLS</h3>
              <span className="text-gray-500 font-mono text-[10px]">Cast your vote before time runs out</span>
            </div>
            <div className="w-full bg-[#070709] border border-dashed border-white/10 p-12 text-center text-gray-500 text-xs italic font-serif rounded-xl">
              No active stage voting matches are running on this cycle tier. Check back soon.
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}
