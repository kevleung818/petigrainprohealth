import React from 'react';
import Tag from './Tag';

const LEADERBOARD = [
  { rank: '🥇 1', user: '@Alpha_Valkyrie', pv: '96.4K', status: '+15%' },
  { rank: '🥈 2', user: '@Cyber_Ronin_X', pv: '84.1K', status: '+8%' },
  { rank: '🥉 3', user: '@MetaCreator_Alpha', pv: '43.4K', status: '+2%' }
];

const OFFICIAL_CUTS = [
  { id: 'oc1', title: 'SHADOWSTRIKE: CITY UNDER SIEGE', image: 'https://unsplash.com' },
  { id: 'oc2', title: 'GROOVE ODYSSEY: NEON STAGE', image: 'https://unsplash.com' }
];

const FEATURED_SCENES = [
  { title: 'SHADOWSTRIKE: CITY UNDER SIEGE', tag: 'Action Movie', image: 'https://unsplash.com', color: 'bg-red-600/20 text-red-400 border-red-500/30' },
  { title: 'ORIGEN: AI DREAMSCAPE', tag: 'AI Original', image: 'https://unsplash.com', color: 'bg-purple-600/20 text-purple-400 border-purple-500/30' },
  { title: 'GROOVE ODYSSEY: NEON STAGE', tag: 'Musical/Dance', image: 'https://unsplash.com', color: 'bg-pink-600/20 text-pink-400 border-pink-500/30' },
  { title: 'VELVET RUNWAY: SEASON ZERO', tag: 'Fashion Show', image: 'https://unsplash.com', color: 'bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-500/30' }
];

const FEED_POSTS = [
  { id: 'fp1', author: 'testuser@example.com', text: 'Just launched my rogue variant run in the Shadowstrike scene grid! The landmark orientation matches perfectly.', likes: '1.4K', comments: '24' },
  { id: 'fp2', author: 'alpha_creator_99', text: 'The apparel merch drop tied to the Neon Stage scene is super high-fidelity. Screen-to-cart workflow is incredibly smooth. 🔥', likes: '982', comments: '13' }
];

export default function DashboardHomeView({ onNavigate }) {
  return (
    <div className="flex flex-col gap-8 w-full animate-fadeIn">
      
      {/* BRAND BANNER HEADER ELEMENT */}
      <section className="w-full bg-[#15141b] border border-white/5 p-6 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-black text-white uppercase tracking-wide">BECOME ANYONE. STAR IN EVERYTHING.</h2>
        <p className="text-gray-400 text-xs font-serif italic mt-2 leading-relaxed">Swap features instantly into high-fidelity cinematic scenes. Vote in active campaigns and customize shoppable look profiles.</p>
      </section>

      {/* 📊 TYPE A CARDS: THE LEADERBOARD CAMPAIGNS CONTAINER PANEL */}
      <section className="w-full flex flex-col gap-3 bg-[#0c0b11] border border-white/5 p-5 rounded-xl shadow-2xl">
        <div className="w-full flex justify-between items-center border-b border-white/5 pb-2">
          <h3 className="text-white font-black text-xs tracking-widest uppercase">LIVE LEADERBOARD CAMPAIGNS</h3>
          <span className="text-[#00ffcc] font-mono text-[10px] font-bold tracking-widest uppercase">ACTIVE POLLING</span>
        </div>
        <div className="flex flex-col gap-2 font-mono text-xs text-gray-300">
          {LEADERBOARD.map((item, idx) => (
            <div key={idx} className="w-full bg-[#14131a] border border-white/5 px-4 py-3.5 rounded-lg flex justify-between items-center hover:border-white/10 transition-colors">
              <span className="font-black text-white">{item.rank} . {item.user}</span>
              <div className="flex items-center gap-6">
                <span className="text-white font-black">{item.pv} PV</span>
                <span className="text-[#00ffcc] font-bold">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👑 TYPE B CARDS: LANDSCAPE CROWN WINNER SLOTS */}
      <section className="w-full flex flex-col gap-3">
        <h3 className="text-white font-black text-xs tracking-widest uppercase border-b border-white/5 pb-2">OFFICIAL COMMUNITY CUTS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OFFICIAL_CUTS.map((cut) => (
            <div key={cut.id} className="bg-[#0c0b11] border border-white/5 p-4 rounded-xl flex flex-col gap-3 group hover:border-white/15 transition-all shadow-2xl">
              <div className="w-full aspect-[21/9] bg-[#14131a] rounded-lg overflow-hidden border border-white/5">
                <img src={cut.image} alt={cut.title} className="w-full h-full object-cover opacity-60 group-hover:scale-101 transition-transform duration-500" />
              </div>
              <div className="w-full bg-gradient-to-r from-[#ffb703] to-[#ffb703]/70 text-black font-black text-[9px] tracking-widest py-1.5 px-3 rounded-md uppercase flex items-center gap-1.5 shadow-md">
                👑 Official Crown Cut
              </div>
              <h4 className="text-white font-black text-[11px] uppercase tracking-wide mt-1 truncate">{cut.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 📦 TYPE C CARDS: ASYMMETRIC MERCH-BADGED DISPLAY SLOTS */}
      <section className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-end border-b border-white/5 pb-2">
          <h3 className="text-white font-black text-xs tracking-widest uppercase">FEATURED SCENES</h3>
          <button onClick={() => onNavigate('explore')} className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest cursor-pointer bg-transparent border-0 outline-none">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {FEATURED_SCENES.map((scene, idx) => (
            <div key={idx} className="bg-[#0c0b11] border border-white/5 p-4 rounded-xl flex flex-col justify-between gap-4 group hover:border-white/15 transition-all shadow-xl relative">
              <div className="w-full aspect-[4/3] bg-[#14131a] border border-white/5 rounded-lg overflow-hidden relative">
                <img src={scene.image} alt={scene.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                <Tag variant="muted" className={`absolute top-2 left-2 text-[8px] px-2 py-0.5 ${scene.color}`}>{scene.tag}</Tag>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-white font-black text-[11px] uppercase truncate group-hover:text-[#00ffcc] transition-colors">{scene.title}</h4>
              </div>
              <button onClick={() => onNavigate('explore')} className="w-full bg-transparent border border-white/10 text-gray-400 group-hover:text-black group-hover:bg-[#00ffcc] group-hover:border-[#00ffcc] font-black py-2 text-[9px] tracking-widest uppercase transition-all rounded-md cursor-pointer">Cast Scene</button>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL NETWORK CREATOR ACTIVITY FEED ROW */}
      <section className="w-full flex flex-col gap-4">
        <h3 className="text-white font-black text-xs tracking-widest uppercase border-b border-white/5 pb-2">CREATOR FEED</h3>
        <div className="flex flex-col gap-4">
          {FEED_POSTS.map((post) => (
            <div key={post.id} className="bg-[#0c0b11] border border-white/5 p-5 rounded-xl flex flex-col gap-3 shadow-md">
              <span className="text-white font-black font-mono text-xs">👤 {post.author}</span>
              <p className="text-gray-300 text-xs italic font-serif pl-4 border-l border-purple-500/30">"{post.text}"</p>
              <div className="flex gap-4 text-[10px] font-mono text-gray-500 pl-4 pt-2 border-t border-white/5">
                <span>❤️ {post.likes} Likes</span>
                <span>💬 {post.comments} Comments</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
