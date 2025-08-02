export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'customer' | 'dealer' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'customer' | 'dealer' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'customer' | 'dealer' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      dealerships: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string
          city: string
          state: string
          zip_code: string | null
          phone: string | null
          email: string | null
          website: string | null
          logo_url: string | null
          banner_url: string | null
          latitude: number | null
          longitude: number | null
          operating_hours: Json | null
          services: Json | null
          rating: number
          total_reviews: number
          is_verified: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address: string
          city: string
          state: string
          zip_code?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          banner_url?: string | null
          latitude?: number | null
          longitude?: number | null
          operating_hours?: Json | null
          services?: Json | null
          rating?: number
          total_reviews?: number
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string
          city?: string
          state?: string
          zip_code?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          banner_url?: string | null
          latitude?: number | null
          longitude?: number | null
          operating_hours?: Json | null
          services?: Json | null
          rating?: number
          total_reviews?: number
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      car_brands: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          description: string | null
          country_of_origin: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          description?: string | null
          country_of_origin?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          description?: string | null
          country_of_origin?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          dealership_id: string
          brand_id: string
          model: string
          year: number
          category: string
          transmission: 'manual' | 'automatic' | 'cvt'
          fuel_type: string
          mileage: number | null
          daily_rate: number
          weekly_rate: number | null
          monthly_rate: number | null
          with_driver: boolean
          driver_rate: number | null
          features: Json | null
          images: Json | null
          description: string | null
          status: 'available' | 'rented' | 'maintenance' | 'sold'
          location: string | null
          latitude: number | null
          longitude: number | null
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          dealership_id: string
          brand_id: string
          model: string
          year: number
          category: string
          transmission: 'manual' | 'automatic' | 'cvt'
          fuel_type: string
          mileage?: number | null
          daily_rate: number
          weekly_rate?: number | null
          monthly_rate?: number | null
          with_driver?: boolean
          driver_rate?: number | null
          features?: Json | null
          images?: Json | null
          description?: string | null
          status?: 'available' | 'rented' | 'maintenance' | 'sold'
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          dealership_id?: string
          brand_id?: string
          model?: string
          year?: number
          category?: string
          transmission?: 'manual' | 'automatic' | 'cvt'
          fuel_type?: string
          mileage?: number | null
          daily_rate?: number
          weekly_rate?: number | null
          monthly_rate?: number | null
          with_driver?: boolean
          driver_rate?: number | null
          features?: Json | null
          images?: Json | null
          description?: string | null
          status?: 'available' | 'rented' | 'maintenance' | 'sold'
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          car_id: string
          customer_id: string
          dealership_id: string
          start_date: string
          end_date: string
          total_days: number
          total_amount: number
          with_driver: boolean
          driver_amount: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status: string
          payment_method: string | null
          special_requests: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          car_id: string
          customer_id: string
          dealership_id: string
          start_date: string
          end_date: string
          total_days: number
          total_amount: number
          with_driver?: boolean
          driver_amount?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: string
          payment_method?: string | null
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          customer_id?: string
          dealership_id?: string
          start_date?: string
          end_date?: string
          total_days?: number
          total_amount?: number
          with_driver?: boolean
          driver_amount?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: string
          payment_method?: string | null
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          car_id: string
          dealership_id: string
          customer_id: string
          rating: number
          comment: string | null
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          car_id: string
          dealership_id: string
          customer_id: string
          rating: number
          comment?: string | null
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          car_id?: string
          dealership_id?: string
          customer_id?: string
          rating?: number
          comment?: string | null
          is_public?: boolean
          created_at?: string
        }
      }
      daily_offers: {
        Row: {
          id: string
          dealership_id: string
          car_id: string | null
          title: string
          description: string | null
          discount_percentage: number | null
          discount_amount: number | null
          start_date: string
          end_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          dealership_id: string
          car_id?: string | null
          title: string
          description?: string | null
          discount_percentage?: number | null
          discount_amount?: number | null
          start_date: string
          end_date: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          dealership_id?: string
          car_id?: string | null
          title?: string
          description?: string | null
          discount_percentage?: number | null
          discount_amount?: number | null
          start_date?: string
          end_date?: string
          is_active?: boolean
          created_at?: string
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          dealership_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          dealership_id?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          dealership_id?: string | null
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'customer' | 'dealer' | 'admin'
      car_status: 'available' | 'rented' | 'maintenance' | 'sold'
      booking_status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
      transmission_type: 'manual' | 'automatic' | 'cvt'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  T extends keyof Database['public']['Tables'],
> = Database['public']['Tables'][T]['Row']

export type TablesInsert<
  T extends keyof Database['public']['Tables'],
> = Database['public']['Tables'][T]['Insert']

export type TablesUpdate<
  T extends keyof Database['public']['Tables'],
> = Database['public']['Tables'][T]['Update']

export type Enums<
  T extends keyof Database['public']['Enums'],
> = Database['public']['Enums'][T]
