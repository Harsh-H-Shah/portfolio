'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'MetaMask Security Research',
    description:
      'Researched Ethereum address poisoning, typosquatting, and domain drop-catching attacks affecting 175K+ attempts. Designed detection logic reducing phishing risk by 70%.',
    image: '/images/alphatrading.png',
    tags: ['Security', 'Ethereum', 'TypeScript', 'Open Source'],
    github: 'https://github.com/Harsh-H-Shah',
    live: '#',
  },
  {
    title: 'ZapMap - EV Charging',
    description:
      'Microservices-based platform using Docker for containerization. Optimized A* pathfinding algorithm reducing route calculation latency by 60% vs standard Dijkstra.',
    image: '/images/zapmap.png',
    tags: ['Flask', 'Docker', 'Microservices', 'REST APIs'],
    github: 'https://github.com/Harsh-H-Shah',
    live: '#',
  },
  {
    title: 'Rashi Pay - Offline Payments',
    description:
      'Smart India Hackathon 2022 Winner. Built offline digital payment app using Bluetooth, enabling 40% faster P2P transfers. Secured 10,000+ test transactions via 2048-bit RSA.',
    image: '/images/codehub.png',
    tags: ['React Native', 'TailwindCSS', 'Express.js', 'Bluetooth'],
    github: 'https://github.com/Harsh-H-Shah',
    live: '#',
  },
  {
    title: 'Alpha Trading',
    description:
      'Low-latency trading simulation processing real-time WebSocket feeds for 500+ NSE stocks. Integrated LSTM neural networks for 30-day market forecasts with 85% accuracy.',
    image: '/images/alphatrading.png',
    tags: ['React.js', 'WebSockets', 'Firebase', 'LSTM'],
    github: 'https://github.com/Harsh-H-Shah',
    live: '#',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={`section ${styles.projects}`} id="projects" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Some of the projects I&apos;ve built recently
          </p>
        </motion.div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.projectImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.projectOverlay}>
                  <div className={styles.projectLinks}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      aria-label="View on GitHub"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    {project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                        aria-label="View live site"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <ul className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <li key={tag} className={styles.projectTag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
