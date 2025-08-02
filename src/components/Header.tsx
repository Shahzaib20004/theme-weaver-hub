import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle, Menu, X, Search, MapPin, Heart, Bell, User, ChevronDown, Car, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import RealTimeNotifications from "./RealTimeNotifications";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDealer, setIsDealer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dealerName, setDealerName] = useState("");
  const [userRole, setUserRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const popularCities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"];

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_dealer, dealer_name, role')
          .eq('user_id', user.id)
          .single();
        
        if (profile) {
          setIsDealer(profile.is_dealer || false);
          setDealerName(profile.dealer_name || "");
          setUserRole(profile.role || "customer");
          setIsAdmin(profile.role === "admin");
        }
      } else {
        // Reset states when user logs out
        setIsDealer(false);
        setDealerName("");
        setUserRole("");
        setIsAdmin(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <header className="bg-dark-surface/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-lg">
      {/* Top Bar - Contact & Quick Links */}
      <div className="hidden md:block border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-foreground">
                <Phone className="w-3 h-3 text-green-500" />
                <span>03090017510</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <MessageCircle className="w-3 h-3 text-blue-500" />
                <span>Live Support 24/7</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-green-500">
                <Shield className="w-3 h-3" />
                <span>100% Verified Dealers</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/share/16sg1pXed3/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kaar.rentals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Logo size="lg" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gold tracking-wide">
                  Kaar.Rentals
                </h1>
                <div className="flex items-center gap-2">
                  {isDealer && dealerName ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gold font-medium">
                        {dealerName}
                      </p>
                      <div className="px-2 py-0.5 bg-gold/20 rounded-full">
                        <span className="text-xs text-gold font-bold">DEALER</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-text-secondary">
                      Pakistan's #1 Car Marketplace
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>

          {/* Center: Search Bar (Hidden on mobile) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full bg-dark-elevated/80 backdrop-blur-sm border border-gold/30 rounded-xl overflow-hidden">
              <div className="flex items-center px-3 border-r border-border">
                <Search className="w-4 h-4 text-text-secondary" />
              </div>
              <Input
                placeholder="Search cars, brands, or dealers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-foreground placeholder:text-text-secondary focus:ring-0"
              />
              <Select value={searchLocation} onValueChange={setSearchLocation}>
                <SelectTrigger className="w-40 border-0 border-l border-border bg-transparent">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-text-secondary" />
                    <SelectValue placeholder="All Cities" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {popularCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link to="/cars">
                <Button className="h-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold rounded-none px-6">
                  Search
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Navigation & User Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/cars">
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-gold hover:bg-gold/10">
                  Browse Cars
                </Button>
              </Link>
              <Link to="/dealerships">
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-gold hover:bg-gold/10">
                  Dealers
                </Button>
              </Link>
              <Link to="/brands">
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-gold hover:bg-gold/10">
                  Brands
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-gold hover:bg-gold/10">
                  Services
                </Button>
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <LanguageToggle />

              {/* Real-time Notifications */}
              <RealTimeNotifications />

              {/* Sell Car Button */}
              {(isDealer || userRole === "customer") && (
                <Link to="/add-car">
                  <Button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold hidden md:flex">
                    <Car className="w-4 h-4 mr-2" />
                    {isDealer ? "Add Vehicle" : "Sell Car"}
                  </Button>
                </Link>
              )}

              {/* User Menu */}
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-gold hover:bg-gold/10">
                  <div className="w-8 h-8 bg-gradient-to-r from-gold/20 to-gold-dark/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gold" />
                  </div>
                  <ChevronDown className="w-3 h-3 hidden md:block" />
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-dark-elevated border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    {isDealer && (
                      <Link to="/dealer-dashboard">
                        <div className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors">
                          <Star className="w-4 h-4" />
                          Dashboard
                        </div>
                      </Link>
                    )}
                    {isAdmin && (
                      <Link to="/admin">
                        <div className="flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Shield className="w-4 h-4" />
                          Admin Panel
                        </div>
                      </Link>
                    )}
                    <Link to="/about">
                      <div className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors">
                        <Heart className="w-4 h-4" />
                        About Us
                      </div>
                    </Link>
                    <Link to="/contact">
                      <div className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors">
                        <Phone className="w-4 h-4" />
                        Contact
                      </div>
                    </Link>
                    <div className="border-t border-border my-2"></div>
                    <button
                      onClick={signOut}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      {t('header.logout')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <div className="flex w-full bg-dark-elevated/80 backdrop-blur-sm border border-gold/30 rounded-xl overflow-hidden">
            <div className="flex items-center px-3 border-r border-border">
              <Search className="w-4 h-4 text-text-secondary" />
            </div>
            <Input
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent text-foreground placeholder:text-text-secondary focus:ring-0"
            />
            <Link to="/cars">
              <Button className="h-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold rounded-none px-4">
                Search
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-2 mt-4">
              <Link to="/cars" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors">
                  <Car className="w-4 h-4" />
                  Browse Cars
                </div>
              </Link>
              <Link to="/dealerships" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors">
                  <Shield className="w-4 h-4" />
                  Verified Dealers
                </div>
              </Link>
              <Link to="/brands" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors">
                  <Star className="w-4 h-4" />
                  Popular Brands
                </div>
              </Link>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  Services
                </div>
              </Link>
              
              {(isDealer || userRole === "customer") && (
                <Link to="/add-car" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gold/20 to-gold-dark/20 text-gold rounded-lg mt-2">
                    <Car className="w-4 h-4" />
                    {isDealer ? "Add Vehicle" : "Sell Your Car"}
                  </div>
                </Link>
              )}
            </nav>

            {/* Mobile Contact */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-col gap-3">
                <a href="tel:03090017510" className="flex items-center gap-3 px-4 py-2 text-foreground">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>03090017510</span>
                </a>
                <div className="flex items-center gap-3 px-4 py-2 text-foreground">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span>24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;