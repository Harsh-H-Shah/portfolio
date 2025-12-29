'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className={`section ${styles.about}`} id="about" ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Left - Text content */}
          <div className={styles.content}>
            <motion.span 
              className={styles.sectionLabel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              // SUBJECT PROFILE
            </motion.span>
            
            <motion.h2 
              className={styles.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              TEMPORAL VARIANT
              <br />
              <span className={styles.headingAccent}>DESIGNATION: ENGINEER</span>
            </motion.h2>

            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <span className={styles.terminalDot} />
                <span className={styles.terminalTitle}>BIOGRAPHY.txt</span>
              </div>
              <div className={styles.terminalBody}>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  &gt; Full-stack software engineer and MS Computer Science student at Stony Brook University (GPA: 3.71/4.0).
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  &gt; Built web apps, browser-extension security improvements, ML pipelines, and real-time systems.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  &gt; Combining practical engineering (React, Flask, Docker, Redis) with data and ML (LSTM, LLMs) to ship performant products.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  &gt; Open-source contributor to MetaMask security — implemented address-poisoning detection.
                </motion.p>
              </div>
            </div>

            {/* Stats */}
            <motion.div 
              className={styles.stats}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className={styles.stat}>
                <span className={styles.statValue}>3.71</span>
                <span className={styles.statLabel}>GPA @ STONY BROOK</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>003</span>
                <span className={styles.statLabel}>HACKATHON WINS</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>9.05</span>
                <span className={styles.statLabel}>GPA @ MUMBAI</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Cards */}
          <div className={styles.cards}>
            <motion.div 
              className={`${styles.card} tva-corners`}
              style={{ y: y1 }}
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={styles.cardIcon}>🎓</span>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>STONY BROOK UNIVERSITY</span>
                <span className={styles.cardValue}>MS COMPUTER SCIENCE 2024-2026</span>
              </div>
            </motion.div>

            <motion.div 
              className={`${styles.card} tva-corners`}
              style={{ y: y2 }}
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={styles.cardIcon}>💼</span>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>INTERN EXPERIENCE</span>
                <span className={styles.cardValue}>AUMSAT TECH • SKINZY SOFTWARE</span>
              </div>
            </motion.div>

            <motion.div 
              className={`${styles.card} tva-corners`}
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={styles.cardIcon}>🔒</span>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>METAMASK CONTRIBUTOR</span>
                <span className={styles.cardValue}>ADDRESS-POISONING DETECTION</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
