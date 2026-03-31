'use client';

import { motion } from 'framer-motion';
import {
  SiPython, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiDocker, SiPostgresql, SiFirebase, SiPytorch, SiTensorflow, SiGit
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';
import styles from './Skills.module.css';

const floatingIcons = [
  { Icon: SiPython, top: '10%', left: '15%', size: 40, delay: 0 },
  { Icon: SiReact, top: '25%', right: '12%', size: 45, delay: 0.5 },
  { Icon: SiTypescript, bottom: '20%', left: '10%', size: 35, delay: 1 },
  { Icon: SiNextdotjs, bottom: '15%', right: '18%', size: 50, delay: 1.5 },
  { Icon: FaAws, top: '15%', right: '25%', size: 30, delay: 0.2 },
  { Icon: SiDocker, top: '50%', left: '8%', size: 45, delay: 0.8 },
  { Icon: SiPytorch, bottom: '10%', left: '30%', size: 35, delay: 1.2 },
  { Icon: SiPostgresql, top: '60%', right: '8%', size: 40, delay: 0.6 },
  { Icon: SiFirebase, bottom: '30%', right: '25%', size: 30, delay: 1.8 },
  { Icon: FaJava, top: '40%', left: '20%', size: 35, delay: 0.4 },
];

export default function Skills() {
  return (
    <section className={`section ${styles.skills}`} id="skills">
      <div className={styles.skillsInner}>
        
        {/* Floating Icons Background */}
        <div className={styles.floatingContainer}>
          {floatingIcons.map((item, i) => {
            const Icon = item.Icon;
            return (
              <motion.div
                key={i}
                className={styles.floatingIconWrapper}
                style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
                }}
              >
                <Icon size={item.size} className={styles.floatingIcon} />
              </motion.div>
            );
          })}
        </div>

        {/* Center Content */}
        <motion.div
          className={styles.centerContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="sectionLabel">My Toolkit</span>
          <h2 className={styles.sectionTitle}>
            Tools I love using
          </h2>
          <p className={styles.toolkitText}>
            Over the years, I've curated a stack that allows me to build fast, scalable, and robust applications. From crafting intuitive frontends with <strong>React</strong> and <strong>Next.js</strong>, to architecting powerful backends with <strong>Node.js</strong> and <strong>Python</strong>, I choose the right tools for the problem at hand.
          </p>
          <p className={styles.toolkitText}>
            My infrastructure relies heavily on <strong>AWS</strong> and <strong>Docker</strong> for seamless deployments, while my data layer spans SQL, NoSQL, and vector databases depending on scale and structure. Oh, and I genuinely enjoy writing <strong>TypeScript</strong>.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
