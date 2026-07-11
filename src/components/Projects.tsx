'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  fullDesc: string;
  tags: string[];
  github: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1, title: 'HealthSynopsis',
    subtitle: 'AI-powered medical summarization with LSTM & LLM',
    fullDesc: 'Real-time medical summarization using LSTM sequence models and LLM integration. Built anomaly detection pipeline for data quality monitoring across clinical inputs.',
    tags: ['LSTM', 'LLM', 'Python'],
    github: 'https://github.com/Harsh-H-Shah', image: '/portfolio/images/healthsynopsis.jpg',
  },
  {
    id: 2, title: 'Spotifind',
    subtitle: 'HopperHacks winner — voice accessibility with Gemini AI',
    fullDesc: 'Accessibility-first multimodal app. Voice-activated object recognition and gesture-based kiosk navigation for hearing-impaired users with Gemini AI multilingual translation.',
    tags: ['Voice AI', 'Gemini'],
    github: 'https://github.com/Harsh-H-Shah', image: '/portfolio/images/spotifind.jpg',
  },
  {
    id: 3, title: 'MetaMask Security',
    subtitle: 'Address-poisoning detection for browser extension',
    fullDesc: 'Implemented and tested defenses against address-poisoning attacks in MetaMask. Designed similarity checks, transaction history analysis, and heuristic-based detection.',
    tags: ['TypeScript', 'Web3'],
    github: 'https://github.com/Harsh-H-Shah/metamask-security-addition', image: '/portfolio/images/metamask.jpg',
  },
  {
    id: 4, title: 'ZapMap',
    subtitle: 'EV charging microservices with A* pathfinding',
    fullDesc: 'Full-stack microservices platform for EV charging station discovery. Optimized A* pathfinding reduced route calculation latency by 60%. Docker-containerized with REST APIs.',
    tags: ['Flask', 'Docker'],
    github: 'https://github.com/Harsh-H-Shah', image: '/portfolio/images/zapmap.jpg',
  },
  {
    id: 5, title: 'Rashi Pay',
    subtitle: 'SIH winner — offline Bluetooth payments with RSA',
    fullDesc: 'Smart India Hackathon winning offline payment app using Bluetooth with 2048-bit RSA encryption. Enables secure transactions in areas with no internet connectivity.',
    tags: ['React Native', 'Crypto'],
    github: 'https://github.com/Harsh-H-Shah', image: '/portfolio/images/rashipay-new.png',
  },
  {
    id: 6, title: 'Alpha Trading',
    subtitle: 'ML-powered trading sim with real-time WebSocket feeds',
    fullDesc: 'WebSocket feeds for 500+ stocks. LSTM-based prediction model achieving 85% directional accuracy with backtesting pipeline for strategy validation.',
    tags: ['React', 'ML'],
    github: 'https://github.com/Harsh-H-Shah', image: '/portfolio/images/alphatrading.jpg',
  },
];

// Parallax image component — image moves slower than scroll
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className={styles.imageWrap}>
      <motion.div style={{ y, position: 'absolute', inset: '-16% 0', width: '100%', height: '132%' }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} sizes="300px" />
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section className={`section ${styles.projects}`} id="projects">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="sectionLabel">Selected Work</span>
        <h2 className={styles.sectionTitle}>
          My Projects
        </h2>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className={styles.item}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelected(p)}
          >
            <ParallaxImage src={p.image} alt={p.title} />
            <div className={styles.textBlock}>
              <span className={styles.itemNum}>0{i + 1}</span>
              <h3 className={styles.itemTitle}>{p.title}</h3>
              <p className={styles.itemDesc}>{p.subtitle}</p>
              <div className={styles.itemTags}>
                {p.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <Portal>
            <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} />
            <motion.div className={styles.modal} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} onClick={() => setSelected(null)}>
              <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
                <div className={styles.modalImage}>
                  <Image src={selected.image} alt={selected.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.modalContent}>
                  <span className={styles.modalNum}>Project 0{selected.id}</span>
                  <h3 className={styles.modalTitle}>{selected.title}</h3>
                  <p className={styles.modalDesc}>{selected.fullDesc}</p>
                  <div className={styles.modalTags}>
                    {selected.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                  <a href={selected.github} target="_blank" rel="noopener noreferrer" className={styles.modalLink}>View on GitHub →</a>
                </div>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </section>
  );
}

function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  return mounted ? createPortal(children, document.body) : null;
}
