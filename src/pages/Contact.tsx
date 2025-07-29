import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            We're here to help you 24/7. Get in touch with our team for any questions, 
            bookings, or support you need.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Phone Contact */}
          <Card className="bg-dark-elevated border-border hover:border-gold transition-all duration-300 hover:shadow-gold">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-gold">Call Us</CardTitle>
              <CardDescription>Available 24/7 for immediate assistance</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <p className="text-lg font-medium text-foreground">03090017510</p>
                <p className="text-sm text-text-secondary">Main Line</p>
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">+923090017510</p>
                <p className="text-sm text-text-secondary">International</p>
              </div>
              <Button 
                onClick={() => window.open('tel:03090017510')}
                className="w-full"
                variant="default"
              >
                Call Now
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card className="bg-dark-elevated border-border hover:border-gold transition-all duration-300 hover:shadow-gold">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-gold">WhatsApp</CardTitle>
              <CardDescription>Chat with us instantly</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <p className="text-lg font-medium text-foreground">+923090017510</p>
                <p className="text-sm text-text-secondary">Available 24/7</p>
              </div>
              <Button 
                onClick={() => window.open('https://wa.me/923090017510')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Email Contact */}
          <Card className="bg-dark-elevated border-border hover:border-gold transition-all duration-300 hover:shadow-gold">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-gold">Email Us</CardTitle>
              <CardDescription>We'll respond within 2 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <p className="text-lg font-medium text-foreground">kaar.rentals@gmail.com</p>
                <p className="text-sm text-text-secondary">General Inquiries</p>
              </div>
              <Button 
                onClick={() => window.open('mailto:kaar.rentals@gmail.com')}
                className="w-full"
                variant="outline"
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Section */}
        <Card className="bg-dark-elevated border-border mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gold mb-2">Follow Us on Social Media</CardTitle>
            <CardDescription>Stay updated with our latest offers and news</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/kaar.rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="mt-2 text-sm text-text-secondary group-hover:text-gold transition-colors">Instagram</span>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="mt-2 text-sm text-text-secondary group-hover:text-gold transition-colors">Facebook</span>
              </a>

              <a
                href="https://www.tiktok.com/@kaar.rentals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <span className="mt-2 text-sm text-text-secondary group-hover:text-gold transition-colors">TikTok</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-dark-elevated border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-gold" />
                <div>
                  <CardTitle className="text-gold">Business Hours</CardTitle>
                  <CardDescription>We're available around the clock</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-dark-surface rounded-lg border border-border">
                <span className="font-medium text-foreground">Customer Support</span>
                <span className="text-gold font-bold">24/7</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-dark-surface rounded-lg border border-border">
                <span className="font-medium text-foreground">Car Pickup/Delivery</span>
                <span className="text-gold font-bold">24/7</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-dark-surface rounded-lg border border-border">
                <span className="font-medium text-foreground">Emergency Assistance</span>
                <span className="text-gold font-bold">24/7</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-elevated border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-gold" />
                <div>
                  <CardTitle className="text-gold">Our Location</CardTitle>
                  <CardDescription>Visit us or we'll come to you</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-dark-surface rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-2">Main Office</h4>
                <p className="text-text-secondary">Karachi, Pakistan</p>
                <p className="text-sm text-text-secondary mt-2">Multiple pickup locations available</p>
              </div>
              <div className="p-4 bg-dark-surface rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-2">Service Areas</h4>
                <p className="text-text-secondary">All major areas in Karachi</p>
                <p className="text-sm text-text-secondary mt-2">Free delivery & pickup service</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;