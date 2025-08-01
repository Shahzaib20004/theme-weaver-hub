import React, { createContext, useContext, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useCurrentUser } from '@/hooks/useApi'

interface RealtimeContextType {
  isConnected: boolean
  subscribeToCars: () => void
  subscribeToBookings: () => void
  subscribeToReviews: () => void
  unsubscribe: () => void
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export const useRealtime = () => {
  const context = useContext(RealtimeContext)
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider')
  }
  return context
}

interface RealtimeProviderProps {
  children: React.ReactNode
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const queryClient = useQueryClient()
  const { data: currentUser } = useCurrentUser()

  // Handle real-time updates
  const handleCarsUpdate = (payload: any) => {
    console.log('Cars real-time update:', payload)
    
    // Invalidate cars queries to refetch data
    queryClient.invalidateQueries({ queryKey: ['cars'] })
    
    // If it's a specific car update, also invalidate that car's data
    if (payload.new?.id) {
      queryClient.invalidateQueries({ queryKey: ['car', payload.new.id] })
    }
  }

  const handleBookingsUpdate = (payload: any) => {
    console.log('Bookings real-time update:', payload)
    
    // Invalidate bookings queries
    queryClient.invalidateQueries({ queryKey: ['bookings'] })
    
    // If it's a specific booking update, also invalidate that booking's data
    if (payload.new?.id) {
      queryClient.invalidateQueries({ queryKey: ['booking', payload.new.id] })
    }
    
    // Also invalidate cars since booking status affects car availability
    queryClient.invalidateQueries({ queryKey: ['cars'] })
  }

  const handleReviewsUpdate = (payload: any) => {
    console.log('Reviews real-time update:', payload)
    
    // Invalidate reviews queries
    queryClient.invalidateQueries({ queryKey: ['reviews'] })
  }

  // Subscribe to cars changes
  const subscribeToCars = () => {
    const channel = supabase
      .channel('cars_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'cars' 
      }, handleCarsUpdate)
      .subscribe((status) => {
        console.log('Cars subscription status:', status)
        setIsConnected(status === 'SUBSCRIBED')
      })

    return channel
  }

  // Subscribe to bookings changes
  const subscribeToBookings = () => {
    const channel = supabase
      .channel('bookings_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'bookings' 
      }, handleBookingsUpdate)
      .subscribe((status) => {
        console.log('Bookings subscription status:', status)
        setIsConnected(status === 'SUBSCRIBED')
      })

    return channel
  }

  // Subscribe to reviews changes
  const subscribeToReviews = () => {
    const channel = supabase
      .channel('reviews_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'reviews' 
      }, handleReviewsUpdate)
      .subscribe((status) => {
        console.log('Reviews subscription status:', status)
        setIsConnected(status === 'SUBSCRIBED')
      })

    return channel
  }

  // Unsubscribe from all channels
  const unsubscribe = () => {
    supabase.removeAllChannels()
    setIsConnected(false)
  }

  // Set up subscriptions when user is authenticated
  useEffect(() => {
    if (currentUser) {
      // Subscribe to all real-time updates
      const carsChannel = subscribeToCars()
      const bookingsChannel = subscribeToBookings()
      const reviewsChannel = subscribeToReviews()

      // Cleanup on unmount
      return () => {
        carsChannel.unsubscribe()
        bookingsChannel.unsubscribe()
        reviewsChannel.unsubscribe()
        unsubscribe()
      }
    }
  }, [currentUser])

  const value: RealtimeContextType = {
    isConnected,
    subscribeToCars,
    subscribeToBookings,
    subscribeToReviews,
    unsubscribe,
  }

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  )
}