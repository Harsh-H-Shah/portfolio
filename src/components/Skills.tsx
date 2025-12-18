'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'SQL', icon: '🗃️' },
      { name: 'Bash/Shell', icon: '💻' },
      { name: 'C++', icon: '⚡' },
    ],
  },
  {
    title: 'Systems & Networking',
    skills: [
      { name: 'Linux', icon: '🐧' },
      { name: 'TCP/IP', icon: '🌐' },
      { name: 'DNS', icon: '📡' },
      { name: 'HTTP/S', icon: '🔒' },
      { name: 'Nginx', icon: '🔧' },
      { name: 'Load Balancing', icon: '⚖️' },
    ],
  },
  {
    title: 'Infrastructure & Cloud',
    skills: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '⎈' },
      { name: 'Terraform', icon: '🏗️' },
      { name: 'CI/CD', icon: '🔄' },
    ],
  },
  {
    title: 'Observability & Databases',
    skills: [
      { name: 'Prometheus', icon: '📊' },
      { name: 'Grafana', icon: '📈' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Redis', icon: '🔴' },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={`section ${styles.skills}`} id="skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies I&apos;ve been working with recently
          </p>
        </motion.div>

        <div className={styles.skillsGrid}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={`card ${styles.skillCategory}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.skillsList}>
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill.name}
                    className={styles.skillItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <span className={styles.skillIcon}>{skill.icon}</span>
                    <span className={styles.skillName}>{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
