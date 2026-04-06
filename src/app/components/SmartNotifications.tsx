import { motion } from 'motion/react';
import { Bell, Mail, MessageSquare, Smartphone, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTheme } from '@/app/contexts/ThemeContext';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  accent: string;
}

export function SmartNotifications() {
  const { getColor } = useTheme();
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Get notified when matching items are posted',
      icon: Mail,
      enabled: true,
      accent: 'accent1',
    },
    {
      id: 'sms',
      title: 'SMS Alerts',
      description: 'Receive text messages for urgent matches',
      icon: Smartphone,
      enabled: false,
      accent: 'accent2',
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Instant browser notifications for new items',
      icon: Bell,
      enabled: true,
      accent: 'accent3',
    },
    {
      id: 'inapp',
      title: 'In-App Messages',
      description: 'See notifications within the platform',
      icon: MessageSquare,
      enabled: true,
      accent: 'accent1',
    },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
    
    const pref = preferences.find(p => p.id === id);
    if (pref) {
      toast.success(
        `${pref.title} ${!pref.enabled ? 'enabled' : 'disabled'}`,
        {
          description: !pref.enabled 
            ? `You'll now receive ${pref.title.toLowerCase()}`
            : `You won't receive ${pref.title.toLowerCase()} anymore`,
        }
      );
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: getColor('bgSecondary') }}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: `${getColor('accent2')}20`,
              color: getColor('accent2')
            }}
          >
            Stay Updated
          </span>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Smart Notifications
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: getColor('textSecondary') }}>
            Never miss a match! Get instant alerts when items matching your search are found
          </p>
        </div>

        <Card 
          className="border-0 shadow-2xl backdrop-blur-sm overflow-hidden"
          style={{ backgroundColor: getColor('bgCard') }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-6 w-6" style={{ color: getColor('accent2') }} />
              <span style={{ color: getColor('textPrimary') }}>Notification Preferences</span>
            </CardTitle>
            <CardDescription style={{ color: getColor('textSecondary') }}>
              Choose how you want to be notified about matching items
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {preferences.map((pref, index) => {
              const Icon = pref.icon;
              return (
                <motion.div
                  key={pref.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="flex items-start gap-4 p-4 rounded-xl transition-colors"
                    style={{ backgroundColor: getColor('bgSecondary') }}
                  >
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                      style={{ background: `linear-gradient(to bottom right, ${getColor(pref.accent)}, ${getColor(pref.accent + 'Light')})` }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <Label 
                            htmlFor={pref.id} 
                            className="text-base font-semibold cursor-pointer"
                            style={{ color: getColor('textPrimary') }}
                          >
                            {pref.title}
                          </Label>
                          <p className="text-sm mt-1" style={{ color: getColor('textSecondary') }}>
                            {pref.description}
                          </p>
                        </div>
                        <Switch
                          id={pref.id}
                          checked={pref.enabled}
                          onCheckedChange={() => togglePreference(pref.id)}
                        />
                      </div>

                      {pref.enabled && (
                        <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: getColor('accent1') }}>
                          <Check className="h-4 w-4" />
                          <span>Active</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="text-center pt-4">
              <Button 
                className="text-white"
                style={{ background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}
              >
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
