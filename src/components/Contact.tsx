'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>// INITIATE CONTACT</span>
          
          <motion.h2 
            className={styles.heading}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            ESTABLISH CONNECTION
          </motion.h2>
          
          <motion.p 
            className={styles.text}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            &gt; Open to internship and full-time opportunities in software engineering, data engineering, and product-focused ML work.
            <br />
            &gt; Let&apos;s build something impactful together.
          </motion.p>

          <motion.a
            href="mailto:harsh@harsh.software"
            className={styles.cta}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            SEND TRANSMISSION
          </motion.a>

          <motion.div 
            className={styles.links}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="https://github.com/Harsh-H-Shah" target="_blank" rel="noopener noreferrer">
              GITHUB
            </a>
            <a href="https://linkedin.com/in/harsh-h-shah" target="_blank" rel="noopener noreferrer">
              LINKEDIN
            </a>
            <a href="mailto:harsh@harsh.software">
              harsh@harsh.software
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Corner decorations */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
    </section>
  );
}
