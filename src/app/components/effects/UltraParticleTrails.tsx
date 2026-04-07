import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * UltraParticleTrails Component
 * ULTRA MODE EXCLUSIVE
 * Creates mesmerizing particle trails that follow complex mathematical paths
 * Features:
 * - Lissajous curve trails
 * - Spiral patterns
 * - Rainbow chromatic effects
 * - Quantum particle effects
 * - Explosive bursts
 */
export function UltraParticleTrails() {
  const { getColor, theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      getColor('accent1'),
      getColor('accent2'),
      getColor('accent3'),
      '#FF006E', // Magenta
      '#8338EC', // Purple
      '#3A86FF', // Blue
      '#06FFA5', // Cyan
      '#FFBE0B', // Gold
    ];

    interface TrailParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
      angle: number;
      speed: number;
      trail: { x: number; y: number; alpha: number }[];
    }

    const trails: TrailParticle[] = [];
    const maxTrails = 50;

    // Create initial trails
    for (let i = 0; i < maxTrails; i++) {
      trails.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
        trail: [],
      });
    }

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.02;

      // Fade effect — dark mode fades to black, light mode fades to white
      ctx.fillStyle = isDark
        ? 'rgba(0, 0, 0, 0.06)'
        : 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      trails.forEach((particle, index) => {
        // Update particle position with complex motion
        particle.angle += 0.02;
        const lissajousX = Math.sin(particle.angle * 3) * 100;
        const lissajousY = Math.cos(particle.angle * 2) * 100;
        
        particle.x += particle.vx + Math.cos(time + index) * 2;
        particle.y += particle.vy + Math.sin(time + index) * 2;

        // Add position to trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          alpha: 1,
        });

        // Keep trail length manageable
        if (particle.trail.length > 30) {
          particle.trail.shift();
        }

        // Draw trail with gradient
        for (let i = 0; i < particle.trail.length - 1; i++) {
          const t1 = particle.trail[i];
          const t2 = particle.trail[i + 1];
          const alpha = (i / particle.trail.length) * (particle.life / particle.maxLife);

          ctx.beginPath();
          ctx.moveTo(t1.x, t1.y);
          ctx.lineTo(t2.x, t2.y);
          
          // Trail colour — mix rainbow shimmer with the particle's theme-accent colour
          const hue = (time * 30 + index * 20) % 360;
          const trailColor = alpha > 0.5 ? particle.color : `hsla(${hue}, 90%, 65%, ${alpha})`;
          ctx.strokeStyle = trailColor;
          ctx.lineWidth = particle.size * (i / particle.trail.length);
          ctx.lineCap = 'round';

          ctx.shadowBlur = 15;
          ctx.shadowColor = particle.color;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw particle head with intense glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.shadowBlur = 40;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Update life
        particle.life++;
        
        // Wrap around or reset
        if (particle.x < -50) particle.x = window.innerWidth + 50;
        if (particle.x > window.innerWidth + 50) particle.x = -50;
        if (particle.y < -50) particle.y = window.innerHeight + 50;
        if (particle.y > window.innerHeight + 50) particle.y = -50;

        if (particle.life > particle.maxLife) {
          // Reset particle
          particle.x = Math.random() * window.innerWidth;
          particle.y = Math.random() * window.innerHeight;
          particle.vx = (Math.random() - 0.5) * 4;
          particle.vy = (Math.random() - 0.5) * 4;
          particle.life = 0;
          particle.color = colors[Math.floor(Math.random() * colors.length)];
          particle.trail = [];
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, getColor, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, mixBlendMode: isDark ? 'screen' : 'multiply' }}
    />
  );
}
