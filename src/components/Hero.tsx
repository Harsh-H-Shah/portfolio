'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

// Text reveal animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const lineVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(8px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.1,
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

  return (
    <section className={styles.hero} id="hero" ref={containerRef}>
      {/* Gradient background */}
      <div className={styles.gradientBg} />
      
      {/* Main content */}
      <motion.div 
        className={`container ${styles.heroContainer}`}
        style={{ y, opacity }}
      >
        <div className={styles.bentoGrid}>
          
          {/* Main hero card */}
          <motion.div 
            className={`${styles.bentoCard} ${styles.mainCard}`}
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Portfolio</span>
              <span className={styles.cardStatus}>Available for opportunities</span>
            </div>
            
            <motion.div
              className={styles.titleWrapper}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 className={styles.titleLine} variants={lineVariants}>
                <span className={styles.firstName}>Harsh</span>
              </motion.h1>
              <motion.h1 className={styles.titleLine} variants={lineVariants}>
                <span className={styles.lastName}>Shah</span>
              </motion.h1>
            </motion.div>
            
            <p className={styles.designation}>
              MS CS @ Stony Brook University<br/>
              Full-Stack • ML/AI • Blockchain Security<br/>
              3x Hackathon Winner • MetaMask Contributor
            </p>
            
            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryBtn}>
                View Projects
              </a>
              <a href="/Harsh_Shah.pdf" className={styles.secondaryBtn} target="_blank">
                Resume
              </a>
            </div>
          </motion.div>

          {/* Photo card */}
          <motion.div 
            className={`${styles.bentoCard} ${styles.posterCard}`}
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
            </div>
          </motion.div>

          {/* Hackathon wins */}
          <motion.div 
            className={`${styles.bentoCard} ${styles.statusCard}`}
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.statusIcon}>🏆</span>
            <div className={styles.statusContent}>
              <span className={styles.statusTitle}>Hackathon Wins</span>
              <span className={styles.statusValue}>HopperHacks • Smart India • HackNYU</span>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.bentoCard} ${styles.statusCard}`}
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.statusIcon}>🔒</span>
            <div className={styles.statusContent}>
              <span className={styles.statusTitle}>Open Source</span>
              <span className={styles.statusValue}>MetaMask Security Contributor</span>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.bentoCard} ${styles.locationCard}`}
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.locationLabel}>Education</span>
            <span className={styles.locationValue}>MS CS (3.71 GPA)</span>
          </motion.div>

          <motion.div 
            className={`${styles.bentoCard} ${styles.linksCard}`}
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="https://github.com/Harsh-H-Shah" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/harsh-h-shah" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn
            </a>
            <a href="mailto:harsh@harsh.software" className={styles.socialLink}>
              Email
            </a>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
