import { useEffect, useState } from 'react';
import { Bell, X, Check, AlertCircle, Car, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initial notifications
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Booking Confirmed',
        message: 'Your BMW X5 rental for tomorrow has been confirmed!',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        actionRequired: false
      },
      {
        id: '2',
        type: 'info',
        title: 'New Vehicle Available',
        message: 'Mercedes C-Class is now available in your area',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        actionRequired: false
      }
    ];

    setNotifications(initialNotifications);

    // Simulate new notifications periodically
    const notificationInterval = setInterval(() => {
      const newNotificationTypes = [
        {
          type: 'success' as const,
          title: 'Payment Confirmed',
          message: 'Your rental payment has been processed successfully'
        },
        {
          type: 'info' as const,
          title: 'Vehicle Returned',
          message: 'Toyota Camry has been returned and is available for booking'
        },
        {
          type: 'warning' as const,
          title: 'Reminder',
          message: 'Your rental pickup is in 2 hours. Don\'t forget your documents!'
        },
        {
          type: 'info' as const,
          title: 'New Review',
          message: 'You received a 5-star review for your recent rental'
        },
        {
          type: 'success' as const,
          title: 'Booking Request',
          message: 'Someone is interested in booking your Honda Civic'
        }
      ];

      const randomNotification = newNotificationTypes[Math.floor(Math.random() * newNotificationTypes.length)];
      
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...randomNotification,
        timestamp: new Date(),
        read: false,
        actionRequired: Math.random() > 0.7
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 45000); // New notification every 45 seconds

    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Car className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 hover:bg-dark-elevated"
      >
        <Bell className="w-5 h-5 text-gold" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-gold hover:text-gold/80"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border hover:bg-dark-elevated transition-colors cursor-pointer ${
                    !notification.read ? 'bg-gold/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {notification.actionRequired && (
                              <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                                Action required
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-gold rounded-full absolute right-4 top-4"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm text-gold hover:text-gold/80"
                onClick={() => setShowNotifications(false)}
              >
                View all notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RealTimeNotifications;