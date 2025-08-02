import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalCars: number;
  totalBrands: number;
  totalDealerships: number;
  averageRating: number;
}

const RealTimeStats = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats>({
    totalCars: 0,
    totalBrands: 0,
    totalDealerships: 0,
    averageRating: 4.9
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total approved cars
        const { count: carsCount } = await supabase
          .from('cars')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved');

        // Get unique brands
        const { data: brandsData } = await supabase
          .from('cars')
          .select('brand')
          .eq('status', 'approved');

        const uniqueBrands = new Set(brandsData?.map(car => car.brand) || []).size;

        // Get total dealerships
        const { count: dealershipsCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_dealer', true);

        setStats({
          totalCars: carsCount || 0,
          totalBrands: uniqueBrands,
          totalDealerships: dealershipsCount || 0,
          averageRating: 4.9 // Fixed rating as requested
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();

    // Set up real-time subscriptions
    const carsSubscription = supabase
      .channel('cars_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, fetchStats)
      .subscribe();

    const profilesSubscription = supabase
      .channel('profiles_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(carsSubscription);
      supabase.removeChannel(profilesSubscription);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-card p-4 rounded-lg border border-border text-center hover:border-gold/50 transition-all duration-300 group">
        <div className="text-2xl font-bold text-gold group-hover:scale-110 transition-transform duration-300">
          {stats.totalCars}
        </div>
        <div className="text-sm text-muted-foreground">{t('stats.totalVehicles')}</div>
        <div className="flex items-center justify-center mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-500 ml-1">Live</span>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border border-border text-center hover:border-gold/50 transition-all duration-300 group">
        <div className="text-2xl font-bold text-gold group-hover:scale-110 transition-transform duration-300">
          {stats.totalBrands}
        </div>
        <div className="text-sm text-muted-foreground">{t('stats.carBrands')}</div>
        <div className="flex items-center justify-center mt-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-500 ml-1">Updated</span>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border border-border text-center hover:border-gold/50 transition-all duration-300 group">
        <div className="text-2xl font-bold text-gold group-hover:scale-110 transition-transform duration-300">
          {stats.totalDealerships}
        </div>
        <div className="text-sm text-muted-foreground">{t('stats.dealerships')}</div>
        <div className="flex items-center justify-center mt-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-purple-500 ml-1">Active</span>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border border-border text-center hover:border-gold/50 transition-all duration-300 group">
        <div className="text-2xl font-bold text-gold group-hover:scale-110 transition-transform duration-300">
          {stats.averageRating}
        </div>
        <div className="text-sm text-muted-foreground">{t('stats.averageRating')}</div>
        <div className="flex items-center justify-center mt-2">
          <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStats;