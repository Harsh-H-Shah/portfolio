'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';
import styles from './About.module.css';

const experiences = [
  { title: 'MS Computer Science', company: 'Stony Brook University', period: '2024 → Now' },
  { title: 'Software Engineer', company: 'SnappyXO', period: '2023 → 2024' },
  { title: 'HopperHacks Winner', company: 'Voice AI + Gemini', period: '2025' },
  { title: 'SIH Winner', company: 'Offline Bluetooth Payments', period: '2022' },
  { title: 'Open Source Contributor', company: 'MetaMask', period: '2022 → 2023' },
  { title: 'B.Tech Computer Science', company: 'Where it all started', period: '2019 → 2023' },
];

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className={styles.aboutInner}>
        
        <div className={styles.headerCentered}>
          <span className="sectionLabel">About me</span>
          <h2 className={styles.sectionTitle}>
            A little more about me<span className={styles.titleAccent}>:)</span>
          </h2>
        </div>

        <div className={styles.aboutGrid}>
          {/* Left: Image */}
          <motion.div
            className={styles.imageColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageFrame}>
              <div className={styles.imageWrapper}>
                <Image 
                  src="/portfolio/images/harsh-about.png"
                  alt="Harsh Shah" 
                  fill 
                  className={styles.aboutImage} 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className={styles.imageFooter}>
              <div className={styles.imageSocials}>
                <a href="https://instagram.com/harsh_shah" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
                <a href="https://linkedin.com/in/harsh-h-shah" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
              </div>
              <div className={styles.imageCaption}>
                <h3>Harsh Shah</h3>
                <p>Software Engineer</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className={styles.contentColumn}>
            <motion.p 
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <strong>Hi, I'm Harsh Shah</strong> from India, a software engineer who enjoys fixing things that feel confusing and making them easier to use. From shaping architecture to fine-tuning UI details, I make things work with care and intention. I travel when I need perspective, find joy in observing people, and feel most at home building cool stuff with a good cup of coffee ☕✨
            </motion.p>

            <motion.div
              className={styles.table}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ staggerChildren: 0.08 }}
            >
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  className={styles.tableRow}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <span className={styles.tableTitle}>{exp.title}</span>
                  <span className={styles.tableCompany}>{exp.company}</span>
                  <span className={styles.tablePeriod}>{exp.period}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
