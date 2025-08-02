import { supabase } from '@/integrations/supabase/client'
import type { 
  Tables, 
  TablesInsert, 
  TablesUpdate,
  Enums 
} from '@/integrations/supabase/types'

// Types for better type safety
export type User = Tables<'users'>
export type Dealership = Tables<'dealerships'>
export type CarBrand = Tables<'car_brands'>
export type Car = Tables<'cars'>
export type Booking = Tables<'bookings'>
export type Review = Tables<'reviews'>
export type DailyOffer = Tables<'daily_offers'>
export type ContactInquiry = Tables<'contact_inquiries'>

export type UserRole = Enums<'user_role'>
export type CarStatus = Enums<'car_status'>
export type BookingStatus = Enums<'booking_status'>
export type TransmissionType = Enums<'transmission_type'>

// API Service Class
class ApiService {
  // ===== USERS =====
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return data
  }

  async updateUserProfile(userId: string, updates: Partial<TablesUpdate<'users'>>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // ===== DEALERSHIPS =====
  async getDealerships(): Promise<Dealership[]> {
    const { data, error } = await supabase
      .from('dealerships')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false })

    if (error) throw error
    return data
  }

  async getDealership(id: string): Promise<Dealership> {
    const { data, error } = await supabase
      .from('dealerships')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async createDealership(dealership: TablesInsert<'dealerships'>): Promise<Dealership> {
    const { data, error } = await supabase
      .from('dealerships')
      .insert(dealership)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateDealership(id: string, updates: Partial<TablesUpdate<'dealerships'>>): Promise<Dealership> {
    const { data, error } = await supabase
      .from('dealerships')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // ===== CAR BRANDS =====
  async getCarBrands(): Promise<CarBrand[]> {
    const { data, error } = await supabase
      .from('car_brands')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) throw error
    return data
  }

  // ===== CARS =====
  async getCars(filters?: {
    dealership_id?: string
    brand_id?: string
    category?: string
    location?: string
    status?: CarStatus
    min_price?: number
    max_price?: number
    with_driver?: boolean
  }): Promise<Car[]> {
    let query = supabase
      .from('cars')
      .select(`
        *,
        dealerships(name, city, state),
        car_brands(name, logo_url)
      `)
      .eq('is_active', true)

    if (filters?.dealership_id) {
      query = query.eq('dealership_id', filters.dealership_id)
    }
    if (filters?.brand_id) {
      query = query.eq('brand_id', filters.brand_id)
    }
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.min_price) {
      query = query.gte('daily_rate', filters.min_price)
    }
    if (filters?.max_price) {
      query = query.lte('daily_rate', filters.max_price)
    }
    if (filters?.with_driver !== undefined) {
      query = query.eq('with_driver', filters.with_driver)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async getCar(id: string): Promise<Car & { dealerships: Dealership; car_brands: CarBrand }> {
    const { data, error } = await supabase
      .from('cars')
      .select(`
        *,
        dealerships(*),
        car_brands(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async createCar(car: TablesInsert<'cars'>): Promise<Car> {
    const { data, error } = await supabase
      .from('cars')
      .insert(car)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateCar(id: string, updates: Partial<TablesUpdate<'cars'>>): Promise<Car> {
    const { data, error } = await supabase
      .from('cars')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deleteCar(id: string): Promise<void> {
    const { error } = await supabase
      .from('cars')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // ===== BOOKINGS =====
  async getBookings(userId?: string, dealershipId?: string): Promise<Booking[]> {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        cars(*, dealerships(name), car_brands(name)),
        users(full_name, email),
        dealerships(name)
      `)

    if (userId) {
      query = query.eq('customer_id', userId)
    }
    if (dealershipId) {
      query = query.eq('dealership_id', dealershipId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async getBooking(id: string): Promise<Booking & { 
    cars: Car & { dealerships: Dealership; car_brands: CarBrand }
    users: User
    dealerships: Dealership
  }> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        cars(*, dealerships(*), car_brands(*)),
        users(*),
        dealerships(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async createBooking(booking: TablesInsert<'bookings'>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateBooking(id: string, updates: Partial<TablesUpdate<'bookings'>>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // ===== REVIEWS =====
  async getReviews(carId?: string, dealershipId?: string): Promise<Review[]> {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        users(full_name, avatar_url),
        cars(model, car_brands(name))
      `)
      .eq('is_public', true)

    if (carId) {
      query = query.eq('car_id', carId)
    }
    if (dealershipId) {
      query = query.eq('dealership_id', dealershipId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async createReview(review: TablesInsert<'reviews'>): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // ===== DAILY OFFERS =====
  async getDailyOffers(): Promise<DailyOffer[]> {
    const { data, error } = await supabase
      .from('daily_offers')
      .select(`
        *,
        dealerships(name),
        cars(model, car_brands(name))
      `)
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // ===== CONTACT INQUIRIES =====
  async createContactInquiry(inquiry: TablesInsert<'contact_inquiries'>): Promise<ContactInquiry> {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert(inquiry)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // ===== REAL-TIME SUBSCRIPTIONS =====
  subscribeToCars(callback: (payload: any) => void) {
    return supabase
      .channel('cars_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, callback)
      .subscribe()
  }

  subscribeToBookings(callback: (payload: any) => void) {
    return supabase
      .channel('bookings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, callback)
      .subscribe()
  }

  subscribeToReviews(callback: (payload: any) => void) {
    return supabase
      .channel('reviews_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, callback)
      .subscribe()
  }

  // ===== SEARCH AND FILTERS =====
  async searchCars(searchTerm: string): Promise<Car[]> {
    const { data, error } = await supabase
      .from('cars')
      .select(`
        *,
        dealerships(name, city),
        car_brands(name)
      `)
      .or(`model.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // ===== STATISTICS =====
  async getDealershipStats(dealershipId: string) {
    const { data, error } = await supabase
      .rpc('get_dealership_stats', { dealership_id: dealershipId })

    if (error) throw error
    return data
  }

  // ===== FILE UPLOAD =====
  async uploadImage(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from('car-images')
      .upload(path, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('car-images')
      .getPublicUrl(data.path)

    return publicUrl
  }
}

export const apiService = new ApiService()