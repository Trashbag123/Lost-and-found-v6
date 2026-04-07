import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { Lock, User, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { getColor } = useTheme();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/';

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API delay for realistic feel
    setTimeout(() => {
      const success = login(formData.username, formData.password);
      
      if (success) {
        toast.success('Login successful!', {
          description: 'Welcome back!'
        });
        navigate(from, { replace: true });
      } else {
        toast.error('Invalid credentials', {
          description: 'Please check your username and password'
        });
        setErrors({
          username: 'Invalid username or password',
          password: 'Invalid username or password'
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      <div className="w-full max-w-3xl flex flex-col lg:flex-row gap-10 items-start">

        {/* Benefits panel */}
        <div className="flex-1 lg:pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: getColor('accent1') }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: getColor('accent1') }}>
              Why sign in?
            </span>
          </div>
          <h2 className="text-2xl font-black mb-6" style={{ color: getColor('textPrimary') }}>
            Track everything in one place.
          </h2>
          <div className="space-y-6">
            {[
              { title: 'See all your claims', desc: 'Every claim you submit is saved to your profile so you can check status anytime without digging for a claim ID.' },
              { title: 'Notifications', desc: "Get notified the moment your claim is approved or rejected — no need to keep checking back." },
              { title: 'Faster submissions', desc: 'Your name and email are pre-filled on forms so submitting a found item takes seconds.' },
            ].map((b) => (
              <div key={b.title}>
                <p className="text-sm font-semibold mb-1" style={{ color: getColor('textPrimary') }}>{b.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: getColor('textSecondary') }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Login form */}
        <div className="w-full lg:w-80 shrink-0">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
            style={{ background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Dark')})` }}
          >
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>Welcome back</h1>
          <p style={{ color: getColor('textSecondary') }}>Sign in to track your claims and notifications</p>
        </div>

        {/* Login Card */}
        <Card 
          className="border-2 shadow-xl rounded-3xl"
          style={{
            backgroundColor: getColor('bgCard'),
            borderColor: getColor('border')
          }}
        >
          <CardHeader
            className="pb-6 border-b"
            style={{
              background: `linear-gradient(to right, ${getColor('accent2')}10, transparent)`,
              borderColor: getColor('border')
            }}
          >
            <CardTitle className="text-2xl" style={{ color: getColor('textPrimary') }}>Sign In</CardTitle>
            <CardDescription style={{ color: getColor('textSecondary') }}>Use the username and password you registered with</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your username"
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
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.username}
                  </p>
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
                    placeholder="Enter your password"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                    style={{ color: getColor('textTertiary') }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base shadow-lg rounded-xl font-semibold text-white border-0"
                style={{
                  background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Dark')})`
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </>
                )}
              </Button>

              {/* Don't have account */}
              <div className="text-center pt-2">
                <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="font-semibold hover:underline cursor-pointer"
                    style={{ color: getColor('accent2') }}
                  >
                    Sign up
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
        </div>
      </div>
    </div>
  );
}