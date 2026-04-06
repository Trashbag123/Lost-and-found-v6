import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { Lock, Eye, Database, UserCheck, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export function PrivacyPage() {
  const { getColor } = useTheme();

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${getColor('accent2')}, ${getColor('accent2Dark')})` }}
          >
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
            Privacy Policy
          </h1>
          <p className="text-xl" style={{ color: getColor('textSecondary') }}>
            How we collect, use, and protect your information
          </p>
          <p className="text-sm mt-2" style={{ color: getColor('textTertiary') }}>
            Last updated: April 2, 2026
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              className="border-2 rounded-3xl"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getColor('accent1')}20` }}
                  >
                    <Database className="h-8 w-8" style={{ color: getColor('accent1') }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                      Information We Collect
                    </h2>
                  </div>
                </div>
                <div className="space-y-5 pl-[76px]">
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                      Account Information
                    </h3>
                    <p style={{ color: getColor('textSecondary') }}>
                      When you create an account, we collect your username, email address, and encrypted password. This information is necessary to provide you with account features like tracking submissions and claims.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                      Item Reports & Claims
                    </h3>
                    <p style={{ color: getColor('textSecondary') }}>
                      When reporting found items or making claims, we collect descriptions, photos, location information, dates, and any additional details you provide. This data is essential for matching items with their owners.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                      Usage Data
                    </h3>
                    <p style={{ color: getColor('textSecondary') }}>
                      We automatically collect technical information such as browser type, device information, IP address, and pages visited. This helps us improve the service and ensure security.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="border-2 rounded-3xl"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getColor('accent2')}20` }}
                  >
                    <Eye className="h-8 w-8" style={{ color: getColor('accent2') }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                      How We Use Your Information
                    </h2>
                  </div>
                </div>
                <div className="space-y-3 pl-[76px]">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Operate the Service:</strong> To facilitate the reporting, searching, claiming, and return of lost items
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Communication:</strong> Send notifications about claims, approvals, and important updates
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Security & Fraud Prevention:</strong> Verify identities and prevent fraudulent claims
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Improve Service:</strong> Analyze usage patterns to enhance user experience and system performance
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Legal Compliance:</strong> Comply with applicable laws and school policies
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card
              className="border-2 rounded-3xl"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getColor('accent3')}20` }}
                  >
                    <Shield className="h-8 w-8" style={{ color: getColor('accent3') }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                      Information Sharing
                    </h2>
                  </div>
                </div>
                <div className="space-y-5 pl-[76px]">
                  <p style={{ color: getColor('textSecondary') }}>
                    <strong style={{ color: getColor('textPrimary') }}>We do NOT sell your personal information.</strong> Your data is shared only in these limited circumstances:
                  </p>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                      Publicly Visible Information
                    </h3>
                    <p style={{ color: getColor('textSecondary') }}>
                      Item descriptions and photos you report are made publicly visible to help owners find their items. Personal contact information is never displayed publicly.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                      School Staff
                    </h3>
                    <p style={{ color: getColor('textSecondary') }}>
                      Authorized school staff have access to claim details and contact information to verify claims and coordinate returns.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                      Legal Requirements
                    </h3>
                    <p style={{ color: getColor('textSecondary') }}>
                      We may disclose information if required by law, court order, or to protect the rights and safety of individuals or the school.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card
              className="border-2 rounded-3xl"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getColor('accent1')}20` }}
                  >
                    <Lock className="h-8 w-8" style={{ color: getColor('accent1') }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                      Data Security
                    </h2>
                  </div>
                </div>
                <div className="space-y-3 pl-[76px]">
                  <p style={{ color: getColor('textSecondary') }}>
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent1') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      Encrypted data transmission (HTTPS/SSL)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent1') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      Secure password hashing and storage
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent1') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      Regular security audits and updates
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent1') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      Limited staff access with role-based permissions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card
              className="border-2 rounded-3xl"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getColor('accent2')}20` }}
                  >
                    <UserCheck className="h-8 w-8" style={{ color: getColor('accent2') }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                      Your Rights
                    </h2>
                  </div>
                </div>
                <div className="space-y-3 pl-[76px]">
                  <p style={{ color: getColor('textSecondary') }}>
                    You have the following rights regarding your personal data:
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Access:</strong> Request a copy of your personal data
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Correction:</strong> Request corrections to inaccurate information
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Deletion:</strong> Request deletion of your account and associated data
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Opt-out:</strong> Unsubscribe from non-essential notifications
                    </p>
                  </div>
                  <p className="mt-5" style={{ color: getColor('textSecondary') }}>
                    To exercise these rights, contact us at <strong style={{ color: getColor('accent2') }}>privacy@school.edu</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Card
              className="border-2 rounded-2xl p-8"
              style={{
                backgroundColor: `${getColor('accent3')}10`,
                borderColor: `${getColor('accent3')}30`
              }}
            >
              <h3 className="text-2xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                Questions About Privacy?
              </h3>
              <p style={{ color: getColor('textSecondary') }}>
                Contact our Privacy Officer at <strong style={{ color: getColor('accent3') }}>privacy@school.edu</strong>
                <br />or call (555) 123-3210 during business hours
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
