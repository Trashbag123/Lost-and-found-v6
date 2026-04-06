import { Link, useLocation, useNavigate } from 'react-router';
import { Search, Plus, Shield, Home, Package2, MessageSquare, ChevronDown, User, LogIn, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { NotificationBell } from '@/app/components/NotificationBell';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { motion } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/app/components/ui/dropdown-menu';

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getColor, performanceLevel } = useTheme();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  const isUltra = performanceLevel === 'ultra';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav 
      className="backdrop-blur-2xl shadow-2xl sticky top-0 z-50 border-b-3"
      style={{
        backgroundColor: isUltra ? 'rgba(5, 0, 8, 0.85)' : `${getColor('bgCard')}f0`,
        borderColor: getColor('border'),
        borderImage: isUltra ? `linear-gradient(90deg, ${getColor('accent1')}, ${getColor('accent2')}, ${getColor('accent3')}) 1` : 'none',
        boxShadow: isUltra ? `0 0 50px ${getColor('accent1')}40, 0 0 100px ${getColor('accent2')}20` : 'none'
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <motion.div 
              className="relative p-3 rounded-3xl mr-3"
              style={{
                background: isUltra 
                  ? `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')}, ${getColor('accent3')})`
                  : `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
              }}
              whileHover={{ scale: 1.15, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              {isUltra ? (
                <Zap className="h-8 w-8 text-black" />
              ) : (
                <Package2 className="h-8 w-8 text-white" />
              )}
              
              {isUltra && (
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')}, ${getColor('accent3')})`,
                    filter: 'blur(15px)',
                    opacity: 0.6
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.3, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="text-3xl font-black"
                  style={{
                    color: getColor('textPrimary'),
                    textShadow: isUltra ? `0 0 20px ${getColor('accent1')}, 0 0 40px ${getColor('accent2')}` : 'none'
                  }}
                >
                  Lost & Found
                </span>
                {isUltra && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5" style={{ color: getColor('accent3') }} />
                  </motion.div>
                )}
              </div>
              <div 
                className="text-xs font-bold tracking-wider uppercase"
                style={{ 
                  color: getColor('textTertiary'),
                  textShadow: isUltra ? `0 0 10px ${getColor('accent2')}` : 'none'
                }}
              >
                {isUltra ? '⚡ ULTRA MODE ACTIVE ⚡' : 'School Portal'}
              </div>
            </div>
          </Link>
          
          {/* Nav links */}
          <div className="flex items-center gap-3">
            <NavLink to="/" isActive={isActive('/')} icon={<Home className="h-5 w-5" />} isUltra={isUltra}>
              Home
            </NavLink>
            
            <NavLink 
              to="/items" 
              isActive={isActive('/items') || location.pathname.startsWith('/item/')} 
              icon={<Search className="h-5 w-5" />}
              isUltra={isUltra}
            >
              Browse
            </NavLink>
            
            <NavLink to="/submit" isActive={isActive('/submit')} icon={<Plus className="h-5 w-5" />} isUltra={isUltra}>
              Submit
            </NavLink>
            
            <NavLink to="/claims" isActive={isActive('/claims')} icon={<MessageSquare className="h-5 w-5" />} isUltra={isUltra}>
              Claims
            </NavLink>
            
                        <div 
              className="h-10 w-px mx-2"
              style={{ 
                background: isUltra 
                  ? `linear-gradient(to bottom, transparent, ${getColor('border')}, transparent)`
                  : getColor('border')
              }}
            />
            
                        <NotificationBell />
            
                        <ThemeToggle />
            
                        {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-2xl h-12 px-5 font-bold cursor-pointer"
                    style={{
                      background: isUltra 
                        ? `linear-gradient(135deg, ${getColor('accent2')}20, ${getColor('accent3')}20)`
                        : 'transparent',
                      border: isUltra ? `2px solid ${getColor('accent2')}` : 'none',
                      color: getColor('textPrimary'),
                      boxShadow: isUltra ? `0 0 20px ${getColor('accent2')}30` : 'none'
                    }}
                  >
                    <User className="h-5 w-5 mr-2" />
                    {user.username}
                    <ChevronDown className="h-5 w-5 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 rounded-2xl border-2 shadow-2xl"
                  style={{ 
                    backgroundColor: getColor('bgCard'),
                    borderColor: getColor('border')
                  }}
                >
                  <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
                    <Link to="/profile" className="flex items-center">
                      <User className="h-5 w-5 mr-3" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
                      <Link to="/admin" className="flex items-center">
                        <Shield className="h-5 w-5 mr-3" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-xl font-semibold"
                    style={{ color: getColor('accent1') }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="cursor-pointer">
                <Button
                  className="rounded-2xl h-12 px-6 font-bold text-white shadow-xl"
                  style={{
                    background: isUltra
                      ? `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')}, ${getColor('accent3')})`
                      : `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                    boxShadow: isUltra ? `0 0 30px ${getColor('accent1')}60` : 'none'
                  }}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// NavLink sub-component for consistent nav item styling
function NavLink({ 
  to, 
  isActive, 
  icon, 
  children, 
  isUltra 
}: { 
  to: string; 
  isActive: boolean; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  isUltra: boolean;
}) {
  const { getColor } = useTheme();
  
  return (
    <Link to={to} className="cursor-pointer">
      <motion.div 
        whileHover={{ scale: 1.08, y: -2 }} 
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button 
          variant="ghost"
          size="lg"
          className="rounded-2xl font-bold h-12 px-6 transition-all relative overflow-hidden"
          style={isActive ? {
            background: isUltra
              ? `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`
              : `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
            color: isUltra ? '#000000' : 'white',
            boxShadow: `0 0 25px ${getColor('accent1')}50`,
            border: isUltra ? `2px solid ${getColor('accent3')}` : 'none'
          } : {
            color: getColor('textPrimary'),
            background: isUltra ? `${getColor('accent1')}10` : 'transparent'
          }}
        >
          {isActive && isUltra && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                filter: 'blur(20px)',
                opacity: 0.5
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {icon}
            {children}
          </span>
        </Button>
      </motion.div>
    </Link>
  );
}
