import { supabase } from '@/integrations/supabase/client'
import type { 
  Tables, 
  TablesInsert, 
  TablesUpdate 
} from '@/integrations/supabase/types'

// Types
export type NotificationType = 'booking_request' | 'booking_confirmed' | 'booking_cancelled' | 'payment_received' | 'car_available' | 'review_received' | 'message_received' | 'offer_expired'
export type NotificationChannel = 'email' | 'sms' | 'push' | 'in_app'

export interface NotificationData {
  car_model?: string
  dealership_name?: string
  customer_name?: string
  start_date?: string
  end_date?: string
  total_amount?: number
  customer_phone?: string
  customer_email?: string
  dealership_phone?: string
  pickup_location?: string
  special_requests?: string
  [key: string]: any
}

// External service configurations
const TWILIO_ACCOUNT_SID = process.env.VITE_TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.VITE_TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.VITE_TWILIO_PHONE_NUMBER

const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY
const FROM_EMAIL = process.env.VITE_FROM_EMAIL || 'noreply@yourcarrental.com'

class NotificationService {
  // ===== IN-APP NOTIFICATIONS =====
  
  async createNotification(data: {
    user_id: string
    dealership_id?: string
    booking_id?: string
    car_id?: string
    type: NotificationType
    title: string
    message: string
    data?: NotificationData
    channels?: NotificationChannel[]
  }): Promise<Tables<'notifications'>> {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: data.user_id,
        dealership_id: data.dealership_id,
        booking_id: data.booking_id,
        car_id: data.car_id,
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data,
        channels: data.channels || ['in_app']
      })
      .select()
      .single()

    if (error) throw error
    return notification
  }

  async getNotifications(userId: string): Promise<Tables<'notifications'>[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ 
        is_read: true, 
        read_at: new Date().toISOString() 
      })
      .eq('id', notificationId)

    if (error) throw error
  }

  // ===== EMAIL NOTIFICATIONS =====
  
  async sendEmail(to: string, templateName: string, variables: NotificationData): Promise<void> {
    try {
      // Get email template
      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('name', templateName)
        .eq('is_active', true)
        .single()

      if (templateError || !template) {
        throw new Error(`Email template '${templateName}' not found`)
      }

      // Replace variables in template
      let subject = template.subject
      let htmlContent = template.html_template

      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`
        subject = subject.replace(new RegExp(placeholder, 'g'), String(value))
        htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), String(value))
      })

      // Send email using Resend (or your preferred email service)
      if (RESEND_API_KEY) {
        await this.sendEmailViaResend(to, subject, htmlContent)
      } else {
        console.log('Email would be sent:', { to, subject, htmlContent })
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      throw error
    }
  }

  private async sendEmailViaResend(to: string, subject: string, htmlContent: string): Promise<void> {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject: subject,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Email sending failed: ${error}`)
    }
  }

  // ===== SMS NOTIFICATIONS =====
  
  async sendSMS(to: string, templateName: string, variables: NotificationData): Promise<void> {
    try {
      // Get SMS template
      const { data: template, error: templateError } = await supabase
        .from('sms_templates')
        .select('*')
        .eq('name', templateName)
        .eq('is_active', true)
        .single()

      if (templateError || !template) {
        throw new Error(`SMS template '${templateName}' not found`)
      }

      // Replace variables in template
      let message = template.template

      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`
        message = message.replace(new RegExp(placeholder, 'g'), String(value))
      })

      // Send SMS using Twilio (or your preferred SMS service)
      if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
        await this.sendSMSViaTwilio(to, message)
      } else {
        console.log('SMS would be sent:', { to, message })
      }
    } catch (error) {
      console.error('SMS sending failed:', error)
      throw error
    }
  }

  private async sendSMSViaTwilio(to: string, message: string): Promise<void> {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: to,
        From: TWILIO_PHONE_NUMBER!,
        Body: message,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`SMS sending failed: ${error}`)
    }
  }

  // ===== BOOKING NOTIFICATIONS =====
  
  async notifyDealershipOfBookingRequest(bookingRequest: {
    booking_id: string
    customer_id: string
    dealership_id: string
    car_id: string
    customer_phone: string
    customer_email: string
    special_requests?: string
  }): Promise<void> {
    try {
      // Get booking details
      const { data: booking } = await supabase
        .from('bookings')
        .select(`
          *,
          cars(model, year, daily_rate),
          users(full_name, email),
          dealerships(name)
        `)
        .eq('id', bookingRequest.booking_id)
        .single()

      if (!booking) throw new Error('Booking not found')

      // Get dealership contact info
      const { data: dealershipContact } = await supabase
        .from('dealership_contacts')
        .select('*')
        .eq('dealership_id', bookingRequest.dealership_id)
        .single()

      // Get dealer users
      const { data: dealerUsers } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'dealer')
        .eq('dealership_id', bookingRequest.dealership_id)

      // Prepare notification data
      const notificationData: NotificationData = {
        car_model: booking.cars?.model,
        car_year: booking.cars?.year,
        dealership_name: booking.dealerships?.name,
        customer_name: booking.users?.full_name,
        start_date: booking.start_date,
        end_date: booking.end_date,
        total_amount: booking.total_amount,
        customer_phone: bookingRequest.customer_phone,
        customer_email: bookingRequest.customer_email,
        special_requests: bookingRequest.special_requests || 'None'
      }

      // Send notifications to all dealer users
      for (const dealer of dealerUsers || []) {
        // Create in-app notification
        await this.createNotification({
          user_id: dealer.id,
          dealership_id: bookingRequest.dealership_id,
          booking_id: bookingRequest.booking_id,
          car_id: bookingRequest.car_id,
          type: 'booking_request',
          title: 'New Booking Request',
          message: `New booking request for ${booking.cars?.model} from ${booking.users?.full_name}`,
          data: notificationData,
          channels: ['in_app', 'email', 'sms']
        })

        // Send email notification
        if (dealer.email) {
          await this.sendEmail(
            dealer.email,
            'booking_request_dealership',
            notificationData
          )
        }

        // Send SMS notification
        if (dealershipContact?.phone) {
          await this.sendSMS(
            dealershipContact.phone,
            'booking_request_dealership',
            notificationData
          )
        }
      }

      // Update booking request status
      await supabase
        .from('booking_requests')
        .update({ dealership_notified: true })
        .eq('booking_id', bookingRequest.booking_id)

    } catch (error) {
      console.error('Failed to notify dealership:', error)
      throw error
    }
  }

  async notifyCustomerOfBookingConfirmation(bookingId: string): Promise<void> {
    try {
      // Get booking details
      const { data: booking } = await supabase
        .from('bookings')
        .select(`
          *,
          cars(model, year),
          users(full_name, email),
          dealerships(name)
        `)
        .eq('id', bookingId)
        .single()

      if (!booking) throw new Error('Booking not found')

      // Get dealership contact info
      const { data: dealershipContact } = await supabase
        .from('dealership_contacts')
        .select('*')
        .eq('dealership_id', booking.dealership_id)
        .single()

      // Prepare notification data
      const notificationData: NotificationData = {
        customer_name: booking.users?.full_name,
        dealership_name: booking.dealerships?.name,
        car_model: booking.cars?.model,
        car_year: booking.cars?.year,
        start_date: booking.start_date,
        end_date: booking.end_date,
        total_amount: booking.total_amount,
        dealership_phone: dealershipContact?.phone,
        pickup_location: dealershipContact?.address
      }

      // Create in-app notification
      await this.createNotification({
        user_id: booking.customer_id,
        booking_id: bookingId,
        type: 'booking_confirmed',
        title: 'Booking Confirmed!',
        message: `Your booking for ${booking.cars?.model} has been confirmed by ${booking.dealerships?.name}`,
        data: notificationData,
        channels: ['in_app', 'email', 'sms']
      })

      // Send email notification
      if (booking.users?.email) {
        await this.sendEmail(
          booking.users.email,
          'booking_confirmed_customer',
          notificationData
        )
      }

      // Send SMS notification
      if (booking.users?.phone) {
        await this.sendSMS(
          booking.users.phone,
          'booking_confirmed_customer',
          notificationData
        )
      }

    } catch (error) {
      console.error('Failed to notify customer:', error)
      throw error
    }
  }

  // ===== COMMUNICATION PREFERENCES =====
  
  async getCommunicationPreferences(userId: string): Promise<Tables<'communication_preferences'> | null> {
    const { data, error } = await supabase
      .from('communication_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async updateCommunicationPreferences(
    userId: string, 
    preferences: Partial<TablesUpdate<'communication_preferences'>>
  ): Promise<Tables<'communication_preferences'>> {
    const { data, error } = await supabase
      .from('communication_preferences')
      .upsert({
        user_id: userId,
        ...preferences
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // ===== DEALERSHIP CONTACTS =====
  
  async getDealershipContact(dealershipId: string): Promise<Tables<'dealership_contacts'> | null> {
    const { data, error } = await supabase
      .from('dealership_contacts')
      .select('*')
      .eq('dealership_id', dealershipId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async updateDealershipContact(
    dealershipId: string,
    contact: Partial<TablesUpdate<'dealership_contacts'>>
  ): Promise<Tables<'dealership_contacts'>> {
    const { data, error } = await supabase
      .from('dealership_contacts')
      .upsert({
        dealership_id: dealershipId,
        ...contact
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}

export const notificationService = new NotificationService()