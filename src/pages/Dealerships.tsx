import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dealerships = () => {
  const dealerships = [
    {
      id: "1",
      name: "Toyota Center Karachi",
      logo: "/api/placeholder/100/60",
      rating: 4.8,
      reviews: 256,
      location: "Shahrah-e-Faisal, Karachi",
      phone: "+92-21-34567890",
      email: "info@toyotakarachi.com",
      description: "Authorized Toyota dealer with wide range of sedans, SUVs and hybrid vehicles.",
      featured: true,
      totalCars: 45,
      image: "/api/placeholder/400/250"
    },
    {
      id: "2", 
      name: "Honda Premier Motors",
      logo: "/api/placeholder/100/60",
      rating: 4.6,
      reviews: 189,
      location: "Defence Housing Authority, Karachi",
      phone: "+92-21-35567890",
      email: "sales@hondapremier.com",
      description: "Premium Honda dealership offering latest models and certified pre-owned vehicles.",
      featured: false,
      totalCars: 32,
      image: "/api/placeholder/400/250"
    },
    {
      id: "3",
      name: "Suzuki Elite Auto",
      logo: "/api/placeholder/100/60", 
      rating: 4.7,
      reviews: 143,
      location: "Gulshan-e-Iqbal, Karachi",
      phone: "+92-21-36567890",
      email: "contact@suzukielite.com",
      description: "Largest Suzuki dealer in the region with extensive inventory and service center.",
      featured: true,
      totalCars: 38,
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Authorized Car Dealerships
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Connect with trusted dealerships across Pakistan. Browse inventories, compare prices, and find your perfect vehicle from authorized dealers.
            </p>
          </div>

          {/* Featured Dealerships */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-gold" />
              Featured Dealerships
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealerships.filter(d => d.featured).map((dealership) => (
                <Card key={dealership.id} className="overflow-hidden hover:shadow-gold transition-all duration-300 bg-dark-surface border-border">
                  <div className="relative">
                    <img 
                      src={dealership.image} 
                      alt={dealership.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-gold text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={dealership.logo} 
                          alt={`${dealership.name} logo`}
                          className="w-12 h-8 object-contain"
                        />
                        <div>
                          <CardTitle className="text-lg text-foreground">{dealership.name}</CardTitle>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-foreground">{dealership.rating}</span>
                            <span className="text-sm text-text-secondary">({dealership.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary mb-4 text-sm">{dealership.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span className="text-foreground">{dealership.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span className="text-foreground">{dealership.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-foreground">{dealership.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-dark-elevated text-foreground">
                        {dealership.totalCars} Cars Available
                      </Badge>
                      <Button variant="luxury" size="sm" className="flex items-center gap-2">
                        Visit Store
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Dealerships */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">All Dealerships</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealerships.map((dealership) => (
                <Card key={dealership.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-dark-surface border-border">
                  <div className="relative">
                    <img 
                      src={dealership.image} 
                      alt={dealership.name}
                      className="w-full h-48 object-cover"
                    />
                    {dealership.featured && (
                      <Badge className="absolute top-4 right-4 bg-gold text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={dealership.logo} 
                          alt={`${dealership.name} logo`}
                          className="w-12 h-8 object-contain"
                        />
                        <div>
                          <CardTitle className="text-lg text-foreground">{dealership.name}</CardTitle>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-foreground">{dealership.rating}</span>
                            <span className="text-sm text-text-secondary">({dealership.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary mb-4 text-sm">{dealership.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span className="text-foreground">{dealership.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span className="text-foreground">{dealership.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-dark-elevated text-foreground">
                        {dealership.totalCars} Cars Available
                      </Badge>
                      <Button variant="luxury" size="sm" className="flex items-center gap-2">
                        Visit Store
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dealerships;