'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Skills.module.css';

// Organized by category for a Full-Stack + ML + Blockchain Engineer
const skillRows = [
  // Row 1: Core Languages & Frameworks
  ['PYTHON', 'TYPESCRIPT', 'JAVA', 'REACT', 'NEXT.JS', 'NODE.JS', 'FLASK', 'FASTAPI'],
  // Row 2: Infrastructure & DevOps
  ['AWS', 'DOCKER', 'KUBERNETES', 'POSTGRESQL', 'REDIS', 'MONGODB', 'KAFKA', 'CI/CD'],
  // Row 3: ML/AI & Blockchain
  ['PYTORCH', 'TENSORFLOW', 'LLM', 'LANGCHAIN', 'SOLIDITY', 'WEB3.JS', 'SMART CONTRACTS', 'METAMASK'],
];

// Pure CSS infinite marquee
const MarqueeRow = ({ 
  skills, 
  reverse = false,
  duration = 25
}: { 
  skills: string[]; 
  reverse?: boolean;
  duration?: number;
}) => {
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];
  
  return (
    <div className={styles.marqueeWrapper}>
      <div 
        className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {duplicatedSkills.map((skill, index) => (
          <span key={`${skill}-${index}`} className={styles.skillPill}>
            {skill}
          </span>
        ))}
      </div>
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
          <span className={styles.sectionLabel}>// TECHNOLOGY STACK</span>
          <h2 className={styles.sectionTitle}>SKILLS & EXPERTISE</h2>
        </motion.div>
      </div>

      {/* Full-width infinite marquee */}
      <motion.div 
        className={styles.marqueeSection}
        style={{ y }}
      >
        <MarqueeRow skills={skillRows[0]} duration={35} />
        <MarqueeRow skills={skillRows[1]} reverse={true} duration={30} />
        <MarqueeRow skills={skillRows[2]} duration={40} />
      </motion.div>

      <div className="container">
        {/* Core Competency Highlights */}
        <motion.div 
          className={styles.highlights}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={`${styles.highlightCard} tva-corners`}>
            <span className={styles.highlightIcon}>🚀</span>
            <div className={styles.highlightContent}>
              <span className={styles.highlightTitle}>FULL STACK</span>
              <span className={styles.highlightValue}>React • Node • Python • Cloud</span>
            </div>
          </div>
          
          <div className={`${styles.highlightCard} tva-corners`}>
            <span className={styles.highlightIcon}>🧠</span>
            <div className={styles.highlightContent}>
              <span className={styles.highlightTitle}>ML & AI</span>
              <span className={styles.highlightValue}>LLMs • PyTorch • Data Pipelines</span>
            </div>
          </div>
          
          <div className={`${styles.highlightCard} tva-corners`}>
            <span className={styles.highlightIcon}>⛓️</span>
            <div className={styles.highlightContent}>
              <span className={styles.highlightTitle}>BLOCKCHAIN</span>
              <span className={styles.highlightValue}>Solidity • Web3 • Security</span>
            </div>
          </div>
          
          <div className={`${styles.highlightCard} tva-corners`}>
            <span className={styles.highlightIcon}>⚡</span>
            <div className={styles.highlightContent}>
              <span className={styles.highlightTitle}>SYSTEMS</span>
              <span className={styles.highlightValue}>Microservices • K8s • AWS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
