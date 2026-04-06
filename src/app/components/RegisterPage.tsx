import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { Lock, User, Mail, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { getColor } = useTheme();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const validateForm = () => {
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const result = register(formData.username, formData.email, formData.password);
      
      if (result.success) {
        toast.success('Account created successfully! 🎉', {
          description: 'Welcome to Lost & Found'
        });
        navigate('/');
      } else {
        toast.error('Registration failed', {
          description: result.error
        });
        if (result.error?.includes('Username')) {
          setErrors({ ...errors, username: result.error });
        } else if (result.error?.includes('Email')) {
          setErrors({ ...errors, email: result.error });
        }
      }
      
      setIsLoading(false);
    }, 800);
  };

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 33, text: 'Weak', color: '#ef4444' };
    if (password.length < 10) return { strength: 66, text: 'Medium', color: '#f59e0b' };
    return { strength: 100, text: 'Strong', color: '#10b981' };
  };

  const strength = passwordStrength(formData.password);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
          style={{ 
            background: `linear-gradient(to bottom right, ${getColor('accent3')}, ${getColor('accent3Light')})`,
            animationDelay: '1s'
          }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-2xl relative"
            style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Dark')})` }}
          >
            <div 
              className="absolute inset-0 rounded-2xl blur-lg opacity-50"
              style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
            ></div>
            <UserPlus className="h-8 w-8 text-white relative z-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>Create Account</h1>
          <p style={{ color: getColor('textSecondary') }}>Join the Lost & Found community</p>
        </motion.div>

        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card 
            className="border-2 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <CardHeader 
              className="pb-6 border-b"
              style={{
                background: `linear-gradient(to right, ${getColor('accent1')}15, transparent)`,
                borderColor: getColor('border')
              }}
            >
              <CardTitle className="text-2xl" style={{ color: getColor('textPrimary') }}>Sign Up</CardTitle>
              <CardDescription style={{ color: getColor('textSecondary') }}>Create your free account</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base font-semibold" style={{ color: getColor('textPrimary') }}>
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: getColor('textTertiary') }} />
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData({ ...formData, username: e.target.value });
                        setErrors({ ...errors, username: '' });
                      }}
                      placeholder="Choose a username"
                      className={`h-12 pl-11 rounded-xl border-2 transition-all ${
                        errors.username ? 'border-red-500' : ''
                      }`}
                      style={{
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary'),
                        borderColor: errors.username ? '#ef4444' : getColor('border')
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.username && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.username}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold" style={{ color: getColor('textPrimary') }}>
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: getColor('textTertiary') }} />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setErrors({ ...errors, email: '' });
                      }}
                      placeholder="your.email@school.edu"
                      className={`h-12 pl-11 rounded-xl border-2 transition-all ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      style={{
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary'),
                        borderColor: errors.email ? '#ef4444' : getColor('border')
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-semibold" style={{ color: getColor('textPrimary') }}>
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: getColor('textTertiary') }} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setErrors({ ...errors, password: '' });
                      }}
                      placeholder="Create a password"
                      className={`h-12 pl-11 pr-11 rounded-xl border-2 transition-all ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      style={{
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary'),
                        borderColor: errors.password ? '#ef4444' : getColor('border')
                      }}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: getColor('textTertiary') }}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-300"
                          style={{ 
                            width: `${strength.strength}%`,
                            backgroundColor: strength.color
                          }}
                        ></div>
                      </div>
                      <p className="text-xs" style={{ color: strength.color }}>
                        Password strength: {strength.text}
                      </p>
                    </div>
                  )}
                  
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-semibold" style={{ color: getColor('textPrimary') }}>
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: getColor('textTertiary') }} />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        setErrors({ ...errors, confirmPassword: '' });
                      }}
                      placeholder="Confirm your password"
                      className={`h-12 pl-11 pr-11 rounded-xl border-2 transition-all ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                      style={{
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary'),
                        borderColor: errors.confirmPassword ? '#ef4444' : getColor('border')
                      }}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: getColor('textTertiary') }}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-sm flex items-center gap-1" style={{ color: '#10b981' }}>
                      <CheckCircle className="h-4 w-4" />
                      Passwords match
                    </p>
                  )}
                  {errors.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base shadow-lg rounded-xl font-semibold text-white border-0 relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Dark')})`
                  }}
                  disabled={isLoading}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(to right, ${getColor('accent1Light')}, ${getColor('accent1')})` }}
                  ></div>
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create Account
                      </>
                    )}
                  </span>
                </Button>

                {/* Already have account */}
                <div className="text-center pt-2">
                  <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="font-semibold hover:underline"
                      style={{ color: getColor('accent1') }}
                    >
                      Sign in
                    </button>
                  </p>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/')}
                    style={{ color: getColor('textSecondary') }}
                  >
                    ← Back to Home
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
