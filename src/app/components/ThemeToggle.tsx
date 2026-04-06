import { Moon, Sun, Eye, Palette, Zap, Gauge } from 'lucide-react';
import { useTheme, ThemeMode } from '@/app/contexts/ThemeContext';
import { PerformanceLevel } from '@/app/utils/performanceDetector';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme, getColor, performanceLevel, setPerformanceLevel } = useTheme();

  const themeOptions: { value: ThemeMode; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: 'light',
      label: 'Light Mode',
      icon: <Sun className="h-4 w-4" />,
      description: 'Bright & vibrant'
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      icon: <Moon className="h-4 w-4" />,
      description: 'Neon & electric'
    },
    {
      value: 'deuteranopia',
      label: 'Deuteranopia',
      icon: <Eye className="h-4 w-4" />,
      description: 'Red-green colorblind'
    },
    {
      value: 'protanopia',
      label: 'Protanopia',
      icon: <Eye className="h-4 w-4" />,
      description: 'Red-blind friendly'
    },
    {
      value: 'tritanopia',
      label: 'Tritanopia',
      icon: <Eye className="h-4 w-4" />,
      description: 'Blue-yellow colorblind'
    },
  ];

  const currentTheme = themeOptions.find(option => option.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="ghost" 
            size="icon"
            className="relative rounded-xl transition-all shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
              color: 'white',
              boxShadow: `0 0 20px ${getColor('accent1')}40`,
            }}
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : theme === 'light' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Palette className="h-5 w-5" />
              )}
            </motion.div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 rounded-xl border-2 shadow-2xl backdrop-blur-xl"
        style={{
          backgroundColor: `${getColor('bgCard')}f0`,
          borderColor: `${getColor('accent1')}40`,
          boxShadow: `0 0 30px ${getColor('accent1')}30`,
        }}
      >
        <DropdownMenuLabel style={{ color: getColor('textPrimary') }}>
          Theme Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator style={{ backgroundColor: getColor('border') }} />
        
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className="flex items-start gap-3 cursor-pointer py-3 rounded-lg"
            style={{
              backgroundColor: theme === option.value ? `${getColor('accent1')}20` : 'transparent',
            }}
          >
            <div className="mt-0.5" style={{ color: theme === option.value ? getColor('accent1') : getColor('textSecondary') }}>
              {option.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium" style={{ color: getColor('textPrimary') }}>
                {option.label}
                {theme === option.value && (
                  <span className="ml-2 text-xs" style={{ color: getColor('accent1') }}>✓</span>
                )}
              </div>
              <div className="text-xs" style={{ color: getColor('textTertiary') }}>
                {option.description}
              </div>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator style={{ backgroundColor: getColor('border') }} />
        
        <DropdownMenuLabel style={{ color: getColor('textPrimary') }}>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Performance Mode
          </div>
        </DropdownMenuLabel>

        {(['ultra', 'high', 'medium', 'low'] as PerformanceLevel[]).map((level) => (
          <DropdownMenuItem
            key={level}
            onClick={() => setPerformanceLevel(level)}
            className="flex items-start gap-3 cursor-pointer py-3 rounded-lg"
            style={{
              backgroundColor: performanceLevel === level ? `${getColor('accent2')}20` : 'transparent',
            }}
          >
            <div className="mt-0.5" style={{ color: performanceLevel === level ? getColor('accent2') : getColor('textSecondary') }}>
              <Zap className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium" style={{ color: getColor('textPrimary') }}>
                {level.charAt(0).toUpperCase() + level.slice(1)} Performance
                {performanceLevel === level && (
                  <span className="ml-2 text-xs" style={{ color: getColor('accent2') }}>✓</span>
                )}
              </div>
              <div className="text-xs" style={{ color: getColor('textSecondary') }}>
                {level === 'ultra' && 'Maximum effects - Requires high-end GPU'}
                {level === 'high' && 'Maximum effects & animations'}
                {level === 'medium' && 'Balanced quality & performance'}
                {level === 'low' && 'Minimal effects for best performance'}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}