import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';

/**
 * AuroraEffect Component
 * Creates a beautiful aurora borealis effect in the background
 * Features:
 * - Flowing, wave-like gradients
 * - Multiple overlapping layers for depth
 * - Smooth color transitions
 * - Mesmerizing wave patterns
 */
export function AuroraEffect() {
  const { getColor, theme, performanceLevel } = useTheme();
  
  const effectEnabled = shouldEnableEffect('auroraEffect', performanceLevel);
  
  if (!effectEnabled || theme !== 'dark') return null;

  const accent1 = getColor('accent1');
  const accent2 = getColor('accent2');
  const accent3 = getColor('accent3');

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* First aurora layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent1}40, ${accent2}40, transparent)`,
          filter: 'blur(60px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          y: ['-20%', '20%', '-20%'],
          scaleY: [1, 1.5, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second aurora layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, ${accent2}40, transparent, ${accent3}40)`,
          filter: 'blur(80px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          y: ['20%', '-20%', '20%'],
          scaleY: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Third aurora layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(60deg, transparent, ${accent3}40, ${accent1}40, transparent)`,
          filter: 'blur(70px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          y: ['-10%', '30%', '-10%'],
          scaleY: [1, 1.3, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Wave patterns */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-x-0"
          style={{
            height: '40%',
            top: `${20 + i * 25}%`,
            background: `linear-gradient(90deg, transparent, ${[accent1, accent2, accent3][i]}30, transparent)`,
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
          animate={{
            x: ['-100%', '100%'],
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}