import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 border border-gold rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-gold rounded-full"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 bg-dark-elevated border border-gold/30 rounded-full px-6 py-2 mb-8">
          <Star className="w-4 h-4 text-gold fill-gold" />
          <span className="text-sm font-medium text-gold">Premium Car Rental Experience</span>
          <Star className="w-4 h-4 text-gold fill-gold" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Reliable Rides</span>
          <br />
          <span className="text-transparent bg-gradient-gold bg-clip-text">
            Anytime
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
          Explore your destination with comfort and style. 
          <br className="hidden md:block" />
          Book your premium car today and experience luxury on wheels.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span>Premium Fleet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span>Best Prices</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <span>Free Delivery</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/cars">
            <Button variant="premium" size="xl" className="group">
              Browse Cars
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/add-car">
            <Button variant="luxury" size="xl">
              List Your Car
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-border/30">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gold mb-2">500+</div>
            <div className="text-sm text-text-secondary">Premium Cars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gold mb-2">10K+</div>
            <div className="text-sm text-text-secondary">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gold mb-2">4.9</div>
            <div className="text-sm text-text-secondary">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gold mb-2">24/7</div>
            <div className="text-sm text-text-secondary">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;