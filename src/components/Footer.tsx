import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <p className={styles.copyright}>
          Built with{' '}
          <span className={styles.heart}>❤</span>{' '}
          by Harsh Shah © {currentYear}
        </p>
        <p className={styles.tech}>
          Made with Next.js & Framer Motion
        </p>
      </div>
    </footer>
  );
}
