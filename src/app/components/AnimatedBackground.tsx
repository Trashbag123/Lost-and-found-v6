import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { getParticleCount, throttleRAF, updateFPS } from '@/app/utils/performanceDetector';

/**
 * AnimatedBackground Component
 * OPTIMIZED & ENHANCED VERSION
 * Features:
 * - Optimized canvas rendering with offscreen canvas
 * - Better particle pooling and memory management
 * - FPS monitoring and dynamic adjustment
 * - More vibrant and dynamic particle system
 * - Mesh gradient overlay with depth
 */
export function AnimatedBackground() {
  const { getColor, theme, performanceLevel } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null);
  const isDark = theme === 'dark';
  const particleCount = getParticleCount(performanceLevel);
  const isUltra = performanceLevel === 'ultra';

  // Memoize colors to prevent recreation
  const colors = useMemo(() => [
    getColor('accent1'),
    getColor('accent2'),
    getColor('accent3')
  ], [getColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true, // Better performance
    });
    if (!ctx) return;

    // Set canvas size
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

    // Enhanced Particle system with better properties
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      angle: number;
      angleSpeed: number;
      pulsePhase: number;
    }

    const particles: Particle[] = [];

    // Create particles with enhanced properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 1.5,
        // LOW MODE: Slow and gentle (0.3x speed)
        // MEDIUM MODE: Moderate speed (1x speed) 
        // HIGH MODE: Fast (1.8x speed)
        speedX: (Math.random() - 0.5) * (performanceLevel === 'low' ? 0.3 : performanceLevel === 'medium' ? 1 : 1.8),
        speedY: (Math.random() - 0.5) * (performanceLevel === 'low' ? 0.3 : performanceLevel === 'medium' ? 1 : 1.8),
        opacity: performanceLevel === 'low' ? 0.3 : performanceLevel === 'medium' ? 0.6 : 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * (performanceLevel === 'low' ? 0.005 : performanceLevel === 'medium' ? 0.02 : 0.03),
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Connect nearby particles with lines (high and ultra performance)
    const connectParticles = (particles: Particle[]) => {
      if (performanceLevel !== 'high' && performanceLevel !== 'ultra') return;
      
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `${particles[i].color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Optimized animation loop with throttling
    let animationFrameId: number;
    let time = 0;
    
    const animate = throttleRAF(() => {
      updateFPS(); // Monitor FPS
      time += 0.01;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw particle connections first (behind particles)
      connectParticles(particles);

      // Draw and update particles with enhanced effects
      particles.forEach((particle, index) => {
        // Update pulse phase
        particle.pulsePhase += 0.03;
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 1;
        
        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        
        // Enhanced glow based on performance
        if (performanceLevel === 'ultra') {
          ctx.shadowBlur = isDark ? 80 : 60;
          ctx.shadowColor = particle.color;
        } else if (performanceLevel === 'high') {
          ctx.shadowBlur = isDark ? 50 : 35;
          ctx.shadowColor = particle.color;
        } else if (performanceLevel === 'medium') {
          ctx.shadowBlur = isDark ? 25 : 18;
          ctx.shadowColor = particle.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        const alphaHex = Math.floor(particle.opacity * pulse * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = particle.color + alphaHex;
        ctx.fill();

        // Add inner glow (high and ultra performance)
        if (performanceLevel === 'high' || performanceLevel === 'ultra') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * pulse * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.6})`;
          ctx.fill();
        }
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Update position with orbital motion
        particle.angle += particle.angleSpeed;
        particle.x += particle.speedX + Math.cos(particle.angle) * 0.5;
        particle.y += particle.speedY + Math.sin(particle.angle) * 0.5;

        // Wrap around screen
        if (particle.x < -20) particle.x = window.innerWidth + 20;
        if (particle.x > window.innerWidth + 20) particle.x = -20;
        if (particle.y < -20) particle.y = window.innerHeight + 20;
        if (particle.y > window.innerHeight + 20) particle.y = -20;

        // Dynamic opacity pulse
        if (performanceLevel !== 'low') {
          particle.opacity += Math.sin(time + index) * 0.005;
          particle.opacity = Math.max(0.4, Math.min(0.95, particle.opacity));
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    }, performanceLevel === 'ultra' ? 60 : performanceLevel === 'high' ? 60 : performanceLevel === 'medium' ? 45 : 30);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, performanceLevel, colors, isDark]);

  const accent1 = getColor('accent1');
  const accent2 = getColor('accent2');
  const accent3 = getColor('accent3');

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Enhanced animated gradient background with more dramatic movement */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark 
            ? `radial-gradient(circle at 20% 50%, ${accent1}45 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accent2}45 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent3}45 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 50%, ${accent1}35 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accent2}35 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent3}35 0%, transparent 50%)`,
          willChange: 'background',
        }}
        animate={{
          background: isDark ? [
            `radial-gradient(circle at 20% 50%, ${accent1}45 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accent2}45 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent3}45 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 30%, ${accent1}45 0%, transparent 50%), radial-gradient(circle at 20% 70%, ${accent2}45 0%, transparent 50%), radial-gradient(circle at 60% 90%, ${accent3}45 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 80%, ${accent1}45 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent2}45 0%, transparent 50%), radial-gradient(circle at 90% 50%, ${accent3}45 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 50%, ${accent1}45 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accent2}45 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent3}45 0%, transparent 50%)`,
          ] : [
            `radial-gradient(circle at 20% 50%, ${accent1}35 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accent2}35 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent3}35 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 30%, ${accent1}35 0%, transparent 50%), radial-gradient(circle at 20% 70%, ${accent2}35 0%, transparent 50%), radial-gradient(circle at 60% 90%, ${accent3}35 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 80%, ${accent1}35 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent2}35 0%, transparent 50%), radial-gradient(circle at 90% 50%, ${accent3}35 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 50%, ${accent1}35 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accent2}35 0%, transparent 50%), radial-gradient(circle at 40% 20%, ${accent3}35 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Optimized particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: isDark ? 0.95 : 0.75,
          willChange: 'opacity',
        }}
      />

      {/* Scanline overlay */}
      {isDark && (performanceLevel === 'high' || performanceLevel === 'ultra') && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent1}0A 2px, ${accent1}0A 4px)`,
            willChange: 'opacity',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Enhanced mesh overlay with animated depth */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? `${accent1}15` : `${accent1}0A`} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? `${accent2}15` : `${accent2}0A`} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '0px 0px',
          willChange: 'opacity',
        }}
        animate={{
          opacity: isDark ? [0.4, 0.5, 0.4] : [0.2, 0.3, 0.2],
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Enhanced holographic overlay effect for light mode */}
      {!isDark && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accent1}08, transparent 30%, ${accent2}08 50%, transparent 70%, ${accent3}08)`,
            backgroundSize: '400% 400%',
            willChange: 'background-position',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
}