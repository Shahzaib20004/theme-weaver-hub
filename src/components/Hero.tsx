import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Star, Search, MapPin, Calendar, Users, Shield, Verified, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBrand, setSearchBrand] = useState("");

  const popularCities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"];
  const popularBrands = ["Toyota", "Honda", "Suzuki", "Hyundai", "KIA", "Nissan"];

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-background via-dark-surface to-dark-elevated flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 border-2 border-gold rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-32 h-32 border border-gold rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-gold rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 border border-gold rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Floating Trust Indicators */}
      <div className="absolute top-20 right-10 hidden lg:block">
        <div className="bg-dark-elevated/80 backdrop-blur-sm border border-gold/30 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-foreground font-medium">100% Verified Dealers</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 hidden lg:block">
        <div className="bg-dark-elevated/80 backdrop-blur-sm border border-gold/30 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-foreground font-medium">50,000+ Happy Customers</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold-dark/20 border border-gold/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
          <Verified className="w-5 h-5 text-gold" />
          <span className="text-sm font-semibold text-gold">Pakistan's #1 Car Marketplace</span>
          <Star className="w-4 h-4 text-gold fill-gold" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Find Your</span>
          <br />
          <span className="text-transparent bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-clip-text">
            Perfect Ride
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
          Connect directly with verified dealers across Pakistan. 
          <br className="hidden md:block" />
          <span className="text-gold font-medium">No middleman. Better prices. Trusted experience.</span>
        </p>

        {/* Enhanced Search Section */}
        <div className="bg-dark-elevated/90 backdrop-blur-sm border border-gold/30 rounded-2xl p-6 mb-12 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <Select value={searchLocation} onValueChange={setSearchLocation}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {popularCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Car className="w-4 h-4" />
                Brand
              </label>
              <Select value={searchBrand} onValueChange={setSearchBrand}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Any Brand" />
                </SelectTrigger>
                <SelectContent>
                  {popularBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Budget Range
              </label>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10">Under 10 Lakh</SelectItem>
                  <SelectItem value="10-20">10-20 Lakh</SelectItem>
                  <SelectItem value="20-50">20-50 Lakh</SelectItem>
                  <SelectItem value="50-plus">50+ Lakh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Link to="/cars" className="w-full">
                <Button size="lg" className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold text-lg h-12">
                  <Search className="w-5 h-5 mr-2" />
                  Search Cars
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
            <span className="text-sm text-text-secondary">Popular:</span>
            {["Toyota Corolla", "Honda Civic", "Suzuki Cultus", "Hyundai Elantra"].map((term) => (
              <button key={term} className="px-3 py-1 bg-gold/10 hover:bg-gold/20 text-gold text-sm rounded-full transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-sm">
          <div className="flex flex-col items-center gap-2 p-4 bg-dark-elevated/50 rounded-xl border border-gold/20">
            <Shield className="w-6 h-6 text-green-500" />
            <span className="text-foreground font-medium">Verified Dealers</span>
            <span className="text-text-secondary text-xs">100% Authenticated</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-dark-elevated/50 rounded-xl border border-gold/20">
            <Star className="w-6 h-6 text-gold fill-gold" />
            <span className="text-foreground font-medium">Best Prices</span>
            <span className="text-text-secondary text-xs">Direct from Dealers</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-dark-elevated/50 rounded-xl border border-gold/20">
            <Users className="w-6 h-6 text-blue-500" />
            <span className="text-foreground font-medium">Trusted Platform</span>
            <span className="text-text-secondary text-xs">50K+ Customers</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-dark-elevated/50 rounded-xl border border-gold/20">
            <MapPin className="w-6 h-6 text-purple-500" />
            <span className="text-foreground font-medium">All Pakistan</span>
            <span className="text-text-secondary text-xs">Major Cities</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/cars">
            <Button size="xl" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-bold text-lg px-8 py-4 group shadow-xl">
              Browse All Cars
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/dealerships">
            <Button variant="outline" size="xl" className="border-2 border-gold text-gold hover:bg-gold hover:text-dark font-semibold text-lg px-8 py-4 shadow-xl">
              Find Dealers
            </Button>
          </Link>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gold/30">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2 animate-pulse">1,500+</div>
            <div className="text-sm text-text-secondary font-medium">Premium Cars</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2 animate-pulse">500+</div>
            <div className="text-sm text-text-secondary font-medium">Verified Dealers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2 animate-pulse">4.8</div>
            <div className="text-sm text-text-secondary font-medium">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2 animate-pulse">24/7</div>
            <div className="text-sm text-text-secondary font-medium">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;