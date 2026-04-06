import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { Accessibility, Eye, Keyboard, Monitor, Volume2, MousePointer } from 'lucide-react';
import { motion } from 'motion/react';

export function AccessibilityPage() {
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
            style={{ background: `linear-gradient(135deg, ${getColor('accent3')}, ${getColor('accent3Dark')})` }}
          >
            <Accessibility className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
            Accessibility Statement
          </h1>
          <p className="text-xl" style={{ color: getColor('textSecondary') }}>
            Our commitment to making this service usable for everyone
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
                <h2 className="text-3xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                  Our Commitment
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: getColor('textSecondary') }}>
                  We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to ensure our Lost & Found system is accessible to all students, faculty, and staff.
                </p>
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
                <h2 className="text-3xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                  Accessibility Features
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getColor('accent1')}20` }}
                    >
                      <Keyboard className="h-8 w-8" style={{ color: getColor('accent1') }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                        Keyboard Navigation
                      </h3>
                      <p style={{ color: getColor('textSecondary') }}>
                        Full keyboard navigation support with clear focus indicators. Use Tab to navigate, Enter/Space to activate buttons, and arrow keys for dropdowns and lists.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getColor('accent2')}20` }}
                    >
                      <Eye className="h-8 w-8" style={{ color: getColor('accent2') }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                        Screen Reader Compatibility
                      </h3>
                      <p style={{ color: getColor('textSecondary') }}>
                        Compatible with JAWS, NVDA, and VoiceOver. All images have descriptive alt text, forms have proper labels, and semantic HTML ensures logical reading order.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getColor('accent3')}20` }}
                    >
                      <Monitor className="h-8 w-8" style={{ color: getColor('accent3') }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                        Multiple Theme Options
                      </h3>
                      <p style={{ color: getColor('textSecondary') }}>
                        Choose from 5 carefully designed themes including high-contrast options. All themes meet WCAG 2.1 AA color contrast requirements for text and interactive elements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getColor('accent1')}20` }}
                    >
                      <MousePointer className="h-8 w-8" style={{ color: getColor('accent1') }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                        Responsive Design
                      </h3>
                      <p style={{ color: getColor('textSecondary') }}>
                        Fully responsive interface that works on desktop, tablet, and mobile devices. Text and buttons resize appropriately, and touch targets meet minimum size requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getColor('accent2')}20` }}
                    >
                      <Volume2 className="h-8 w-8" style={{ color: getColor('accent2') }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                        Clear Communication
                      </h3>
                      <p style={{ color: getColor('textSecondary') }}>
                        Plain language throughout the interface, clear error messages, and multiple notification options (visual, email) for important updates.
                      </p>
                    </div>
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
                <h2 className="text-3xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                  Standards Compliance
                </h2>
                <p className="text-lg mb-5" style={{ color: getColor('textSecondary') }}>
                  We strive to conform to the following accessibility standards:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent3') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent3') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Section 508:</strong> U.S. federal accessibility requirements
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent3') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>ADA:</strong> Americans with Disabilities Act compliance
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
                <h2 className="text-3xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                  Known Limitations
                </h2>
                <p className="text-lg mb-5" style={{ color: getColor('textSecondary') }}>
                  We are actively working to address the following accessibility challenges:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      Some decorative animations may cause issues for users with motion sensitivity. These can be reduced by enabling "Reduce motion" in your device settings.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent2') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      User-uploaded images may not always have descriptive alt text. We encourage users to provide detailed descriptions when reporting items.
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
                <h2 className="text-3xl font-black mb-5" style={{ color: getColor('textPrimary') }}>
                  Alternative Access
                </h2>
                <p className="text-lg" style={{ color: getColor('textSecondary') }}>
                  If you encounter accessibility barriers while using our service, we provide alternative ways to access the Lost & Found system:
                </p>
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent1') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Phone:</strong> (555) 123-3210 during business hours
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent1') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>In-Person:</strong> Visit the main office (8am-5pm, Monday-Friday)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: getColor('accent1') }}></div>
                    <p style={{ color: getColor('textSecondary') }}>
                      <strong style={{ color: getColor('textPrimary') }}>Email:</strong> accessibility@school.edu
                    </p>
                  </div>
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
              <Accessibility className="h-12 w-12 mx-auto mb-5" style={{ color: getColor('accent3') }} />
              <h3 className="text-2xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
                Feedback & Assistance
              </h3>
              <p style={{ color: getColor('textSecondary') }}>
                We welcome your feedback on the accessibility of our Lost & Found system.
                <br />Please contact us at <strong style={{ color: getColor('accent3') }}>accessibility@school.edu</strong>
                <br />or call (555) 123-3210 if you encounter any accessibility barriers.
              </p>
              <p className="mt-5 text-sm" style={{ color: getColor('textTertiary') }}>
                We aim to respond to accessibility feedback within 2 business days.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
