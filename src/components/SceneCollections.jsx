import React from 'react';

const COLLECTIONS = [
  { id: 'c1', title: 'The Cyberpunk Vault', count: '12 items' },
  { id: 'c2', title: 'Formula 1 Paddock', count: '8 items' },
  { id: 'c3', title: 'K-Pop Stage Drop', count: '15 items' },
  { id: 'c4', title: 'Retro Hollywood Glam', count: '6 items' }
];

export default function SceneCollections({ onSelectCollection }) {
  return (
    <div className="w-full bg-[#0A0A0C] px-4 py-2 font-sans select-none flex flex-col gap-3">
      <h3 className="text-white text-xs font-black tracking-widest uppercase border-b border-white/5 pb-2">SCENE COLLECTIONS</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {COLLECTIONS.map((col) => (
          <div 
            key={col.id}
            onClick={() => onSelectCollection(col.title)}
            className="w-full bg-white/[0.01] border border-white/5 p-4 flex flex-col gap-1 cursor-pointer hover:border-white/20 transition-all rounded-sm group"
          >
            <span className="text-white text-[11px] font-black tracking-wide leading-tight group-hover:text-[#00FFCC] transition-colors">{col.title}</span>
            <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider">{col.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
