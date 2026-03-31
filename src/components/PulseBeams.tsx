'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BeamPath {
  path: string;
  gradientConfig: {
    initial: { x1: string; x2: string; y1: string; y2: string };
    animate: { x1: string | string[]; x2: string | string[]; y1: string | string[]; y2: string | string[] };
    transition?: Record<string, unknown>;
  };
  connectionPoints?: { cx: number; cy: number; r: number }[];
}

const beams: BeamPath[] = [
  {
    path: 'M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: { x1: ['0%', '0%', '200%'], x2: ['0%', '0%', '180%'], y1: ['80%', '0%', '0%'], y2: ['100%', '20%', '20%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0.4 },
    },
    connectionPoints: [{ cx: 6.5, cy: 398.5, r: 5 }, { cx: 269, cy: 220.5, r: 5 }],
  },
  {
    path: 'M568 200H841C846.523 200 851 195.523 851 190V40',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: { x1: ['20%', '100%', '100%'], x2: ['0%', '90%', '90%'], y1: ['80%', '80%', '-20%'], y2: ['100%', '100%', '0%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 1.2 },
    },
    connectionPoints: [{ cx: 851, cy: 34, r: 5.5 }, { cx: 568, cy: 200, r: 5 }],
  },
  {
    path: 'M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: { x1: ['20%', '100%', '100%'], x2: ['0%', '90%', '90%'], y1: ['80%', '80%', '-20%'], y2: ['100%', '100%', '0%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0.8 },
    },
    connectionPoints: [{ cx: 142, cy: 427, r: 5.5 }, { cx: 425.5, cy: 274, r: 5 }],
  },
  {
    path: 'M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427',
    gradientConfig: {
      initial: { x1: '40%', x2: '50%', y1: '160%', y2: '180%' },
      animate: { x1: '0%', x2: '10%', y1: '-40%', y2: '-20%' },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 1.6 },
    },
    connectionPoints: [{ cx: 770, cy: 427, r: 5.5 }, { cx: 493, cy: 274, r: 5 }],
  },
  {
    path: 'M380 168V17C380 11.4772 384.477 7 390 7H414',
    gradientConfig: {
      initial: { x1: '-40%', x2: '-10%', y1: '0%', y2: '20%' },
      animate: { x1: ['40%', '0%', '0%'], x2: ['10%', '0%', '0%'], y1: ['0%', '0%', '180%'], y2: ['20%', '20%', '200%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0.2 },
    },
    connectionPoints: [{ cx: 420.5, cy: 6.5, r: 5 }, { cx: 380, cy: 168, r: 5 }],
  },
];

export default function PulseBeams() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '10%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.35,
      }}
    >
      <svg
        width={858}
        height={434}
        viewBox="0 0 858 434"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {beams.map((beam, i) => (
          <React.Fragment key={i}>
            <path d={beam.path} stroke="rgba(26,26,26,0.06)" strokeWidth="1" />
            <path d={beam.path} stroke={`url(#hbeam${i})`} strokeWidth="2" strokeLinecap="round" />
            {beam.connectionPoints?.map((pt, j) => (
              <circle key={`${i}-${j}`} cx={pt.cx} cy={pt.cy} r={pt.r} fill="rgba(26,26,26,0.04)" stroke="rgba(37,99,235,0.15)" />
            ))}
          </React.Fragment>
        ))}
        <defs>
          {beams.map((beam, i) => (
            <motion.linearGradient
              key={i}
              id={`hbeam${i}`}
              gradientUnits="userSpaceOnUse"
              initial={beam.gradientConfig.initial}
              animate={beam.gradientConfig.animate}
              transition={beam.gradientConfig.transition}
            >
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="20%" stopColor="#2563eb" stopOpacity="1" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
