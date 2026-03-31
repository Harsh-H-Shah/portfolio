'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Contact.module.css';

type HistoryItem = { type: 'command' | 'output' | 'link'; text: string; link?: string; isHtml?: boolean; skipAnim?: boolean; path?: string };

const TerminalPrompt = ({ path = '~' }: { path?: string }) => (
  <span className={styles.promptContainer}>
    <span className={styles.promptPlain}>⚡ harsh@portfolio</span>
    <span className={styles.seg1}>{path}</span>
    <span className={styles.seg2}>± main</span>
  </span>
);

const TypewriterLine = ({ text, skipAnim }: { text: string; skipAnim?: boolean }) => {
  const [displayed, setDisplayed] = useState(skipAnim ? text : '');
  useEffect(() => {
    if (skipAnim) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [text, skipAnim]);
  return <span>{displayed}</span>;
};

// Simple embedded Snake Game
const SnakeGame = ({ onExit }: { onExit: (score: number) => void }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'w'].includes(e.key.toLowerCase()) && dir.y === 0) setDir({ x: 0, y: -1 });
      if (['ArrowDown', 's'].includes(e.key.toLowerCase()) && dir.y === 0) setDir({ x: 0, y: 1 });
      if (['ArrowLeft', 'a'].includes(e.key.toLowerCase()) && dir.x === 0) setDir({ x: -1, y: 0 });
      if (['ArrowRight', 'd'].includes(e.key.toLowerCase()) && dir.x === 0) setDir({ x: 1, y: 0 });
      if (e.key.toLowerCase() === 'q' || e.key === 'Escape') onExit(snake.length - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir, snake, onExit]);

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setSnake(s => {
        const head = s[0];
        const newHead = { x: head.x + dir.x, y: head.y + dir.y };
        
        if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20 || 
            s.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          return s;
        }

        const newSnake = [newHead, ...s];
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [dir, food, isGameOver]);

  return (
    <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>
      <div style={{ color: '#10b981', marginBottom: '1rem', fontSize: '0.85rem' }}>
        Score: {snake.length - 1} | Use W A S D or Arrows to move | Press Q to quit
      </div>
      {isGameOver && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>Game Over! Press Q to exit.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 15px)', gap: '1px', background: '#0a0a0a', width: 'fit-content', border: '1px solid rgba(255,255,255,0.1)' }}>
        {Array.from({ length: 400 }).map((_, i) => {
          const x = i % 20;
          const y = Math.floor(i / 20);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return <div key={i} style={{ width: 15, height: 15, background: isSnake ? '#3b82f6' : isFood ? '#10b981' : 'transparent', borderRadius: isSnake ? '2px' : isFood ? '50%' : '0' }} />
        })}
      </div>
    </div>
  );
};

// File System Data
const FILE_SYSTEM: Record<string, string[]> = {
  '~': ['about.txt', 'skills.json', 'projects/', 'contact.sh'],
  '~/projects': ['snappyxo.md', 'gemini-voice.md', 'sih.md']
};

const FILE_CONTENTS: Record<string, string> = {
  'about.txt': 'I am a Software Engineer pursuing my MS in CS at Stony Brook.',
  'skills.json': '["React", "Next.js", "TypeScript", "Python", "Go", "Docker"]',
  'contact.sh': 'echo "harsh@harsh.software"',
  'snappyxo.md': '# SnappyXO\nDeveloped web platforms for robotics curriculum.',
  'gemini-voice.md': '# HopperHacks\nBuilt a Voice AI interface using Gemini.',
  'sih.md': '# SIH Winner\nImplemented offline mesh-network payments.'
};

export default function Contact() {
  const [currentDir, setCurrentDir] = useState('~');
  const [playingSnake, setPlayingSnake] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'command', text: 'help', skipAnim: true, path: '~' },
    { type: 'output', text: 'Available commands:', skipAnim: true },
    { type: 'output', text: '  about      - read a short bio', skipAnim: true },
    { type: 'output', text: '  skills     - list my top tech stack', skipAnim: true },
    { type: 'output', text: '  projects   - overview of my work', skipAnim: true },
    { type: 'output', text: '  contact    - get my email', skipAnim: true },
    { type: 'output', text: '  clear      - clear the terminal', skipAnim: true },
    { type: 'output', text: '  ls         - list directory contents', skipAnim: true },
    { type: 'output', text: '  cd <dir>   - change directory', skipAnim: true },
    { type: 'output', text: '  cat <file> - read a file', skipAnim: true },
    { type: 'output', text: '  snake      - play a game', skipAnim: true },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!termBodyRef.current) return;
    const observer = new MutationObserver(() => {
      if (termBodyRef.current) {
        termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
      }
    });
    observer.observe(termBodyRef.current, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      
      const args = cmd.split(' ').map(s => s.trim()).filter(Boolean);
      const baseCmd = args[0].toLowerCase();
      let newOutput: HistoryItem | HistoryItem[] = [];

      if (baseCmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
      
      if (baseCmd === 'snake') {
        setHistory(prev => [...prev, { type: 'command', text: cmd, path: currentDir }]);
        setPlayingSnake(true);
        setInput('');
        return;
      }

      if (baseCmd === 'ls') {
        const files = FILE_SYSTEM[currentDir] || [];
        newOutput = files.map(file => ({ type: 'output', text: file }));
        if (files.length === 0) newOutput = { type: 'output', text: 'Directory is empty.' };
      }
      else if (baseCmd === 'cd') {
        const target = args[1];
        if (!target || target === '~') {
          setCurrentDir('~');
        } else if (target === '..') {
          if (currentDir !== '~') {
            const parts = currentDir.split('/');
            parts.pop();
            setCurrentDir(parts.join('/') || '~');
          }
        } else {
          const newPath = currentDir === '~' ? `~/${target.replace(/\/$/, '')}` : `${currentDir}/${target.replace(/\/$/, '')}`;
          const currentFiles = FILE_SYSTEM[currentDir] || [];
          if (FILE_SYSTEM[newPath] || currentFiles.includes(`${target}/`) || currentFiles.includes(target)) {
            setCurrentDir(newPath);
          } else {
            newOutput = { type: 'output', text: `cd: no such file or directory: ${target}` };
          }
        }
      }
      else if (baseCmd === 'cat') {
        const target = args[1];
        if (!target) {
          newOutput = { type: 'output', text: 'cat: missing file operand' };
        } else if (FILE_CONTENTS[target]) {
          const contents = FILE_CONTENTS[target].split('\n').map(line => ({ type: 'output' as const, text: line }));
          newOutput = contents;
        } else {
          newOutput = { type: 'output', text: `cat: ${target}: No such file or directory` };
        }
      }
      else if (baseCmd === 'help') {
        newOutput = [
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  about      - read a short bio' },
          { type: 'output', text: '  skills     - list my top tech stack' },
          { type: 'output', text: '  projects   - overview of my work' },
          { type: 'output', text: '  contact    - get my email' },
          { type: 'output', text: '  clear      - clear the terminal' },
          { type: 'output', text: '  ls         - list directory contents' },
          { type: 'output', text: '  cd <dir>   - change directory' },
          { type: 'output', text: '  cat <file> - read a file' },
          { type: 'output', text: '  snake      - play a game' },
        ];
      } else if (baseCmd === 'about') {
        newOutput = { type: 'output', text: 'I am a Software Engineer focused on building excellent digital experiences.' };
      } else if (baseCmd === 'skills') {
        newOutput = [
          { type: 'output', text: 'Tech Stack:' },
          { type: 'output', text: '  Frontend: React, Next.js, TypeScript' },
          { type: 'output', text: '  Backend: Node.js, Python, Go' },
          { type: 'output', text: '  Tools: Docker, Git, Firebase' }
        ];
      } else if (baseCmd === 'projects') {
        newOutput = [
          { type: 'output', text: 'Recent Projects:' },
          { type: 'output', text: '  - SnappyXO: Web platforms and UI library' },
          { type: 'output', text: '  - Gemini Voice AI: HopperHacks winning app' },
          { type: 'output', text: '  - Offline Bluetooth Payments: Smart India Hackathon Winner' }
        ];
      } else if (baseCmd === 'contact') {
        newOutput = [
          { type: 'link', text: '', link: 'mailto:harsh@harsh.software' }
        ];
      } else if (baseCmd === 'sudo') {
        newOutput = { type: 'output', text: 'nice try. permission denied. this incident will be reported.' };
      } else {
        newOutput = { type: 'output', text: `command not found: ${baseCmd}. Type 'help' for available commands.` };
      }

      const outputs = Array.isArray(newOutput) ? newOutput : [newOutput];
      setHistory(prev => [...prev, { type: 'command', text: cmd }, ...outputs]);
      setInput('');
    }
  };

  return (
    <>
      <section className={`section ${styles.contact}`} id="contact">
        <div className={styles.contactInner}>
          {/* Left — Closing statement */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="sectionLabel">Get in Touch</span>
            <div className={styles.closingStatement}>
              <motion.p
                className={styles.closingLine}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                I may not have all the answers yet.
              </motion.p>
              <motion.p
                className={styles.closingLineAccent}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                But I have the audacity to find them with you.
              </motion.p>
              <motion.p
                className={styles.closingLine}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                My best project is always the next one.
              </motion.p>
              <motion.p
                className={styles.closingCTA}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                Let&apos;s make it yours.
              </motion.p>
            </div>

            <div className={styles.socialGrid}>
              <a href="https://github.com/Harsh-H-Shah" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                <FiGithub className={styles.socialIcon} />
                GitHub
              </a>
              <a href="https://linkedin.com/in/harsh-h-shah" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                <FiLinkedin className={styles.socialIcon} />
                LinkedIn
              </a>
              <a href="mailto:harsh@harsh.software" className={styles.socialCard}>
                <FiMail className={styles.socialIcon} />
                Email
              </a>
            </div>
          </motion.div>

          {/* Right — Interactive Terminal */}
          <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.termTop}>
              <span className={`${styles.termDot} ${styles.termRed}`} />
              <span className={`${styles.termDot} ${styles.termYellow}`} />
              <span className={`${styles.termDot} ${styles.termGreen}`} />
              <span className={styles.termTitle}>harsh@portfolio ~ % interactive-mode</span>
            </div>
            
            <div className={styles.termBody} ref={termBodyRef} onClick={handleContainerClick}>
              {playingSnake && (
                 <SnakeGame onExit={(score) => {
                   setPlayingSnake(false);
                   setHistory(prev => [...prev, { type: 'output', text: `Snake game ended. Score: ${score}` }]);
                   setTimeout(() => inputRef.current?.focus(), 50);
                 }} />
              )}
              
              {!playingSnake && history.map((item, idx) => (
                <div key={idx} className={styles.termLine}>
                  {item.type === 'command' && (
                    <>
                      <TerminalPrompt path={item.path} />
                      <span className={styles.termString}>{item.text}</span>
                    </>
                  )}
                  {item.type === 'output' && (
                    item.isHtml ? (
                      <span className={styles.termComment}>
                        // Status: <span className={styles.termGreenText}>Open to work ✓</span>
                      </span>
                    ) : (
                      <span className={styles.termComment}>
                        <TypewriterLine text={item.text} skipAnim={item.skipAnim} />
                      </span>
                    )
                  )}
                  {item.type === 'link' && (
                    <span className={styles.termComment}>
                      // Email:{' '}
                      <a href={item.link} className={styles.termLink}>
                        <TypewriterLine text="harsh@harsh.software" skipAnim={item.skipAnim} />
                      </a>
                    </span>
                  )}
                </div>
              ))}
              
              {!playingSnake && (
                <div className={styles.termInputLine}>
                  <TerminalPrompt path={currentDir} />
                  <div className={styles.termInputWrapper}>
                    <span className={styles.termInputText}>
                      {input}
                      <span className={styles.cursorBlock}>█</span>
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleCommand}
                      className={styles.termHiddenInput}
                      autoComplete="off"
                      spellCheck="false"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
