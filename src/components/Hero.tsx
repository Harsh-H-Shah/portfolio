'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

// Glitch text effect
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span className={`${styles.glitchText} ${isGlitching ? styles.glitching : ''} ${className || ''}`} data-text={text}>
      {text}
    </span>
  );
}

// Text reveal animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const lineVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={containerRef}>
      {/* TVA Grid Background */}
      <div className={styles.tvaBackground}>
        <div className={styles.gridLines} />
        <div className={styles.scanLine} />
        <div className={styles.cornerMarkers} />
      </div>

      {/* Main content */}
      <motion.div 
        className={`container ${styles.heroContainer}`}
        style={{ y, opacity }}
      >
        {/* TVA Header Bar */}
        <motion.div 
          className={styles.tvaHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.tvaLogo}>
            <span className={styles.tvaText}>TVA</span>
            <span className={styles.tvaSubtext}>TEMPORAL PORTFOLIO</span>
          </div>
          <div className={styles.tvaTime}>
            <span className={styles.tvaLabel}>LOCAL TIME</span>
            <span className={styles.tvaValue}>{currentTime}</span>
          </div>
        </motion.div>

        <div className={styles.bentoGrid}>
          
          {/* Main hero card - TemPad style */}
          <motion.div 
            className={`${styles.bentoCard} ${styles.mainCard} tva-corners`}
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>// SUBJECT FILE</span>
              <span className={styles.cardStatus}>● ACTIVE</span>
            </div>
            
            <motion.div
              className={styles.titleWrapper}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className={styles.titleLine} variants={lineVariants}>
                <GlitchText text="HARSH" />
              </motion.div>
              <motion.div className={styles.titleLine} variants={lineVariants}>
                <GlitchText text="SHAH" />
              </motion.div>
            </motion.div>
            
            <p className={styles.designation}>
              &gt; MS Computer Science @ Stony Brook<br/>
              &gt; Full-Stack Engineer & Security Researcher<br/>
              &gt; Building ML-enabled apps & browser security tools
            </p>
            
            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryBtn}>
                SEE PROJECTS
              </a>
              <a href="/resume.pdf" className={styles.secondaryBtn} target="_blank">
                DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>

          {/* Poster card */}
          <motion.div 
            className={`${styles.bentoCard} ${styles.posterCard} tva-corners`}
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.posterFrame}>
              <Image
                src="/images/harsh-hero.png"
                alt="Harsh Shah"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.posterOverlay} />
              <div className={styles.posterScanlines} />
            </div>
          </motion.div>

          {/* Hackathon wins */}
          <motion.div 
            className={`${styles.bentoCard} ${styles.statusCard} tva-corners`}
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.statusIcon}>🏆</span>
            <div className={styles.statusContent}>
              <span className={styles.statusTitle}>HACKATHON WINS</span>
              <span className={styles.statusValue}>HopperHacks • Smart India • HackNYU</span>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.bentoCard} ${styles.statusCard} tva-corners`}
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.statusIcon}>🔒</span>
            <div className={styles.statusContent}>
              <span className={styles.statusTitle}>OPEN SOURCE</span>
              <span className={styles.statusValue}>METAMASK SECURITY CONTRIBUTOR</span>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.bentoCard} ${styles.locationCard} tva-corners`}
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.locationLabel}>LOCATION</span>
            <span className={styles.locationValue}>NEW YORK</span>
          </motion.div>

          <motion.div 
            className={`${styles.bentoCard} ${styles.linksCard} tva-corners`}
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="https://github.com/Harsh-H-Shah" target="_blank" rel="noopener noreferrer" className={styles.tvaLink}>
              GITHUB
            </a>
            <a href="https://linkedin.com/in/harsh-h-shah" target="_blank" rel="noopener noreferrer" className={styles.tvaLink}>
              LINKEDIN
            </a>
            <a href="mailto:harsh@harsh.software" className={styles.tvaLink}>
              EMAIL
            </a>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom terminal */}
      <motion.div 
        className={styles.terminal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className={styles.terminalPrompt}>&gt;</span>
        <span className={styles.terminalText}>SCROLL TO CONTINUE</span>
        <span className={styles.terminalCursor}>_</span>
      </motion.div>
    </section>
  );
}
