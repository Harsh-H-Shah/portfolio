'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    title: 'HEALTHSYNOPSIS',
    description: 'AI-enhanced medical summarization',
    fullDesc: 'Real-time system to generate concise medical summaries from clinical inputs. Built LSTM-based model and integrated LLMs for high-level summarization. Implemented anomaly detection pipeline for data quality monitoring. Designed for near-real-time clinical workflows.',
    tags: ['LSTM', 'LLM', 'PYTHON', 'ML'],
    github: 'https://github.com/Harsh-H-Shah',
    image: '/images/mockup.png',
    priority: 'HIGH',
  },
  {
    id: 2,
    title: 'SPOTIFIND INSPIRATION',
    description: 'HopperHacks 2025 Winner',
    fullDesc: 'Accessibility-first multimodal app with voice-activated object recognition and gesture-based kiosk navigation for hearing-impaired users. Integrated Gemini for multilingual translation and voice commands. Built voice recognition and kiosk UI components.',
    tags: ['VOICE AI', 'GEMINI', 'ACCESSIBILITY'],
    github: 'https://github.com/Harsh-H-Shah',
    image: '/images/mockup.png',
    priority: 'HIGH',
  },
  {
    id: 3,
    title: 'METAMASK SECURITY',
    description: 'Address-poisoning detection',
    fullDesc: 'Implemented and tested defenses against address-poisoning attacks for MetaMask extension. Design checks include similarity to previous addresses, transaction history checks, and heuristics to detect suspicious receiving addresses.',
    tags: ['TYPESCRIPT', 'SECURITY', 'BROWSER EXT'],
    github: 'https://github.com/Harsh-H-Shah/metamask-security-addition',
    image: '/images/mockup.png',
    priority: 'HIGH',
  },
  {
    id: 4,
    title: 'ZAPMAP',
    description: 'EV charging microservices',
    fullDesc: 'Full-stack microservices platform for EV charging station discovery and route optimization. Optimized A* pathfinding reducing route calculation latency by 60%. Built scalable REST APIs for real-time station availability.',
    tags: ['FLASK', 'DOCKER', 'REST API'],
    github: 'https://github.com/Harsh-H-Shah',
    image: '/images/zapmap.png',
    priority: 'MEDIUM',
  },
  {
    id: 5,
    title: 'RASHI PAY',
    description: 'Smart India Hackathon Winner',
    fullDesc: 'Offline payment app using Bluetooth with 2048-bit RSA encryption. Enables secure transactions in areas with no internet connectivity. Won Smart India Hackathon 2022.',
    tags: ['REACT NATIVE', 'NODE JS', 'CRYPTO'],
    github: 'https://github.com/Harsh-H-Shah',
    image: '/images/rashipay.png',
    priority: 'HIGH',
  },
  {
    id: 6,
    title: 'ALPHA TRADING',
    description: 'ML-powered trading simulation',
    fullDesc: 'Low-latency trading simulation with WebSocket feeds for 500+ stocks. Designed algorithmic strategies and backtesting pipelines. LSTM predictions with 85% accuracy for price movement.',
    tags: ['REACT', 'WEBSOCKET', 'ML'],
    github: 'https://github.com/Harsh-H-Shah',
    image: '/images/alphatrading.png',
    priority: 'MEDIUM',
  },
];

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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    rotateX: -15,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section className={`section ${styles.projects}`} id="projects">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>// CLASSIFIED FILES</span>
          <h2 className={styles.sectionTitle}>PROJECT ARCHIVE</h2>
          <p className={styles.sectionSubtitle}>&gt; Click on a case file to access full records</p>
        </motion.div>

        {/* 3D Grid of cards */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`${styles.card} tva-corners`}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                rotateX: 5,
                rotateY: -5,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Card header */}
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>CASE 00{index + 1}</span>
                <span className={`${styles.cardPriority} ${styles[project.priority.toLowerCase()]}`}>
                  {project.priority}
                </span>
              </div>
              
              {/* Card content */}
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>&gt; {project.description}</p>
              
              {/* Tags */}
              <div className={styles.cardTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.cardTag}>{tag}</span>
                ))}
              </div>
              
              {/* Footer */}
              <div className={styles.cardFooter}>
                <span className={styles.cardLink}>ACCESS FILE →</span>
              </div>
              
              {/* Corner decorations */}
              <div className={styles.cardCornerTL} />
              <div className={styles.cardCornerBR} />
              
              {/* Hover glow */}
              <div className={styles.cardGlow} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Overlay - Click to close */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedProject(null)}
            >
              <div 
                className={styles.modalInner}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className={styles.closeBtn}
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
                
                {/* Project Image */}
                <div className={styles.modalImage}>
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.modalImageOverlay} />
                </div>
                
                <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                    <span className={styles.modalNumber}>CASE FILE</span>
                    <span className={`${styles.modalPriority} ${styles[selectedProject.priority.toLowerCase()]}`}>
                      PRIORITY: {selectedProject.priority}
                    </span>
                  </div>
                  
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                  <p className={styles.modalDesc}>&gt; {selectedProject.fullDesc}</p>
                  
                  <div className={styles.modalTags}>
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className={styles.modalTag}>{tag}</span>
                    ))}
                  </div>
                  
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalLink}
                  >
                    VIEW ON GITHUB →
                  </a>
                </div>
                
                {/* Corner decorations */}
                <div className={styles.modalCornerTL} />
                <div className={styles.modalCornerBR} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
