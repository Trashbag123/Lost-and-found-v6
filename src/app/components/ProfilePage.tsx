import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { User, Mail, Calendar, Shield, LogOut, Package, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getColor } = useTheme();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: getColor('bgPrimary') }}>
        <Card style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}>
          <CardContent className="p-8 text-center">
            <p className="mb-4" style={{ color: getColor('textSecondary') }}>Please log in to view your profile</p>
            <Button onClick={() => navigate('/login')}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
            My Profile
          </h1>
          <p className="text-xl" style={{ color: getColor('textSecondary') }}>
            Manage your account settings and information
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card 
              className="border-2 rounded-3xl overflow-hidden"
              style={{ 
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardHeader 
                className="pb-6 border-b text-center"
                style={{
                  background: `linear-gradient(to bottom, ${getColor('accent1')}20, transparent)`,
                  borderColor: getColor('border')
                }}
              >
                <div className="flex justify-center mb-5">
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})` 
                    }}
                  >
                    <User className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-black" style={{ color: getColor('textPrimary') }}>
                  {user.username}
                </CardTitle>
                {user.isAdmin && (
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mt-3"
                    style={{ 
                      backgroundColor: `${getColor('accent3')}20`,
                      color: getColor('accent3')
                    }}
                  >
                    <Shield className="h-4 w-4" />
                    Administrator
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: getColor('accent2') }} />
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: getColor('textTertiary') }}>
                        Email Address
                      </p>
                      <p className="font-semibold" style={{ color: getColor('textPrimary') }}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: getColor('accent1') }} />
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: getColor('textTertiary') }}>
                        Member Since
                      </p>
                      <p className="font-semibold" style={{ color: getColor('textPrimary') }}>
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  className="w-full rounded-xl font-semibold border-2"
                  variant="outline"
                  style={{
                    borderColor: getColor('border'),
                    color: getColor('textPrimary')
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Info & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            
            {/* Quick Stats */}
            <Card 
              className="border-2 rounded-3xl"
              style={{ 
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardHeader className="border-b" style={{ borderColor: getColor('border') }}>
                <CardTitle className="text-xl font-black" style={{ color: getColor('textPrimary') }}>
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div 
                    className="p-5 rounded-2xl"
                    style={{ backgroundColor: `${getColor('accent1')}10` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${getColor('accent1')}30` }}
                      >
                        <Package className="h-5 w-5" style={{ color: getColor('accent1') }} />
                      </div>
                      <div>
                        <p className="text-2xl font-black" style={{ color: getColor('textPrimary') }}>0</p>
                        <p className="text-xs font-semibold" style={{ color: getColor('textSecondary') }}>
                          Items Posted
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="p-5 rounded-2xl"
                    style={{ backgroundColor: `${getColor('accent2')}10` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${getColor('accent2')}30` }}
                      >
                        <CheckCircle className="h-5 w-5" style={{ color: getColor('accent2') }} />
                      </div>
                      <div>
                        <p className="text-2xl font-black" style={{ color: getColor('textPrimary') }}>0</p>
                        <p className="text-xs font-semibold" style={{ color: getColor('textSecondary') }}>
                          Claims Made
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="p-5 rounded-2xl"
                    style={{ backgroundColor: `${getColor('accent3')}10` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${getColor('accent3')}30` }}
                      >
                        <User className="h-5 w-5" style={{ color: getColor('accent3') }} />
                      </div>
                      <div>
                        <p className="text-2xl font-black" style={{ color: getColor('textPrimary') }}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: getColor('textSecondary') }}>
                          Account Type
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card 
              className="border-2 rounded-3xl"
              style={{ 
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardHeader className="border-b" style={{ borderColor: getColor('border') }}>
                <CardTitle className="text-xl font-black" style={{ color: getColor('textPrimary') }}>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div 
                    className="p-5 rounded-2xl border-2"
                    style={{ 
                      backgroundColor: getColor('bgSecondary'),
                      borderColor: getColor('border')
                    }}
                  >
                    <p className="text-xs font-bold mb-2" style={{ color: getColor('textTertiary') }}>
                      USER ID
                    </p>
                    <p className="font-mono text-sm font-semibold" style={{ color: getColor('textPrimary') }}>
                      {user.id}
                    </p>
                  </div>

                  <div 
                    className="p-5 rounded-2xl border-2"
                    style={{ 
                      backgroundColor: getColor('bgSecondary'),
                      borderColor: getColor('border')
                    }}
                  >
                    <p className="text-xs font-bold mb-2" style={{ color: getColor('textTertiary') }}>
                      USERNAME
                    </p>
                    <p className="text-sm font-semibold" style={{ color: getColor('textPrimary') }}>
                      {user.username}
                    </p>
                  </div>

                  <div 
                    className="p-5 rounded-2xl border-2"
                    style={{ 
                      backgroundColor: getColor('bgSecondary'),
                      borderColor: getColor('border')
                    }}
                  >
                    <p className="text-xs font-bold mb-2" style={{ color: getColor('textTertiary') }}>
                      EMAIL
                    </p>
                    <p className="text-sm font-semibold" style={{ color: getColor('textPrimary') }}>
                      {user.email}
                    </p>
                  </div>

                  <div 
                    className="p-5 rounded-2xl border-2"
                    style={{ 
                      backgroundColor: getColor('bgSecondary'),
                      borderColor: getColor('border')
                    }}
                  >
                    <p className="text-xs font-bold mb-2" style={{ color: getColor('textTertiary') }}>
                      ACCOUNT STATUS
                    </p>
                    <div className="flex items-center gap-2">
                      <span 
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#10b981' }}
                      ></span>
                      <p className="text-sm font-semibold" style={{ color: '#10b981' }}>
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-5 rounded-2xl border-2"
                  style={{ 
                    backgroundColor: `${getColor('accent2')}10`,
                    borderColor: `${getColor('accent2')}50`
                  }}
                >
                  <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                    <strong style={{ color: getColor('accent2') }}>Note:</strong> This is a demo account system. 
                    In a production environment, additional security features would be implemented including 
                    email verification, two-factor authentication, and password recovery options.
                  </p>
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
