import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Car, MapPin, Star, Shield, Clock, Phone, Users, Award } from "lucide-react";
import Logo from "@/components/Logo";

const PublicHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-surface via-background to-dark-surface">
      {/* Header */}
      <header className="bg-dark-surface/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <h1 className="text-xl font-bold text-gold">Kaar.Rentals</h1>
                <p className="text-xs text-text-secondary">Reliable Rides Anytime</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gold hover:text-gold/80">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Your Premium
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              {" "}Car Rental{" "}
            </span>
            Platform
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Discover the easiest way to rent cars in Pakistan. From luxury vehicles to budget-friendly options, 
            find your perfect ride with verified dealers and competitive prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold text-lg px-8 py-3">
                Start Renting Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark text-lg px-8 py-3">
                I Have An Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-dark-elevated/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">500+</div>
              <div className="text-sm text-text-secondary">Available Cars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">50+</div>
              <div className="text-sm text-text-secondary">Trusted Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">1000+</div>
              <div className="text-sm text-text-secondary">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">4.9</div>
              <div className="text-sm text-text-secondary">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Kaar.Rentals?
            </h2>
            <p className="text-xl text-text-secondary">
              Experience the difference with our premium features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Verified Dealers</h3>
                <p className="text-text-secondary">All our dealers are thoroughly verified for your safety and peace of mind.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Premium Fleet</h3>
                <p className="text-text-secondary">Choose from a wide range of luxury and budget-friendly vehicles.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">24/7 Support</h3>
                <p className="text-text-secondary">Round-the-clock customer support for any assistance you need.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Multiple Locations</h3>
                <p className="text-text-secondary">Available in Karachi, Lahore, Islamabad, and other major cities.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Best Prices</h3>
                <p className="text-text-secondary">Competitive pricing with transparent costs and no hidden fees.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Easy Booking</h3>
                <p className="text-text-secondary">Simple and fast booking process with instant confirmations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold/10 to-gold-dark/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join thousands of satisfied customers and experience premium car rentals today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold text-lg px-8 py-3">
                Create Account
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-text-secondary">
              <Phone className="w-4 h-4" />
              <span>Or call us: 03090017510</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <h3 className="text-lg font-bold text-gold">Kaar.Rentals</h3>
                <p className="text-sm text-text-secondary">© 2025 All rights reserved</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-text-secondary hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-text-secondary hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <a href="tel:03090017510" className="text-text-secondary hover:text-gold transition-colors">
                Contact: 03090017510
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Install Kaar.Rentals</p>
                <p className="text-xs text-text-secondary">Get the app experience</p>
              </div>
              <Button size="sm" className="bg-gold text-dark hover:bg-gold/90">
                Install
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicHome;