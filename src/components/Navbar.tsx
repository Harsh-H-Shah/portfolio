'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './Navbar.module.css';

const sections = [
  { id: 'hero', label: 'Home', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'skills', label: 'Skills', num: '03' },
  { id: 'projects', label: 'Work', num: '04' },
  { id: 'contact', label: 'Say Hi', num: '05' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const circleRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Show nav only after scrolling past hero
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 500);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIdx = Math.max(0, Math.min(sections.length - 1, activeIdx + direction));
    handleClick(sections[nextIdx].id);
  }, [activeIdx, handleClick]);

  const circleTextContent = sections.map((s) => s.label.toUpperCase()).join(' · ') + ' · ';

  return (
    <>
      {/* Left — Rotating Circle Nav (appears after hero) */}
      <motion.div
        className={styles.navWrapper}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -30 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <div className={styles.circleNav} onWheel={handleWheel}>
          <div className={styles.circleRing} />

          <motion.svg
            className={styles.circleText}
            viewBox="0 0 120 120"
            style={{ rotate: circleRotation }}
          >
            <defs>
              <path
                id="navCirclePath"
                d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
              />
            </defs>
            <text className={styles.circleTextPath}>
              <textPath href="#navCirclePath" startOffset="0%">
                {circleTextContent}
              </textPath>
            </text>
          </motion.svg>

          <div className={styles.circleCenter}>
            <span className={styles.circleCenterNum}>{sections[activeIdx].num}</span>
            <span className={styles.circleCenterLabel}>{sections[activeIdx].label}</span>
          </div>
        </div>

        <div className={styles.sectionDots}>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              className={`${styles.dot} ${active === id ? styles.dotActive : ''}`}
              onClick={() => handleClick(id)}
              aria-label={label}
            >
              <span className={styles.dotTooltip}>{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Right — Vertical Progress Bar (also appears after hero) */}
      <motion.div
        className={styles.progressWrapper}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <span className={styles.progressLabel}>scroll</span>
        <div className={styles.progressTrack}>
          <motion.div className={styles.progressFill} style={{ height: progressHeight }} />
        </div>
      </motion.div>
    </>
  );
}
