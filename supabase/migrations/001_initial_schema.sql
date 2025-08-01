-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('customer', 'dealer', 'admin');
CREATE TYPE car_status AS ENUM ('available', 'rented', 'maintenance', 'sold');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE transmission_type AS ENUM ('manual', 'automatic', 'cvt');

-- Users table (extends Supabase auth)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dealerships table
CREATE TABLE public.dealerships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  banner_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  operating_hours JSONB,
  services JSONB,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car brands table
CREATE TABLE public.car_brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  description TEXT,
  country_of_origin TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cars table
CREATE TABLE public.cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES public.car_brands(id) ON DELETE CASCADE,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  transmission transmission_type NOT NULL,
  fuel_type TEXT NOT NULL,
  mileage DECIMAL(10, 2),
  daily_rate DECIMAL(10, 2) NOT NULL,
  weekly_rate DECIMAL(10, 2),
  monthly_rate DECIMAL(10, 2),
  with_driver BOOLEAN DEFAULT FALSE,
  driver_rate DECIMAL(10, 2),
  features JSONB,
  images JSONB,
  description TEXT,
  status car_status DEFAULT 'available',
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  with_driver BOOLEAN DEFAULT FALSE,
  driver_amount DECIMAL(10, 2) DEFAULT 0,
  status booking_status DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily offers table
CREATE TABLE public.daily_offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE CASCADE,
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  discount_amount DECIMAL(10, 2),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  dealership_id UUID REFERENCES public.dealerships(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_cars_dealership_id ON public.cars(dealership_id);
CREATE INDEX idx_cars_brand_id ON public.cars(brand_id);
CREATE INDEX idx_cars_status ON public.cars(status);
CREATE INDEX idx_cars_location ON public.cars(location);
CREATE INDEX idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX idx_bookings_car_id ON public.bookings(car_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_reviews_car_id ON public.reviews(car_id);
CREATE INDEX idx_reviews_dealership_id ON public.reviews(dealership_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own profile and update it
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Dealerships are publicly readable
CREATE POLICY "Dealerships are publicly readable" ON public.dealerships
  FOR SELECT USING (true);

-- Dealers can manage their own dealership
CREATE POLICY "Dealers can manage own dealership" ON public.dealerships
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.users 
      WHERE role = 'dealer' AND id = auth.uid()
    )
  );

-- Car brands are publicly readable
CREATE POLICY "Car brands are publicly readable" ON public.car_brands
  FOR SELECT USING (true);

-- Cars are publicly readable
CREATE POLICY "Cars are publicly readable" ON public.cars
  FOR SELECT USING (true);

-- Dealers can manage cars in their dealership
CREATE POLICY "Dealers can manage cars in their dealership" ON public.cars
  FOR ALL USING (
    dealership_id IN (
      SELECT id FROM public.dealerships 
      WHERE id IN (
        SELECT dealership_id FROM public.users 
        WHERE role = 'dealer' AND id = auth.uid()
      )
    )
  );

-- Bookings: customers can view their own, dealers can view their dealership's
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Dealers can view dealership bookings" ON public.bookings
  FOR SELECT USING (
    dealership_id IN (
      SELECT id FROM public.dealerships 
      WHERE id IN (
        SELECT dealership_id FROM public.users 
        WHERE role = 'dealer' AND id = auth.uid()
      )
    )
  );

-- Anyone can create bookings
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Reviews are publicly readable
CREATE POLICY "Reviews are publicly readable" ON public.reviews
  FOR SELECT USING (is_public = true);

-- Users can create reviews for their bookings
CREATE POLICY "Users can create reviews for their bookings" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = customer_id AND
    booking_id IN (
      SELECT id FROM public.bookings 
      WHERE customer_id = auth.uid()
    )
  );

-- Daily offers are publicly readable
CREATE POLICY "Daily offers are publicly readable" ON public.daily_offers
  FOR SELECT USING (true);

-- Contact inquiries: anyone can create, admins can view all
CREATE POLICY "Anyone can create contact inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact inquiries" ON public.contact_inquiries
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM public.users 
      WHERE role = 'admin'
    )
  );

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dealerships_updated_at BEFORE UPDATE ON public.dealerships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.car_brands (name, logo_url, description, country_of_origin) VALUES
('Toyota', '/brands/toyota.png', 'Reliable and fuel-efficient vehicles', 'Japan'),
('Honda', '/brands/honda.png', 'Innovative engineering and performance', 'Japan'),
('Suzuki', '/brands/suzuki.png', 'Compact and economical cars', 'Japan'),
('Hyundai', '/brands/hyundai.png', 'Modern design and technology', 'South Korea'),
('Ford', '/brands/ford.png', 'American heritage and reliability', 'USA'),
('BMW', '/brands/bmw.png', 'Luxury and performance', 'Germany'),
('Mercedes-Benz', '/brands/mercedes.png', 'Premium luxury vehicles', 'Germany'),
('Audi', '/brands/audi.png', 'Innovation and sophistication', 'Germany');

-- Insert sample dealerships
INSERT INTO public.dealerships (name, description, address, city, state, phone, email, rating, total_reviews) VALUES
('Premium Auto Rentals', 'Luxury and premium vehicle rentals', '123 Main Street', 'Karachi', 'Sindh', '+92-21-1234567', 'info@premiumauto.com', 4.5, 120),
('City Car Services', 'Affordable and reliable car rentals', '456 Park Avenue', 'Lahore', 'Punjab', '+92-42-2345678', 'contact@citycar.com', 4.2, 85),
('Express Rentals', 'Quick and convenient car rental services', '789 Business District', 'Islamabad', 'Federal', '+92-51-3456789', 'hello@expressrentals.com', 4.0, 65);