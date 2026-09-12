import React from 'react';

const CATEGORIES = [
  { id: '1', name: '🤖 Sci-Fi', active: true },
  { id: '2', name: '🏎️ Racing', active: false },
  { id: '3', name: '🎤 K-Pop', active: false },
  { id: '4', name: '🎬 Action', active: false },
];

export default function StudioGrid({ onSelectCategory }) {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-3 px-4 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/5 scrollbar-none z-30 relative">
      <div className="flex gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-[10px] font-black tracking-wider transition-all cursor-pointer ${
              cat.active 
                ? 'bg-[#00FFCC] text-[#0A0A0C] shadow-lg shadow-[#00FFCC]/20' 
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            {cat.name.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
