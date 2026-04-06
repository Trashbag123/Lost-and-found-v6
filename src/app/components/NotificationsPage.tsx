import { useTheme } from '@/app/contexts/ThemeContext';
import { useNotifications } from '@/app/contexts/NotificationsContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Bell, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function NotificationsPage() {
  const { getColor } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new_item':
        return getColor('accent1');
      case 'claim_approved':
        return getColor('accent3');
      case 'message':
        return getColor('accent2');
      case 'match':
        return getColor('accent1Light');
      default:
        return getColor('textSecondary');
    }
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: getColor('bgSecondary') }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Bell className="h-12 w-12 text-white" />
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
            All Notifications
          </h1>
          <p className="text-xl" style={{ color: getColor('textSecondary') }}>
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'You\'re all caught up!'}
          </p>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              className="mt-4 text-white"
              style={{
                background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          )}
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {notifications.length === 0 ? (
            <div
              className="p-12 text-center rounded-2xl border-2 border-dashed"
              style={{
                borderColor: getColor('border'),
                backgroundColor: `${getColor('bgCard')}80`
              }}
            >
              <Bell className="h-20 w-20 mx-auto mb-4 opacity-30" style={{ color: getColor('textSecondary') }} />
              <p className="text-xl font-medium mb-2" style={{ color: getColor('textPrimary') }}>
                No notifications yet
              </p>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                When you receive updates, they'll appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card
                    className="border-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    style={{
                      backgroundColor: getColor('bgCard'),
                      borderColor: notification.unread ? getNotificationColor(notification.type) : getColor('border'),
                      borderLeftWidth: notification.unread ? '4px' : '2px'
                    }}
                    onClick={() => notification.unread && markAsRead(notification.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="p-3 rounded-xl flex-shrink-0"
                          style={{
                            backgroundColor: `${getNotificationColor(notification.type)}20`
                          }}
                        >
                          <notification.icon
                            className="h-6 w-6"
                            style={{ color: getNotificationColor(notification.type) }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold" style={{ color: getColor('textPrimary') }}>
                              {notification.title}
                            </h3>
                            {notification.unread && (
                              <div className="flex items-center gap-2">
                                <span
                                  className="px-3 py-1 rounded-full text-xs font-semibold"
                                  style={{
                                    backgroundColor: `${getColor('accent1')}20`,
                                    color: getColor('accent1')
                                  }}
                                >
                                  New
                                </span>
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getColor('accent1') }}
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-sm mb-2" style={{ color: getColor('textSecondary') }}>
                            {notification.message}
                          </p>
                          <p className="text-xs" style={{ color: getColor('textTertiary') }}>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}