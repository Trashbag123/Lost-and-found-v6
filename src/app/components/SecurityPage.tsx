import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card';
import { Shield, Lock, Eye, Key, Database, UserCheck, FileCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export function SecurityPage() {
  const { getColor } = useTheme();

  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All sensitive data is encrypted using industry-standard AES-256 encryption',
      color: 'accent1'
    },
    {
      icon: UserCheck,
      title: 'Admin Verification',
      description: 'Every claim is manually verified by trained staff members before approval',
      color: 'accent2'
    },
    {
      icon: Eye,
      title: 'Privacy Protection',
      description: 'Personal information is never shared without explicit consent',
      color: 'accent3'
    },
    {
      icon: Database,
      title: 'Secure Storage',
      description: 'All data is stored on secure, regularly backed-up servers',
      color: 'accent1'
    },
    {
      icon: Key,
      title: 'Access Control',
      description: 'Role-based permissions ensure only authorized users can access sensitive data',
      color: 'accent2'
    },
    {
      icon: FileCheck,
      title: 'Audit Trails',
      description: 'Complete logging of all actions for accountability and transparency',
      color: 'accent3'
    }
  ];

  const privacyPolicies = [
    {
      title: 'Data Collection',
      points: [
        'We only collect information necessary for item recovery',
        'No personally identifiable information is shared publicly',
        'Contact details are only visible to verified admins'
      ]
    },
    {
      title: 'Data Usage',
      points: [
        'Information is used solely for lost and found operations',
        'Statistical data may be anonymized for system improvements',
        'No data is sold or shared with third parties'
      ]
    },
    {
      title: 'Data Retention',
      points: [
        'Unclaimed items are archived after 90 days',
        'Claimed items data is purged after 30 days',
        'You can request data deletion at any time'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: getColor('bgSecondary') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="p-4 rounded-2xl"
              style={{
                background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})`
              }}
            >
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Security & Privacy
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: getColor('textSecondary') }}>
            Your trust and privacy are our top priorities. Learn how we protect your data and ensure a secure experience.
          </p>
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card
            className="border-0 shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
            }}
          >
            <CardContent className="p-8 text-center text-white">
              <Shield className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">School-Safe Platform</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Designed specifically for educational environments with student safety and privacy at the core
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: getColor('textPrimary') }}>
            Security Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className="border-2 shadow-lg hover:shadow-xl transition-all h-full group cursor-pointer"
                  style={{
                    backgroundColor: getColor('bgCard'),
                    borderColor: getColor('border')
                  }}
                >
                  <CardContent className="p-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{
                        background: `linear-gradient(to bottom right, ${getColor(feature.color)}, ${getColor(feature.color + 'Light')})`
                      }}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Policy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: getColor('textPrimary') }}>
            Privacy Policies
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {privacyPolicies.map((policy) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Card
                  className="border-2 shadow-lg h-full"
                  style={{
                    backgroundColor: getColor('bgCard'),
                    borderColor: getColor('border')
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>
                      {policy.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {policy.points.map((point, i) => (
                        <li key={i} className="flex items-start text-sm" style={{ color: getColor('textSecondary') }}>
                          <span className="mr-2" style={{ color: getColor('accent1') }}>✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card
            className="border-2 shadow-xl"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{
                    backgroundColor: `${getColor('accent3')}20`
                  }}
                >
                  <AlertTriangle className="h-8 w-8" style={{ color: getColor('accent3') }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: getColor('textPrimary') }}>
                    Our Commitment to You
                  </h3>
                  <p className="text-base mb-4" style={{ color: getColor('textSecondary') }}>
                    We are committed to maintaining the highest standards of security and privacy. If you have any 
                    concerns or questions about how your data is handled, please don't hesitate to contact our 
                    support team.
                  </p>
                  <div className="flex gap-3 text-sm">
                    <div
                      className="px-4 py-2 rounded-lg font-medium"
                      style={{
                        backgroundColor: `${getColor('accent1')}20`,
                        color: getColor('accent1')
                      }}
                    >
                      Last Updated: January 2024
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg font-medium"
                      style={{
                        backgroundColor: `${getColor('accent2')}20`,
                        color: getColor('accent2')
                      }}
                    >
                      FERPA Compliant
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg font-medium"
                      style={{
                        backgroundColor: `${getColor('accent3')}20`,
                        color: getColor('accent3')
                      }}
                    >
                      COPPA Compliant
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
