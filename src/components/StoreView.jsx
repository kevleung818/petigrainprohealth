import React, { useState } from 'react';
import Tag from './Tag';

const STORE_ITEMS = [
  { id: 'p1', name: 'RHYTHM STAGE EXCLUSIVE PRINT', price: '$24.99', type: 'Poster/Print', desc: 'Premium poster celebrating the best Rhythm Wars performances.', scene: 'Rhythm Stage', tag: 'Standard', color: 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/20' },
  { id: 'p2', name: 'URBAN LEGEND UNISEX HOODIE', price: '$54.99', type: 'Apparel', desc: 'Classic hoodie with urban hero iconography, available in multiple sizes.', scene: 'Urban Legend', tag: 'Standard', color: 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/20' },
  { id: 'p3', name: 'GROOVE ODYSSEY CANVAS PRINT', price: '$44.99', type: 'Home Decor', desc: 'Canvas wall art print from the iconic Groove Odyssey stage.', scene: 'Groove Odyssey', tag: 'Standard', color: 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/20' },
  { id: 'p4', name: 'VELVET RUNWAY ENAMEL PIN SET', price: '$14.99', type: 'Accessory', desc: 'Handcrafted enamel pin set inspired by the Velvet Runway Fashion Show scene.', scene: 'Velvet Runway', tag: 'Standard', color: 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/20' },
  { id: 'p6', name: 'SHADOWSTRIKE POSTER SERIES VOL.1', price: '$19.99', type: 'Poster/Print', desc: 'High-quality print poster capturing the most iconic Shadowstrike scenes.', scene: 'Shadowstrike', tag: 'Exclusive', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  { id: 'p7', name: 'NEON FRONTIER HERO TEE', price: '$34.99', type: 'Apparel', desc: 'Limited-edition campaign tee featuring the Hero emblem from Neon Frontier.', scene: 'Neon Frontier', tag: 'Exclusive', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' }
];

const SCENE_COLLECTIONS = ["Neon Frontier", "Shadowstrike", "Rhythm Stage", "Urban Legend", "Groove Odyssey", "Velvet Runway"];

export default function StoreView() {
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchScene, setSearchScene] = useState('');
  const [cart, setCart] = useState([]);

  const filteredProducts = STORE_ITEMS.filter(product => {
    const matchesType = selectedType === 'All Types' || product.type === selectedType;
    const matchesScene = searchScene === '' || product.name.toLowerCase().includes(searchScene.toLowerCase()) || product.scene.toLowerCase().includes(searchScene.toLowerCase());
    return matchesType && matchesScene;
  });

  return (
    <div className="flex flex-col gap-8 w-full animate-fadeIn">
      
      {/* MASTER PROMOTION BANNER CONTAINER */}
      <section className="w-full bg-[#15141b] border border-white/5 p-6 rounded-xl flex flex-col lg:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col gap-3 max-w-xl z-10">
          <h2 className="text-3xl font-black tracking-wide text-white uppercase">THE ROLEVERSE STORE</h2>
          <p className="text-gray-400 text-xs leading-relaxed max-w-md font-serif italic">Wear the role. Own the moment. Shop merch tied to the scenes and community cuts you love.</p>
        </div>
        <div className="w-[300px] aspect-[16/10] bg-[#070709] border border-white/10 flex flex-col justify-center items-center rounded-lg shrink-0 overflow-hidden relative">
          <img src="https://fals.ai" alt="Showcase frame" className="w-full h-full object-cover opacity-70" />
        </div>
      </section>

      {/* FILTER CONTROL BAR */}
      <section className="w-full bg-[#070709] border border-white/5 p-5 rounded-xl flex flex-col lg:flex-row justify-between items-center gap-4">
        <h3 className="text-white font-black text-xs tracking-widest uppercase">BROWSE ALL MERCHANDISE</h3>
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 flex-1 max-w-xl justify-end">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Item Type</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none font-bold">
              {['All Types', 'Apparel', 'Poster/Print', 'Home Decor', 'Accessory'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Associated Scene</label>
            <input type="text" placeholder="Search by scene..." value={searchScene} onChange={(e) => setSearchScene(e.target.value)} className="bg-[#14131a] border border-white/10 text-xs text-white px-3 py-2.5 rounded-md outline-none placeholder-gray-600 font-bold" />
          </div>
        </div>
      </section>

      {/* 📦 TYPE C CARDS: EXPLICIT PRODUCT SELECTION CATALOG MATRIX */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-[#0c0b11] border border-white/5 p-4 rounded-xl flex flex-col justify-between gap-4 group hover:border-white/15 transition-all shadow-2xl relative">
            <div className="w-full aspect-[4/3] bg-[#14131a] border border-white/5 flex flex-col justify-center items-center p-3 relative rounded-lg overflow-hidden shrink-0">
              <span className="text-white/5 font-mono text-[9px] tracking-widest uppercase select-none">[ {product.type} ]</span>
              <Tag variant={product.tag === 'Exclusive' ? 'warm' : 'muted'} className={`absolute top-2 left-2 text-[8px] px-2 py-0.5 ${product.color}`}>{product.tag}</Tag>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-gray-500 text-[8px] font-mono tracking-widest uppercase block">{product.type}</span>
              <h4 className="text-white font-black text-xs leading-tight tracking-wide group-hover:text-[#00ffcc] transition-colors line-clamp-2 uppercase min-h-[32px] mt-1">{product.name}</h4>
              <p className="text-gray-400 text-[10px] font-serif leading-normal italic line-clamp-2 mt-1">{product.desc}</p>
              <span className="text-gray-200 font-mono text-xs font-black block mt-2">{product.price}</span>
            </div>
            <button onClick={() => setCart(prev => [...prev, product.id])} className="w-full bg-transparent border border-white/10 text-gray-400 group-hover:text-black group-hover:bg-[#00ffcc] group-hover:border-[#00ffcc] font-black py-2.5 text-[10px] tracking-widest uppercase transition-all rounded-md cursor-pointer">Add to Bag</button>
          </div>
        ))}
      </section>

      {/* MINIMAL CARD ARRAYS FOR SCENE PACK COLLECTIONS */}
      <section className="w-full flex flex-col gap-4 mt-2">
        <h3 className="text-white font-black text-sm tracking-widest uppercase">SCENE COLLECTIONS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCENE_COLLECTIONS.map((sceneName) => (
            <div key={sceneName} className="bg-[#0c0b11] border border-white/5 p-5 rounded-xl flex flex-col justify-between gap-3 group hover:border-white/15 transition-all shadow-xl">
              <div className="flex flex-col gap-1">
                <h4 className="text-[#f5f5f7] font-black text-xs tracking-wide uppercase group-hover:text-[#00ffcc] transition-colors">{sceneName} Collection</h4>
                <p className="text-gray-400 text-[10px] font-serif italic">Shop merch curated around this production context.</p>
              </div>
              <button onClick={() => setSearchScene(sceneName)} className="w-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-white font-black py-2 text-[9px] tracking-widest uppercase rounded-md transition-all text-center cursor-pointer">View Collection</button>
            </div>
          ))}
        </div>
      </section>

      {/* FLOATING ACTION CART HUD OVERLAY */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-[#00ffcc] text-black px-5 py-3.5 rounded-full font-black text-[11px] tracking-widest shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <span>🛍️ CART COUNT</span>
          <span className="bg-black text-white px-2 py-0.5 rounded-full text-[9px]">{cart.length}</span>
          <button onClick={() => setCart([])} className="text-[9px] border-l border-black/20 pl-2 opacity-60 hover:opacity-100 uppercase bg-transparent border-0 outline-none cursor-pointer">Clear</button>
        </div>
      )}

    </div>
  );
}
