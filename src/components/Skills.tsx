'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Skills.module.css';

const skillRows = [
  ['JAVA', 'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'FLASK', 'NODE JS', 'PYTHON', 'MAVEN'],
  ['DOCKER', 'REDIS', 'GIT', 'FIREBASE', 'STRIPE', 'REST API', 'WEB CRAWLING', 'VPS'],
  ['LSTM', 'LLM', 'GEMINI', 'ANOMALY DETECTION', 'DATA PIPELINES', 'ML', 'BROWSER EXT', 'SECURITY'],
];

const MarqueeRow = ({ 
  skills, 
  direction = 1, 
  speed = 30 
}: { 
  skills: string[]; 
  direction?: number;
  speed?: number;
}) => {
  const duplicatedSkills = [...skills, ...skills, ...skills];
  
  return (
    <div className={styles.marqueeWrapper}>
      <motion.div
        className={styles.marqueeTrack}
        animate={{
          x: direction > 0 ? [0, -33.33 * skills.length * 10] : [-33.33 * skills.length * 10, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <span key={`${skill}-${index}`} className={styles.skillPill}>
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className={`section ${styles.skills}`} id="skills" ref={sectionRef}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionLabel}>// SKILL DATABASE</span>
          <h2 className={styles.sectionTitle}>TECHNOLOGY STACK</h2>
        </motion.div>
      </div>

      {/* Full-width marquee section */}
      <motion.div 
        className={styles.marqueeSection}
        style={{ y }}
      >
        <MarqueeRow skills={skillRows[0]} direction={1} speed={40} />
        <MarqueeRow skills={skillRows[1]} direction={-1} speed={35} />
        <MarqueeRow skills={skillRows[2]} direction={1} speed={45} />
      </motion.div>

      <div className="container">
        {/* Highlights */}
        <motion.div 
          className={styles.highlights}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={`${styles.highlightCard} tva-corners`}>
            <span className={styles.highlightIcon}>⚡</span>
            <div className={styles.highlightContent}>
              <span className={styles.highlightTitle}>FULL STACK</span>
              <span className={styles.highlightValue}>REACT • FLASK • NODE</span>
            </div>
          </div>
          
          <div className={`${styles.highlightCard} tva-corners`}>
            <span className={styles.highlightIcon}>🤖</span>
            <div className={styles.highlightContent}>
              <span className={styles.highlightTitle}>ML & DATA</span>
              <span className={styles.highlightValue}>LSTM • LLM • PIPELINES</span>
            </div>
          </div>
          
          <div className={`${styles.highlightCard} tva-corners`}>
            <span className={styles.highlightIcon}>🔒</span>
            <div className={styles.highlightContent}>
              <span className={styles.highlightTitle}>SECURITY</span>
              <span className={styles.highlightValue}>BROWSER EXT • HEURISTICS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
