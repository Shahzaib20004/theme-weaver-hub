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
      <div className="bg-card p-4 rounded-lg border border-border text-center">
        <div className="text-2xl font-bold text-gold">{stats.totalCars}</div>
        <div className="text-sm text-muted-foreground">{t('stats.totalVehicles')}</div>
      </div>
      <div className="bg-card p-4 rounded-lg border border-border text-center">
        <div className="text-2xl font-bold text-gold">{stats.totalBrands}</div>
        <div className="text-sm text-muted-foreground">{t('stats.carBrands')}</div>
      </div>
      <div className="bg-card p-4 rounded-lg border border-border text-center">
        <div className="text-2xl font-bold text-gold">{stats.totalDealerships}</div>
        <div className="text-sm text-muted-foreground">{t('stats.dealerships')}</div>
      </div>
      <div className="bg-card p-4 rounded-lg border border-border text-center">
        <div className="text-2xl font-bold text-gold">{stats.averageRating}</div>
        <div className="text-sm text-muted-foreground">{t('stats.averageRating')}</div>
      </div>
    </div>
  );
};

export default RealTimeStats;