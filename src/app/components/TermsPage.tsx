import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { FileText, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function TermsPage() {
  const { getColor } = useTheme();

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using the School Lost & Found system, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this service.'
    },
    {
      title: '2. Service Description',
      content: 'The Lost & Found system is provided as a free service to facilitate the return of lost items to their rightful owners. We act as an intermediary platform and are not responsible for the items themselves.'
    },
    {
      title: '3. User Responsibilities',
      content: 'Users must provide accurate information when reporting found items or making claims. False claims or fraudulent activity will result in immediate account termination and may be reported to school authorities.'
    },
    {
      title: '5. Item Submission',
      content: 'When reporting a found item, you agree to: (a) provide truthful and accurate descriptions, (b) upload appropriate photos without personal information of others, (c) make reasonable efforts to help reunite items with owners, and (d) hold items securely until they can be turned in to the designated location.'
    },
    {
      title: '6. Claiming Items',
      content: 'Claims must include legitimate proof of ownership. False claims may result in account suspension and referral to campus security. The school reserves the right to request additional verification before releasing any item.'
    },
    {
      title: '7. Privacy & Data',
      content: 'We collect and store information necessary to operate the service, including contact details, item descriptions, and photos. This information is used solely for reuniting lost items with owners and is not shared with third parties except as required by law.'
    },
    {
      title: '8. Liability Limitations',
      content: 'The school and this service are not liable for: (a) lost, stolen, or damaged items, (b) disputes between users, (c) accuracy of user-submitted information, or (d) any direct or indirect damages resulting from use of this service.'
    },
    {
      title: '9. Item Disposal',
      content: 'Unclaimed items will be held for 90 days. After this period, items may be donated to charity, disposed of, or handled according to school policy. High-value items may be held longer at the school\'s discretion.'
    },
    {
      title: '10. Prohibited Items',
      content: 'Certain items cannot be processed through this system, including: weapons, illegal substances, perishable foods, live animals, hazardous materials, or items that violate school policies. These should be reported directly to campus security.'
    },
    {
      title: '11. Service Modifications',
      content: 'We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice. We may also update these terms periodically, and continued use constitutes acceptance of updated terms.'
    },
    {
      title: '12. Account Termination',
      content: 'We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the service. Users may delete their accounts at any time.'
    },
    {
      title: '13. Governing Law',
      content: 'These terms are governed by the laws of the jurisdiction in which the school is located. Any disputes will be resolved through the school\'s standard grievance procedures.'
    },
    {
      title: '14. Contact',
      content: 'Questions about these terms should be directed to: lost-found@school.edu or the main office during business hours.'
    }
  ];

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
            style={{ background: `linear-gradient(135deg, ${getColor('accent3')}, ${getColor('accent3Dark')})` }}
          >
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
            Terms of Service
          </h1>
          <p className="text-xl mb-6" style={{ color: getColor('textSecondary') }}>
            Last updated: April 2, 2026
          </p>
          
          <Card 
            className="border-2 rounded-2xl p-6 max-w-3xl mx-auto"
            style={{ 
              backgroundColor: `${getColor('accent1')}10`,
              borderColor: `${getColor('accent1')}30`
            }}
          >
            <p className="text-sm" style={{ color: getColor('textSecondary') }}>
              <AlertCircle className="inline h-5 w-5 mr-2 mb-1" style={{ color: getColor('accent1') }} />
              <strong style={{ color: getColor('accent1') }}>Important:</strong> Please read these terms carefully before using our service. By using the Lost & Found system, you agree to be bound by these terms.
            </p>
          </Card>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="border-2 rounded-3xl"
                style={{
                  backgroundColor: getColor('bgCard'),
                  borderColor: getColor('border')
                }}
              >
                <CardContent className="p-8">
                  <h2 className="text-2xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: getColor('textSecondary') }}>
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card
            className="border-2 rounded-2xl p-8"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <Shield className="h-12 w-12 mx-auto mb-5" style={{ color: getColor('accent2') }} />
            <h3 className="text-2xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
              Questions About These Terms?
            </h3>
            <p style={{ color: getColor('textSecondary') }}>
              Contact us at <strong style={{ color: getColor('accent2') }}>lost-found@school.edu</strong> or visit the main office during business hours (8am-5pm, Monday-Friday).
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
