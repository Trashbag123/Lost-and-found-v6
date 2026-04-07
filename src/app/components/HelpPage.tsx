import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function HelpPage() {
  const { getColor } = useTheme();

  const faqs = [
    {
      question: 'How do I report a found item?',
      answer: 'Click on "Report Item" in the navigation menu, fill out the form with details about the item, upload a photo, and submit. Your submission will be reviewed by our team.'
    },
    {
      question: 'How can I claim my lost item?',
      answer: 'Browse the items listing, find your item, and click on it to view details. Then click "Make a Claim" and provide proof of ownership. Our team will review your claim and contact you.'
    },
    {
      question: 'Do I need an account to use the system?',
      answer: 'No, accounts are optional! You can browse items and submit claims without logging in. However, creating an account allows you to track your submissions and claims more easily.'
    },
    {
      question: 'How long are items kept?',
      answer: 'Items are typically held for 90 days. After this period, unclaimed items may be donated to charity or disposed of according to school policy.'
    },
    {
      question: 'Where can I pick up my item?',
      answer: 'Once your claim is approved, you\'ll receive an email with pickup instructions. Items can be collected from the main office during business hours (8am-5pm, Monday-Friday).'
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
            style={{ background: `linear-gradient(135deg, ${getColor('accent2')}, ${getColor('accent2Dark')})` }}
          >
            <HelpCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-3" style={{ color: getColor('textPrimary') }}>
            Help Center
          </h1>
          <p className="text-xl" style={{ color: getColor('textSecondary') }}>
            Find answers to frequently asked questions
          </p>
        </motion.div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="border-2 rounded-3xl"
                style={{
                  backgroundColor: getColor('bgCard'),
                  borderColor: getColor('border')
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-black flex items-start gap-3" style={{ color: getColor('textPrimary') }}>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: `${getColor('accent1')}20` }}
                    >
                      <MessageCircle className="h-5 w-5" style={{ color: getColor('accent1') }} />
                    </div>
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6 pl-[68px]">
                  <p style={{ color: getColor('textSecondary') }}>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
