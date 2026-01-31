'use client';

interface SpaghettiScrollProps {
  children: React.ReactNode;
}

// Simplified scroll wrapper - removed TVA timeline warp effect
export default function SpaghettiScroll({ children }: SpaghettiScrollProps) {
  return (
    <div>
      {children}
    </div>
  );
}
