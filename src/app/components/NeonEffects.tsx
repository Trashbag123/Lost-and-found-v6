import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';

/**
 * NeonEffects Component
 * ULTRA-ENHANCED VERSION
 * Adds cutting-edge neon light effects throughout the page
 * Features:
 * - Animated neon beams with more intensity
 * - Multiple light streaks with color variations
 * - Advanced glitch effects
 * - Energy pulses and waves
 * - Holographic grid overlays
 * - Dynamic spotlight scanning
 */
export function NeonEffects() {
  const { getColor, theme, performanceLevel } = useTheme();
  
  // Don't show in accessibility modes
  if (theme !== 'light' && theme !== 'dark') return null;

  // Check if effect should be enabled based on performance
  const effectEnabled = shouldEnableEffect('neonEffects', performanceLevel);
  if (!effectEnabled) return null;

  const isDark = theme === 'dark';
  const accent1 = getColor('accent1');
  const accent2 = getColor('accent2');
  const accent3 = getColor('accent3');

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Diagonal neon beams */}
      {performanceLevel === 'high' && (
        <>
          <motion.div
            className="absolute"
            style={{
              width: '3px',
              height: '100%',
              left: '15%',
              background: `linear-gradient(to bottom, transparent, ${accent1}, ${accent2}, transparent)`,
              boxShadow: `0 0 30px ${accent1}, 0 0 60px ${accent1}, 0 0 90px ${accent2}`,
              willChange: 'opacity, left',
            }}
            animate={{
              opacity: isDark ? [0.4, 0.9, 0.4] : [0.3, 0.6, 0.3],
              left: ['15%', '20%', '15%'],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute"
            style={{
              width: '3px',
              height: '100%',
              left: '40%',
              background: `linear-gradient(to bottom, transparent, ${accent2}, ${accent3}, transparent)`,
              boxShadow: `0 0 30px ${accent2}, 0 0 60px ${accent2}, 0 0 90px ${accent3}`,
              willChange: 'opacity, left',
            }}
            animate={{
              opacity: isDark ? [0.4, 0.9, 0.4] : [0.3, 0.6, 0.3],
              left: ['40%', '45%', '40%'],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          <motion.div
            className="absolute"
            style={{
              width: '3px',
              height: '100%',
              left: '65%',
              background: `linear-gradient(to bottom, transparent, ${accent3}, ${accent1}, transparent)`,
              boxShadow: `0 0 30px ${accent3}, 0 0 60px ${accent3}, 0 0 90px ${accent1}`,
              willChange: 'opacity, left',
            }}
            animate={{
              opacity: isDark ? [0.4, 0.9, 0.4] : [0.3, 0.6, 0.3],
              left: ['65%', '70%', '65%'],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          <motion.div
            className="absolute"
            style={{
              width: '3px',
              height: '100%',
              left: '88%',
              background: `linear-gradient(to bottom, transparent, ${accent1}, ${accent3}, transparent)`,
              boxShadow: `0 0 30px ${accent1}, 0 0 60px ${accent1}`,
              willChange: 'opacity, left',
            }}
            animate={{
              opacity: isDark ? [0.4, 0.9, 0.4] : [0.3, 0.6, 0.3],
              left: ['88%', '93%', '88%'],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4.5,
            }}
          />
        </>
      )}

      {/* Horizontal light streaks */}
      <motion.div
        className="absolute"
        style={{
          width: '100%',
          height: '2px',
          top: '25%',
          background: `linear-gradient(to right, transparent, ${accent1}, ${accent2}, ${accent1}, transparent)`,
          boxShadow: `0 0 20px ${accent1}, 0 0 40px ${accent1}`,
          willChange: 'opacity, transform',
        }}
        animate={{
          opacity: isDark ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2],
          scaleX: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute"
        style={{
          width: '100%',
          height: '2px',
          top: '50%',
          background: `linear-gradient(to right, transparent, ${accent2}, ${accent3}, ${accent2}, transparent)`,
          boxShadow: `0 0 20px ${accent2}, 0 0 40px ${accent2}`,
          willChange: 'opacity, transform',
        }}
        animate={{
          opacity: isDark ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2],
          scaleX: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {performanceLevel === 'high' && (
        <motion.div
          className="absolute"
          style={{
            width: '100%',
            height: '2px',
            top: '75%',
            background: `linear-gradient(to right, transparent, ${accent3}, ${accent1}, ${accent3}, transparent)`,
            boxShadow: `0 0 20px ${accent3}, 0 0 40px ${accent3}`,
            willChange: 'opacity, transform',
          }}
          animate={{
            opacity: isDark ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      )}

      {/* Corner spotlights */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle at top left, ${accent1}${isDark ? '40' : '28'}, transparent 70%)`,
          willChange: 'opacity, transform',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-0 right-0"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle at top right, ${accent2}${isDark ? '40' : '28'}, transparent 70%)`,
          willChange: 'opacity, transform',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle at bottom left, ${accent3}${isDark ? '40' : '28'}, transparent 70%)`,
          willChange: 'opacity, transform',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle at bottom right, ${accent1}${isDark ? '40' : '28'}, transparent 70%)`,
          willChange: 'opacity, transform',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Scanning laser */}
      {isDark && (
        <motion.div
          className="absolute w-full"
          style={{
            height: '4px',
            top: 0,
            background: `linear-gradient(to right, transparent, ${accent2}, ${accent1}, ${accent3}, ${accent1}, ${accent2}, transparent)`,
            boxShadow: `0 0 30px ${accent1}, 0 0 60px ${accent2}, 0 0 90px ${accent3}`,
            filter: 'blur(1px)',
            willChange: 'top, opacity',
          }}
          animate={{
            top: ['0%', '100%', '0%'],
            opacity: [0.9, 0.5, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Energy pulses */}
      {!isDark && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
              style={{
                width: 120,
                height: 120,
                borderColor: [accent1, accent2, accent3, accent1][i],
                willChange: 'transform, opacity',
              }}
              animate={{
                scale: [1, 10],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.25,
              }}
            />
          ))}
        </>
      )}

      {/* Diagonal grid overlay */}
      {performanceLevel === 'high' && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, ${accent1}08 1px, transparent 1px),
              linear-gradient(-45deg, ${accent2}08 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            willChange: 'background-position, opacity',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px', '0px 0px'],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Rotating spotlight beams */}
      {performanceLevel === 'high' && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '2000px',
              height: '4px',
              background: `linear-gradient(to right, transparent, ${accent1}40, transparent)`,
              boxShadow: `0 0 30px ${accent1}`,
              transformOrigin: 'center',
              willChange: 'rotate, opacity',
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '2000px',
              height: '4px',
              background: `linear-gradient(to right, transparent, ${accent2}40, transparent)`,
              boxShadow: `0 0 30px ${accent2}`,
              transformOrigin: 'center',
              willChange: 'rotate, opacity',
            }}
            animate={{
              rotate: [180, 540],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
            }}
          />
        </>
      )}
    </div>
  );
}