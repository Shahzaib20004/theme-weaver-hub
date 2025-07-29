import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Tag, Star, Zap } from "lucide-react";

const DailyOffers = () => {
  // Mock data - will be replaced with admin-managed offers
  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 25% off on all luxury cars for weekend bookings",
      discount: "25% OFF",
      validUntil: "Sunday, 11:59 PM",
      category: "Luxury Cars",
      isHot: true,
      terms: "Valid for bookings from Friday to Sunday. Minimum 2-day rental required."
    },
    {
      id: 2,
      title: "Early Bird Discount",
      description: "Book 7 days in advance and save 20% on any vehicle",
      discount: "20% OFF",
      validUntil: "Next Week",
      category: "All Vehicles",
      isHot: false,
      terms: "Booking must be made at least 7 days before rental date."
    },
    {
      id: 3,
      title: "Student Special",
      description: "University students get 15% off with valid student ID",
      discount: "15% OFF",
      validUntil: "End of Month",
      category: "Economy Cars",
      isHot: false,
      terms: "Valid student ID required at pickup. Cannot be combined with other offers."
    },
    {
      id: 4,
      title: "Monthly Package",
      description: "Rent for 30 days and get 10 days absolutely free!",
      discount: "10 Days FREE",
      validUntil: "Limited Time",
      category: "Long Term",
      isHot: true,
      terms: "Minimum 30-day rental period. Free days added to end of rental period."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Tag className="w-8 h-8 text-gold" />
            <h1 className="text-4xl md:text-5xl font-bold text-gold">
              Daily Offers
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discover amazing deals and exclusive discounts on our premium car rental services. 
            Save big with our limited-time offers!
          </p>
        </div>

        {/* Hot Deals Banner */}
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-lg p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-foreground">🔥 Hot Deals</h2>
          </div>
          <p className="text-text-secondary mb-4">
            Limited time offers that won't last long! Grab these deals before they expire.
          </p>
          <div className="flex gap-4">
            {offers.filter(offer => offer.isHot).map(offer => (
              <Badge key={offer.id} variant="destructive" className="text-sm py-1 px-3">
                {offer.title} - {offer.discount}
              </Badge>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {offers.map((offer) => (
            <Card 
              key={offer.id} 
              className="bg-dark-elevated border-border hover:border-gold transition-all duration-300 hover:shadow-gold relative overflow-hidden"
            >
              {offer.isHot && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    HOT
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-gold text-xl mb-2">{offer.title}</CardTitle>
                    <CardDescription className="text-base">{offer.description}</CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="outline" className="border-gold text-gold">
                    {offer.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-text-secondary">
                    <Clock className="w-4 h-4" />
                    {offer.validUntil}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="bg-gradient-gold text-primary-foreground rounded-lg p-4 mb-4 text-center">
                  <div className="text-2xl font-bold">{offer.discount}</div>
                  <div className="text-sm opacity-90">Instant Savings</div>
                </div>
                
                <div className="bg-dark-surface p-4 rounded-lg mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Terms & Conditions:</h4>
                  <p className="text-sm text-text-secondary">{offer.terms}</p>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1" variant="default">
                    Claim Offer
                  </Button>
                  <Button variant="outline" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-gold/10 to-gold/5 border-gold/30">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold text-gold mb-4">
              Don't Miss Out on Our Best Deals!
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Our offers change regularly. Subscribe to our notifications to be the first to know 
              about new deals and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                View All Cars
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Contact for Custom Deals
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-dark-surface rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">Important Notes:</h3>
          <ul className="text-sm text-text-secondary space-y-2">
            <li>• All offers are subject to vehicle availability</li>
            <li>• Discounts cannot be combined with other promotions unless specified</li>
            <li>• Valid driver's license and insurance required for all rentals</li>
            <li>• Prices exclude fuel, tolls, and applicable taxes</li>
            <li>• Offers may be modified or discontinued without prior notice</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DailyOffers;