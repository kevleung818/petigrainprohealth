import React, { useState } from 'react';
import Tag from './Tag';

const PRODUCTS = [
  { id: '1', name: 'NEON FRONTIER HERO TEE', price: '$34.99', type: 'Apparel', tag: 'Exclusive' },
  { id: '2', name: 'SHADOWSTRIKE POSTER SERIES VOL.1', price: '$19.99', type: 'Poster/Print', tag: 'Exclusive' },
  { id: '3', name: 'RHYTHM STAGE EXCLUSIVE PRINT', price: '$24.99', type: 'Poster/Print', tag: 'Standard' },
  { id: '4', name: 'URBAN LEGEND UNISEX HOODIE', price: '$54.99', type: 'Apparel', tag: 'Standard' },
  { id: '5', name: 'GROOVE ODYSSEY CANVAS PRINT', price: '$44.99', type: 'Home Decor', tag: 'Standard' },
  { id: '6', name: 'VELVET RUNWAY ENAMEL PIN SET', price: '$14.99', type: 'Accessory', tag: 'Standard' }
];

export default function MerchandiseGrid({ onAddToCart }) {
  const [filter, setFilter] = useState('All');

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.type === filter);

  return (
    <div className="w-full bg-[#0A0A0C] p-4 flex flex-col gap-4 font-sans select-none">
      {/* Horizontal Filter Row */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Apparel', 'Poster/Print', 'Home Decor', 'Accessory'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap border ${
              filter === type
                ? 'bg-[#00FFCC] text-[#0A0A0C] border-[#00FFCC]'
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 2-Column Asymmetric Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white/[0.02] border border-white/15 p-3 flex flex-col justify-between gap-3 group rounded-sm">
            <div className="relative w-full aspect-square bg-neutral-900 flex flex-col justify-center items-center text-center p-2">
              <span className="text-white/10 font-black text-[9px] tracking-widest uppercase">[ {product.type} MOCK ]</span>
              {product.tag === 'Exclusive' && (
                <Tag variant="warm" className="absolute top-2 left-2 text-[8px] px-1.5 py-0.5">{product.tag}</Tag>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-white font-black text-[11px] leading-tight group-hover:text-[#00FFCC] transition-colors line-clamp-2">{product.name}</h4>
              <span className="text-gray-400 font-bold text-xs">{product.price}</span>
            </div>

            <button 
              onClick={() => onAddToCart()}
              className="w-full bg-transparent border border-white/20 text-white font-black py-2 text-[9px] tracking-widest hover:bg-[#00FFCC] hover:text-[#0A0A0C] hover:border-[#00FFCC] transition-all uppercase rounded-xs"
            >
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
