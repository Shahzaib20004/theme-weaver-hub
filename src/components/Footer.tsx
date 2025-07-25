import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                K
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold">Kaar.Rentals</h3>
                <p className="text-sm text-text-secondary">Reliable Rides Anytime</p>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Your trusted partner for premium car rentals. Experience luxury, 
              comfort, and reliability with our extensive fleet of vehicles.
            </p>
            <div className="flex gap-3">
              <Button variant="luxury" size="sm">
                Get Quote
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Quick Links</h4>
            <div className="space-y-3">
              <a href="#" className="block text-text-secondary hover:text-gold transition-colors">All Cars</a>
              <a href="#" className="block text-text-secondary hover:text-gold transition-colors">Our Fleet</a>
              <a href="#" className="block text-text-secondary hover:text-gold transition-colors">Car Brands</a>
              <a href="#" className="block text-text-secondary hover:text-gold transition-colors">Daily Offers</a>
              <a href="#" className="block text-text-secondary hover:text-gold transition-colors">Rental Prices</a>
              <a href="#" className="block text-text-secondary hover:text-gold transition-colors">About Us</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-foreground font-medium">03090017510</p>
                  <p className="text-sm text-text-secondary">Call us anytime</p>
                </div>
              </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">kaar.rentals@gmail.com</p>
                    <p className="text-sm text-text-secondary">Email support</p>
                  </div>
                </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-foreground font-medium">Karachi, Pakistan</p>
                  <p className="text-sm text-text-secondary">Multiple locations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Business Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-text-secondary">24/7 Service</span>
              </div>
              <div className="bg-dark-elevated p-4 rounded-lg border border-border">
                <p className="text-sm text-text-secondary mb-2">Emergency Pickup</p>
                <p className="font-medium text-gold">Available Anytime</p>
              </div>
              <div className="bg-dark-elevated p-4 rounded-lg border border-border">
                <p className="text-sm text-text-secondary mb-2">Customer Support</p>
                <p className="font-medium text-gold">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              © 2024 Kaar.Rentals. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-text-secondary hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="text-text-secondary hover:text-gold transition-colors">Terms of Service</a>
              <a href="#" className="text-text-secondary hover:text-gold transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;