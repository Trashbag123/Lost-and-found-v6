import { ReactNode, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { Shield, XCircle, Lock, Eye, EyeOff } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

function AdminLoginForm() {
  const { login } = useAuth();
  const { getColor } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials.');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      <Card
        className="max-w-sm w-full border-2 rounded-3xl"
        style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
      >
        <CardContent className="p-10">
          <div className="flex flex-col items-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ backgroundColor: `${getColor('accent1')}20` }}
            >
              <Lock className="h-8 w-8" style={{ color: getColor('accent1') }} />
            </div>
            <h2 className="text-2xl font-black" style={{ color: getColor('textPrimary') }}>
              Staff Access
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{
                backgroundColor: getColor('bgPrimary'),
                borderColor: getColor('border'),
                color: getColor('textPrimary'),
              }}
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none pr-11"
                style={{
                  backgroundColor: getColor('bgPrimary'),
                  borderColor: getColor('border'),
                  color: getColor('textPrimary'),
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: getColor('textSecondary') }}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: getColor('error') }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: getColor('accent1'), color: '#fff' }}
            >
              Sign In
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const { getColor } = useTheme();

  // Admin route: show inline login form instead of redirecting anywhere
  if (requireAdmin) {
    if (!isAuthenticated || !user?.isAdmin) {
      return <AdminLoginForm />;
    }
    return <>{children}</>;
  }

  // Non-admin protected route: show access denied if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: getColor('bgPrimary') }}>
        <Card
          className="max-w-md w-full border-2 rounded-3xl"
          style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
        >
          <CardContent className="p-12 text-center">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
              style={{ backgroundColor: `${getColor('error')}20` }}
            >
              <XCircle className="h-10 w-10" style={{ color: getColor('error') }} />
            </div>
            <h2 className="text-2xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
              Access Denied
            </h2>
            <p className="mb-6" style={{ color: getColor('textSecondary') }}>
              This page requires administrator privileges. Please contact your system administrator if you believe you should have access.
            </p>
            <div
              className="p-5 rounded-2xl border-2 text-sm"
              style={{
                backgroundColor: `${getColor('accent3')}10`,
                borderColor: `${getColor('accent3')}30`,
                color: getColor('textSecondary'),
              }}
            >
              <Shield className="h-5 w-5 mx-auto mb-2" style={{ color: getColor('accent3') }} />
              Contact your system administrator for access.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
