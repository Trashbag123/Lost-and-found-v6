import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { getShapeCount } from '@/app/utils/performanceDetector';

/**
 * FloatingShapes Component
 * ENHANCED VERSION
 * Creates animated floating shapes with liquid morphing effects
 * Features:
 * - Liquid blob animations
 * - Dynamic shape morphing
 * - Enhanced blur and glow effects
 * - More dramatic movements
 * - Pulsing orbs with energy waves
 */
export function FloatingShapes() {
  const { getColor, theme, performanceLevel } = useTheme();
  const isDark = theme === 'dark';

  const accent1 = getColor('accent1');
  const accent2 = getColor('accent2');
  const accent3 = getColor('accent3');

  // Get performance-based shape count
  const shapeCount = getShapeCount(performanceLevel);

  // Enhanced shapes with more variety
  const allShapes = [
    { size: 120, left: '5%', top: '15%', duration: 16, delay: 0, color: accent1, blur: 'blur-3xl', type: 'circle' },
    { size: 160, left: '85%', top: '8%', duration: 20, delay: 2, color: accent2, blur: 'blur-3xl', type: 'blob' },
    { size: 80, left: '75%', top: '65%', duration: 14, delay: 4, color: accent3, blur: 'blur-3xl', type: 'circle' },
    { size: 180, left: '15%', top: '75%', duration: 25, delay: 1, color: accent1, blur: 'blur-3xl', type: 'blob' },
    { size: 90, left: '55%', top: '35%', duration: 18, delay: 3, color: accent2, blur: 'blur-3xl', type: 'circle' },
    { size: 130, left: '92%', top: '85%', duration: 24, delay: 5, color: accent3, blur: 'blur-3xl', type: 'blob' },
    { size: 70, left: '30%', top: '10%', duration: 13, delay: 1.5, color: accent1, blur: 'blur-2xl', type: 'circle' },
    { size: 110, left: '60%', top: '90%', duration: 22, delay: 3.5, color: accent2, blur: 'blur-3xl', type: 'blob' },
    { size: 140, left: '10%', top: '50%', duration: 19, delay: 2.5, color: accent3, blur: 'blur-3xl', type: 'circle' },
    { size: 85, left: '88%', top: '40%', duration: 17, delay: 4.5, color: accent1, blur: 'blur-2xl', type: 'blob' },
    { size: 105, left: '42%', top: '72%', duration: 21, delay: 0.5, color: accent2, blur: 'blur-3xl', type: 'circle' },
    { size: 115, left: '68%', top: '22%', duration: 15, delay: 5.5, color: accent3, blur: 'blur-3xl', type: 'blob' },
    { size: 95, left: '25%', top: '45%', duration: 23, delay: 1.8, color: accent1, blur: 'blur-2xl', type: 'circle' },
    { size: 125, left: '78%', top: '55%', duration: 26, delay: 3.2, color: accent2, blur: 'blur-3xl', type: 'blob' },
    { size: 75, left: '48%', top: '18%', duration: 16, delay: 4.8, color: accent3, blur: 'blur-2xl', type: 'circle' },
  ];

  // Select shapes based on performance level
  const shapes = allShapes.slice(0, shapeCount);

  // Blob morph path animation
  const blobVariants = {
    animate: {
      borderRadius: [
        "30% 70% 70% 30% / 30% 30% 70% 70%",
        "70% 30% 30% 70% / 70% 70% 30% 30%",
        "50% 50% 50% 50% / 50% 50% 50% 50%",
        "30% 70% 70% 30% / 30% 30% 70% 70%",
      ],
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${
            performanceLevel === 'ultra' || performanceLevel === 'high' 
              ? shape.blur 
              : performanceLevel === 'medium' 
                ? 'blur-3xl' 
                : 'blur-2xl'
          }`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            top: shape.top,
            background: shape.gradient,
            borderRadius: '50%',
            opacity: performanceLevel === 'low' ? 0.15 : performanceLevel === 'medium' ? 0.25 : shape.opacity,
          }}
          animate={{
            x: performanceLevel === 'low' 
              ? [0, 30, 0] 
              : performanceLevel === 'medium' 
                ? [0, 60, 0] 
                : [0, 100, 0],
            y: performanceLevel === 'low' 
              ? [0, 30, 0] 
              : performanceLevel === 'medium' 
                ? [0, 60, 0] 
                : [0, 100, 0],
            scale: performanceLevel === 'low' 
              ? [1, 1.05, 1] 
              : performanceLevel === 'medium' 
                ? [1, 1.15, 1] 
                : [1, 1.3, 1],
            rotate: performanceLevel === 'low' 
              ? [0, 10, 0] 
              : performanceLevel === 'medium' 
                ? [0, 30, 0] 
                : [0, 360, 0],
          }}
          transition={{
            duration: performanceLevel === 'low' 
              ? 15 
              : performanceLevel === 'medium' 
                ? 10 
                : shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
}