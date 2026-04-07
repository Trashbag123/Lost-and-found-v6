import { useState } from 'react';
import { Link } from 'react-router';
import { Bell, Settings, Package, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useNotifications } from '@/app/contexts/NotificationsContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Separator } from '@/app/components/ui/separator';

export function NotificationBell() {
  const { getColor } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead, enabledNotifications, toggleNotification } = useNotifications();
  const [showSettings, setShowSettings] = useState(false);
  const [open, setOpen] = useState(false);

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

  const recentNotifications = notifications.slice(0, 4);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative rounded-lg cursor-pointer"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          style={{ color: getColor('textSecondary') }}
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{
                background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})`
              }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-96 p-0"
        style={{
          backgroundColor: getColor('bgCard'),
          borderColor: getColor('border')
        }}
      >
        {showSettings ? (
          /* Settings View */
          <div>
            <div
              className="p-4 flex items-center justify-between border-b"
              style={{ borderColor: getColor('border') }}
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="cursor-pointer"
                  style={{ color: getColor('textSecondary') }}
                >
                  ←
                </Button>
                <h3 className="font-semibold" style={{ color: getColor('textPrimary') }}>
                  Notification Settings
                </h3>
              </div>
              <Settings className="h-5 w-5" style={{ color: getColor('accent2') }} />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${getColor('accent1')}20` }}
                  >
                    <Package className="h-4 w-4" style={{ color: getColor('accent1') }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: getColor('textPrimary') }}>
                      New Items
                    </p>
                    <p className="text-xs" style={{ color: getColor('textSecondary') }}>
                      Items matching your searches
                    </p>
                  </div>
                </div>
                <Switch
                  checked={enabledNotifications.newItems}
                  onCheckedChange={() => toggleNotification('newItems')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${getColor('accent2')}20` }}
                  >
                    <CheckCircle className="h-4 w-4" style={{ color: getColor('accent2') }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: getColor('textPrimary') }}>
                      Claim Updates
                    </p>
                    <p className="text-xs" style={{ color: getColor('textSecondary') }}>
                      Status changes on your claims
                    </p>
                  </div>
                </div>
                <Switch
                  checked={enabledNotifications.claimUpdates}
                  onCheckedChange={() => toggleNotification('claimUpdates')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${getColor('accent3')}20` }}
                  >
                    <MessageSquare className="h-4 w-4" style={{ color: getColor('accent3') }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: getColor('textPrimary') }}>
                      Messages
                    </p>
                    <p className="text-xs" style={{ color: getColor('textSecondary') }}>
                      Replies from admins and users
                    </p>
                  </div>
                </div>
                <Switch
                  checked={enabledNotifications.messages}
                  onCheckedChange={() => toggleNotification('messages')}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Notifications List View */
          <div>
            <div
              className="p-4 flex items-center justify-between border-b"
              style={{ borderColor: getColor('border') }}
            >
              <h3 className="font-semibold text-lg" style={{ color: getColor('textPrimary') }}>
                Notifications
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-xs cursor-pointer"
                  style={{ color: getColor('accent1') }}
                >
                  Mark all read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="cursor-pointer"
                  style={{ color: getColor('textSecondary') }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {recentNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" style={{ color: getColor('textSecondary') }} />
                  <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                    No notifications yet
                  </p>
                </div>
              ) : (
                <div>
                  {recentNotifications.map((notification) => (
                    <div key={notification.id}>
                      <div
                        className={`p-4 hover:bg-opacity-50 transition-colors cursor-pointer ${
                          notification.unread ? 'border-l-4' : ''
                        }`}
                        style={{
                          borderLeftColor: notification.unread ? getNotificationColor(notification.type) : 'transparent',
                          backgroundColor: notification.unread ? `${getColor('bgSecondary')}80` : 'transparent'
                        }}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{
                              backgroundColor: `${getNotificationColor(notification.type)}20`
                            }}
                          >
                            <notification.icon
                              className="h-4 w-4"
                              style={{ color: getNotificationColor(notification.type) }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-semibold text-sm" style={{ color: getColor('textPrimary') }}>
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <div
                                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                                  style={{ backgroundColor: getColor('accent1') }}
                                />
                              )}
                            </div>
                            <p className="text-xs mb-1" style={{ color: getColor('textSecondary') }}>
                              {notification.message}
                            </p>
                            <p className="text-xs" style={{ color: getColor('textTertiary') }}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Separator style={{ backgroundColor: getColor('border') }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t" style={{ borderColor: getColor('border') }}>
              <Link to="/notifications" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full text-sm cursor-pointer"
                  style={{ color: getColor('accent1') }}
                >
                  View All Notifications
                </Button>
              </Link>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}