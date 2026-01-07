'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './SpaghettiScroll.module.css';

interface SpaghettiScrollProps {
  children: React.ReactNode;
}

export default function SpaghettiScroll({ children }: SpaghettiScrollProps) {
  const [phase, setPhase] = useState<'normal' | 'glitching' | 'warping' | 'arriving'>('normal');
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollAccumulatorRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const isAtBottomRef = useRef<boolean>(false);
  
  // Threshold for how much additional scrolling is needed at the bottom
  const SCROLL_THRESHOLD = 80;
  
  // Hide scrollbar during transition
  useEffect(() => {
    if (phase !== 'normal') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [phase]);
  
  // Handle wheel events to detect continued scrolling at bottom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (phase !== 'normal') return;
      
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollPercent = scrollTop / (scrollHeight - clientHeight);
      
      // Check if we're at the bottom
      if (scrollPercent >= 0.98) {
        isAtBottomRef.current = true;
        
        // Only accumulate downward scroll attempts
        if (e.deltaY > 0) {
          scrollAccumulatorRef.current += e.deltaY;
          
          // Trigger immediately when threshold is met
          if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD) {
            scrollAccumulatorRef.current = 0;
            triggerWarp();
          }
        } else {
          // Reset if scrolling up
          scrollAccumulatorRef.current = 0;
        }
      } else {
        // Reset when not at bottom
        isAtBottomRef.current = false;
        scrollAccumulatorRef.current = 0;
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [phase]);
  
  // Function to trigger the warp sequence
  const triggerWarp = () => {
    if (phase !== 'normal') return;
    
    // Phase 1: Glitching starts
    setPhase('glitching');
    
    // Phase 2: Warp/distortion
    setTimeout(() => {
      setPhase('warping');
      
      // Reset scroll during warp
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 1500);
      
      // Phase 3: Arrival
      setTimeout(() => {
        setPhase('arriving');
        
        // Back to normal
        setTimeout(() => {
          setPhase('normal');
        }, 2000);
      }, 2000);
    }, 1500);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (phase !== 'normal') return;
      
      const scrollTop = window.scrollY;
      lastScrollYRef.current = scrollTop;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phase]);
  
  return (
    <div className={styles.container}>
      {/* Main content */}
      <div 
        ref={contentRef}
        className={`${styles.content} ${styles[phase]}`}
      >
        {children}
      </div>
      
      {/* TVA-style overlay effects */}
      <div className={`${styles.overlay} ${phase !== 'normal' ? styles.active : ''}`}>
        {/* Scanlines */}
        <div className={styles.scanlines} />
        
        {/* Glitch bars */}
        {(phase === 'glitching' || phase === 'warping') && (
          <div className={styles.glitchBars}>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={styles.glitchBar}
                style={{ 
                  top: `${10 + i * 12}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Center vortex */}
        <div className={styles.vortex} />
        
        {/* Grid distortion */}
        <div className={styles.gridDistortion} />
        
        {/* TVA terminal message */}
        {phase === 'warping' && (
          <div className={styles.terminalMessage}>
            <span className={styles.terminalText}>TIMELINE BRANCHING DETECTED</span>
            <span className={styles.terminalSubtext}>RESETTING TO ORIGIN POINT...</span>
          </div>
        )}
      </div>
    </div>
  );
}
