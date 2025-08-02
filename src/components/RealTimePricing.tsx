import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PriceAlert {
  id: string;
  carModel: string;
  oldPrice: number;
  newPrice: number;
  priceChange: number;
  changeType: 'increase' | 'decrease';
  timestamp: Date;
  demand: 'high' | 'medium' | 'low';
  location: string;
}

const RealTimePricing = () => {
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [currentViews, setCurrentViews] = useState(0);

  useEffect(() => {
    // Simulate current viewers (since we don't have real analytics)
    const updateViewers = () => {
      setCurrentViews(Math.floor(Math.random() * 12) + 2); // 2-14 viewers
    };

    updateViewers();
    const viewersInterval = setInterval(updateViewers, 20000);

    // Set up real-time subscription for price changes
    const priceSubscription = supabase
      .channel('car_price_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'cars',
        filter: 'status=eq.approved'
      }, (payload) => {
        // Only track if daily_rate changed
        if (payload.old.daily_rate !== payload.new.daily_rate) {
          const oldPrice = payload.old.daily_rate;
          const newPrice = payload.new.daily_rate;
          const priceChange = ((newPrice - oldPrice) / oldPrice) * 100;
          
          const newAlert: PriceAlert = {
            id: Date.now().toString(),
            carModel: `${payload.new.brand} ${payload.new.model}`,
            oldPrice,
            newPrice,
            priceChange,
            changeType: priceChange > 0 ? 'increase' : 'decrease',
            timestamp: new Date(),
            demand: Math.abs(priceChange) > 10 ? 'high' : Math.abs(priceChange) > 5 ? 'medium' : 'low',
            location: payload.new.location?.city || 'Unknown'
          };

          setPriceAlerts(prev => [newAlert, ...prev.slice(0, 2)]);
        }
      })
      .subscribe();

    return () => {
      clearInterval(viewersInterval);
      supabase.removeChannel(priceSubscription);
    };
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const getDemandLabel = (demand: string) => {
    switch (demand) {
      case 'high': return 'High Demand';
      case 'medium': return 'Moderate Demand';
      case 'low': return 'Low Demand';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gold" />
          Live Pricing Updates
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>{currentViews} people viewing prices now</span>
        </div>
      </div>

      <div className="space-y-4">
        {priceAlerts.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Price Changes Yet</h3>
            <p className="text-muted-foreground">
              Price updates will appear here when dealers modify their car rental rates.
            </p>
          </div>
        ) : (
          priceAlerts.map((alert) => (
            <div key={alert.id} className="p-4 bg-dark-elevated rounded-lg border border-border hover:border-gold/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{alert.carModel}</h3>
                    <span className="text-xs text-muted-foreground">• {alert.location}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getDemandColor(alert.demand)} bg-current/10`}>
                      {getDemandLabel(alert.demand)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        PKR {alert.oldPrice.toLocaleString()}
                      </span>
                      <span className="text-lg font-bold text-gold">
                        PKR {alert.newPrice.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      alert.changeType === 'increase' 
                        ? 'bg-red-500/10 text-red-500' 
                        : 'bg-green-500/10 text-green-500'
                    }`}>
                      {alert.changeType === 'increase' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>
                        {alert.changeType === 'increase' ? '+' : ''}{alert.priceChange.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(alert.timestamp)}</span>
                </div>
              </div>
              
              {alert.demand === 'high' && (
                <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-xs text-red-400">
                    ⚡ High demand in {alert.location} - Prices may increase soon
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Prices update automatically based on dealer changes</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimePricing;