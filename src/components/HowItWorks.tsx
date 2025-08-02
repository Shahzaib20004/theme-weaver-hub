import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageCircle, HandCoins, Car, Shield, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search & Compare",
      description: "Browse thousands of cars from verified dealers across Pakistan. Filter by location, brand, price, and features.",
      features: ["Advanced filters", "Real-time availability", "Verified listings"],
      color: "text-blue-500"
    },
    {
      icon: MessageCircle,
      title: "Connect Directly",
      description: "Chat or call dealers directly through our platform. No middleman, no hidden fees - just transparent communication.",
      features: ["Direct dealer contact", "In-app messaging", "Transparent pricing"],
      color: "text-green-500"
    },
    {
      icon: Car,
      title: "Inspect & Test Drive",
      description: "Schedule inspections and test drives. Our verified dealers ensure quality and provide comprehensive vehicle history.",
      features: ["Quality assurance", "Vehicle history", "Expert inspection"],
      color: "text-purple-500"
    },
    {
      icon: HandCoins,
      title: "Secure Transaction",
      description: "Complete your purchase with confidence. We facilitate secure payments and proper documentation transfer.",
      features: ["Secure payments", "Legal documentation", "Buyer protection"],
      color: "text-gold"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-dark-surface to-dark-elevated">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Trusted Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Kaar.Rentals Works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Your journey to finding the perfect car is simple, secure, and supported every step of the way
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-500 group relative overflow-hidden">
                {/* Step Number */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gold">{index + 1}</span>
                </div>
                
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-dark-elevated rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${step.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Connector Arrow - Hidden on last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center border-2 border-background">
                      <ArrowRight className="w-4 h-4 text-gold" />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 rounded-3xl p-8 md:p-12 border border-gold/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our Platform?
              </h3>
              <p className="text-lg text-text-secondary mb-8">
                We're not just another car marketplace. We're your trusted partner in finding the perfect vehicle with complete transparency and security.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">100% Verified</div>
                    <div className="text-sm text-text-secondary">All dealers verified</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">4.8/5 Rating</div>
                    <div className="text-sm text-text-secondary">Customer satisfaction</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">24/7 Support</div>
                    <div className="text-sm text-text-secondary">Always here to help</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                    <HandCoins className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Best Prices</div>
                    <div className="text-sm text-text-secondary">No hidden fees</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cars">
                  <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                    Start Shopping Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/dealerships">
                  <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-dark">
                    Find Dealers
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="font-semibold text-foreground text-sm">Verified Dealers</div>
                    <div className="text-2xl font-bold text-gold">500+</div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-2">
                      <Car className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="font-semibold text-foreground text-sm">Available Cars</div>
                    <div className="text-2xl font-bold text-gold">1,500+</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-2">
                      <Star className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="font-semibold text-foreground text-sm">Happy Customers</div>
                    <div className="text-2xl font-bold text-gold">50K+</div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
                    <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center mb-2">
                      <Shield className="w-4 h-4 text-gold" />
                    </div>
                    <div className="font-semibold text-foreground text-sm">Success Rate</div>
                    <div className="text-2xl font-bold text-gold">98%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;