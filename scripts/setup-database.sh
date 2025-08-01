#!/bin/bash

# Database Setup Script for Dealership Website
echo "🚀 Setting up database schema..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Run the migration
echo "📦 Running database migration..."
supabase db push

# Check if migration was successful
if [ $? -eq 0 ]; then
    echo "✅ Database schema setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Add some sample data to your tables"
    echo "2. Test the real-time functionality"
    echo "3. Configure Row Level Security policies"
    echo ""
    echo "🔗 You can view your database at: https://cmdnaaclpkgxxportnuc.supabase.co"
else
    echo "❌ Database migration failed. Please check your Supabase configuration."
    exit 1
fi