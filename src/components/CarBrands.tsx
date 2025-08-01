import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface BrandData {
  id: string;
  name: string;
  logo: React.ReactNode;
  count: number;
  color: string;
}

const CarBrands = () => {
  const { t } = useTranslation();
  const [brandCounts, setBrandCounts] = useState<Record<string, number>>({});

  // Mock car data to calculate real counts (in real app, this would come from API)
  const mockCars = [
    // This would typically come from a context or API
    { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" },
    { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" },
    { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" }, { brand: "Toyota" },
    { brand: "Suzuki" }, { brand: "Suzuki" }, { brand: "Suzuki" }, { brand: "Suzuki" }, { brand: "Suzuki" },
    { brand: "Suzuki" }, { brand: "Suzuki" }, { brand: "Suzuki" }, { brand: "Suzuki" }, { brand: "Suzuki" },
    { brand: "Suzuki" }, { brand: "Suzuki" },
    { brand: "Honda" }, { brand: "Honda" }, { brand: "Honda" }, { brand: "Honda" }, { brand: "Honda" },
    { brand: "Honda" }, { brand: "Honda" }, { brand: "Honda" }, { brand: "Honda" }, { brand: "Honda" },
    { brand: "Hyundai" }, { brand: "Hyundai" }, { brand: "Hyundai" }, { brand: "Hyundai" }, { brand: "Hyundai" },
    { brand: "Hyundai" }, { brand: "Hyundai" }, { brand: "Hyundai" },
    { brand: "KIA" }, { brand: "KIA" }, { brand: "KIA" }, { brand: "KIA" }, { brand: "KIA" }, { brand: "KIA" },
    { brand: "Mitsubishi" }, { brand: "Mitsubishi" }, { brand: "Mitsubishi" }, { brand: "Mitsubishi" },
    { brand: "MG" }, { brand: "MG" }, { brand: "MG" },
    { brand: "Changan" }, { brand: "Changan" }, { brand: "Changan" }, { brand: "Changan" },
    { brand: "Haval" }, { brand: "Haval" }, { brand: "Haval" },
    { brand: "Proton" }, { brand: "Proton" },
    { brand: "Daihatsu" }, { brand: "Daihatsu" }, { brand: "Daihatsu" },
    { brand: "Isuzu" }, { brand: "Isuzu" }
  ];

  useEffect(() => {
    // Calculate car counts for each brand
    const counts: Record<string, number> = {};
    mockCars.forEach(car => {
      counts[car.brand] = (counts[car.brand] || 0) + 1;
    });
    setBrandCounts(counts);
  }, [mockCars]);

  const brands: BrandData[] = [
    {
      id: "toyota",
      name: "Toyota",
      color: "#D4101E",
      count: brandCounts["Toyota"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <circle cx="35" cy="50" r="18" fill="none" stroke="#D4101E" strokeWidth="4"/>
            <circle cx="65" cy="35" r="18" fill="none" stroke="#D4101E" strokeWidth="4"/>
            <circle cx="65" cy="65" r="18" fill="none" stroke="#D4101E" strokeWidth="4"/>
          </svg>
        </div>
      )
    },
    {
      id: "suzuki",
      name: "Suzuki",
      color: "#E60012",
      count: brandCounts["Suzuki"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl font-bold text-red-600" style={{ color: "#E60012" }}>S</span>
        </div>
      )
    },
    {
      id: "honda",
      name: "Honda",
      color: "#CC0000",
      count: brandCounts["Honda"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <path d="M15 20 L15 80 L25 80 L25 55 L75 55 L75 80 L85 80 L85 20 L75 20 L75 45 L25 45 L25 20 Z" fill="#CC0000"/>
          </svg>
        </div>
      )
    },
    {
      id: "hyundai",
      name: "Hyundai",
      color: "#002C5C",
      count: brandCounts["Hyundai"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <ellipse cx="50" cy="50" rx="35" ry="20" fill="none" stroke="#002C5C" strokeWidth="6"/>
            <path d="M20 50 Q50 30 80 50" fill="none" stroke="#002C5C" strokeWidth="4"/>
          </svg>
        </div>
      )
    },
    {
      id: "kia",
      name: "KIA",
      color: "#05141F",
      count: brandCounts["KIA"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl font-bold" style={{ color: "#05141F" }}>KIA</span>
        </div>
      )
    },
    {
      id: "mitsubishi",
      name: "Mitsubishi",
      color: "#DC143C",
      count: brandCounts["Mitsubishi"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <polygon points="50,15 30,45 70,45" fill="#DC143C"/>
            <polygon points="30,55 50,85 70,55" fill="#DC143C"/>
            <polygon points="20,45 50,55 20,65" fill="#DC143C"/>
            <polygon points="80,45 50,55 80,65" fill="#DC143C"/>
          </svg>
        </div>
      )
    },
    {
      id: "mg",
      name: "MG",
      color: "#8B0000",
      count: brandCounts["MG"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl font-bold" style={{ color: "#8B0000" }}>MG</span>
        </div>
      )
    },
    {
      id: "changan",
      name: "Changan",
      color: "#1E3A8A",
      count: brandCounts["Changan"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <path d="M50 20 L30 50 L50 80 L70 50 Z" fill="#1E3A8A"/>
          </svg>
        </div>
      )
    },
    {
      id: "haval",
      name: "Haval",
      color: "#FF6B35",
      count: brandCounts["Haval"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg font-bold" style={{ color: "#FF6B35" }}>H</span>
        </div>
      )
    },
    {
      id: "proton",
      name: "Proton",
      color: "#0066CC",
      count: brandCounts["Proton"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-sm font-bold" style={{ color: "#0066CC" }}>PROTON</span>
        </div>
      )
    },
    {
      id: "daihatsu",
      name: "Daihatsu",
      color: "#E31E24",
      count: brandCounts["Daihatsu"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg font-bold" style={{ color: "#E31E24" }}>D</span>
        </div>
      )
    },
    {
      id: "isuzu",
      name: "Isuzu",
      color: "#FF4500",
      count: brandCounts["Isuzu"] || 0,
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-sm font-bold" style={{ color: "#FF4500" }}>ISUZU</span>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Popular Brands
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose from top automotive brands available in Pakistan
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Card 
              key={brand.id} 
              className="group hover:shadow-gold transition-all duration-300 cursor-pointer bg-dark-elevated border-border hover:border-gold/50"
            >
              <CardContent className="p-6 text-center">
                {brand.logo}
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {brand.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-gold">
                    {brand.count}
                  </p>
                  <p className="text-xs text-text-secondary">
                    vehicles available
                  </p>
                </div>
                
                {/* Availability Indicator */}
                <div className="mt-3 flex justify-center">
                  <div className={`w-2 h-2 rounded-full ${brand.count > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-dark-elevated px-8 py-4 rounded-lg border border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">{brands.length}</div>
              <div className="text-sm text-text-secondary">Brands</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">
                {Object.values(brandCounts).reduce((sum, count) => sum + count, 0)}
              </div>
              <div className="text-sm text-text-secondary">Total Vehicles</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {brands.filter(brand => brand.count > 0).length}
              </div>
              <div className="text-sm text-text-secondary">Available Brands</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarBrands;