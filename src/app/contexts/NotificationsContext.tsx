import { createContext, useContext, useState, ReactNode } from 'react';
import { Package, CheckCircle, MessageSquare, TrendingUp } from 'lucide-react';

export interface Notification {
  id: number;
  type: 'new_item' | 'claim_approved' | 'message' | 'match';
  icon: typeof Package;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  enabledNotifications: {
    newItems: boolean;
    claimUpdates: boolean;
    messages: boolean;
  };
  toggleNotification: (type: 'newItems' | 'claimUpdates' | 'messages') => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'new_item',
      icon: Package,
      title: 'New Item Found',
      message: 'A blue backpack matching your description was just reported',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'claim_approved',
      icon: CheckCircle,
      title: 'Claim Approved',
      message: 'Your claim for "Calculator TI-84" has been verified',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'message',
      icon: MessageSquare,
      title: 'New Message',
      message: 'Admin has responded to your inquiry about the water bottle',
      time: '3 hours ago',
      unread: true
    },
    {
      id: 4,
      type: 'match',
      icon: TrendingUp,
      title: 'Possible Match',
      message: '3 new items match your saved search criteria',
      time: '1 day ago',
      unread: false
    },
    {
      id: 5,
      type: 'new_item',
      icon: Package,
      title: 'Item Reported',
      message: 'Someone found a red water bottle near the gymnasium',
      time: '2 days ago',
      unread: false
    }
  ]);

  const [enabledNotifications, setEnabledNotifications] = useState({
    newItems: true,
    claimUpdates: true,
    messages: true
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const toggleNotification = (type: 'newItems' | 'claimUpdates' | 'messages') => {
    setEnabledNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        enabledNotifications,
        toggleNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return context;
}
