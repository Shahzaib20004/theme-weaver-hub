import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, Check, X, MessageSquare, Calendar, Car, Star, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { useNotifications, useMarkNotificationAsRead } from '@/hooks/useNotifications'
import { useCurrentUser } from '@/hooks/useApi'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: notifications = [], isLoading } = useNotifications(currentUser?.id || '')
  const markAsRead = useMarkNotificationAsRead()
  const [selectedNotification, setSelectedNotification] = useState<any>(null)

  const unreadCount = notifications.filter(n => !n.is_read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_request':
        return <Calendar className="h-4 w-4" />
      case 'booking_confirmed':
        return <Check className="h-4 w-4" />
      case 'booking_cancelled':
        return <X className="h-4 w-4" />
      case 'message_received':
        return <MessageSquare className="h-4 w-4" />
      case 'review_received':
        return <Star className="h-4 w-4" />
      case 'car_available':
        return <Car className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return 'text-green-600 bg-green-50'
      case 'booking_cancelled':
        return 'text-red-600 bg-red-50'
      case 'booking_request':
        return 'text-blue-600 bg-blue-50'
      case 'message_received':
        return 'text-purple-600 bg-purple-50'
      case 'review_received':
        return 'text-yellow-600 bg-yellow-50'
      case 'car_available':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead.mutateAsync(notificationId)
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const handleNotificationClick = (notification: any) => {
    if (!notification.is_read) {
      handleMarkAsRead(notification.id)
    }
    setSelectedNotification(notification)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications yet</p>
              <p className="text-sm text-gray-500 mt-2">
                You'll see notifications about your bookings and messages here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Notification List */}
              <div className="border-r">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 cursor-pointer transition-colors ${
                          notification.is_read 
                            ? 'bg-white hover:bg-gray-50' 
                            : 'bg-blue-50 hover:bg-blue-100'
                        } ${
                          selectedNotification?.id === notification.id 
                            ? 'border-l-4 border-blue-500' 
                            : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm truncate">
                                {notification.title}
                              </h4>
                              {!notification.is_read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {format(new Date(notification.created_at), 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Notification Details */}
              <div className="p-4">
                {selectedNotification ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${getNotificationColor(selectedNotification.type)}`}>
                        {getNotificationIcon(selectedNotification.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedNotification.title}</h3>
                        <p className="text-sm text-gray-600">
                          {format(new Date(selectedNotification.created_at), 'PPP p')}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedNotification.message}</p>
                    </div>

                    {selectedNotification.data && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Details</h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(selectedNotification.data).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">
                                {key.replace(/_/g, ' ')}:
                              </span>
                              <span className="font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      {!selectedNotification.is_read && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsRead(selectedNotification.id)}
                          disabled={markAsRead.isPending}
                        >
                          {markAsRead.isPending ? 'Marking...' : 'Mark as Read'}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedNotification(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a notification to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationCenter