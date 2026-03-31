'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import PulseBeams from './PulseBeams';
import styles from './Hero.module.css';

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export default function Hero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const imageScale = useTransform(scrollY, [0, 600], [1, 0.92]);

  return (
    <section className={styles.hero} id="hero">
      <PulseBeams />
      <motion.div className={styles.heroInner} style={{ opacity: heroOpacity, y: heroY }}>
        <div className={styles.content}>
          <motion.div className={styles.greeting} variants={fadeUp(0)} initial="hidden" animate="visible">
            <span className={styles.greetingDot} />
            Available for opportunities
          </motion.div>

          <motion.h1 className={styles.name} variants={fadeUp(0.1)} initial="hidden" animate="visible">
            <span className={styles.nameLight}>Harsh</span>
            Shah
          </motion.h1>

          <motion.p className={styles.tagline} variants={fadeUp(0.2)} initial="hidden" animate="visible">
            Software engineer crafting{' '}
            <span className={styles.taglineHighlight}>elegant solutions</span>{' '}
            to complex problems.
          </motion.p>

          <motion.div className={styles.actions} variants={fadeUp(0.3)} initial="hidden" animate="visible">
            <a href="#projects" className={styles.btnPrimary}>See my work →</a>
            <a href="/Harsh_Shah.pdf" target="_blank" className={styles.btnSecondary}>Resume</a>
          </motion.div>

          <motion.div className={styles.socialRow} variants={fadeUp(0.4)} initial="hidden" animate="visible">
            <a href="https://github.com/Harsh-H-Shah" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
            <a href="https://linkedin.com/in/harsh-h-shah" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
            <a href="mailto:harsh@harsh.software" className={styles.socialLink}>Email</a>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageSection}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: imageScale }}
        >
          <div className={styles.pulsingRing} />
          <div className={styles.dashedOrbit} />
          <motion.div className={styles.orbitRing} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            <span className={`${styles.orbitDot} ${styles.orbitDot1}`} />
            <span className={`${styles.orbitDot} ${styles.orbitDot2}`} />
            <span className={`${styles.orbitDot} ${styles.orbitDot3}`} />
            <span className={`${styles.orbitDot} ${styles.orbitDot4}`} />
          </motion.div>
          <div className={styles.imageGlow} />
          <div className={styles.imageFrame}>
            <Image src="/images/Harsh_image.jpg" alt="Harsh Shah" fill priority style={{ objectFit: 'cover' }} />
          </div>
          <motion.span className={`${styles.floatingCross} ${styles.cross1}`} animate={{ y: [0, -8, 0], rotate: [0, 45, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>+</motion.span>
          <motion.span className={`${styles.floatingCross} ${styles.cross2}`} animate={{ y: [0, 6, 0], rotate: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>+</motion.span>
          <motion.span className={`${styles.floatingCross} ${styles.cross3}`} animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>+</motion.span>
          <motion.div className={`${styles.floatingCircle} ${styles.circle1}`} animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className={`${styles.floatingCircle} ${styles.circle2}`} animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.div className={`${styles.scatterDot} ${styles.sd1}`} animate={{ opacity: [0.12, 0.25, 0.12] }} transition={{ duration: 3, repeat: Infinity }} />
          <motion.div className={`${styles.scatterDot} ${styles.sd2}`} animate={{ opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
          <motion.div className={`${styles.scatterDot} ${styles.sd3}`} animate={{ opacity: [0.12, 0.3, 0.12] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} />
          <motion.span className={`${styles.floatingLabel} ${styles.labelTop}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>MS CS · SBU</motion.span>
          <motion.span className={`${styles.floatingLabel} ${styles.labelBottom}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.6 }}>Full-Stack · ML</motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
