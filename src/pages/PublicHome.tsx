import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Car, MapPin, Star, Shield, Clock, Phone, Users, Award } from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const PublicHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-surface via-background to-dark-surface mobile-scroll">
      {/* Header */}
      <header className="bg-dark-surface/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="lg" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gold">Kaar.Rentals</h1>
                <p className="text-xs text-text-secondary">Pakistan's #1 Car Marketplace</p>
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
      <section className="relative py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Pakistan's Premier
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              {" "}Car Marketplace{" "}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Connect directly with verified dealers across Pakistan. No middleman, better prices, 
            trusted experience with JazzCash, EasyPaisa, and cash payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold text-lg px-8 py-3 btn-pakistani">
                Start Shopping Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark text-lg px-8 py-3">
                I Have An Account
              </Button>
            </Link>
          </div>

          {/* Quick Features for Pakistani Market */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-dark-elevated/50 backdrop-blur-sm rounded-xl p-4 border border-green-600/20">
              <div className="text-2xl mb-2">🇵🇰</div>
              <div className="text-sm font-medium text-foreground">100% Pakistani</div>
              <div className="text-xs text-text-secondary">Owned & Operated</div>
            </div>
            <div className="bg-dark-elevated/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-sm font-medium text-foreground">JazzCash & EasyPaisa</div>
              <div className="text-xs text-text-secondary">Local Payments</div>
            </div>
            <div className="bg-dark-elevated/50 backdrop-blur-sm rounded-xl p-4 border border-green-500/20">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm font-medium text-foreground">WhatsApp Support</div>
              <div className="text-xs text-text-secondary">24/7 Available</div>
            </div>
            <div className="bg-dark-elevated/50 backdrop-blur-sm rounded-xl p-4 border border-gold/20">
              <div className="text-2xl mb-2">🕌</div>
              <div className="text-sm font-medium text-foreground">Islamic Finance</div>
              <div className="text-xs text-text-secondary">Sharia Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-6 bg-dark-elevated/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-2">1,500+</div>
              <div className="text-sm text-text-secondary">Available Cars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-2">500+</div>
              <div className="text-sm text-text-secondary">Verified Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-2">50,000+</div>
              <div className="text-sm text-text-secondary">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-2">4.8</div>
              <div className="text-sm text-text-secondary">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Kaar.Rentals?
            </h2>
            <p className="text-lg md:text-xl text-text-secondary">
              Built specifically for the Pakistani market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="marketplace-card bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">100% Verified Dealers</h3>
                <p className="text-text-secondary">All dealers verified with CNIC, business license, and location inspection.</p>
              </CardContent>
            </Card>

            <Card className="marketplace-card bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Premium Car Collection</h3>
                <p className="text-text-secondary">Toyota, Honda, Suzuki, and other popular brands across Pakistan.</p>
              </CardContent>
            </Card>

            <Card className="marketplace-card bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">24/7 Urdu Support</h3>
                <p className="text-text-secondary">Local support team available in English and Urdu languages.</p>
              </CardContent>
            </Card>

            <Card className="marketplace-card bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">All Major Cities</h3>
                <p className="text-text-secondary">Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and more.</p>
              </CardContent>
            </Card>

            <Card className="marketplace-card bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Best Prices Guaranteed</h3>
                <p className="text-text-secondary">Direct dealer prices with JazzCash, EasyPaisa, and cash options.</p>
              </CardContent>
            </Card>

            <Card className="marketplace-card bg-card border-border hover:border-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Trusted Platform</h3>
                <p className="text-text-secondary">50,000+ satisfied customers with 4.8-star rating across Pakistan.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-r from-gold/10 to-gold-dark/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-8">
            Join thousands of satisfied customers across Pakistan and find your dream car today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold text-lg px-8 py-3 btn-pakistani">
                Create Free Account
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-text-secondary">
              <Phone className="w-4 h-4 text-green-500" />
              <span>Call: 03090017510</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-border py-8 md:py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <h3 className="text-lg font-bold text-gold">Kaar.Rentals</h3>
                <p className="text-sm text-text-secondary">© 2025 Pakistan's Premier Car Marketplace</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
              <Link to="/privacy" className="text-text-secondary hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-text-secondary hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <a href="tel:03090017510" className="text-text-secondary hover:text-gold transition-colors">
                📞 03090017510
              </a>
              <span className="text-text-secondary">🇵🇰 Made in Pakistan</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default PublicHome;