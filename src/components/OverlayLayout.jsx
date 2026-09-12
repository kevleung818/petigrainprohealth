import React from 'react';

export default function OverlayLayout({ onActionPress }) {
  return (
    <div className="absolute inset-0 p-5 flex flex-col justify-between items-center z-10 pointer-events-none">
      
      {/* Top Brand Header Bar */}
      <div className="w-full flex justify-between items-center pt-4">
        <h1 className="text-white font-black text-xl tracking-widest text-shadow">VEKAI</h1>
        <div className="flex items-center gap-2 bg-cyberBlack/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-cyberTeal animate-ping" />
          <span className="text-cyberTeal text-[10px] font-black tracking-wider">ALPHA FEED</span>
        </div>
      </div>

      {/* Right Sidebar Interaction Elements Floating Block */}
      <div className="absolute right-4 bottom-56 flex flex-col gap-5 items-center pointer-events-auto">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-cyberBlack/60 border border-white/15 backdrop-blur-md flex justify-center items-center text-lg active:scale-90 transition-transform">❤️</div>
          <span className="text-white text-[11px] font-bold mt-1 shadow-md">2.4K</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-cyberBlack/60 border border-white/15 backdrop-blur-md flex justify-center items-center text-lg active:scale-90 transition-transform">💬</div>
          <span className="text-white text-[11px] font-bold mt-1 shadow-md">184</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => alert("E-Commerce Dashboard Placeholder active.")}>
          <div className="w-12 h-12 rounded-full bg-cyberBlack/60 border border-white/15 backdrop-blur-md flex justify-center items-center text-lg active:scale-90 transition-transform">🛒</div>
          <span className="text-cyberTeal text-[10px] font-black mt-1 tracking-wider uppercase">LOOK</span>
        </div>
      </div>

      {/* Bottom Description Metadata Box and Primary Trigger Core Button */}
      <div className="w-full flex flex-col gap-3 pointer-events-auto mb-2">
        <h4 className="text-white text-sm font-bold text-shadow">@MetaCreator_Alpha</h4>
        <p className="text-gray-200 text-xs leading-relaxed max-w-[85%] text-shadow">
          Testing open-web identity transformation filters inside the Formula 1 driver video template canvas.
        </p>
        
        {/* Core Screen Interaction Switch Action Button */}
        <button onClick={onActionPress} className="w-full bg-cyberTeal text-cyberBlack font-black py-4 rounded-full text-sm tracking-wider shadow-lg shadow-cyberTeal/20 active:scale-[0.98] transition-all cursor-pointer">
          🎭 USE THIS SCENE
        </button>
      </div>

    </div>
  );
}
