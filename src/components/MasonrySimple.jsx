import React, { useEffect, useState } from 'react';

export default function MasonrySimple({ items = [], renderItem, breakpoints = { sm: 1, md: 2, lg: 3 } }) {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    function updateCols() {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w >= 1280) setCols(breakpoints.lg || 3);
      else if (w >= 768) setCols(breakpoints.md || 2);
      else setCols(breakpoints.sm || 1);
    }
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [breakpoints]);

  // Distribute items left-to-right, preserving order across rows: item i -> column (i % cols)
  const columns = Array.from({ length: cols }, () => []);
  items.forEach((it, i) => {
    columns[i % cols].push(it);
  });

  return (
    <div className="flex gap-4">
      {columns.map((col, ci) => (
        <div key={ci} className="flex w-0 flex-1 flex-col gap-4">
          {col.map((item, idx) => (
            <div key={item.id || `${ci}-${idx}`}>{renderItem(item)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
