import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Truck, Users, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const CarCategories = () => {
  const { t } = useTranslation();
  
  const categories = [
    {
      id: "sedan",
      name: t('categories.sedan.name'),
      icon: Car,
      description: t('categories.sedan.description'),
      count: "150+ cars"
    },
    {
      id: "suv",
      name: t('categories.suv.name'),
      icon: Truck,
      description: t('categories.suv.description'),
      count: "80+ cars"
    },
    {
      id: "hatchback",
      name: t('categories.hatchback.name'),
      icon: Car,
      description: t('categories.hatchback.description'),
      count: "120+ cars"
    },
    {
      id: "crossover",
      name: t('categories.crossover.name'),
      icon: Car,
      description: t('categories.crossover.description'),
      count: "65+ cars"
    },
    {
      id: "coupe",
      name: t('categories.coupe.name'),
      icon: Zap,
      description: t('categories.coupe.description'),
      count: "35+ cars"
    },
    {
      id: "convertible",
      name: t('categories.convertible.name'),
      icon: Zap,
      description: t('categories.convertible.description'),
      count: "15+ cars"
    },
    {
      id: "luxury",
      name: t('categories.luxury.name'),
      icon: Zap,
      description: t('categories.luxury.description'),
      count: "25+ cars"
    },
    {
      id: "van",
      name: t('categories.van.name'),
      icon: Users,
      description: t('categories.van.description'),
      count: "40+ cars"
    },
    {
      id: "pickup",
      name: t('categories.pickup.name'),
      icon: Truck,
      description: t('categories.pickup.description'),
      count: "30+ cars"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('categories.subtitle')}
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