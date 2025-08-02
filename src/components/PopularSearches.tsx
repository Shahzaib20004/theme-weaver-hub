import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Search, Car, MapPin, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PopularSearches = () => {
  const popularSearches = [
    { term: "Toyota Corolla Karachi", searches: "1,200", growth: "+15%" },
    { term: "Honda Civic Lahore", searches: "980", growth: "+22%" },
    { term: "Suzuki Cultus Under 15 Lakh", searches: "850", growth: "+8%" },
    { term: "Hyundai Elantra Islamabad", searches: "720", growth: "+30%" },
    { term: "KIA Picanto Manual", searches: "650", growth: "+12%" },
    { term: "Nissan March Automatic", searches: "580", growth: "+18%" }
  ];

  const popularCategories = [
    {
      name: "Sedan",
      count: "450+ cars",
      priceRange: "10-50 Lakh",
      popular: ["Corolla", "Civic", "Elantra"],
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      name: "Hatchback", 
      count: "320+ cars",
      priceRange: "8-25 Lakh",
      popular: ["Cultus", "Wagon R", "March"],
      color: "from-green-500/20 to-green-600/20"
    },
    {
      name: "SUV",
      count: "280+ cars", 
      priceRange: "25-80 Lakh",
      popular: ["CR-V", "Tucson", "Sportage"],
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      name: "Crossover",
      count: "200+ cars",
      priceRange: "15-45 Lakh", 
      popular: ["Vezel", "Stonic", "Yaris Cross"],
      color: "from-orange-500/20 to-orange-600/20"
    }
  ];

  const popularCities = [
    { name: "Karachi", dealers: "180+", cars: "650+" },
    { name: "Lahore", dealers: "120+", cars: "420+" },
    { name: "Islamabad", dealers: "85+", cars: "310+" },
    { name: "Rawalpindi", dealers: "60+", cars: "220+" },
    { name: "Faisalabad", dealers: "45+", cars: "180+" },
    { name: "Multan", dealers: "35+", cars: "150+" }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/10 to-gold-dark/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">What's Trending</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Popular Right Now
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See what other car buyers are searching for across Pakistan
          </p>
        </div>

        {/* Popular Searches */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Search className="w-6 h-6 text-gold" />
            Trending Searches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularSearches.map((search, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-gold transition-colors">
                        {search.term}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {search.searches} searches today
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {search.growth}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Car className="w-6 h-6 text-gold" />
            Popular Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-300 group cursor-pointer overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {category.name}
                  </h4>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-text-secondary">
                      <span className="font-medium text-gold">{category.count}</span> available
                    </div>
                    <div className="text-sm text-text-secondary">
                      Price: <span className="font-medium text-foreground">{category.priceRange}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-text-secondary mb-1">Popular models:</div>
                    <div className="flex flex-wrap gap-1">
                      {category.popular.map((model, modelIndex) => (
                        <span key={modelIndex} className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-gold" />
            Top Cities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCities.map((city, index) => (
              <Link key={index} to={`/cars?city=${city.name}`}>
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-300 group cursor-pointer text-center">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                      {city.name}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-text-secondary">
                        <span className="font-medium text-blue-500">{city.dealers}</span> dealers
                      </div>
                      <div className="text-text-secondary">
                        <span className="font-medium text-green-500">{city.cars}</span> cars
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 rounded-3xl p-8 md:p-12 border border-gold/20 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Use our advanced search to find exactly what you want, or browse all available cars from verified dealers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cars">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                <Search className="w-4 h-4 mr-2" />
                Advanced Search
              </Button>
            </Link>
            <Link to="/dealerships">
              <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-dark">
                <Users className="w-4 h-4 mr-2" />
                Browse All Dealers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;