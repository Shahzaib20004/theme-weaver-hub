# Notification System Setup Guide

## 🎯 Overview

This guide will help you set up the complete notification system for your car rental marketplace, including SMS and email notifications for both customers and dealerships.

## 📧 Email Service Setup (Resend)

### 1. Create Resend Account
- Go to [resend.com](https://resend.com)
- Sign up for a free account
- Verify your domain or use the provided sandbox domain

### 2. Get API Key
```bash
# In your Resend dashboard, copy your API key
# It looks like: re_1234567890abcdef...
```

### 3. Add to Environment Variables
```env
VITE_RESEND_API_KEY=re_your_api_key_here
VITE_FROM_EMAIL=noreply@yourdomain.com
```

## 📱 SMS Service Setup (Twilio)

### 1. Create Twilio Account
- Go to [twilio.com](https://twilio.com)
- Sign up for a free account
- Verify your phone number

### 2. Get Credentials
```bash
# In your Twilio Console, find:
# Account SID: AC1234567890abcdef...
# Auth Token: your_auth_token_here
# Phone Number: +1234567890
```

### 3. Add to Environment Variables
```env
VITE_TWILIO_ACCOUNT_SID=AC_your_account_sid_here
VITE_TWILIO_AUTH_TOKEN=your_auth_token_here
VITE_TWILIO_PHONE_NUMBER=+1234567890
```

## 🗄️ Database Setup

### 1. Run Migrations
```bash
# Run the notification system migration
supabase db push
```

### 2. Verify Tables Created
- `notifications` - In-app notifications
- `communication_preferences` - User notification settings
- `dealership_contacts` - Contact information for customers
- `booking_requests` - Pending booking approvals
- `email_templates` - Email templates
- `sms_templates` - SMS templates

## 🔧 Configuration

### 1. Update Email Templates
```sql
-- Update email templates with your branding
UPDATE email_templates 
SET html_template = 'Your custom HTML template here'
WHERE name = 'booking_request_dealership';
```

### 2. Update SMS Templates
```sql
-- Update SMS templates for your region
UPDATE sms_templates 
SET template = 'Your custom SMS template here'
WHERE name = 'booking_request_dealership';
```

### 3. Add Dealership Contacts
```sql
-- Add contact information for each dealership
INSERT INTO dealership_contacts (
  dealership_id,
  contact_person,
  phone,
  whatsapp,
  email,
  address,
  operating_hours
) VALUES (
  'dealership-uuid',
  'Contact Person Name',
  '+92-300-1234567',
  '+92-300-1234567',
  'contact@dealership.com',
  '123 Main Street, City',
  '{"monday": {"open": "09:00", "close": "18:00"}}'
);
```

## 🚀 Testing the System

### 1. Test Email Notifications
```typescript
// In your browser console or test file
import { notificationService } from '@/lib/services/notificationService'

// Test email sending
await notificationService.sendEmail(
  'test@example.com',
  'booking_request_dealership',
  {
    car_model: 'Toyota Corolla',
    dealership_name: 'Test Dealership',
    customer_name: 'John Doe',
    start_date: '2024-01-15',
    end_date: '2024-01-17',
    total_amount: 15000,
    customer_phone: '+92-300-1234567',
    customer_email: 'customer@example.com',
    special_requests: 'None'
  }
)
```

### 2. Test SMS Notifications
```typescript
// Test SMS sending
await notificationService.sendSMS(
  '+92-300-1234567',
  'booking_request_dealership',
  {
    car_model: 'Toyota Corolla',
    customer_name: 'John Doe',
    start_date: '2024-01-15',
    end_date: '2024-01-17',
    total_amount: 15000,
    customer_phone: '+92-300-1234567'
  }
)
```

## 📱 Integration with Components

### 1. Add Notification Bell to Header
```typescript
// In your Header component
import { useState } from 'react'
import { Bell } from 'lucide-react'
import NotificationCenter from '@/components/NotificationCenter'

const Header = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  
  return (
    <header>
      {/* Your existing header content */}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setNotificationsOpen(true)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>
      
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </header>
  )
}
```

### 2. Add Booking Request to Car Details
```typescript
// In your CarDetails component
import BookingRequest from '@/components/BookingRequest'

const CarDetails = () => {
  const [showBookingRequest, setShowBookingRequest] = useState(false)
  
  return (
    <div>
      {/* Car details content */}
      
      <Button onClick={() => setShowBookingRequest(true)}>
        Request Booking
      </Button>
      
      {showBookingRequest && (
        <BookingRequest
          onSuccess={() => setShowBookingRequest(false)}
          onCancel={() => setShowBookingRequest(false)}
        />
      )}
    </div>
  )
}
```

## 🔄 Notification Flow

### 1. Customer Books a Car
```
Customer clicks "Request Booking" 
→ BookingRequest component submits
→ Creates booking in database
→ Triggers notifyDealershipOfBookingRequest()
→ Sends email/SMS to dealership
→ Creates in-app notification for dealer
```

### 2. Dealership Approves Booking
```
Dealer approves booking in dashboard
→ Updates booking status to 'confirmed'
→ Triggers notifyCustomerOfBookingConfirmation()
→ Sends email/SMS to customer
→ Creates in-app notification for customer
→ Shows dealership contact info to customer
```

### 3. Real-time Updates
```
Database change → Supabase real-time event
→ React Query invalidates cache
→ UI updates automatically
→ Notification count updates
```

## 🛠️ Customization

### 1. Custom Email Templates
```html
<!-- Example custom email template -->
<h2>New Booking Request</h2>
<p>Hello {{dealership_name}},</p>
<p>You have received a new booking request:</p>
<ul>
  <li><strong>Car:</strong> {{car_model}}</li>
  <li><strong>Customer:</strong> {{customer_name}}</li>
  <li><strong>Dates:</strong> {{start_date}} to {{end_date}}</li>
  <li><strong>Amount:</strong> ₹{{total_amount}}</li>
</ul>
<p>Please respond within 24 hours.</p>
```

### 2. Custom SMS Templates
```text
New booking: {{car_model}} from {{customer_name}}. 
Dates: {{start_date}}-{{end_date}}. 
Amount: ₹{{total_amount}}. 
Call {{customer_phone}} or check dashboard.
```

### 3. Notification Preferences
```typescript
// Users can customize their notification preferences
const preferences = {
  email_notifications: true,
  sms_notifications: false,
  push_notifications: true,
  in_app_notifications: true,
  marketing_emails: false,
  booking_reminders: true,
  special_offers: true
}
```

## 🔒 Security Considerations

### 1. Rate Limiting
```typescript
// Implement rate limiting for SMS/email
const rateLimiter = {
  sms: { max: 10, window: '1h' },
  email: { max: 50, window: '1h' }
}
```

### 2. Phone Number Verification
```typescript
// Verify phone numbers before sending SMS
const verifyPhoneNumber = (phone: string) => {
  // Implement phone verification logic
  return phone.match(/^\+[1-9]\d{1,14}$/)
}
```

### 3. Email Validation
```typescript
// Validate email addresses
const validateEmail = (email: string) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}
```

## 📊 Monitoring

### 1. Notification Analytics
```sql
-- Track notification success rates
SELECT 
  type,
  COUNT(*) as total_sent,
  COUNT(CASE WHEN sent_at IS NOT NULL THEN 1 END) as successful,
  COUNT(CASE WHEN sent_at IS NULL THEN 1 END) as failed
FROM notifications 
GROUP BY type;
```

### 2. Delivery Status
```typescript
// Track delivery status
interface NotificationStatus {
  id: string
  type: 'email' | 'sms'
  status: 'pending' | 'sent' | 'delivered' | 'failed'
  sent_at?: string
  delivered_at?: string
  error_message?: string
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check Resend API key
   - Verify domain verification
   - Check spam folder

2. **SMS not sending**
   - Check Twilio credentials
   - Verify phone number format
   - Check account balance

3. **Notifications not appearing**
   - Check Supabase real-time subscriptions
   - Verify RLS policies
   - Check browser console for errors

### Debug Mode
```typescript
// Enable debug logging
const DEBUG_MODE = process.env.NODE_ENV === 'development'

if (DEBUG_MODE) {
  console.log('Notification data:', notificationData)
  console.log('Email template:', template)
  console.log('SMS template:', smsTemplate)
}
```

## 🎉 Success Metrics

Track these metrics to ensure your notification system is working:

- **Email Delivery Rate**: >95%
- **SMS Delivery Rate**: >98%
- **Notification Open Rate**: >60%
- **Response Time**: <5 minutes
- **Customer Satisfaction**: >4.5/5

---

**Your notification system is now ready to connect customers and dealerships seamlessly! 🚀**