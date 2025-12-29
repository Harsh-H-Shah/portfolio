'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Harsh Shah
          </p>
          <p className={styles.tagline}>
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
