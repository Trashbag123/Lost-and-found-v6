import { ReactNode } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface ThemedContainerProps {
  children: ReactNode;
  className?: string;
}

export function ThemedContainer({ children, className = '' }: ThemedContainerProps) {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const baseClasses = isDark
    ? 'bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white'
    : 'bg-[#FDFCFA] text-[#2D3436]';
  
  return (
    <div className={`min-h-screen ${baseClasses} ${className}`}>
      {children}
    </div>
  );
}

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function ThemedCard({ children, className = '', hover = true }: ThemedCardProps) {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const baseClasses = isDark
    ? 'bg-[#1a1a1a]/95 border-2 border-gray-800 text-white'
    : 'bg-white/80 border-0 text-[#2D3436]';
    
  const hoverClasses = hover
    ? isDark
      ? 'hover:border-gray-700 hover:shadow-2xl'
      : 'hover:shadow-2xl'
    : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} backdrop-blur-sm shadow-lg rounded-2xl transition-all ${className}`}>
      {children}
    </div>
  );
}

interface ThemedTextProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export function ThemedText({ children, variant = 'primary', className = '' }: ThemedTextProps) {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const variantClasses = {
    primary: isDark ? 'text-white' : 'text-[#2D3436]',
    secondary: isDark ? 'text-gray-300' : 'text-[#636E72]',
    tertiary: isDark ? 'text-gray-400' : 'text-[#95A5A6]',
  };
  
  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
