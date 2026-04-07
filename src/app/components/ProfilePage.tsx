import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useClaims } from '@/app/contexts/ClaimsContext';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { User, Mail, Calendar, Shield, LogOut, CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getColor } = useTheme();
  const { getClaimsByEmail } = useClaims();
  const navigate = useNavigate();

  const userClaims = user ? getClaimsByEmail(user.email) : [];

  const statusIcon = (status: string) => {
    if (status === 'verified') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'rejected') return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };
  const statusLabel = (status: string) => {
    if (status === 'verified') return 'Approved — Ready for pickup';
    if (status === 'rejected') return 'Unable to verify';
    return 'Pending review';
  };

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
              style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
            >
              <CardHeader className="border-b" style={{ borderColor: getColor('border') }}>
                <CardTitle className="text-xl font-black" style={{ color: getColor('textPrimary') }}>
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: `${getColor('accent2')}10` }}>
                    <p className="text-3xl font-black mb-1" style={{ color: getColor('accent2') }}>{userClaims.length}</p>
                    <p className="text-xs font-semibold" style={{ color: getColor('textSecondary') }}>Claims submitted</p>
                  </div>
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: `${getColor('accent3')}10` }}>
                    <p className="text-3xl font-black mb-1" style={{ color: getColor('accent3') }}>
                      {userClaims.filter(c => c.status === 'verified').length}
                    </p>
                    <p className="text-xs font-semibold" style={{ color: getColor('textSecondary') }}>Claims approved</p>
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

              </CardContent>
            </Card>

            {/* My Claims */}
            <Card
              className="border-2 rounded-3xl"
              style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
            >
              <CardHeader className="border-b" style={{ borderColor: getColor('border') }}>
                <CardTitle className="text-xl font-black" style={{ color: getColor('textPrimary') }}>
                  My Claims
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {userClaims.length === 0 ? (
                  <div className="text-center py-10">
                    <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" style={{ color: getColor('textSecondary') }} />
                    <p className="text-sm font-medium mb-1" style={{ color: getColor('textPrimary') }}>No claims yet</p>
                    <p className="text-xs" style={{ color: getColor('textSecondary') }}>
                      Claims you submit will appear here so you can track their status.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userClaims.map((claim) => (
                      <div
                        key={claim.id}
                        className="flex items-start justify-between gap-4 p-4 rounded-xl border"
                        style={{ borderColor: getColor('border'), backgroundColor: getColor('bgSecondary') }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate mb-0.5" style={{ color: getColor('textPrimary') }}>
                            {claim.itemName}
                          </p>
                          <p className="text-xs" style={{ color: getColor('textTertiary') }}>
                            {new Date(claim.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {' · '}ID: {claim.id}
                          </p>
                          {claim.adminNotes && (
                            <p className="text-xs mt-1 italic" style={{ color: getColor('textTertiary') }}>
                              "{claim.adminNotes}"
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {statusIcon(claim.status)}
                          <span className="text-xs font-medium" style={{ color: getColor('textSecondary') }}>
                            {statusLabel(claim.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
