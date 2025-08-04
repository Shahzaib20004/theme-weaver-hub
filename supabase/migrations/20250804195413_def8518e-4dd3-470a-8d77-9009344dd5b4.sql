-- Fix database schema issues and add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_dealer boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS dealer_name text,
ADD COLUMN IF NOT EXISTS role text DEFAULT 'customer';

-- Create admin_access table for admin authentication
CREATE TABLE IF NOT EXISTS public.admin_access (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admin_access
ALTER TABLE public.admin_access ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_access
CREATE POLICY "Admin access is restricted" ON public.admin_access
FOR ALL USING (auth.uid() = user_id);

-- Create notifications table for admin notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    type text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
FOR UPDATE USING (auth.uid() = user_id);

-- Add status and approval columns to cars table
ALTER TABLE public.cars 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS rejected_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS rejection_reason text;

-- Update cars RLS policy for status
DROP POLICY IF EXISTS "Enable read access for all users" ON public.cars;
CREATE POLICY "Enable read access for approved cars" ON public.cars
FOR SELECT USING (status = 'approved' OR auth.uid() = user_id);

-- Add foreign key relationships
ALTER TABLE public.cars 
ADD CONSTRAINT fk_cars_brand FOREIGN KEY (brand_id) REFERENCES public.car_brands(id),
ADD CONSTRAINT fk_cars_category FOREIGN KEY (category_id) REFERENCES public.car_categories(id),
ADD CONSTRAINT fk_cars_dealership FOREIGN KEY (dealership_id) REFERENCES public.dealerships(id);

-- Create trigger for updated_at on profiles
CREATE OR REPLACE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();