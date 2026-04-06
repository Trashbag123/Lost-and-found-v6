import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectPerformanceLevel, PerformanceLevel } from '@/app/utils/performanceDetector';

/**
 * ThemeMode Type
 * Defines all available theme options in the application
 * - light: Standard light mode with vibrant colors
 * - dark: Dark mode with high contrast
 * - deuteranopia: Red-green colorblind friendly (uses blue/yellow/orange)
 * - protanopia: Red-blind friendly (uses teal/blue/yellow)
 * - tritanopia: Blue-yellow colorblind friendly (uses cyan/pink/red)
 */
export type ThemeMode = 'light' | 'dark' | 'deuteranopia' | 'protanopia' | 'tritanopia';

/**
 * ThemeContext Type Definition
 * Provides theme state and color management throughout the application
 */
interface ThemeContextType {
  theme: ThemeMode;              // Current active theme
  setTheme: (theme: ThemeMode) => void;  // Switch to different theme
  getColor: (colorKey: string) => string;  // Get theme-specific color value
  performanceLevel: PerformanceLevel;  // Device performance level
  setPerformanceLevel: (level: PerformanceLevel) => void;  // Override performance level
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Color Configurations
 * Complete color palette for each theme mode
 * All themes maintain the same color keys for consistency,
 * but with different values optimized for each viewing condition
 * 
 * Color Keys:
 * - bgPrimary/Secondary/Tertiary: Background layers
 * - bgCard/CardHover: Card backgrounds with transparency
 * - textPrimary/Secondary/Tertiary: Text hierarchy
 * - border/borderHover: Border colors and states
 * - accent1/2/3: Primary action colors with light/dark variants
 */
const themeColors = {
  light: {
    // Backgrounds - Ultra bright white with electric glow
    bgPrimary: '#FFFFFF',
    bgSecondary: '#FAFBFF',
    bgTertiary: '#F0F4FF',
    bgCard: 'rgba(255, 255, 255, 0.95)',
    bgCardHover: 'rgba(255, 255, 255, 1)',
    
    // Text - Deep dark for maximum contrast
    textPrimary: '#0A0118',
    textSecondary: '#2D1B4E',
    textTertiary: '#5A4D7C',
    textLight: '#FFFFFF',
    
    // Borders - Bright neon
    border: 'rgba(255, 0, 128, 0.4)',
    borderHover: 'rgba(255, 0, 128, 0.8)',
    
    // Accent colors - ULTRA Vibrant Neon
    accent1: '#FF0080',      // Hot Pink/Magenta - Primary
    accent1Light: '#FF4DA6',
    accent1Dark: '#CC0066',
    
    accent2: '#00F0FF',      // Cyan - Secondary
    accent2Light: '#4DF4FF',
    accent2Dark: '#00C2CC',
    
    accent3: '#8A2BE2',      // Purple - Tertiary
    accent3Light: '#A855F7',
    accent3Dark: '#6B21A8',
  },
  dark: {
    // Backgrounds - ULTRA Deep blacks with rich depth
    bgPrimary: '#000000',
    bgSecondary: '#0A0118',
    bgTertiary: '#160729',
    bgCard: 'rgba(10, 1, 24, 0.8)',
    bgCardHover: 'rgba(22, 7, 41, 0.95)',
    
    // Text - Bright neon glow
    textPrimary: '#FFFFFF',
    textSecondary: '#E0E0FF',
    textTertiary: '#B0B0E8',
    textLight: '#FFFFFF',
    
    // Borders - Ultra bright neon glow
    border: 'rgba(138, 43, 226, 0.5)',
    borderHover: 'rgba(138, 43, 226, 0.9)',
    
    // Accent colors - EXTREME Electric neon
    accent1: '#FF0099',
    accent1Light: '#FF4DAA',
    accent1Dark: '#DD0077',
    
    accent2: '#00FFFF',
    accent2Light: '#66FFFF',
    accent2Dark: '#00CCCC',
    
    accent3: '#9933FF',
    accent3Light: '#BB66FF',
    accent3Dark: '#7711DD',
  },
  // Deuteranopia (red-green colorblind) - use blue/yellow/orange
  deuteranopia: {
    bgPrimary: '#FDFCFA',
    bgSecondary: '#F7F6F3',
    bgTertiary: '#F0EDE8',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: 'rgba(255, 255, 255, 0.95)',
    
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    textTertiary: '#95A5A6',
    textLight: 'white',
    
    border: '#E8E5E0',
    borderHover: '#D4D0CB',
    
    // Blue as primary
    accent1: '#3b82f6',
    accent1Light: '#60a5fa',
    accent1Dark: '#2563eb',
    
    // Orange as secondary
    accent2: '#f59e0b',
    accent2Light: '#fbbf24',
    accent2Dark: '#d97706',
    
    // Yellow as tertiary
    accent3: '#eab308',
    accent3Light: '#facc15',
    accent3Dark: '#ca8a04',
  },
  // Protanopia (red-blind) - use blue/yellow/teal
  protanopia: {
    bgPrimary: '#FDFCFA',
    bgSecondary: '#F7F6F3',
    bgTertiary: '#F0EDE8',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: 'rgba(255, 255, 255, 0.95)',
    
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    textTertiary: '#95A5A6',
    textLight: 'white',
    
    border: '#E8E5E0',
    borderHover: '#D4D0CB',
    
    // Teal as primary
    accent1: '#14b8a6',
    accent1Light: '#5eead4',
    accent1Dark: '#0d9488',
    
    // Blue as secondary
    accent2: '#3b82f6',
    accent2Light: '#60a5fa',
    accent2Dark: '#2563eb',
    
    // Yellow as tertiary
    accent3: '#eab308',
    accent3Light: '#facc15',
    accent3Dark: '#ca8a04',
  },
  // Tritanopia (blue-yellow colorblind) - use red/pink/cyan
  tritanopia: {
    bgPrimary: '#FDFCFA',
    bgSecondary: '#F7F6F3',
    bgTertiary: '#F0EDE8',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: 'rgba(255, 255, 255, 0.95)',
    
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    textTertiary: '#95A5A6',
    textLight: 'white',
    
    border: '#E8E5E0',
    borderHover: '#D4D0CB',
    
    // Cyan as primary
    accent1: '#06b6d4',
    accent1Light: '#22d3ee',
    accent1Dark: '#0891b2',
    
    // Pink as secondary
    accent2: '#ec4899',
    accent2Light: '#f472b6',
    accent2Dark: '#db2777',
    
    // Red as tertiary
    accent3: '#ef4444',
    accent3Light: '#f87171',
    accent3Dark: '#dc2626',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme');
    return (saved as ThemeMode) || 'light';
  });

  const [performanceLevel, setPerformanceLevelState] = useState<PerformanceLevel>(() => {
    if (typeof window === 'undefined') return 'medium';
    const saved = localStorage.getItem('performanceLevel');
    return (saved as PerformanceLevel) || detectPerformanceLevel();
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      // Update document class for global styles
      document.documentElement.className = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('performanceLevel', performanceLevel);
    }
  }, [performanceLevel]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setPerformanceLevel = (level: PerformanceLevel) => {
    setPerformanceLevelState(level);
  };

  const getColor = (colorKey: string): string => {
    // Ultra mode color overrides - COMPLETELY DIFFERENT COLOR SCHEME
    if (performanceLevel === 'ultra') {
      const ultraColors: Record<string, string> = {
        bgPrimary: '#050008',
        bgSecondary: '#0a0010',
        bgTertiary: '#12001a',
        bgCard: 'rgba(10, 0, 16, 0.9)',
        bgCardHover: 'rgba(18, 0, 26, 0.95)',
        
        textPrimary: '#00ffff',
        textSecondary: '#ff00ff',
        textTertiary: '#ffff00',
        textLight: '#00ffff',
        
        border: 'rgba(0, 255, 255, 0.3)',
        borderHover: 'rgba(0, 255, 255, 0.6)',
        
        accent1: '#00ffff',  // Cyan
        accent1Light: '#66ffff',
        accent1Dark: '#00cccc',
        
        accent2: '#ff00ff',  // Magenta
        accent2Light: '#ff66ff',
        accent2Dark: '#cc00cc',
        
        accent3: '#ffff00',  // Yellow
        accent3Light: '#ffff66',
        accent3Dark: '#cccc00',
      };
      
      return ultraColors[colorKey] || themeColors[theme][colorKey as keyof typeof themeColors.light] || colorKey;
    }
    
    return themeColors[theme][colorKey as keyof typeof themeColors.light] || colorKey;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getColor, performanceLevel, setPerformanceLevel }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}