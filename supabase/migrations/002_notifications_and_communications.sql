-- ===== NOTIFICATIONS AND COMMUNICATIONS SYSTEM =====

-- Notification types
CREATE TYPE notification_type AS ENUM (
  'booking_request',
  'booking_confirmed',
  'booking_cancelled',
  'payment_received',
  'car_available',
  'review_received',
  'message_received',
  'offer_expired'
);

-- Notification channels
CREATE TYPE notification_channel AS ENUM (
  'email',
  'sms',
  'push',
  'in_app'
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  channels notification_channel[] DEFAULT '{in_app}',
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communication preferences
CREATE TABLE public.communication_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  push_notifications BOOLEAN DEFAULT TRUE,
  in_app_notifications BOOLEAN DEFAULT TRUE,
  marketing_emails BOOLEAN DEFAULT FALSE,
  booking_reminders BOOLEAN DEFAULT TRUE,
  special_offers BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages between customers and dealerships
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE CASCADE,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact sharing preferences
CREATE TABLE public.contact_sharing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  share_phone BOOLEAN DEFAULT TRUE,
  share_email BOOLEAN DEFAULT TRUE,
  share_whatsapp BOOLEAN DEFAULT FALSE,
  auto_share_on_booking BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dealership contact information (for customer access)
CREATE TABLE public.dealership_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE CASCADE,
  contact_person TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  operating_hours JSONB,
  emergency_contact TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking requests (pending approval)
CREATE TABLE public.booking_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE CASCADE,
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, expired
  special_requests TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  dealership_notified BOOLEAN DEFAULT FALSE,
  customer_notified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email templates
CREATE TABLE public.email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  html_template TEXT NOT NULL,
  text_template TEXT,
  variables JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SMS templates
CREATE TABLE public.sms_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  template TEXT NOT NULL,
  variables JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_type ON public.notifications(type);
CREATE INDEX idx_notifications_sent_at ON public.notifications(sent_at);
CREATE INDEX idx_messages_booking_id ON public.messages(booking_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_booking_requests_dealership_id ON public.booking_requests(dealership_id);
CREATE INDEX idx_booking_requests_status ON public.booking_requests(status);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_sharing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealership_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Notifications: Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Communication preferences: Users can manage their own preferences
CREATE POLICY "Users can manage own communication preferences" ON public.communication_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Messages: Participants can view messages they're involved in
CREATE POLICY "Users can view messages they're involved in" ON public.messages
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

CREATE POLICY "Users can create messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Contact sharing: Users can manage their own contact preferences
CREATE POLICY "Users can manage own contact sharing" ON public.contact_sharing
  FOR ALL USING (auth.uid() = user_id);

-- Dealership contacts: Publicly readable
CREATE POLICY "Dealership contacts are publicly readable" ON public.dealership_contacts
  FOR SELECT USING (true);

-- Dealers can manage their dealership contacts
CREATE POLICY "Dealers can manage dealership contacts" ON public.dealership_contacts
  FOR ALL USING (
    dealership_id IN (
      SELECT id FROM public.dealerships 
      WHERE id IN (
        SELECT dealership_id FROM public.users 
        WHERE role = 'dealer' AND id = auth.uid()
      )
    )
  );

-- Booking requests: Customers can view their own requests
CREATE POLICY "Customers can view own booking requests" ON public.booking_requests
  FOR SELECT USING (auth.uid() = customer_id);

-- Dealers can view requests for their dealership
CREATE POLICY "Dealers can view dealership booking requests" ON public.booking_requests
  FOR SELECT USING (
    dealership_id IN (
      SELECT id FROM public.dealerships 
      WHERE id IN (
        SELECT dealership_id FROM public.users 
        WHERE role = 'dealer' AND id = auth.uid()
      )
    )
  );

-- Anyone can create booking requests
CREATE POLICY "Anyone can create booking requests" ON public.booking_requests
  FOR INSERT WITH CHECK (true);

-- Email/SMS templates: Admins only
CREATE POLICY "Admins can manage email templates" ON public.email_templates
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

CREATE POLICY "Admins can manage SMS templates" ON public.sms_templates
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_communication_preferences_updated_at 
  BEFORE UPDATE ON public.communication_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_sharing_updated_at 
  BEFORE UPDATE ON public.contact_sharing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dealership_contacts_updated_at 
  BEFORE UPDATE ON public.dealership_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_booking_requests_updated_at 
  BEFORE UPDATE ON public.booking_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample email templates
INSERT INTO public.email_templates (name, subject, html_template, variables) VALUES
(
  'booking_request_dealership',
  'New Booking Request - {{car_model}}',
  '
  <h2>New Booking Request</h2>
  <p>Hello {{dealership_name}},</p>
  <p>You have received a new booking request for your car:</p>
  <ul>
    <li><strong>Car:</strong> {{car_model}} ({{car_year}})</li>
    <li><strong>Customer:</strong> {{customer_name}}</li>
    <li><strong>Dates:</strong> {{start_date}} to {{end_date}}</li>
    <li><strong>Total Amount:</strong> ₹{{total_amount}}</li>
    <li><strong>Customer Phone:</strong> {{customer_phone}}</li>
    <li><strong>Customer Email:</strong> {{customer_email}}</li>
  </ul>
  <p><strong>Special Requests:</strong> {{special_requests}}</p>
  <p>Please respond within 24 hours to confirm or reject this booking.</p>
  <p>Best regards,<br>Your Car Rental Platform</p>
  ',
  '{"car_model": "", "dealership_name": "", "customer_name": "", "start_date": "", "end_date": "", "total_amount": "", "customer_phone": "", "customer_email": "", "special_requests": ""}'
),
(
  'booking_confirmed_customer',
  'Booking Confirmed - {{car_model}}',
  '
  <h2>Booking Confirmed!</h2>
  <p>Hello {{customer_name}},</p>
  <p>Your booking has been confirmed by {{dealership_name}}.</p>
  <ul>
    <li><strong>Car:</strong> {{car_model}} ({{car_year}})</li>
    <li><strong>Dates:</strong> {{start_date}} to {{end_date}}</li>
    <li><strong>Total Amount:</strong> ₹{{total_amount}}</li>
    <li><strong>Dealership Contact:</strong> {{dealership_phone}}</li>
    <li><strong>Pickup Location:</strong> {{pickup_location}}</li>
  </ul>
  <p>Please contact the dealership to arrange pickup details.</p>
  <p>Best regards,<br>Your Car Rental Platform</p>
  ',
  '{"customer_name": "", "dealership_name": "", "car_model": "", "car_year": "", "start_date": "", "end_date": "", "total_amount": "", "dealership_phone": "", "pickup_location": ""}'
);

-- Insert sample SMS templates
INSERT INTO public.sms_templates (name, template, variables) VALUES
(
  'booking_request_dealership',
  'New booking request for {{car_model}} from {{customer_name}}. Dates: {{start_date}}-{{end_date}}. Amount: ₹{{total_amount}}. Call {{customer_phone}} or check your dashboard.',
  '{"car_model": "", "customer_name": "", "start_date": "", "end_date": "", "total_amount": "", "customer_phone": ""}'
),
(
  'booking_confirmed_customer',
  'Your booking for {{car_model}} is confirmed! Contact {{dealership_name}} at {{dealership_phone}} for pickup details. Dates: {{start_date}}-{{end_date}}.',
  '{"car_model": "", "dealership_name": "", "dealership_phone": "", "start_date": "", "end_date": ""}'
);

-- Insert sample dealership contacts
INSERT INTO public.dealership_contacts (dealership_id, contact_person, phone, whatsapp, email, address, operating_hours) VALUES
(
  (SELECT id FROM public.dealerships WHERE name = 'Premium Auto Rentals' LIMIT 1),
  'Ahmed Khan',
  '+92-300-1234567',
  '+92-300-1234567',
  'ahmed@premiumauto.com',
  '123 Main Street, Karachi',
  '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}, "wednesday": {"open": "09:00", "close": "18:00"}, "thursday": {"open": "09:00", "close": "18:00"}, "friday": {"open": "09:00", "close": "18:00"}, "saturday": {"open": "10:00", "close": "16:00"}, "sunday": {"open": "10:00", "close": "16:00"}}'
),
(
  (SELECT id FROM public.dealerships WHERE name = 'City Car Services' LIMIT 1),
  'Fatima Ali',
  '+92-300-2345678',
  '+92-300-2345678',
  'fatima@citycar.com',
  '456 Park Avenue, Lahore',
  '{"monday": {"open": "08:00", "close": "19:00"}, "tuesday": {"open": "08:00", "close": "19:00"}, "wednesday": {"open": "08:00", "close": "19:00"}, "thursday": {"open": "08:00", "close": "19:00"}, "friday": {"open": "08:00", "close": "19:00"}, "saturday": {"open": "09:00", "close": "17:00"}, "sunday": {"open": "09:00", "close": "17:00"}}'
),
(
  (SELECT id FROM public.dealerships WHERE name = 'Express Rentals' LIMIT 1),
  'Usman Hassan',
  '+92-300-3456789',
  '+92-300-3456789',
  'usman@expressrentals.com',
  '789 Business District, Islamabad',
  '{"monday": {"open": "07:00", "close": "20:00"}, "tuesday": {"open": "07:00", "close": "20:00"}, "wednesday": {"open": "07:00", "close": "20:00"}, "thursday": {"open": "07:00", "close": "20:00"}, "friday": {"open": "07:00", "close": "20:00"}, "saturday": {"open": "08:00", "close": "18:00"}, "sunday": {"open": "08:00", "close": "18:00"}}'
);