import React from 'react';

export default function ProfileView({ onNavigate }) {
  return (
    <div className="w-full min-h-screen bg-[#111217] text-white flex">
      <aside className="w-64 bg-[#0A0A0C] border-r border-white/5 p-6 flex flex-col gap-6">
        <div className="font-black text-xs tracking-widest text-[#00FFCC]">ROLEVERSE</div>
        <button onClick={() => onNavigate('profile')} className="text-left text-xs text-white uppercase">🔹 Home</button>
        <button onClick={() => onNavigate('explore')} className="text-left text-xs text-gray-400 hover:text-white uppercase">▪ Explore</button>
        <button onClick={() => onNavigate('community')} className="text-left text-xs text-gray-400 hover:text-white uppercase">▪ Community</button>
        <button onClick={() => onNavigate('avatar_builder')} className="text-left text-xs text-gray-400 hover:text-white uppercase">▫ My Avatar</button>
        <button onClick={() => onNavigate('store')} className="text-left text-xs text-gray-400 hover:text-white uppercase">▫ Store</button>
      </aside>
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-black uppercase">CREATOR HOME PROFILE</h2>
        <p className="text-gray-400 text-xs mt-2">Welcome to your identity workspace hub.</p>
      </main>
    </div>
  );
}
