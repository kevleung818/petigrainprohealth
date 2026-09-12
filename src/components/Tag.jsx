import React from 'react';

export default function Tag({ children, variant = 'muted', className = '', icon }) {
  const variants = {
    muted: 'bg-white/5 border border-white/8 text-white/80',
    neon: 'bg-cyberTeal/10 text-cyberTeal border border-cyberTeal/20',
    warm: 'bg-cyberYellow/10 text-cyberYellow border border-cyberYellow/20',
    purple: 'bg-cyberPurple/10 text-cyberPurple border border-cyberPurple/20',
    glass: 'backdrop-blur-sm bg-white/6 text-white border border-white/6'
  };

  // square tag with small-caps styling
  const base = `inline-flex items-center gap-2 px-3 py-1 text-2xs font-black tracking-wider rounded-none ${variants[variant] ?? variants.muted} ${className}`.trim();

  return (
    <span className={base} style={{ fontVariant: 'small-caps', textTransform: 'lowercase' }}>
      {icon ? <span className="w-3 h-3 inline-block">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}
