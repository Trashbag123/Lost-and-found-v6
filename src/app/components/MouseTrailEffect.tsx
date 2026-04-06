import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';

/**
 * MouseTrailEffect Component
 * Creates an interactive particle trail that follows the cursor
 * Features:
 * - Smooth particle spawning at cursor position
 * - Particles fade out and disperse over time
 * - Rainbow color variations
 * - Performance-optimized with RAF
 */
export function MouseTrailEffect() {
  const { getColor, theme, performanceLevel } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const effectEnabled = shouldEnableEffect('mouseTrail', performanceLevel);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!effectEnabled || (theme !== 'light' && theme !== 'dark')) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface TrailParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: TrailParticle[] = [];
    const colors = [
      getColor('accent1'),
      getColor('accent2'),
      getColor('accent3'),
    ];

    let mouseX = 0;
    let mouseY = 0;
    let lastSpawnTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      // Spawn new particles at cursor position
      if (now - lastSpawnTime > 16 && mouseX > 0 && mouseY > 0) { // ~60fps spawn rate
        for (let i = 0; i < (performanceLevel === 'high' ? 3 : 2); i++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 10,
            y: mouseY + (Math.random() - 0.5) * 10,
            size: Math.random() * 4 + 2,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            maxLife: Math.random() * 40 + 40,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        lastSpawnTime = now;
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.vy += 0.05; // Gravity
        
        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw
        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Glow effect
        if (performanceLevel === 'high') {
          ctx.shadowBlur = 20;
          ctx.shadowColor = p.color;
        }
        
        const alphaHex = Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = p.color + alphaHex;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, performanceLevel, getColor, isDark, effectEnabled]);

  if (!effectEnabled || (theme !== 'light' && theme !== 'dark')) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}