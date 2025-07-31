import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Truck, Users, Zap } from "lucide-react";

const CarCategories = () => {
  const categories = [
    {
      id: "sedan",
      name: "Sedan",
      icon: Car,
      description: "Comfortable family cars",
      count: "150+ cars"
    },
    {
      id: "suv",
      name: "SUV",
      icon: Truck,
      description: "Spacious and powerful",
      count: "80+ cars"
    },
    {
      id: "hatchback",
      name: "Hatchback",
      icon: Car,
      description: "Compact city cars",
      count: "120+ cars"
    },
    {
      id: "crossover",
      name: "Crossover",
      icon: Car,
      description: "Versatile and efficient",
      count: "65+ cars"
    },
    {
      id: "coupe",
      name: "Coupe",
      icon: Zap,
      description: "Sporty two-door cars",
      count: "35+ cars"
    },
    {
      id: "convertible",
      name: "Convertible",
      icon: Zap,
      description: "Open-top luxury",
      count: "15+ cars"
    },
    {
      id: "luxury",
      name: "Luxury",
      icon: Zap,
      description: "Premium vehicles",
      count: "25+ cars"
    },
    {
      id: "van",
      name: "Van",
      icon: Users,
      description: "Group transportation",
      count: "40+ cars"
    },
    {
      id: "pickup",
      name: "Pickup",
      icon: Truck,
      description: "Heavy duty vehicles",
      count: "30+ cars"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Find the perfect vehicle for your needs from our extensive collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="group hover:shadow-gold transition-all duration-300 cursor-pointer bg-dark-surface border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-text-secondary mb-3">
                    {category.description}
                  </p>
                  <p className="text-gold font-medium mb-4">
                    {category.count}
                  </p>
                  <Button variant="luxury" className="w-full">
                    View {category.name}s
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CarCategories;