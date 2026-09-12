import React from 'react';
import Link from 'next/link';

function Icon({ name, className = '' }) {
  const base = `inline-block ${className}`;
  switch (name) {
    case 'play':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
        </svg>
      );
    case 'user':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'shop':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 6h18v13a1 1 0 01-1 1H4a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 6V4a4 4 0 00-8 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'cast':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 12a7 7 0 0114 0v7H5v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'search':
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function PrimaryButton({ href, children, variant = 'primary', className = '', icon, iconPosition = 'left', ...rest }) {
  const baseStyles = 'inline-flex items-center justify-center min-h-[3rem] rounded-none font-black uppercase tracking-[0.24em] transition duration-200 ease-out transform-gpu focus:outline-none focus:ring-2 focus:ring-cyberPurple/40 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-40 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-cyberPurple text-white hover:bg-cyberPurple/90',
    secondary: 'border border-cyberBorder bg-white text-cyberBlack hover:border-cyberPurple hover:text-cyberPurple',
    accent: 'bg-cyberYellow text-slate-950 hover:bg-cyberYellow/90',
    danger: 'bg-red-500/90 text-white hover:bg-red-500',
  };
  const sizeClasses = 'px-6 py-3 text-sm';
  const classes = `${baseStyles} ${sizeClasses} ${variants[variant] ?? variants.primary} ${className}`.trim();

  const content = (
    <span className={icon ? 'inline-flex items-center justify-center gap-2' : undefined}>
      {icon && iconPosition === 'left' ? <Icon name={icon} className="w-4 h-4" /> : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? <Icon name={icon} className="w-4 h-4" /> : null}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
