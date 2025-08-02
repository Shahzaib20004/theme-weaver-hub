import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Car, Clock, MapPin, Users } from 'lucide-react';

interface RecentActivity {
  id: string;
  type: 'booking' | 'new_car' | 'availability';
  message: string;
  timestamp: string;
  location?: string;
}

const RealTimeAvailability = () => {
  const { t } = useTranslation();
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [availableCars, setAvailableCars] = useState(0);

  useEffect(() => {
    // Simulate real-time activity updates
    const activities: RecentActivity[] = [
      {
        id: '1',
        type: 'booking',
        message: 'BMW X5 just booked in Karachi',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        location: 'Karachi'
      },
      {
        id: '2',
        type: 'new_car',
        message: 'New Mercedes C-Class added to fleet',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        location: 'Lahore'
      },
      {
        id: '3',
        type: 'availability',
        message: 'Audi A6 became available in Islamabad',
        timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        location: 'Islamabad'
      }
    ];

    setRecentActivity(activities);

    // Simulate online users count
    const updateOnlineUsers = () => {
      setOnlineUsers(Math.floor(Math.random() * 50) + 20);
    };

    // Get available cars count
    const fetchAvailableCars = async () => {
      try {
        const { count } = await supabase
          .from('cars')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved')
          .eq('is_available', true);
        
        setAvailableCars(count || 0);
      } catch (error) {
        console.error('Error fetching available cars:', error);
      }
    };

    updateOnlineUsers();
    fetchAvailableCars();

    // Update online users every 10 seconds
    const onlineUsersInterval = setInterval(updateOnlineUsers, 10000);

    // Set up real-time subscriptions for cars
    const carsSubscription = supabase
      .channel('cars_availability')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'cars',
        filter: 'status=eq.approved'
      }, () => {
        fetchAvailableCars();
      })
      .subscribe();

    // Simulate new activity every 30 seconds
    const activityInterval = setInterval(() => {
      const newActivities = [
        'Honda Civic just became available in Karachi',
        'Toyota Camry booked for this weekend',
        'New Tesla Model 3 added to premium fleet',
        'BMW 3 Series returned and available now',
        'Mercedes E-Class booking confirmed for tomorrow'
      ];
      
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
      const newActivity: RecentActivity = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'booking' : 'availability',
        message: randomActivity,
        timestamp: new Date().toISOString(),
        location: ['Karachi', 'Lahore', 'Islamabad'][Math.floor(Math.random() * 3)]
      };

      setRecentActivity(prev => [newActivity, ...prev.slice(0, 2)]);
    }, 30000);

    return () => {
      clearInterval(onlineUsersInterval);
      clearInterval(activityInterval);
      supabase.removeChannel(carsSubscription);
    };
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          Live Activity
        </h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-500" />
            <span>{onlineUsers} online</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-gold" />
            <span>{availableCars} available</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-dark-elevated rounded-lg border border-border">
            <div className="flex-shrink-0 mt-1">
              {activity.type === 'booking' ? (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              ) : activity.type === 'new_car' ? (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              ) : (
                <div className="w-2 h-2 bg-gold rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                </div>
                {activity.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Real-time updates • Last updated {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default RealTimeAvailability;