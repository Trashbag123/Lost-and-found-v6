import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useState, ReactNode } from 'react';
import { shouldEnableEffect } from '@/app/utils/performanceDetector';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * Parallax3DCard Component
 * Wraps children with 3D tilt effect that follows mouse movement
 * Features:
 * - Smooth 3D rotation based on mouse position
 * - Dynamic shine/glare effect
 * - Depth perception with transform layers
 * - Scales on hover
 */
interface Parallax3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Parallax3DCard({ children, className = '', intensity = 20 }: Parallax3DCardProps) {
  const { performanceLevel } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const effectEnabled = shouldEnableEffect('parallax3D', performanceLevel);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!effectEnabled) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  if (!effectEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        
        {/* Glare effect overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              mixBlendMode: 'overlay',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
