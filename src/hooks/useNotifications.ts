import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/lib/services/notificationService'
import type { NotificationData } from '@/lib/services/notificationService'

// ===== NOTIFICATIONS =====
export const useNotifications = (userId: string) => {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => notificationService.getNotifications(userId),
    enabled: !!userId,
    staleTime: 30 * 1000, // 30 seconds
  })
}

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (notificationId: string) => notificationService.markAsRead(notificationId),
    onSuccess: (_, notificationId) => {
      // Update the notification in cache
      queryClient.setQueryData(['notifications'], (old: any) => 
        old?.map((notification: any) => 
          notification.id === notificationId 
            ? { ...notification, is_read: true, read_at: new Date().toISOString() }
            : notification
        )
      )
    },
  })
}

export const useCreateNotification = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: {
      user_id: string
      dealership_id?: string
      booking_id?: string
      car_id?: string
      type: 'booking_request' | 'booking_confirmed' | 'booking_cancelled' | 'payment_received' | 'car_available' | 'review_received' | 'message_received' | 'offer_expired'
      title: string
      message: string
      data?: NotificationData
      channels?: ('email' | 'sms' | 'push' | 'in_app')[]
    }) => notificationService.createNotification(data),
    onSuccess: (newNotification) => {
      // Add new notification to cache
      queryClient.setQueryData(['notifications', newNotification.user_id], (old: any) => 
        old ? [newNotification, ...old] : [newNotification]
      )
    },
  })
}

// ===== COMMUNICATION PREFERENCES =====
export const useCommunicationPreferences = (userId: string) => {
  return useQuery({
    queryKey: ['communicationPreferences', userId],
    queryFn: () => notificationService.getCommunicationPreferences(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUpdateCommunicationPreferences = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ 
      userId, 
      preferences 
    }: { 
      userId: string
      preferences: {
        email_notifications?: boolean
        sms_notifications?: boolean
        push_notifications?: boolean
        in_app_notifications?: boolean
        marketing_emails?: boolean
        booking_reminders?: boolean
        special_offers?: boolean
      }
    }) => notificationService.updateCommunicationPreferences(userId, preferences),
    onSuccess: (data, { userId }) => {
      queryClient.setQueryData(['communicationPreferences', userId], data)
    },
  })
}

// ===== DEALERSHIP CONTACTS =====
export const useDealershipContact = (dealershipId: string) => {
  return useQuery({
    queryKey: ['dealershipContact', dealershipId],
    queryFn: () => notificationService.getDealershipContact(dealershipId),
    enabled: !!dealershipId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useUpdateDealershipContact = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ 
      dealershipId, 
      contact 
    }: { 
      dealershipId: string
      contact: {
        contact_person?: string
        phone?: string
        whatsapp?: string
        email?: string
        address?: string
        operating_hours?: any
        emergency_contact?: string
      }
    }) => notificationService.updateDealershipContact(dealershipId, contact),
    onSuccess: (data, { dealershipId }) => {
      queryClient.setQueryData(['dealershipContact', dealershipId], data)
    },
  })
}

// ===== BOOKING NOTIFICATIONS =====
export const useNotifyDealershipOfBookingRequest = () => {
  return useMutation({
    mutationFn: (bookingRequest: {
      booking_id: string
      customer_id: string
      dealership_id: string
      car_id: string
      customer_phone: string
      customer_email: string
      special_requests?: string
    }) => notificationService.notifyDealershipOfBookingRequest(bookingRequest),
  })
}

export const useNotifyCustomerOfBookingConfirmation = () => {
  return useMutation({
    mutationFn: (bookingId: string) => notificationService.notifyCustomerOfBookingConfirmation(bookingId),
  })
}

// ===== EMAIL/SMS SENDING =====
export const useSendEmail = () => {
  return useMutation({
    mutationFn: ({ 
      to, 
      templateName, 
      variables 
    }: { 
      to: string
      templateName: string
      variables: NotificationData
    }) => notificationService.sendEmail(to, templateName, variables),
  })
}

export const useSendSMS = () => {
  return useMutation({
    mutationFn: ({ 
      to, 
      templateName, 
      variables 
    }: { 
      to: string
      templateName: string
      variables: NotificationData
    }) => notificationService.sendSMS(to, templateName, variables),
  })
}