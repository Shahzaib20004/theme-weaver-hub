import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Users, 
  Shield, 
  Clock, 
  Star, 
  Award,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const stats = [
    { icon: Car, value: "1000+", label: "Vehicles Available" },
    { icon: Users, value: "5000+", label: "Happy Customers" },
    { icon: Shield, value: "99.9%", label: "Safety Record" },
    { icon: Clock, value: "24/7", label: "Customer Support" }
  ];

  const team = [
    {
      name: "Ahmad Hassan",
      role: "Founder & CEO",
      image: "/api/placeholder/150/150",
      description: "15+ years in automotive industry"
    },
    {
      name: "Fatima Khan", 
      role: "Operations Director",
      image: "/api/placeholder/150/150",
      description: "Expert in fleet management"
    },
    {
      name: "Hassan Ali",
      role: "Customer Relations Head",
      image: "/api/placeholder/150/150", 
      description: "Ensuring customer satisfaction"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All our vehicles undergo rigorous safety inspections and maintenance checks"
    },
    {
      icon: Star,
      title: "Quality Service",
      description: "We maintain the highest standards in vehicle quality and customer service"
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "24/7 support and on-time delivery for all your transportation needs"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Continuously striving for excellence in everything we do"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              About Kaar.Rentals
            </h1>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Since 2015, Kaar.Rentals has been Pakistan's premier car rental service, providing reliable, 
              safe, and affordable transportation solutions. We take pride in our extensive fleet, 
              exceptional customer service, and commitment to making your journey comfortable and memorable.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center p-6 bg-dark-surface border-border hover:shadow-gold transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-gold mb-2">{stat.value}</div>
                    <div className="text-sm text-text-secondary">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Kaar.Rentals was founded with a simple vision: to provide reliable and affordable 
                  car rental services to everyone in Pakistan. What started as a small family business 
                  with just 5 vehicles has grown into the country's most trusted car rental platform.
                </p>
                <p>
                  Our founder, Ahmad Hassan, recognized the need for quality car rental services in 
                  Pakistan's growing urban centers. With his background in automotive engineering 
                  and passion for customer service, he built Kaar.Rentals from the ground up.
                </p>
                <p>
                  Today, we operate in major cities across Pakistan, offering everything from 
                  economy cars to luxury vehicles, all maintained to the highest standards and 
                  backed by our 24/7 customer support.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/500/400" 
                alt="Kaar.Rentals Story"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center p-6 bg-dark-surface border-border hover:shadow-gold transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                      <p className="text-sm text-text-secondary">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center p-6 bg-dark-surface border-border hover:shadow-gold transition-all duration-300">
                  <CardContent className="p-0">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-gold font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-text-secondary">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-dark-surface rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Get in Touch</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
                <p className="text-sm text-text-secondary">
                  Main Office: Shahrah-e-Faisal,<br />
                  Karachi, Pakistan
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-sm text-text-secondary">
                  +92-300-1234567<br />
                  24/7 Support Available
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-sm text-text-secondary">
                  info@kaar.rentals<br />
                  Quick Response Guaranteed
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button variant="luxury" size="lg">
                Contact Us Today
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;