import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Star, 
  Crown, 
  Check, 
  DollarSign,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  BarChart3
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      id: "profile-management",
      title: "Profile Management",
      description: "Professional management of your car rental profile and listings",
      icon: User,
      features: [
        "Professional profile optimization",
        "Regular listing updates",
        "Customer inquiry management", 
        "Performance analytics",
        "SEO optimization",
        "24/7 support"
      ],
      price: "PKR 2,000",
      period: "per month",
      popular: true,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "featured-basic",
      title: "Featured Ads - Basic",
      description: "Enhanced visibility for your car listings",
      icon: Star,
      features: [
        "Featured badge on listings",
        "Higher search ranking",
        "30 days active",
        "Priority support",
        "Email notifications",
        "Basic analytics"
      ],
      price: "PKR 1,000",
      period: "per listing",
      popular: false,
      color: "from-gold to-yellow-500"
    },
    {
      id: "featured-premium",
      title: "Featured Ads - Premium",
      description: "Maximum exposure and top placement for your vehicles",
      icon: Crown,
      features: [
        "Top search placement",
        "Homepage featured section",
        "60 days active",
        "Premium badge",
        "Dedicated support",
        "Social media promotion",
        "Advanced analytics",
        "Priority customer calls"
      ],
      price: "PKR 5,000",
      period: "per listing",
      popular: true,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const additionalServices = [
    {
      title: "Analytics & Insights",
      description: "Detailed analytics for your listings performance",
      icon: BarChart3,
      included: ["View statistics", "Customer demographics", "Booking trends", "Revenue tracking"]
    },
    {
      title: "Priority Support", 
      description: "24/7 dedicated customer support",
      icon: Shield,
      included: ["Phone support", "Live chat", "Email support", "Technical assistance"]
    },
    {
      title: "Fast Processing",
      description: "Quick approval and listing activation",
      icon: Zap,
      included: ["Priority review", "Fast approval", "Instant activation", "Quick updates"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional services to maximize your car rental business success
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id} 
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  service.popular ? 'border-gold shadow-gold/20' : 'border-border hover:border-gold/50'
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gold text-dark font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl font-bold text-gold">{service.price}</span>
                      <span className="text-muted-foreground">/{service.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link to="/add-car">
                    <Button 
                      className={`w-full ${
                        service.popular 
                          ? 'bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">What's Included</h2>
            <p className="text-muted-foreground">
              All our services come with these additional benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center hover:border-gold/50 transition-colors">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.included.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                          <Check className="w-3 h-3 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Pricing Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Compare Plans</h2>
            <p className="text-muted-foreground">
              Choose the best plan for your car rental business
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-elevated">
                  <tr>
                    <th className="text-left p-4 font-semibold">Features</th>
                    <th className="text-center p-4 font-semibold">Profile Management</th>
                    <th className="text-center p-4 font-semibold">Featured Basic</th>
                    <th className="text-center p-4 font-semibold">Featured Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-4 font-medium">Monthly Price</td>
                    <td className="text-center p-4">PKR 2,000</td>
                    <td className="text-center p-4">PKR 1,000/listing</td>
                    <td className="text-center p-4">PKR 5,000/listing</td>
                  </tr>
                  <tr>
                    <td className="p-4">Profile Optimization</td>
                    <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">-</td>
                  </tr>
                  <tr>
                    <td className="p-4">Featured Badge</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">Top Placement</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">Social Media Promotion</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">Analytics</td>
                    <td className="text-center p-4"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4">Basic</td>
                    <td className="text-center p-4">Advanced</td>
                  </tr>
                  <tr>
                    <td className="p-4">Customer Support</td>
                    <td className="text-center p-4">24/7</td>
                    <td className="text-center p-4">Priority</td>
                    <td className="text-center p-4">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-gold/10 to-gold-dark/10 border-gold/20">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Boost Your Car Rental Business?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get started today and see the difference professional services can make for your car rental listings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/add-car">
                  <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                    List Your Car Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;