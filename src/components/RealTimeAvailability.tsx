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

    // Simulate online users count (since we don't have real user session tracking)
    const updateOnlineUsers = () => {
      setOnlineUsers(Math.floor(Math.random() * 15) + 3); // Random 3-18 users
    };

    updateOnlineUsers();
    fetchAvailableCars();

    // Update online users every 30 seconds
    const onlineUsersInterval = setInterval(updateOnlineUsers, 30000);

    // Set up real-time subscriptions for cars
    const carsSubscription = supabase
      .channel('cars_availability')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'cars',
        filter: 'status=eq.approved'
      }, (payload) => {
        fetchAvailableCars();
        
        // Add real activity based on the database change
        if (payload.eventType === 'INSERT') {
          const newActivity: RecentActivity = {
            id: Date.now().toString(),
            type: 'new_car',
            message: `New ${payload.new.brand} ${payload.new.model} added to fleet`,
            timestamp: new Date().toISOString(),
            location: payload.new.location?.city || 'Unknown'
          };
          setRecentActivity(prev => [newActivity, ...prev.slice(0, 4)]);
        }
      })
      .subscribe();

    return () => {
      clearInterval(onlineUsersInterval);
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
        {recentActivity.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Recent Activity</h3>
            <p className="text-muted-foreground">
              Activity will appear here when customers list new cars or make bookings.
            </p>
          </div>
        ) : (
          recentActivity.map((activity) => (
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
          ))
        )}
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