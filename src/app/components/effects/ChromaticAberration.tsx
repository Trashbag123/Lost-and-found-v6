import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';

/**
 * ChromaticAberration Component
 * Creates RGB split glitch effects on hover/animation
 * Features:
 * - RGB color separation effect
 * - Glitch distortion
 * - Dynamic timing
 * - Cyberpunk aesthetic
 */
export function ChromaticAberration() {
  const { getColor, theme, performanceLevel } = useTheme();
  
  const effectEnabled = shouldEnableEffect('chromaticAberration', performanceLevel);
  
  if (!effectEnabled || theme !== 'dark') return null;

  const accent1 = getColor('accent1');
  const accent2 = getColor('accent2');

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      {/* Red channel shift */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent1}05, transparent 60%)`,
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [0, 3, -2, 1, 0],
          y: [0, -2, 3, -1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue channel shift */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent2}05, transparent 60%)`,
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [0, -3, 2, -1, 0],
          y: [0, 2, -3, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Glitch lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`glitch-${i}`}
          className="absolute left-0 right-0"
          style={{
            top: `${10 + i * 20}%`,
            height: '2px',
            background: `linear-gradient(to right, transparent, ${accent1}, ${accent2}, transparent)`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0, 0, 1, 0, 0, 0],
            x: [0, 20, -20, 0],
            scaleX: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}