import React, { useState } from 'react';

export default function AvatarBuilderView({ onNavigate }) {
  return (
    <div className="w-full min-h-screen bg-[#111217] text-white font-sans flex antialiased select-none">
      
      {/* 🧭 LEFT SIDE NAVIGATION BAR */}
      <aside className="w-[240px] bg-[#0c0b11] border-r border-white/5 p-5 flex flex-col justify-between shrink-0 min-h-screen hidden md:flex">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9d4edd] to-[#00ffcc] flex items-center justify-center text-black font-black text-xs">R</div>
            <span className="font-black text-xs tracking-[0.2em] text-white">ROLEVERSE</span>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm">👤</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] text-gray-400 font-bold truncate">testuser@example.com</span>
              <span className="text-[9px] text-[#00ffcc] font-black tracking-widest uppercase mt-0.5">Creator Tier</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {['Home', 'Explore', 'Community', 'Campaigns', 'Store'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => tab === 'Store' && onNavigate('store')}
                className={`w-full text-left px-3 py-2.5 rounded-md text-[11px] font-black tracking-wider uppercase transition-all text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer`}
              >
                ▪ {tab}
              </button>
            ))}
          </div>

          <div className="w-full h-px bg-white/5 my-1" />

          <div className="flex flex-col gap-1">
            <button 
              onClick={() => onNavigate('avatar_builder')}
              className="w-full text-left px-3 py-2.5 rounded-md text-[11px] font-black tracking-wider uppercase transition-all bg-[#9d4edd]/20 text-[#00ffcc] border border-[#00ffcc]/20 cursor-pointer"
            >
              🔹 My Avatar
            </button>
            {['My Scenes', 'My Feed', 'Active Campaigns', 'Merchandise Store'].map((tab) => (
              <button key={tab} className="w-full text-left px-3 py-2.5 rounded-md text-[11px] font-black tracking-wider uppercase text-gray-500 hover:text-white transition-all">
                ▫ {tab}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* 💻 MAIN AVATAR BUILDER WORKSPACE */}
      <main className="flex-1 p-6 lg:p-10 flex flex-col gap-6 overflow-y-auto w-full max-w-6xl mx-auto">
        
        {/* HEADER BAR */}
        <header className="w-full flex justify-between items-center border-b border-white/5 pb-4">
          <div className="text-xs text-gray-400 font-mono tracking-wider">Server Pipeline: Status Online</div>
          <button className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-black tracking-widest uppercase rounded-sm hover:bg-white/10 transition-all">Log Out</button>
        </header>

        {/* HERO TITLE SECTION */}
        <section className="w-full bg-[#1b1924] border border-white/10 rounded-xl p-6 flex justify-between items-center relative overflow-hidden shadow-xl">
          <div className="flex flex-col gap-2 z-10">
            <h2 className="text-2xl font-black tracking-wide text-white uppercase">BOUNDLESS AVATAR STUDIO</h2>
            <p className="text-gray-400 text-xs max-w-xl leading-relaxed">
              Build anyone you imagine — any gender, age, ethnicity, or archetype. Your avatar steps into every scene you cast.
            </p>
          </div>
          <div className="bg-purple-600 text-white font-sans font-black text-[9px] tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-purple-600/20 shrink-0">
            ✨ No Limits
          </div>
        </section>

        {/* MAIN CONFIGURATION GRID */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: LIVE PREVIEW COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#0c0b11] border border-white/10 p-5 rounded-xl flex flex-col gap-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">LIVE PREVIEW</h3>
              <div className="w-full bg-[#14131a] rounded-lg p-3 text-[11px] font-mono border border-white/5 text-gray-500">
                Sidekick · Artist <span className="block text-[10px] text-gray-600">Caucasian · Age 24</span>
              </div>
              <div className="w-full aspect-[4/3] bg-[#14131a] border border-dashed border-white/10 rounded-lg flex items-center justify-center text-center cursor-pointer hover:border-[#00ffcc] transition-all">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Click to upload an image</span>
              </div>
            </div>
            
            {/* ACTION FOOTER BUTTONS */}
            <div className="flex gap-3">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs py-3 rounded-lg uppercase tracking-wider transition-all">
                Save Avatar
              </button>
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 font-black text-xs py-3 rounded-lg uppercase tracking-wider transition-all">
                Reset
              </button>
            </div>
          </div>

          {/* RIGHT: CONFIGURATION BLOCK FORM COLUMNS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* PANELS 1: IDENTITY */}
            <div className="bg-[#0c0b11] border border-white/10 p-5 rounded-xl flex flex-col gap-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">IDENTITY</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Gender Identity</label>
                  <select className="bg-[#14131a] border border-white/10 text-xs text-gray-400 px-3 py-2.5 rounded-md outline-none">
                    <option>Select gender</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ethnicity / Appearance</label>
                  <select className="bg-[#14131a] border border-white/10 text-xs text-gray-400 px-3 py-2.5 rounded-md outline-none">
                    <option>Select appearance</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Age</label>
                  <input type="text" defaultValue="27" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Body Type</label>
                  <input type="text" defaultValue="Athletic, tall" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none" />
                </div>
              </div>
            </div>

            {/* PANELS 2: ROLES & OVERLAYS */}
            <div className="bg-[#0c0b11] border border-white/10 p-5 rounded-xl flex flex-col gap-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">ROLES & OVERLAYS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Role Archetype</label>
                  <select className="bg-[#14131a] border border-white/10 text-xs text-gray-400 px-3 py-2.5 rounded-md outline-none">
                    <option>Select archetype</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Profession Overlay</label>
                  <select className="bg-[#14131a] border border-white/10 text-xs text-gray-400 px-3 py-2.5 rounded-md outline-none">
                    <option>Select profession</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PANELS 3: STYLE & CULTURE */}
            <div className="bg-[#0c0b11] border border-white/10 p-5 rounded-xl flex flex-col gap-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">STYLE & CULTURE</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Cultural Attire</label>
                  <input type="text" defaultValue="Traditional silk hanbok" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Style Accessories</label>
);}