import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import RealTimeNotifications from "./RealTimeNotifications";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDealer, setIsDealer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dealerName, setDealerName] = useState("");
  const [userRole, setUserRole] = useState<string>("");
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

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
    <header className="bg-dark-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo Section */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Logo size="md" />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-gold tracking-wide">
                    Kaar.Rentals
                  </h1>
                  <div className="flex items-center gap-2">
                    {isDealer && dealerName ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-xs text-gold font-medium italic">
                          {dealerName}
                        </p>
                        <div className="px-2 py-0.5 bg-gold/20 rounded-full">
                          <span className="text-xs text-gold font-bold">DEALER</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-text-secondary italic">
                        {t('header.tagline')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>

            {/* Navigation Links - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/cars">
                <Button variant="nav" className="text-sm font-medium">{t('header.allCars')}</Button>
              </Link>
              <Link to="/dealerships">
                <Button variant="nav" className="text-sm font-medium">{t('header.dealerships')}</Button>
              </Link>
              <Link to="/brands">
                <Button variant="nav" className="text-sm font-medium">{t('header.brands')}</Button>
              </Link>
              <Link to="/services">
                <Button variant="nav" className="text-sm font-medium">{t('header.services')}</Button>
              </Link>
              <Link to="/about">
                <Button variant="nav" className="text-sm font-medium">{t('header.about')}</Button>
              </Link>
              <Link to="/contact">
                <Button variant="nav" className="text-sm font-medium">{t('header.contact')}</Button>
              </Link>
              
              {/* Admin-only navigation */}
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="nav" className="text-sm font-medium text-red-400 hover:text-red-300">
                    ADMIN
                  </Button>
                </Link>
              )}
            </nav>
          </div>

          {/* Right Side: User Actions + Contact */}
          <div className="flex items-center gap-4">
            {/* Contact Phone - Compact */}
            <div className="hidden md:flex items-center gap-2 text-sm text-foreground">
              <Phone className="w-4 h-4 text-green-500" />
              <span>03090017510</span>
            </div>

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Real-time Notifications */}
            <RealTimeNotifications />

            {/* User Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Show List Car for dealers and customers */}
              {(isDealer || userRole === "customer") && (
                <Link to="/add-car">
                  <Button variant="premium" className="text-sm font-medium">
                    {isDealer ? "ADD VEHICLE" : "LIST CAR"}
                  </Button>
                </Link>
              )}
              
              {/* Dealer Dashboard */}
              {isDealer && (
                <Link to="/dealer-dashboard">
                  <Button variant="outline" className="text-sm font-medium text-gold border-gold hover:bg-gold hover:text-dark">
                    DASHBOARD
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-muted-foreground hover:text-gold"
                onClick={signOut}
              >
                {t('header.logout')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gold hover:bg-dark-elevated rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Social Icons - Compact */}
            <div className="hidden xl:flex items-center gap-2">
              <a
                href="https://www.facebook.com/share/16sg1pXed3/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/kaar.rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-2 mt-4">
              <Link to="/cars" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" className="w-full justify-start text-sm font-medium">{t('header.allCars')}</Button>
              </Link>
              <Link to="/dealerships" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" className="w-full justify-start text-sm font-medium">{t('header.dealerships')}</Button>
              </Link>
              <Link to="/brands" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" className="w-full justify-start text-sm font-medium">{t('header.brands')}</Button>
              </Link>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" className="w-full justify-start text-sm font-medium">{t('header.services')}</Button>
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" className="w-full justify-start text-sm font-medium">{t('header.about')}</Button>
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" className="w-full justify-start text-sm font-medium">{t('header.contact')}</Button>
              </Link>
              
              {/* Admin-only navigation */}
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="nav" className="w-full justify-start text-sm font-medium text-red-400 hover:text-red-300">
                    ADMIN
                  </Button>
                </Link>
              )}
              
              {/* Dealer Dashboard */}
              {isDealer && (
                <Link to="/dealer-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="nav" className="w-full justify-start text-sm font-medium text-gold hover:text-gold/80">
                    DEALER DASHBOARD
                  </Button>
                </Link>
              )}
              
              {/* Show List Car for dealers and customers */}
              {(isDealer || userRole === "customer") && (
                <Link to="/add-car" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="premium" className="w-full justify-start text-sm font-medium mt-2">
                    {isDealer ? "ADD VEHICLE" : "LIST CAR"}
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm font-medium text-muted-foreground hover:text-gold mt-2"
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                {t('header.logout')}
              </Button>
            </nav>

            {/* Mobile Contact & Social */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>03090017510</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span>+923090017510</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <a
                    href="https://www.facebook.com/share/16sg1pXed3/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/kaar.rentals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
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