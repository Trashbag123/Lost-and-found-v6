import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { Shield, XCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const { getColor } = useTheme();
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin is required but user is not admin, show access denied
  if (requireAdmin && !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: getColor('bgPrimary') }}>
        <Card 
          className="max-w-md w-full border-2 rounded-3xl"
          style={{ 
            backgroundColor: getColor('bgCard'),
            borderColor: getColor('border')
          }}
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
                color: getColor('textSecondary')
              }}
            >
              <Shield className="h-5 w-5 mx-auto mb-2" style={{ color: getColor('accent3') }} />
              <strong style={{ color: getColor('accent3') }}>Admin Credentials:</strong><br />
              Username: admin<br />
              Password: admin123
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}