import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Shield, 
  Clock, 
  Users, 
  Video, 
  MapPin, 
  Phone, 
  Wrench,
  CreditCard,
  FileText
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      id: "rental",
      title: "Car Rental Services",
      description: "Short and long-term car rental solutions for individuals and businesses",
      icon: Car,
      features: ["Daily/Weekly/Monthly rentals", "Corporate packages", "Airport pickup/drop", "24/7 support"],
      price: "Starting from PKR 3,000/day",
      popular: true
    },
    {
      id: "insurance",
      title: "Vehicle Insurance",
      description: "Comprehensive insurance coverage for your rental vehicles",
      icon: Shield,
      features: ["Full coverage protection", "Accident coverage", "Theft protection", "Roadside assistance"],
      price: "PKR 500/day additional",
      popular: false
    },
    {
      id: "driver",
      title: "Professional Drivers",
      description: "Experienced and licensed drivers for your convenience",
      icon: Users,
      features: ["Licensed drivers", "Local area knowledge", "Multilingual support", "Background verified"],
      price: "PKR 2,000/day",
      popular: true
    },
    {
      id: "videography",
      title: "Event Videography",
      description: "Professional video coverage for weddings and special events",
      icon: Video,
      features: ["Wedding coverage", "Event documentation", "Drone footage", "Professional editing"],
      price: "PKR 25,000/event",
      popular: false
    },
    {
      id: "maintenance",
      title: "Vehicle Maintenance",
      description: "Complete maintenance and repair services for rental vehicles",
      icon: Wrench,
      features: ["Regular servicing", "Emergency repairs", "Parts replacement", "Quality assurance"],
      price: "Contact for quote",
      popular: false
    },
    {
      id: "financing",
      title: "Vehicle Financing",
      description: "Flexible financing options for vehicle purchases",
      icon: CreditCard,
      features: ["Easy approval", "Competitive rates", "Flexible terms", "Quick processing"],
      price: "Starting 12% APR",
      popular: false
    }
  ];

  const locations = [
    {
      city: "Karachi",
      areas: ["Clifton", "Defence", "Gulshan", "Saddar", "Airport"],
      phone: "+92-21-34567890"
    },
    {
      city: "Lahore", 
      areas: ["DHA", "Gulberg", "Model Town", "Johar Town", "Airport"],
      phone: "+92-42-35567890"
    },
    {
      city: "Islamabad",
      areas: ["Blue Area", "F-10", "G-11", "Bahria Town", "Airport"],
      phone: "+92-51-36567890"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Our Services
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive automotive solutions designed to meet all your transportation and vehicle needs across Pakistan.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="relative overflow-hidden hover:shadow-gold transition-all duration-300 bg-dark-surface border-border">
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-gold text-primary-foreground z-10">
                      Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground mb-2">{service.title}</CardTitle>
                        <p className="text-text-secondary text-sm">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0"></div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Price:</span>
                        <span className="font-semibold text-gold">{service.price}</span>
                      </div>
                      <Button variant="luxury" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Service Locations */}
          <div className="bg-dark-surface rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-gold" />
              Service Locations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <Card key={index} className="bg-dark-elevated border-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gold" />
                      {location.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Coverage Areas:</h4>
                        <div className="flex flex-wrap gap-1">
                          {location.areas.map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="secondary" className="text-xs bg-background text-foreground">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span className="text-foreground">{location.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 bg-gradient-gold rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Need a Custom Service Package?
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Contact our team to discuss your specific requirements and get a personalized service package tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +92-300-1234567
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <FileText className="w-5 h-5 mr-2" />
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;