import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * UltraHolographicPrism Component
 * ULTRA MODE EXCLUSIVE
 * Creates a futuristic holographic prism effect with chromatic aberration
 * Features:
 * - Rotating 3D prism shapes
 * - RGB color splitting
 * - Holographic shimmer
 * - Glassmorphism effects
 */
export function UltraHolographicPrism() {
  const { getColor, theme } = useTheme();
  const isDark = theme === 'dark';

  const prisms = [
    { size: 300, left: '10%', top: '20%', rotation: 0, duration: 20 },
    { size: 400, left: '80%', top: '10%', rotation: 45, duration: 25 },
    { size: 250, left: '70%', top: '70%', rotation: 90, duration: 18 },
    { size: 350, left: '20%', top: '80%', rotation: 135, duration: 22 },
    { size: 200, left: '50%', top: '50%', rotation: 180, duration: 15 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {prisms.map((prism, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            width: prism.size,
            height: prism.size,
            left: prism.left,
            top: prism.top,
            transform: `translate(-50%, -50%)`,
          }}
        >
          {/* RGB Split effect - 3 layers */}
          {['R', 'G', 'B'].map((channel, channelIndex) => (
            <motion.div
              key={channel}
              className="absolute inset-0"
              style={{
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                background: channel === 'R' 
                  ? `radial-gradient(circle, rgba(255, 0, 100, ${isDark ? 0.4 : 0.2}), transparent)`
                  : channel === 'G'
                  ? `radial-gradient(circle, rgba(0, 255, 150, ${isDark ? 0.4 : 0.2}), transparent)`
                  : `radial-gradient(circle, rgba(100, 150, 255, ${isDark ? 0.4 : 0.2}), transparent)`,
                mixBlendMode: isDark ? 'screen' : 'multiply',
                filter: 'blur(40px)',
              }}
              animate={{
                x: [
                  channelIndex === 0 ? -5 : channelIndex === 1 ? 0 : 5,
                  channelIndex === 0 ? 5 : channelIndex === 1 ? 0 : -5,
                  channelIndex === 0 ? -5 : channelIndex === 1 ? 0 : 5,
                ],
                y: [
                  channelIndex === 0 ? -5 : channelIndex === 1 ? 0 : 5,
                  channelIndex === 0 ? 5 : channelIndex === 1 ? 0 : -5,
                  channelIndex === 0 ? -5 : channelIndex === 1 ? 0 : 5,
                ],
                rotate: [prism.rotation, prism.rotation + 360, prism.rotation],
                scale: [1, 1.2, 1],
                borderRadius: [
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                  "70% 30% 30% 70% / 70% 70% 30% 30%",
                  "50% 50% 50% 50% / 50% 50% 50% 50%",
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                ],
              }}
              transition={{
                duration: prism.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: channelIndex * 0.1,
              }}
            />
          ))}

          {/* Holographic glass layer */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
              border: `2px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)'}`,
              boxShadow: isDark 
                ? '0 8px 32px 0 rgba(255, 255, 255, 0.1)'
                : '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
            }}
            animate={{
              rotate: [prism.rotation, prism.rotation + 360, prism.rotation],
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "50% 50% 50% 50% / 50% 50% 50% 50%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
            }}
            transition={{
              duration: prism.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Refraction lines */}
          {[...Array(8)].map((_, lineIndex) => (
            <motion.div
              key={`line-${lineIndex}`}
              className="absolute"
              style={{
                width: '2px',
                height: '100%',
                left: `${(lineIndex / 8) * 100}%`,
                top: 0,
                background: `linear-gradient(180deg, transparent, ${getColor('accent1')}60, transparent)`,
                transformOrigin: 'center',
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scaleY: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + lineIndex * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: lineIndex * 0.1,
              }}
            />
          ))}
        </div>
      ))}

      {/* Floating prism particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`prism-particle-${i}`}
          className="absolute"
          style={{
            width: 20 + Math.random() * 40,
            height: 20 + Math.random() * 40,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, ${getColor('accent1')}40, ${getColor('accent2')}40, ${getColor('accent3')}40)`,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            backdropFilter: 'blur(10px)',
            border: `1px solid rgba(255, 255, 255, 0.3)`,
            boxShadow: `0 0 30px ${getColor('accent1')}60`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            borderRadius: [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "70% 30% 30% 70% / 70% 70% 30% 30%",
              "30% 70% 70% 30% / 30% 30% 70% 70%",
            ],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
