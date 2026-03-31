'use client';

import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };

    resize();

    // Decorative elements - placed at random grid positions
    const gridSize = 60;
    const decorElements: { x: number; y: number; type: string; size: number; rotation: number; opacity: number }[] = [];

    const elementTypes = ['+', '○', '·', '×', '□'];
    for (let i = 0; i < 40; i++) {
      decorElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        size: 6 + Math.random() * 10,
        rotation: Math.random() * Math.PI * 2,
        opacity: 0.06 + Math.random() * 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dot grid
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          // Distance from mouse for interactive glow
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          let dotOpacity = 0.05;
          let dotSize = 1;

          if (dist < maxDist) {
            const t = 1 - dist / maxDist;
            dotOpacity = 0.05 + t * 0.2;
            dotSize = 1 + t * 2;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${dotOpacity})`;
          ctx.fill();
        }
      }

      // Draw decorative elements
      decorElements.forEach((el) => {
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.rotation);
        ctx.font = `${el.size}px "Inter", sans-serif`;
        ctx.fillStyle = `rgba(26, 26, 26, ${el.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.type, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    const handleScroll = () => {
      // Update canvas height on scroll
      const newHeight = document.body.scrollHeight;
      if (canvas.height !== newHeight) {
        canvas.height = newHeight;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
