import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                  Reliable Rides Anytime
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
            <Link to="/login">
              <Button variant="nav" className="text-sm font-medium">LOGIN</Button>
            </Link>
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
                className="w-7 h-7 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-md flex items-center justify-center text-white hover:-translate-y-1 transition-transform duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-white hover:-translate-y-1 transition-transform duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@kaar.rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-black rounded-md flex items-center justify-center text-white hover:-translate-y-1 transition-transform duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
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
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="nav" size="sm" className="w-full justify-start">LOGIN</Button>
              </Link>
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