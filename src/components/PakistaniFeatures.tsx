import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CreditCard, Shield, Clock, Users, Star, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PakistaniFeatures = () => {
  const pakistaniCities = [
    { name: "Karachi", dealers: 180, cars: 650, popular: true },
    { name: "Lahore", dealers: 120, cars: 420, popular: true },
    { name: "Islamabad", dealers: 85, cars: 310, popular: true },
    { name: "Rawalpindi", dealers: 60, cars: 220, popular: false },
    { name: "Faisalabad", dealers: 45, cars: 180, popular: false },
    { name: "Multan", dealers: 35, cars: 150, popular: false },
    { name: "Peshawar", dealers: 30, cars: 120, popular: false },
    { name: "Quetta", dealers: 20, cars: 80, popular: false }
  ];

  const paymentMethods = [
    { name: "JazzCash", icon: "💳", popular: true, description: "Instant mobile payments" },
    { name: "EasyPaisa", icon: "📱", popular: true, description: "Mobile wallet transfers" },
    { name: "Bank Transfer", icon: "🏦", popular: true, description: "All major Pakistani banks" },
    { name: "Cash Payment", icon: "💵", popular: true, description: "In-person cash transactions" },
    { name: "Credit/Debit Card", icon: "💳", popular: false, description: "Visa, MasterCard accepted" },
    { name: "Cryptocurrency", icon: "₿", popular: false, description: "Bitcoin & other crypto" }
  ];

  const pakistaniSupport = [
    { title: "Urdu Support", description: "Complete website in Urdu language", available: true },
    { title: "Local Phone Support", description: "03090017510 - Karachi based team", available: true },
    { title: "WhatsApp Support", description: "24/7 WhatsApp customer service", available: true },
    { title: "Islamic Finance", description: "Sharia-compliant payment options", available: true },
    { title: "Ramadan Hours", description: "Special timings during holy month", available: true },
    { title: "Local Holidays", description: "Eid and national holiday support", available: true }
  ];

  const trustIndicators = [
    { metric: "Customer Satisfaction", value: "98%", color: "text-green-500" },
    { metric: "Verified Dealers", value: "100%", color: "text-blue-500" },
    { metric: "Response Time", value: "<30min", color: "text-purple-500" },
    { metric: "Successful Transactions", value: "50,000+", color: "text-gold" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background to-dark-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/10 to-gold/10 border border-green-600/30 rounded-full px-6 py-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">🇵🇰</span>
            </div>
            <span className="text-sm font-medium text-green-600">Made for Pakistan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built for Pakistani Market
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Designed specifically for Pakistani car buyers and sellers with local payment methods, 
            language support, and cultural preferences
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustIndicators.map((indicator, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border text-center">
              <CardContent className="p-6">
                <div className={`text-3xl font-bold ${indicator.color} mb-2`}>
                  {indicator.value}
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {indicator.metric}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pakistani Cities Coverage */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Available Across Pakistan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pakistaniCities.map((city, index) => (
              <Card key={index} className={`bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-300 ${city.popular ? 'ring-2 ring-gold/20' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {city.name}
                    </h4>
                    {city.popular && (
                      <Badge className="bg-gold/20 text-gold text-xs">Popular</Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="text-text-secondary">
                      <span className="font-medium text-green-500">{city.dealers}+</span> dealers
                    </div>
                    <div className="text-text-secondary">
                      <span className="font-medium text-blue-500">{city.cars}+</span> cars
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Pakistani Payment Methods
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {paymentMethods.map((method, index) => (
              <Card key={index} className={`bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-300 ${method.popular ? 'ring-2 ring-green-500/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <h4 className="font-bold text-foreground">{method.name}</h4>
                      {method.popular && (
                        <Badge className="bg-green-500/20 text-green-500 text-xs">Most Popular</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pakistani Support Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Local Support & Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pakistaniSupport.map((feature, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${feature.available ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                      <div className={`w-4 h-4 rounded-full ${feature.available ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
                      <p className="text-text-secondary text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-gold/10 to-green-600/10 rounded-3xl p-8 md:p-12 border border-gold/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Help? We Speak Your Language
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our Pakistani customer support team is available 24/7 in both English and Urdu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Phone Support */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="font-bold text-foreground mb-2">Phone Support</h4>
                <p className="text-text-secondary mb-3">Call us anytime</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  03090017510
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp Support */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="font-bold text-foreground mb-2">WhatsApp Chat</h4>
                <p className="text-text-secondary mb-3">Instant messaging</p>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Chat Now
                </Button>
              </CardContent>
            </Card>

            {/* Office Location */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <h4 className="font-bold text-foreground mb-2">Office Location</h4>
                <p className="text-text-secondary mb-3">Karachi, Pakistan</p>
                <Button variant="outline" className="border-purple-500 text-purple-500">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Special Features */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-600/20 text-green-600 px-4 py-2">
                🕌 Islamic Finance Available
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-500 px-4 py-2">
                🗣️ Urdu & English Support
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-500 px-4 py-2">
                📅 Ramadan Special Hours
              </Badge>
              <Badge className="bg-gold/20 text-gold px-4 py-2">
                🇵🇰 100% Pakistani Owned
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PakistaniFeatures;