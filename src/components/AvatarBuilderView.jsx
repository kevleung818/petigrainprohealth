import React, { useState } from 'react';

export default function AvatarBuilderView({ onNavigate }) {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageUpload = (e) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      setAvatarPreview(URL.createObjectURL(uploadedFiles[0]));
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0e0e12] text-white font-sans flex flex-col antialiased select-none">
      <header className="w-full h-16 bg-[#070709] border-b border-white/5 px-6 flex justify-between items-center shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-[#00ffcc] flex items-center justify-center text-black font-black text-[10px]">
              R
            </div>
            <span className="font-sans font-black text-xs tracking-[0.2em] text-gray-500">ROLEVERSE</span>
          </div>
          <nav className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <button onClick={() => onNavigate?.('profile')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
              Home
            </button>
            <button onClick={() => onNavigate?.('explore')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
              Explore
            </button>
            <button onClick={() => onNavigate?.('community')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
              Community
            </button>
            <button className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
              Campaigns
            </button>
            <button onClick={() => onNavigate?.('store')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
              Store
            </button>
          </nav>
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider bg-transparent border-0 outline-none">
          Log Out
        </button>
      </header>

      <div className="w-full flex flex-1 overflow-hidden">
        <aside className="w-60 bg-[#070709] border-r border-white/5 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-black text-white truncate">testuser@example.com</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Creator</span>
            </div>

            <nav className="flex flex-col gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">
              <button onClick={() => onNavigate?.('avatar_builder')} className="text-left text-[#00ffcc] transition-colors cursor-pointer bg-transparent border-0 outline-none">
                My Avatar
              </button>
              <button className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
                📋 My Scenes
              </button>
              <button className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
                ✔ My Feed
              </button>
              <button className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
                📍 Active Campaigns
              </button>
              <button onClick={() => onNavigate?.('store')} className="text-left hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none">
                Merchandise Store
              </button>
            </nav>

            <div className="w-full bg-[#a239ea] text-white p-5 rounded-lg mt-4 flex flex-col gap-2 shadow-lg">
              <h4 className="text-[11px] font-black tracking-widest uppercase">STEAL THE SPOTLIGHT</h4>
              <p className="text-white/80 text-[10px] leading-relaxed font-medium">
                Cast yourself into a new scene and climb today's leaderboard.
              </p>
              <button className="text-left text-white/90 hover:text-white text-[10px] font-black tracking-wider uppercase bg-black/20 px-3 py-1.5 rounded mt-1 transition-colors self-start">
                Cast a Scene
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col gap-6 w-full max-w-7xl mx-auto">
          <section className="w-full bg-[#15141b] border border-white/5 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col gap-2 z-10">
              <h2 className="text-2xl font-black tracking-wide text-white uppercase">BOUNDLESS AVATAR STUDIO</h2>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xl">
                Build anyone you imagine — any gender, age, ethnicity, or archetype. Your avatar steps into every scene you cast.
              </p>
            </div>
            <div className="bg-gradient-to-r from-[#9d4edd] to-[#a239ea] text-white font-sans font-black text-[9px] tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shrink-0">
              ✨ No Limits
            </div>
          </section>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-[#070709] border border-white/5 p-5 rounded-xl flex flex-col gap-4 shadow-xl">
                <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">LIVE PREVIEW</h3>
                <div className="w-full h-px bg-white/5" />
                <div>
                  <h4 className="text-white font-black text-sm tracking-wide">Sidekick · Artist</h4>
                  <span className="text-[11px] text-gray-500 font-mono block mt-0.5">Caucasian · Age 24</span>
                </div>

                <label className="w-full aspect-[4/3] bg-[#14131a] border border-dashed border-white/10 rounded-lg flex flex-col justify-center items-center text-center relative overflow-hidden cursor-pointer group hover:border-purple-500 transition-colors p-4">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                      Click to upload an image
                    </span>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <div className="flex gap-3">
                <button onClick={() => alert('Avatar saved successfully.')} className="flex-1 bg-[#a239ea] hover:bg-[#8b2fd1] text-white font-black text-xs py-3 rounded-md uppercase tracking-wider transition-colors">
                  Save Avatar
                </button>
                <button onClick={() => setAvatarPreview(null)} className="flex-1 bg-transparent border border-white/10 text-gray-400 hover:text-white font-black text-xs py-3 rounded-md uppercase tracking-wider transition-colors">
                  Reset
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-[#070709] border border-white/5 p-5 rounded-xl flex flex-col gap-4 shadow-xl">
                <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">IDENTITY</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-gray-400">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Gender Identity</label>
                    <select className="bg-[#14131a] border border-white/10 text-xs text-gray-300 px-3 py-2.5 rounded-md outline-none font-bold">
                      <option>Select gender</option>
                      <option>Non-Binary / Decentralized</option>
                      <option>Masculine Profile</option>
                      <option>Feminine Profile</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Ethnicity / Appearance</label>
                    <select className="bg-[#14131a] border border-white/10 text-xs text-gray-300 px-3 py-2.5 rounded-md outline-none font-bold">
                      <option>Select appearance</option>
                      <option>Caucasian</option>
                      <option>East Asian</option>
                      <option>Latino</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Age</label>
                    <input type="text" defaultValue="27" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none font-bold" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Body Type</label>
                    <input type="text" defaultValue="Athletic, tall" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none font-bold" />
                  </div>
                </div>
              </div>

              <div className="bg-[#070709] border border-white/5 p-5 rounded-xl flex flex-col gap-4 shadow-xl">
                <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">LOOK & DETAILS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-gray-400">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Signature Style</label>
                    <select className="bg-[#14131a] border border-white/10 text-xs text-gray-300 px-3 py-2.5 rounded-md outline-none font-bold">
                      <option>Select style</option>
                      <option>Cyberpunk</option>
                      <option>Streetwear</option>
                      <option>Avant-Garde</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Energy</label>
                    <input type="text" defaultValue="Electric" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none font-bold" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Aura</label>
                    <input type="text" defaultValue="Radiant" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none font-bold" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-widest">Character Role</label>
                    <input type="text" defaultValue="Artist / Sidekick" className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none font-bold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
