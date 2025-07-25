import { Card, CardContent } from "@/components/ui/card";

const CarBrands = () => {
  const brands = [
    { id: "toyota", name: "Toyota", logo: "🚗", count: "85+ cars" },
    { id: "suzuki", name: "Suzuki", logo: "🚙", count: "70+ cars" },
    { id: "honda", name: "Honda", logo: "🚘", count: "65+ cars" },
    { id: "hyundai", name: "Hyundai", logo: "🚐", count: "45+ cars" },
    { id: "kia", name: "KIA", logo: "🚗", count: "35+ cars" },
    { id: "mitsubishi", name: "Mitsubishi", logo: "🚙", count: "25+ cars" },
    { id: "changan", name: "Changan", logo: "🚘", count: "30+ cars" },
    { id: "mg", name: "MG", logo: "🚗", count: "20+ cars" },
    { id: "haval", name: "Haval", logo: "🚐", count: "15+ cars" },
    { id: "proton", name: "Proton", logo: "🚙", count: "12+ cars" },
    { id: "daihatsu", name: "Daihatsu", logo: "🚗", count: "18+ cars" },
    { id: "isuzu", name: "Isuzu", logo: "🚛", count: "10+ cars" }
  ];

  return (
    <section className="py-16 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Popular Brands
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose from top Pakistani automotive brands
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Card key={brand.id} className="group hover:shadow-gold transition-all duration-300 cursor-pointer bg-dark-elevated border-border">
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {brand.logo}
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {brand.name}
                </h3>
                <p className="text-sm text-gold">
                  {brand.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarBrands;