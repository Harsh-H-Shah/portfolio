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
              Hello! I&apos;m Harsh, a software engineer with a passion for creating 
              elegant solutions to complex problems. I&apos;m currently pursuing my 
              Master&apos;s in Computer Science at <span className="text-gradient">Georgia Tech</span>, 
              where I&apos;m diving deep into machine learning and distributed systems.
            </p>
            <p>
              My journey in tech started with a fascination for how software can 
              transform ideas into reality. Since then, I&apos;ve had the privilege of 
              working on diverse projects ranging from full-stack web applications 
              to mobile apps and machine learning systems.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or working on side projects 
              that push my boundaries. I believe in continuous learning and 
              sharing knowledge with the community.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.highlightNumber}>2+</span>
                <span className={styles.highlightLabel}>Years Experience</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightNumber}>10+</span>
                <span className={styles.highlightLabel}>Projects Built</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightNumber}>MS</span>
                <span className={styles.highlightLabel}>Georgia Tech</span>
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
