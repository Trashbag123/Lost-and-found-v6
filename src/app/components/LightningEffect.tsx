import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';
import { useState, useEffect } from 'react';

/**
 * LightningEffect Component
 * Creates dynamic lightning bolt effects across the screen
 * Features:
 * - Random lightning strikes
 * - Branching bolt patterns
 * - Flash/glow effects
 * - Synchronized with thunder (visual)
 */
export function LightningEffect() {
  const { getColor, theme, performanceLevel } = useTheme();
  const [strikes, setStrikes] = useState<Array<{ id: number; x: number; rotation: number; color: string }>>([]);
  
  const effectEnabled = shouldEnableEffect('lightningEffect', performanceLevel);
  
  const colors = [getColor('accent1'), getColor('accent2'), getColor('accent3')];

  useEffect(() => {
    if (!effectEnabled || (theme !== 'light' && theme !== 'dark')) return;
    
    const strikeInterval = setInterval(() => {
      // Random chance of lightning strike
      if (Math.random() < 0.3) {
        const newStrike = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          rotation: Math.random() * 30 - 15,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        
        setStrikes(prev => [...prev, newStrike]);
        
        // Remove strike after animation
        setTimeout(() => {
          setStrikes(prev => prev.filter(s => s.id !== newStrike.id));
        }, 800);
      }
    }, 3000);

    return () => clearInterval(strikeInterval);
  }, [colors, effectEnabled, theme]);

  if (!effectEnabled || (theme !== 'light' && theme !== 'dark')) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {strikes.map(strike => (
        <motion.div
          key={strike.id}
          className="absolute top-0"
          style={{
            left: `${strike.x}%`,
            width: '4px',
            height: '100%',
            transformOrigin: 'top center',
            rotate: strike.rotation,
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scaleY: [0, 1, 1, 1],
          }}
          transition={{ 
            duration: 0.8,
            times: [0, 0.1, 0.3, 1],
          }}
        >
          {/* Main lightning bolt */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${strike.color}, transparent)`,
              boxShadow: `0 0 20px ${strike.color}, 0 0 40px ${strike.color}`,
              filter: 'blur(2px)',
            }}
            animate={{
              opacity: [1, 0.7, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
          />
          
          {/* Lightning branches */}
          {[...Array(performanceLevel === 'high' ? 3 : 1)].map((_, i) => (
            <motion.div
              key={`branch-${i}`}
              className="absolute"
              style={{
                top: `${20 + i * 25}%`,
                left: i % 2 === 0 ? '-50px' : '50px',
                width: '2px',
                height: '30%',
                background: `linear-gradient(to bottom, ${strike.color}, transparent)`,
                boxShadow: `0 0 10px ${strike.color}`,
                rotate: i % 2 === 0 ? -45 : 45,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scaleY: [0, 1, 1],
              }}
              transition={{ 
                duration: 0.6,
                delay: 0.1,
              }}
            />
          ))}

          {/* Flash effect at top */}
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${strike.color}80, transparent 70%)`,
              filter: 'blur(30px)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 2, 3],
            }}
            transition={{ 
              duration: 0.8,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}