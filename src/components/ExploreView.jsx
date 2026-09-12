import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import Tag from './Tag';

const SCENES_DATA = [
  { id: 's1', tag: 'Action Movie', title: 'SHADOWSTRIKE: CITY UNDER SIEGE', desc: 'A high-octane action movie scene set in a dystopian city, featuring explosive stunts and hero-villain face-offs.', roles: '2 roles', views: '96400 views', color: 'bg-red-600/20 text-red-400 border-red-500/30' },
  { id: 's2', tag: 'AI Original', title: 'ORIGEN: AI DREAMSCAPE', desc: 'A fully AI-original high-concept dreamscape with surreal visuals and narrative arcs.', roles: '0 roles', views: '11500 views', color: 'bg-purple-600/20 text-purple-400 border-purple-500/30' },
  { id: 's3', tag: 'Musical/Dance', title: 'GROOVE ODYSSEY: NEON STAGE', desc: 'A vibrant musical dance scene submitted by a community creator, bursting with neon lights and rhythm.', roles: '1 role', views: '51200 views', color: 'bg-pink-600/20 text-pink-400 border-pink-500/30' },
  { id: 's4', tag: 'Fashion Show', title: 'VELVET RUNWAY: SEASON ZERO', desc: 'A glamorous fashion show runway scene submitted by a community creator.', roles: '0 roles', views: '46700 views', color: 'bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-500/30' },
  { id: 's5', tag: 'News Broadcast', title: 'BREAKING NOW: STUDIO 7 LIVE', desc: 'A live-style news broadcast scene with an AI anchor delivering breaking news.', roles: '1 role', views: '51000 views', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
  { id: 's6', tag: 'TV Drama', title: 'WHISPERS IN THE WARD', desc: 'An emotional TV drama unfolding in a hospital ward, with complex character dynamics.', roles: '2 roles', views: '43500 views', color: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' }
];

export default function ExploreView({ onNavigate }) {
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  return (
    <div className="w-full min-h-screen bg-[#111217] text-white font-sans flex flex-col antialiased select-none">
      
      {/* HEADER ROW */}
      <header className="w-full h-16 bg-[#070709] border-b border-white/5 px-8 flex justify-between items-center shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-[#00ffcc] flex items-center justify-center text-black font-black text-[10px]">R</div>
            <span className="font-sans font-black text-xs tracking-[0.2em] text-white">ROLEVERSE</span>
          </div>
          <nav className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <button onClick={() => onNavigate?.('profile')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Home</button>
            <button onClick={() => onNavigate?.('explore')} className="text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Explore</button>
            <button onClick={() => onNavigate?.('community')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Community</button>
            <button onClick={() => onNavigate?.('store')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">Store</button>
          </nav>
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider bg-transparent border-0 outline-none">Log Out</button>
      </header>

      {/* CORE CONTENT LAYOUT SPLIT */}
      <div className="w-full flex flex-1 overflow-hidden">
        
        {/* SIDEBAR NAVIGATION PANEL */}
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
          </div>
        </aside>

        {/* COMPONENT BODY */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col gap-8 w-full max-w-7xl mx-auto">
          
          {/* HERO HEADER */}
          <section className="w-full bg-[#15141b] border border-white/5 p-6 rounded-xl flex flex-col lg:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col gap-3 max-w-xl z-10">
              <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest">Scene Library</span>
              <h2 className="text-3xl font-black tracking-wide text-white uppercase">STEP INTO ANY STORY</h2>
              <p className="text-gray-400 text-xs leading-relaxed max-w-md">Browse cinematic scenes, pick your role, and cast your avatar into the spotlight. Or dream up something entirely new with the AI Scene Generator.</p>
            </div>
            <div className="w-[300px] aspect-[16/10] bg-[#070709] border border-white/10 flex flex-col justify-center items-center text-center p-4 rounded-lg shrink-0 shadow-2xl relative">
              <div className="absolute inset-0 bg-yellow-600/[0.03] border border-yellow-500/20 m-2 rounded flex flex-col justify-center items-center font-mono">
                <span className="text-yellow-500 text-[10px] font-black tracking-[0.3em] uppercase block">PICTURE HOUSE</span>
                <span className="text-red-500 text-xs font-black tracking-[0.1em] mt-1.5 uppercase block">CENTRAL CINEMA</span>
              </div>
            </div>
          </section>

          {/* FILTER DROPDOWN BAR */}
          <section className="w-full bg-[#070709] border border-white/5 p-4 rounded-xl flex justify-between items-center">
            <div className="flex flex-col gap-1 w-full max-w-xs">
              <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Filter by Category</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-[#0e0e12] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none font-bold">
                {['All Categories', 'Action Movie', 'AI Original', 'Musical/Dance', 'Fashion Show', 'News Broadcast', 'TV Drama'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </section>

          {/* MAIN IMAGES ITEMS LIST SECTIONS */}
          <section className="w-full flex flex-col gap-4">
            <h3 className="text-white font-black text-xs tracking-widest uppercase border-b border-white/5 pb-2">AVAILABLE SCENES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCENES_DATA.map((scene) => (
                <div key={scene.id} className="bg-[#070709] border border-white/5 p-5 rounded-xl flex flex-col justify-between gap-4 shadow-lg">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                      <Tag variant="purple" className="text-[8px] px-2 py-0.5">{scene.tag}</Tag>
                    </div>
                    <h4 className="text-white font-black text-xs tracking-wide uppercase leading-tight min-h-[32px]">{scene.title}</h4>
                    <p className="text-gray-400 text-[11px] font-serif leading-relaxed italic line-clamp-3">{scene.desc}</p>
                    <div className="flex gap-4 items-center text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3 mt-1">
                      <span>👥 {scene.roles}</span>
                      <span>👁️ {scene.views}</span>
                    </div>
                  </div>
                  <div className="w-full flex gap-2 border-t border-white/5 pt-3">
                    <PrimaryButton className="flex-1 text-[10px] tracking-widest rounded-md btn-small" variant="primary" icon="cast">
                      Cast Into Scene
                    </PrimaryButton>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}
