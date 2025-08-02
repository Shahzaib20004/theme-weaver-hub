# Real-Time Dealership Website Architecture

## 🏗️ Architecture Overview

This dealership website is built with a **real-time, dynamic architecture** that connects customers and dealerships through live data updates. Here's how it works:

### **Core Components**

1. **Supabase Database** - PostgreSQL with real-time subscriptions
2. **React Query** - Client-side caching and state management
3. **Real-time Context** - WebSocket connections for live updates
4. **API Service Layer** - Centralized data operations

## 🔄 How Real-Time Updates Work

### **1. Database Changes → Real-Time Updates**

```typescript
// When a car is booked in the database
// 1. Supabase triggers a real-time event
// 2. React Query invalidates cached data
// 3. UI automatically updates across all users
```

### **2. Live Data Flow**

```
Database Change → Supabase Realtime → React Query → UI Update
```

## 📊 Database Schema

### **Tables Structure**

```sql
-- Users (extends Supabase auth)
users (id, email, full_name, role, etc.)

-- Dealerships
dealerships (id, name, address, rating, etc.)

-- Cars
cars (id, dealership_id, brand_id, model, daily_rate, status, etc.)

-- Bookings
bookings (id, car_id, customer_id, start_date, end_date, status, etc.)

-- Reviews
reviews (id, booking_id, rating, comment, etc.)

-- Daily Offers
daily_offers (id, dealership_id, discount_percentage, etc.)
```

## 🚀 Getting Started

### **1. Set Up Database**

```bash
# Run the database migration
chmod +x scripts/setup-database.sh
./scripts/setup-database.sh
```

### **2. Environment Variables**

Create a `.env` file:

```env
VITE_SUPABASE_URL=https://cmdnaaclpkgxxportnuc.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### **3. Start Development**

```bash
npm run dev
```

## 🔧 API Usage Examples

### **Fetching Cars with Real-Time Updates**

```typescript
import { useCars } from '@/hooks/useApi'

function CarsPage() {
  const { data: cars, isLoading, error } = useCars({
    location: 'Karachi',
    brand_id: 'toyota-uuid',
    category: 'Sedan'
  })

  // Data automatically updates when database changes
  return (
    <div>
      {cars?.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}
```

### **Creating a Booking**

```typescript
import { useCreateBooking } from '@/hooks/useApi'

function BookingForm() {
  const createBooking = useCreateBooking()

  const handleSubmit = async (bookingData) => {
    try {
      await createBooking.mutateAsync(bookingData)
      // Booking created and UI automatically updates
    } catch (error) {
      console.error('Booking failed:', error)
    }
  }
}
```

### **Real-Time Status Indicator**

```typescript
import { useRealtime } from '@/contexts/RealtimeContext'

function StatusIndicator() {
  const { isConnected } = useRealtime()

  return (
    <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
      {isConnected ? '🟢 Live' : '🔴 Offline'}
    </div>
  )
}
```

## 🎯 Key Features

### **1. Automatic Data Synchronization**
- When a car is booked, all users see the updated availability
- When a review is posted, it appears immediately
- When a dealership updates their info, changes are reflected instantly

### **2. Optimistic Updates**
- UI updates immediately when user takes action
- Background sync ensures data consistency
- Error handling with rollback capability

### **3. Smart Caching**
- React Query caches data for 2-5 minutes
- Automatic background refetching
- Intelligent cache invalidation

### **4. Real-Time Subscriptions**
- WebSocket connections for instant updates
- Automatic reconnection on network issues
- Efficient event handling

## 🔐 Security & Permissions

### **Row Level Security (RLS)**

```sql
-- Users can only view their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = customer_id)

-- Dealers can manage their dealership's cars
CREATE POLICY "Dealers can manage cars" ON cars
  FOR ALL USING (dealership_id IN (
    SELECT id FROM dealerships WHERE dealer_id = auth.uid()
  ))
```

### **User Roles**
- **Customer** - Can view cars, make bookings, write reviews
- **Dealer** - Can manage their dealership's cars and bookings
- **Admin** - Full access to all data

## 📱 User Experience

### **For Customers**
1. **Browse cars** with real-time availability
2. **Book instantly** with immediate confirmation
3. **See live updates** when cars become available
4. **Write reviews** that appear immediately

### **For Dealerships**
1. **Manage inventory** with live updates
2. **See bookings** as they come in
3. **Update car status** and see changes instantly
4. **Monitor performance** with real-time analytics

## 🛠️ Development Workflow

### **Adding New Real-Time Features**

1. **Create Database Table**
```sql
CREATE TABLE new_feature (
  id UUID PRIMARY KEY,
  -- your columns
);
```

2. **Add API Service**
```typescript
// src/lib/services/api.ts
async getNewFeature(): Promise<NewFeature[]> {
  const { data, error } = await supabase
    .from('new_feature')
    .select('*')
  
  if (error) throw error
  return data
}
```

3. **Create React Query Hook**
```typescript
// src/hooks/useApi.ts
export const useNewFeature = () => {
  return useQuery({
    queryKey: ['newFeature'],
    queryFn: () => apiService.getNewFeature(),
    staleTime: 2 * 60 * 1000,
  })
}
```

4. **Add Real-Time Subscription**
```typescript
// src/contexts/RealtimeContext.tsx
const handleNewFeatureUpdate = (payload: any) => {
  queryClient.invalidateQueries({ queryKey: ['newFeature'] })
}
```

## 🚨 Troubleshooting

### **Common Issues**

1. **Real-time not working**
   - Check Supabase connection
   - Verify RLS policies
   - Check browser console for errors

2. **Data not updating**
   - Clear React Query cache
   - Check network connectivity
   - Verify database permissions

3. **Performance issues**
   - Reduce query frequency
   - Implement pagination
   - Use selective subscriptions

## 📈 Performance Optimization

### **Best Practices**

1. **Selective Subscriptions**
   - Only subscribe to relevant data
   - Unsubscribe when component unmounts

2. **Efficient Queries**
   - Use proper indexes
   - Limit data with filters
   - Implement pagination

3. **Smart Caching**
   - Set appropriate stale times
   - Use optimistic updates
   - Implement background sync

## 🔮 Future Enhancements

### **Planned Features**

1. **Push Notifications** - Real-time alerts for users
2. **Live Chat** - Customer support integration
3. **Analytics Dashboard** - Real-time business metrics
4. **Mobile App** - Native mobile experience
5. **Payment Integration** - Real-time payment processing

## 📞 Support

For questions or issues:
- Check the Supabase documentation
- Review React Query guides
- Contact the development team

---

**This architecture ensures your dealership website stays current, responsive, and provides an excellent user experience with real-time data synchronization.**