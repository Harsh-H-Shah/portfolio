'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './SpaghettiScroll.module.css';

interface SpaghettiScrollProps {
  children: React.ReactNode;
}

export default function SpaghettiScroll({ children }: SpaghettiScrollProps) {
  const [phase, setPhase] = useState<'normal' | 'glitching' | 'warping' | 'arriving'>('normal');
  const contentRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (phase !== 'normal') return;
      
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollPercent = scrollTop / (scrollHeight - clientHeight);
      
      if (scrollPercent >= 0.98) {
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
      }
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
