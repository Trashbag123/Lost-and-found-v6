import { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { getParticleCount } from '@/app/utils/performanceDetector';

export function AnimatedBackground() {
  const { getColor, theme, performanceLevel } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const isDark = theme === 'dark';
  const particleCount = getParticleCount(performanceLevel);

  const colors = useMemo(() => [
    getColor('accent1'),
    getColor('accent2'),
    getColor('accent3'),
  ], [getColor]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    interface Particle {
      x: number; y: number;
      size: number;
      speedX: number; speedY: number;
      opacity: number;
      color: string;
    }

    const spd = performanceLevel === 'low' ? 0.2 : performanceLevel === 'medium' ? 0.5 : 0.9;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * spd,
      speedY: (Math.random() - 0.5) * spd,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Only connect on high/ultra and batch strokes by color for fewer state changes
    const connectParticles = () => {
      if (performanceLevel !== 'high' && performanceLevel !== 'ultra') return;
      const maxDistSq = 80 * 80;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const alpha = Math.round((1 - distSq / maxDistSq) * 50);
            ctx.strokeStyle = `${particles[i].color}${alpha.toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Target fps based on level
    const targetInterval = performanceLevel === 'low' ? 1000 / 24 : performanceLevel === 'medium' ? 1000 / 36 : 1000 / 50;
    let lastTime = 0;

    const animate = (now: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (now - lastTime < targetInterval) return;
      lastTime = now;

      ctx.clearRect(0, 0, W(), H());
      ctx.lineWidth = 0.5;

      connectParticles();

      // No shadowBlur on medium/low — too expensive
      if (performanceLevel === 'ultra') {
        // set once, draw all
        particles.forEach((p) => {
          ctx.shadowBlur = 20;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
      } else {
        ctx.shadowBlur = 0;
        particles.forEach((p) => {
          ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Move
      const w = W(), h = H();
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [theme, performanceLevel, colors]);

  // Static gradient blobs that move via CSS transform (GPU-composited, no repaints)
  const opacity = isDark ? 0.35 : 0.2;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Blob 1 */}
      <div
        className="absolute rounded-full blob-1"
        style={{
          width: 600, height: 600,
          left: '10%', top: '5%',
          background: `radial-gradient(circle, ${getColor('accent1')} 0%, transparent 70%)`,
          opacity,
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      {/* Blob 2 */}
      <div
        className="absolute rounded-full blob-2"
        style={{
          width: 500, height: 500,
          right: '5%', top: '20%',
          background: `radial-gradient(circle, ${getColor('accent2')} 0%, transparent 70%)`,
          opacity,
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute rounded-full blob-3"
        style={{
          width: 450, height: 450,
          left: '30%', bottom: '10%',
          background: `radial-gradient(circle, ${getColor('accent3')} 0%, transparent 70%)`,
          opacity,
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: isDark ? 0.9 : 0.6 }} />

      {/* Static mesh grid — no animation */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${getColor('accent1')}10 1px, transparent 1px), linear-gradient(90deg, ${getColor('accent2')}08 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          opacity: isDark ? 0.5 : 0.3,
        }}
      />
    </div>
  );
}
