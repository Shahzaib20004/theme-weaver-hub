import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { apiService } from '@/lib/services/api'
import type { 
  User, 
  Dealership, 
  CarBrand, 
  Car, 
  Booking, 
  Review, 
  DailyOffer, 
  ContactInquiry,
  TablesInsert,
  TablesUpdate
} from '@/lib/services/api'

// ===== USERS =====
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<TablesUpdate<'users'>> }) =>
      apiService.updateUserProfile(userId, updates),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    },
  })
}

// ===== DEALERSHIPS =====
export const useDealerships = () => {
  return useQuery({
    queryKey: ['dealerships'],
    queryFn: () => apiService.getDealerships(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useDealership = (id: string) => {
  return useQuery({
    queryKey: ['dealership', id],
    queryFn: () => apiService.getDealership(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateDealership = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (dealership: TablesInsert<'dealerships'>) =>
      apiService.createDealership(dealership),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dealerships'] })
    },
  })
}

export const useUpdateDealership = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TablesUpdate<'dealerships'>> }) =>
      apiService.updateDealership(id, updates),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(['dealership', id], data)
      queryClient.invalidateQueries({ queryKey: ['dealerships'] })
    },
  })
}

// ===== CAR BRANDS =====
export const useCarBrands = () => {
  return useQuery({
    queryKey: ['carBrands'],
    queryFn: () => apiService.getCarBrands(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// ===== CARS =====
export const useCars = (filters?: {
  dealership_id?: string
  brand_id?: string
  category?: string
  location?: string
  status?: string
  min_price?: number
  max_price?: number
  with_driver?: boolean
}) => {
  return useQuery({
    queryKey: ['cars', filters],
    queryFn: () => apiService.getCars(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCar = (id: string) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => apiService.getCar(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCreateCar = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (car: TablesInsert<'cars'>) => apiService.createCar(car),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })
}

export const useUpdateCar = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TablesUpdate<'cars'>> }) =>
      apiService.updateCar(id, updates),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(['car', id], data)
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })
}

export const useDeleteCar = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteCar(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['car', id] })
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })
}

// ===== BOOKINGS =====
export const useBookings = (userId?: string, dealershipId?: string) => {
  return useQuery({
    queryKey: ['bookings', { userId, dealershipId }],
    queryFn: () => apiService.getBookings(userId, dealershipId),
    enabled: !!userId || !!dealershipId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => apiService.getBooking(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (booking: TablesInsert<'bookings'>) => apiService.createBooking(booking),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['cars'] })
      // Update car status to rented
      queryClient.setQueryData(['car', data.car_id], (old: any) => 
        old ? { ...old, status: 'rented' } : old
      )
    },
  })
}

export const useUpdateBooking = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TablesUpdate<'bookings'>> }) =>
      apiService.updateBooking(id, updates),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(['booking', id], data)
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// ===== REVIEWS =====
export const useReviews = (carId?: string, dealershipId?: string) => {
  return useQuery({
    queryKey: ['reviews', { carId, dealershipId }],
    queryFn: () => apiService.getReviews(carId, dealershipId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (review: TablesInsert<'reviews'>) => apiService.createReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}

// ===== DAILY OFFERS =====
export const useDailyOffers = () => {
  return useQuery({
    queryKey: ['dailyOffers'],
    queryFn: () => apiService.getDailyOffers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ===== CONTACT INQUIRIES =====
export const useCreateContactInquiry = () => {
  return useMutation({
    mutationFn: (inquiry: TablesInsert<'contact_inquiries'>) => 
      apiService.createContactInquiry(inquiry),
  })
}

// ===== SEARCH =====
export const useSearchCars = (searchTerm: string) => {
  return useQuery({
    queryKey: ['searchCars', searchTerm],
    queryFn: () => apiService.searchCars(searchTerm),
    enabled: searchTerm.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// ===== REAL-TIME SUBSCRIPTIONS =====
export const useRealtimeCars = (callback: (payload: any) => void) => {
  return useQuery({
    queryKey: ['realtimeCars'],
    queryFn: () => {
      const subscription = apiService.subscribeToCars(callback)
      return subscription
    },
    enabled: false, // Don't auto-fetch
  })
}

export const useRealtimeBookings = (callback: (payload: any) => void) => {
  return useQuery({
    queryKey: ['realtimeBookings'],
    queryFn: () => {
      const subscription = apiService.subscribeToBookings(callback)
      return subscription
    },
    enabled: false, // Don't auto-fetch
  })
}

// ===== INFINITE QUERIES =====
export const useInfiniteCars = (filters?: {
  dealership_id?: string
  brand_id?: string
  category?: string
  location?: string
  status?: string
  min_price?: number
  max_price?: number
  with_driver?: boolean
}) => {
  return useInfiniteQuery({
    queryKey: ['infiniteCars', filters],
    queryFn: ({ pageParam = 0 }) => 
      apiService.getCars({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length : undefined
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// ===== STATISTICS =====
export const useDealershipStats = (dealershipId: string) => {
  return useQuery({
    queryKey: ['dealershipStats', dealershipId],
    queryFn: () => apiService.getDealershipStats(dealershipId),
    enabled: !!dealershipId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ===== FILE UPLOAD =====
export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ file, path }: { file: File; path: string }) =>
      apiService.uploadImage(file, path),
  })
}