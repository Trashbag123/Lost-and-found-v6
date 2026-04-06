import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';

/**
 * GlitchBorder Component
 * Creates an animated glitch border effect around elements
 * Adapts to device performance level
 */
export function GlitchBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { getColor, theme, performanceLevel } = useTheme();
  const isDark = theme === 'dark';
  const [glitching, setGlitching] = useState(false);

  const accent1 = getColor('accent1');
  const accent2 = getColor('accent2');
  const accent3 = getColor('accent3');

  // Check if effect should be enabled
  const effectEnabled = shouldEnableEffect('glitchBorder', performanceLevel);

  useEffect(() => {
    if (!effectEnabled) return;

    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [effectEnabled]);

  return (
    <div className={`relative ${className}`}>
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated border layers */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `2px solid ${accent1}`,
          opacity: isDark ? 0.6 : 0.4,
        }}
        animate={glitching ? {
          x: [-2, 2, -2],
          y: [2, -2, 2],
          opacity: [0.6, 0.9, 0.6],
        } : {}}
        transition={{
          duration: 0.2,
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `2px solid ${accent2}`,
          opacity: isDark ? 0.4 : 0.3,
        }}
        animate={glitching ? {
          x: [2, -2, 2],
          y: [-2, 2, -2],
          opacity: [0.4, 0.8, 0.4],
        } : {}}
        transition={{
          duration: 0.2,
          delay: 0.05,
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `2px solid ${accent3}`,
          opacity: isDark ? 0.3 : 0.2,
        }}
        animate={glitching ? {
          x: [0, -3, 0],
          y: [0, 3, 0],
          opacity: [0.3, 0.7, 0.3],
        } : {}}
        transition={{
          duration: 0.2,
          delay: 0.1,
        }}
      />

      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-4 h-4 rounded-tl-2xl pointer-events-none"
        style={{
          background: accent1,
          boxShadow: `0 0 20px ${accent1}`,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-0 right-0 w-4 h-4 rounded-tr-2xl pointer-events-none"
        style={{
          background: accent2,
          boxShadow: `0 0 20px ${accent2}`,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-4 h-4 rounded-bl-2xl pointer-events-none"
        style={{
          background: accent3,
          boxShadow: `0 0 20px ${accent3}`,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-4 h-4 rounded-br-2xl pointer-events-none"
        style={{
          background: accent1,
          boxShadow: `0 0 20px ${accent1}`,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
}