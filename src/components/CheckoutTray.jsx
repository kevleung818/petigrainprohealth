import React from 'react';

export default function CheckoutTray({ count, onClear, onClose }) {
  return (
    <div className="w-full bg-[#0A0A0C] border-t border-white/10 p-5 font-sans animate-fadeIn select-none flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-white font-black text-xs tracking-widest uppercase">SHOPPING BAG SUMMARY</h3>
        <button onClick={onClose} className="text-gray-400 text-xs font-bold hover:text-white">✕ CLOSE</button>
      </div>

      <div className="w-full bg-white/5 border border-white/10 p-4 flex justify-between items-center text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="text-white font-black uppercase">Staging Order Payload</span>
          <span className="text-gray-400 text-[10px]">Alpha Tester Sandbox Instance</span>
        </div>
        <span className="text-[#00FFCC] font-black text-sm">{count} ITEMS</span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onClear}
          className="flex-1 bg-white/5 border border-white/10 text-gray-300 font-black py-3.5 text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all"
        >
          Clear Bag
        </button>
        <button 
          onClick={() => alert("Sandbox transaction success loop initialized.")}
          className="flex-1 bg-[#FF007F] text-white font-black py-3.5 text-[10px] tracking-widest uppercase shadow-lg shadow-[#FF007F]/20 active:scale-95 transition-transform"
        >
          Secure Checkout
        </button>
      </div>
    </div>
  );
}
