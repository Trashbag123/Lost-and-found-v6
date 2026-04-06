import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { HelpCircle, Search, Package, Shield, Clock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function FAQPage() {
  const { getColor } = useTheme();

  const categories = [
    {
      title: 'Getting Started',
      icon: HelpCircle,
      color: 'accent1',
      faqs: [
        {
          q: 'Do I need an account to use the system?',
          a: 'No! You can browse items and make claims without an account. However, creating a free account allows you to track your submissions and claims more easily.'
        },
        {
          q: 'How do I create an account?',
          a: 'Click the "Login" button in the navigation bar, then select "Sign up" at the bottom of the form. You\'ll need a username, email, and password.'
        },
        {
          q: 'Is the service free?',
          a: 'Yes! Our Lost & Found system is completely free for all students, faculty, and staff.'
        }
      ]
    },
    {
      title: 'Reporting Items',
      icon: Package,
      color: 'accent2',
      faqs: [
        {
          q: 'What information do I need to report a found item?',
          a: 'You\'ll need to provide: item category, description, location where found, date found, and optionally a photo. The more details you provide, the easier it is for owners to identify their items.'
        },
        {
          q: 'Can I upload multiple photos?',
          a: 'Currently, you can upload one photo per item. Choose the clearest, most identifying photo of the item.'
        },
        {
          q: 'How long does it take for my submission to be approved?',
          a: 'Most submissions are reviewed within 2-3 hours during business hours. You\'ll receive a notification once your item is approved and listed.'
        },
        {
          q: 'What if I made a mistake in my submission?',
          a: 'Contact us immediately through the Help Center or email lost-found@school.edu with your submission ID, and we\'ll update the information.'
        }
      ]
    },
    {
      title: 'Claiming Items',
      icon: Search,
      color: 'accent3',
      faqs: [
        {
          q: 'How do I claim my lost item?',
          a: 'Browse the items listing, find your item, click on it to view details, then click "Make a Claim". Fill out the claim form with proof of ownership details.'
        },
        {
          q: 'What counts as proof of ownership?',
          a: 'Acceptable proof includes: unique identifying features not shown in photos, purchase receipts, serial numbers, photos showing you with the item, or any other verifiable information.'
        },
        {
          q: 'How long does claim verification take?',
          a: 'Claims are typically reviewed within 2 business days. We may contact you for additional verification if needed.'
        },
        {
          q: 'What if someone else claims my item?',
          a: 'All claims require verification. If multiple people claim the same item, we verify all claims thoroughly before approving any of them. The rightful owner will be determined through verification.'
        }
      ]
    },
    {
      title: 'Pickup & Returns',
      icon: Clock,
      color: 'accent1',
      faqs: [
        {
          q: 'Where do I pick up my claimed item?',
          a: 'Once your claim is approved, you\'ll receive an email with pickup location (usually the main office) and hours (8am-5pm, Monday-Friday).'
        },
        {
          q: 'How long do I have to pick up my item?',
          a: 'You have 10 days from claim approval to pick up your item. After that, the item may be released back into inventory or donated.'
        },
        {
          q: 'Can someone else pick up my item for me?',
          a: 'Yes, but they must present your government ID or student ID and a signed authorization letter from you.'
        },
        {
          q: 'What happens to unclaimed items?',
          a: 'Items are held for 90 days. After this period, unclaimed items are donated to local charities or disposed of according to school policy.'
        }
      ]
    },
    {
      title: 'Security & Privacy',
      icon: Shield,
      color: 'accent2',
      faqs: [
        {
          q: 'Is my personal information safe?',
          a: 'Yes! We use industry-standard encryption and never share your personal information with third parties. Only authorized staff can access claim details.'
        },
        {
          q: 'Why don\'t you show the full item photo publicly?',
          a: 'For high-value items, we may blur or hide certain identifying features to prevent false claims. Legitimate owners should know these details.'
        },
        {
          q: 'Can I remain anonymous when reporting an item?',
          a: 'You can choose to remain anonymous to the public, but our staff needs your contact information in case we need to reach you about the item.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: Mail,
      color: 'accent3',
      faqs: [
        {
          q: 'The website isn\'t working properly. What should I do?',
          a: 'Try refreshing the page or clearing your browser cache. If the issue persists, email support@school.edu with details about the problem and your browser/device.'
        },
        {
          q: 'Can I use the system on my phone?',
          a: 'Yes! Our website is fully responsive and works on all devices - phones, tablets, and computers.'
        },
        {
          q: 'I didn\'t receive a notification. What happened?',
          a: 'Check your spam/junk folder. If you still can\'t find it, ensure your email in your account settings is correct, or contact support.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})` }}
          >
            <HelpCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-6xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl" style={{ color: getColor('textSecondary') }}>
            Everything you need to know about using our Lost & Found system
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${getColor(category.color)}20` }}
                >
                  <category.icon className="h-6 w-6" style={{ color: getColor(category.color) }} />
                </div>
                <h2 className="text-3xl font-black" style={{ color: getColor('textPrimary') }}>
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <Card
                    key={faq.q}
                    className="border-2 rounded-2xl"
                    style={{
                      backgroundColor: getColor('bgCard'),
                      borderColor: getColor('border')
                    }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold" style={{ color: getColor('textPrimary') }}>
                        {faq.q}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <p style={{ color: getColor('textSecondary') }}>
                        {faq.a}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
