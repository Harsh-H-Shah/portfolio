'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={`section ${styles.about}`} id="about" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Get to know a little more about who I am
          </p>
        </motion.div>

        <div className={styles.aboutContent}>
          <motion.div
            className={styles.aboutText}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Hello! I&apos;m Harsh, a Production Engineering Fellow at <span className="text-gradient">Meta & MLH</span>, 
              building scalable systems under industry mentorship. I&apos;m pursuing my 
              Master&apos;s in Computer Science at <span className="text-gradient">Stony Brook University</span> (3.67 GPA), 
              diving deep into algorithms, operating systems, and distributed systems.
            </p>
            <p>
              My journey in tech started with a fascination for building reliable infrastructure.
              I&apos;ve engineered telemetry pipelines using Prometheus & Grafana, deployed containerized
              applications with Docker, and developed internal tooling to monitor fleet health.
              Previously at Aumsat Technologies, I architected data pipelines handling 500+ geospatial datasets.
            </p>
            <p>
              I&apos;m passionate about open-source security—currently researching Ethereum address poisoning
              and phishing detection for MetaMask. Winner of Smart India Hackathon 2022, HopperHacks 2025,
              and HackNYU 2025. Published researcher at CSA 2024 Conference.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.highlightNumber}>3+</span>
                <span className={styles.highlightLabel}>Hackathon Wins</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightNumber}>10+</span>
                <span className={styles.highlightLabel}>Projects Built</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightNumber}>MS</span>
                <span className={styles.highlightLabel}>Stony Brook</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.aboutImage}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.imageBorder} />
              <div className={styles.imagePlaceholder}>
                <span className={styles.initials}>HS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
