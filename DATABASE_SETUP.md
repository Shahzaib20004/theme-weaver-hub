# Database Setup Instructions

## Setting up Supabase Database Tables

The application requires specific database tables to function properly. Follow these steps to set up your Supabase database:

### 1. Access Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New query"**

### 2. Run the Migration Script

Copy and paste the entire content from `supabase/migrations/001_create_tables.sql` into the SQL editor and run it.

### 3. Verify Tables Created

After running the migration, verify that these tables exist:

- `profiles` - User profile information
- `cars` - Car listings  
- `ads` - Advertisement management

### 4. Check Row Level Security

Ensure that Row Level Security (RLS) is enabled and policies are created for secure data access.

### 5. Test the Setup

1. Try to submit a car listing through the application
2. Check the browser console for any database-related errors
3. Verify that data is being inserted correctly

## Table Schemas

### Cars Table
- `id` - UUID primary key
- `title` - Car listing title
- `brand` - Car brand
- `model` - Car model
- `year` - Manufacturing year
- `category` - Vehicle category
- `daily_rate` - Rental rate per day
- `mileage` - Vehicle mileage
- `transmission` - Transmission type
- `fuel_type` - Fuel type
- `seats` - Number of seats
- `description` - Car description
- `features` - Array of features
- `images` - Array of image URLs
- `location` - Location data (JSON)
- `condition` - Vehicle condition
- `color` - Vehicle color
- `engine_capacity` - Engine capacity
- `registration_city` - Registration city
- `with_driver` - Driver availability
- `package_type` - Listing package (basic/featured/premium)
- `package_price` - Package price
- `status` - Approval status
- `user_id` - Owner user ID
- `payment_data` - Payment information (JSON)

### Profiles Table
- `id` - UUID primary key
- `user_id` - Reference to auth.users
- `email` - User email
- `name` - User name
- `phone` - Phone number
- `is_dealer` - Dealer flag
- `dealer_name` - Dealer business name
- `role` - User role (customer/dealer/admin)

### Ads Table
- `id` - UUID primary key
- `title` - Advertisement title
- `description` - Ad description
- `image_url` - Ad image URL
- `link_url` - Target URL
- `position` - Display position
- `active` - Active status
- `placement` - Placement location

## Troubleshooting

If you encounter errors:

1. **"relation does not exist"** - Run the migration script
2. **"permission denied"** - Check RLS policies
3. **"column does not exist"** - Verify table schema matches code expectations

## Contact

If you need help setting up the database, contact the development team.