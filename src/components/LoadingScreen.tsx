'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Map the CSS variables from Google Fonts in layout.tsx
const FONT_VARIANTS = [
  'var(--font-unifraktur)',   // Gothic Blackletter (Loki 'O' vibe)
  'var(--font-special-elite)',// Typewriter (TVA vibe)
  'var(--font-homemade-apple)',// Script (Loki 'K' vibe)
  'var(--font-rye)',          // Heavy Slab
  'var(--font-oswald)',       // Modern Sans
  'serif',
  'monospace'
];

interface GlitchLetterProps {
  char: string;
  index: number;
  trigger: boolean;
  onLock: () => void;
}

// Component for a single "Shapeshifting" letter
const GlitchLetter = ({ char, index, trigger, onLock }: GlitchLetterProps) => {
  const [font, setFont] = useState(FONT_VARIANTS[0]);
  const [isLocked, setIsLocked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trigger) return;

    // Start shapeshifting rapidly
    intervalRef.current = setInterval(() => {
      const randomFont = FONT_VARIANTS[Math.floor(Math.random() * FONT_VARIANTS.length)];
      setFont(randomFont);
    }, 80); // Fast cycle

    // Schedule the "Lock in" based on letter index (sequential ripple)
    // H (0) -> A (1) -> ...
    // Delay: basewaitTime + (index * staggerTime)
    const lockTime = 2500 + (index * 600); 

    const timeout = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Set Final Font (Authentic choice per letter could be cool, but here we unify or specific)
      // For "HARSH":
      // H: Serif/Gothic
      // A: Typewriter
      // R: Slab
      // S: Script
      // H: Gothic
      // Actually, per user request, "White" final. Let's pick a strong final font for readability.
      // Or we can keep them distinct like the show logo.
      // Let's keep them mixed!
      
      const finalFonts = [
        'var(--font-unifraktur)',    // H
        'var(--font-oswald)',        // A
        'var(--font-rye)',           // R
        'var(--font-homemade-apple)',// S
        'var(--font-special-elite)'  // H
      ];
      
      setFont(finalFonts[index % finalFonts.length]);
      setIsLocked(true);
      onLock();
    }, lockTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, [trigger, index, onLock]);

  return (
    <div className={`${styles.letterWrapper} ${!isLocked ? styles.cycling : styles.finalState}`}>
      <motion.span
        style={{ fontFamily: font }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {char}
      </motion.span>
      
      {/* Glitch Overlay for chaos phase */}
      {!isLocked && (
        <div className={styles.glitchLayer} data-char={char} style={{ fontFamily: font }}></div>
      )}
    </div>
  );
};


export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'video' | 'title' | 'complete'>('video');
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [lockedCount, setLockedCount] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Ref to duplicate check
  const titleTriggered = useRef(false);

  useEffect(() => {
    // Attempt auto-play
    const playMedia = async () => {
      try {
        if (videoRef.current && audioRef.current) {
          await audioRef.current.play();
          videoRef.current.muted = false;
          await videoRef.current.play();
        }
      } catch (err) {
        console.log("Autoplay blocked.");
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setShowPlayButton(true);
      }
    };
    playMedia();
  }, []);

  const handleManualStart = async () => {
    if (videoRef.current && audioRef.current) {
      try {
        setShowPlayButton(false);
        audioRef.current.play();
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        audioRef.current.currentTime = 0;
        videoRef.current.play();
      } catch (err) {
        console.error("Manual playback failed:", err);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || titleTriggered.current) return;
    const { currentTime, duration } = videoRef.current;
    
    // Trigger title phase 3 seconds before video ends
    if (duration > 0 && currentTime >= duration - 3.0) {
      titleTriggered.current = true;
      setPhase('title');
      
      // Safety net: if animations stick, force complete after 10s
      setTimeout(() => {
        if (phase !== 'complete') {
             setPhase('complete');
             onComplete();
        }
      }, 10000); 
    }
  };

  const handleSkip = () => {
    setPhase('complete');
    setTimeout(onComplete, 500);
  };

  const handleLetterLock = () => {
    setLockedCount(prev => {
        const newVal = prev + 1;
        // If all 5 letters "HARSH" are locked, wait a beat then finish
        if (newVal === 5) {
            setTimeout(() => {
                setPhase('complete');
                onComplete();
            }, 2000); // 2s to admire the final white text
        }
        return newVal;
    });
  };

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div 
          className={styles.videoContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* SCANLINES & OVERLAYS */}
          <div className={styles.scanlines}></div>

          {/* Video Layer */}
          <video
            ref={videoRef}
            className={`${styles.fullscreenVideo} ${phase === 'title' ? styles.videoHidden : ''}`}
            src="/videos/videoplayback.mp4"
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
                if (!titleTriggered.current) {
                    titleTriggered.current = true;
                    setPhase('title');
                }
            }}
          />
          
          <audio ref={audioRef} src="/videos/intro_audio.m4a" />

          {/* Manual Play Button */}
          {showPlayButton && (
            <div className={styles.overlay}>
              <button className={styles.initBtn} onClick={handleManualStart}>
                INITIALIZE TEMPAD
              </button>
            </div>
          )}

          {/* HARSH Title Sequence Layer */}
          {phase === 'title' && (
             <motion.div 
               className={styles.titleContainer}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
             >
               <h1 className={styles.harshTitle}>
                 {['H', 'A', 'R', 'S', 'H'].map((char, index) => (
                   <GlitchLetter 
                     key={index} 
                     char={char} 
                     index={index}
                     trigger={true}
                     onLock={handleLetterLock}
                   />
                 ))}
               </h1>
             </motion.div>
          )}

          <button className={styles.skipBtn} onClick={handleSkip}>
            SKIP INTRO
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
