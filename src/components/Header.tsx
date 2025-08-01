import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDealer, setIsDealer] = useState(false);
  const [dealerName, setDealerName] = useState("");
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_dealer, dealer_name')
          .eq('user_id', user.id)
          .single();
        
        if (profile) {
          setIsDealer(profile.is_dealer || false);
          setDealerName(profile.dealer_name || "");
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <header className="bg-dark-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Logo size="md" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gold tracking-wide">
                  Kaar.Rentals
                </h1>
                <p className="text-xs text-text-secondary italic">
                  {isDealer && dealerName ? dealerName : "Reliable Rides Anytime"}
                </p>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/cars">
              <Button variant="nav" className="text-sm font-medium">ALL CARS</Button>
            </Link>
            <Link to="/dealerships">
              <Button variant="nav" className="text-sm font-medium">DEALERSHIPS</Button>
            </Link>
            <Link to="/brands">
              <Button variant="nav" className="text-sm font-medium">CAR BRANDS</Button>
            </Link>
            <Link to="/daily-offers">
              <Button variant="nav" className="text-sm font-medium">DAILY OFFERS</Button>
            </Link>
            <Link to="/services">
              <Button variant="nav" className="text-sm font-medium">SERVICES</Button>
            </Link>
            <Link to="/about">
              <Button variant="nav" className="text-sm font-medium">ABOUT US</Button>
            </Link>
            <Link to="/contact">
              <Button variant="nav" className="text-sm font-medium">CONTACT US</Button>
            </Link>
            <Link to="/admin">
              <Button variant="nav" className="text-sm font-medium">ADMIN</Button>
            </Link>
            <Button 
              variant="nav" 
              className="text-sm font-medium"
              onClick={signOut}
            >
              LOGOUT
            </Button>
            <Link to="/add-car">
              <Button variant="premium" className="text-sm font-medium">LIST CAR</Button>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Contact Numbers */}
            <div className="hidden md:flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="w-4 h-4 text-green-500" />
                <span>03090017510</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span>+923090017510</span>
              </div>
            </div>

            {/* Google Reviews */}
            <div className="hidden md:flex flex-col items-center gap-1 bg-card p-3 rounded-lg min-w-[120px] border border-border">
              <div className="text-xs font-bold text-blue-500">Google</div>
              <div className="text-xs text-yellow-500">⭐⭐⭐⭐⭐</div>
              <div className="text-xs text-card-foreground">
                <span className="font-bold">4.9</span>
                <span className="text-muted-foreground"> | 5858 reviews</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gold hover:bg-dark-elevated rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Social Icons - Desktop Only */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://www.instagram.com/kaar.rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark p-0.5 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold"
              >
                <div className="w-full h-full bg-dark-surface rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-orange-500 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold group-hover:text-white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark p-0.5 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold"
              >
                <div className="w-full h-full bg-dark-surface rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold group-hover:text-white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://www.tiktok.com/@kaar.rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark p-0.5 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold"
              >
                <div className="w-full h-full bg-dark-surface rounded-full flex items-center justify-center group-hover:bg-black transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold group-hover:text-white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://wa.me/923090017510"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark p-0.5 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold"
              >
                <div className="w-full h-full bg-dark-surface rounded-full flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold group-hover:text-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.088"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link to="/cars" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" size="sm" className="w-full justify-start">ALL CARS</Button>
              </Link>
              <Button variant="nav" size="sm" className="w-full justify-start">OUR CARS</Button>
              <Button variant="nav" size="sm" className="w-full justify-start">BRANDS</Button>
              <Link to="/daily-offers" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" size="sm" className="w-full justify-start">OFFERS</Button>
              </Link>
              <Button variant="nav" size="sm" className="w-full justify-start">PRICES</Button>
              <Button variant="nav" size="sm" className="w-full justify-start">ABOUT</Button>
              <Button variant="nav" size="sm" className="w-full justify-start">BLOG</Button>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" size="sm" className="w-full justify-start">CONTACT</Button>
              </Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" size="sm" className="w-full justify-start">ADMIN</Button>
              </Link>
              <Button 
                variant="nav" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                LOGOUT
              </Button>
            </div>
            <Link to="/add-car" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="premium" size="sm" className="w-full">LIST CAR</Button>
            </Link>
            
            {/* Mobile Social Icons */}
            <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-border">
              <a href="https://www.instagram.com/kaar.rentals" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-md flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@kaar.rentals" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-black rounded-md flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;