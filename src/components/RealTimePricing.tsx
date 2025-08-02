import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Eye } from 'lucide-react';

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
    // Initialize with some price alerts
    const initialAlerts: PriceAlert[] = [
      {
        id: '1',
        carModel: 'BMW X5',
        oldPrice: 8500,
        newPrice: 9200,
        priceChange: 8.2,
        changeType: 'increase',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        demand: 'high',
        location: 'Karachi'
      },
      {
        id: '2',
        carModel: 'Toyota Camry',
        oldPrice: 4200,
        newPrice: 3800,
        priceChange: -9.5,
        changeType: 'decrease',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        demand: 'medium',
        location: 'Lahore'
      }
    ];

    setPriceAlerts(initialAlerts);

    // Simulate current viewers
    const updateViewers = () => {
      setCurrentViews(Math.floor(Math.random() * 25) + 5);
    };

    updateViewers();
    const viewersInterval = setInterval(updateViewers, 15000);

    // Simulate new price updates
    const priceUpdateInterval = setInterval(() => {
      const carModels = [
        'Honda Civic', 'Mercedes C-Class', 'Audi A4', 'Toyota Corolla', 
        'BMW 3 Series', 'Nissan Altima', 'Hyundai Elantra'
      ];
      const locations = ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad'];
      
      const randomCar = carModels[Math.floor(Math.random() * carModels.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const oldPrice = Math.floor(Math.random() * 5000) + 2000;
      const priceChangePercent = (Math.random() - 0.5) * 20; // -10% to +10%
      const newPrice = Math.floor(oldPrice * (1 + priceChangePercent / 100));
      
      const newAlert: PriceAlert = {
        id: Date.now().toString(),
        carModel: randomCar,
        oldPrice,
        newPrice,
        priceChange: priceChangePercent,
        changeType: priceChangePercent > 0 ? 'increase' : 'decrease',
        timestamp: new Date(),
        demand: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
        location: randomLocation
      };

      setPriceAlerts(prev => [newAlert, ...prev.slice(0, 2)]);
    }, 40000); // New price update every 40 seconds

    return () => {
      clearInterval(viewersInterval);
      clearInterval(priceUpdateInterval);
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
        {priceAlerts.map((alert) => (
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
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Prices update automatically based on demand</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimePricing;