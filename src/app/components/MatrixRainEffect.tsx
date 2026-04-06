import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';

/**
 * MatrixRainEffect Component
 * Creates a Matrix-style digital rain effect
 * Features:
 * - Falling characters/symbols
 * - Randomized speeds and lengths
 * - Glowing neon effect
 * - Customizable intensity based on performance
 */
export function MatrixRainEffect() {
  const { getColor, theme, performanceLevel } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const effectEnabled = shouldEnableEffect('matrixRain', performanceLevel);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!effectEnabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    interface Drop {
      y: number;
      speed: number;
      length: number;
    }
    
    const drops: Drop[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        length: Math.random() * 20 + 10,
      };
    }

    const colors = [getColor('accent1'), getColor('accent2'), getColor('accent3')];
    
    let animationFrameId: number;
    let frame = 0;
    
    const animate = () => {
      frame++;
      
      // Fade effect for trail
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update drops based on performance (fewer updates on lower performance)
      const updateInterval = performanceLevel === 'high' ? 1 : 2;
      
      if (frame % updateInterval === 0) {
        drops.forEach((drop, i) => {
          const x = i * fontSize;
          
          // Draw characters in the trail
          for (let j = 0; j < drop.length; j++) {
            const y = drop.y - j * fontSize;
            
            if (y > 0 && y < canvas.height) {
              const char = chars[Math.floor(Math.random() * chars.length)];
              const alpha = 1 - (j / drop.length);
              const color = colors[i % colors.length];
              
              // Glow effect
              if (performanceLevel === 'high' && j === 0) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
              }
              
              ctx.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
              ctx.font = `${fontSize}px monospace`;
              ctx.fillText(char, x, y);
              
              ctx.shadowBlur = 0;
            }
          }

          // Update position
          drop.y += drop.speed;

          // Reset when drop reaches bottom
          if (drop.y > canvas.height + drop.length * fontSize) {
            drop.y = -drop.length * fontSize;
            drop.speed = Math.random() * 2 + 1;
            drop.length = Math.random() * 20 + 10;
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, performanceLevel, getColor, isDark, effectEnabled]);

  if (!effectEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        opacity: isDark ? 0.15 : 0.08,
      }}
    />
  );
}