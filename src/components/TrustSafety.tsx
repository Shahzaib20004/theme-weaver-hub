import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Verified, Lock, UserCheck, FileCheck, MessageCircle, Phone, Heart, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TrustSafety = () => {
  const trustFeatures = [
    {
      icon: Verified,
      title: "Verified Dealers Only",
      description: "Every dealer goes through our strict verification process including business license, location verification, and customer feedback review.",
      features: [
        "Business license verification",
        "Physical location inspection", 
        "Background checks completed",
        "Customer reviews validated"
      ],
      color: "text-green-500",
      bgColor: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Shield,
      title: "Buyer Protection",
      description: "We provide comprehensive protection for buyers with documented transactions, dispute resolution, and quality guarantees.",
      features: [
        "Transaction documentation",
        "Quality assurance checks",
        "Money-back guarantee",
        "24/7 dispute resolution"
      ],
      color: "text-blue-500", 
      bgColor: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Lock,
      title: "Secure Platform", 
      description: "Your personal and financial information is protected with bank-level security and encrypted communications.",
      features: [
        "End-to-end encryption",
        "Secure payment gateway",
        "Privacy protection", 
        "Data security compliance"
      ],
      color: "text-purple-500",
      bgColor: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "Both buyers and sellers undergo identity verification to ensure authentic interactions and build trust.",
      features: [
        "CNIC verification required",
        "Phone number verification",
        "Email confirmation",
        "Profile authenticity checks"
      ],
      color: "text-orange-500",
      bgColor: "from-orange-500/20 to-orange-600/20"
    }
  ];

  const safetyStats = [
    { label: "Verified Dealers", value: "100%", icon: Verified, color: "text-green-500" },
    { label: "Secure Transactions", value: "99.9%", icon: Lock, color: "text-blue-500" },
    { label: "Customer Satisfaction", value: "4.8/5", icon: Star, color: "text-gold" },
    { label: "Issue Resolution", value: "<24h", icon: MessageCircle, color: "text-purple-500" }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      location: "Karachi",
      text: "Found my dream car through a verified dealer. The whole process was transparent and secure. Highly recommended!",
      rating: 5,
      verified: true
    },
    {
      name: "Fatima Sheikh", 
      location: "Lahore",
      text: "Excellent platform with genuine dealers. Their verification process gave me confidence in my purchase.",
      rating: 5,
      verified: true
    },
    {
      name: "Muhammad Ali",
      location: "Islamabad", 
      text: "Safe and reliable platform. Customer support helped me throughout the buying process.",
      rating: 5,
      verified: true
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-dark-surface to-dark-elevated">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-full px-6 py-2 mb-6">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">Your Safety First</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trust & Safety Guaranteed
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We've built Pakistan's most trusted car marketplace with multiple layers of security and verification
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-500 group">
                <div className={`h-1 bg-gradient-to-r ${feature.bgColor}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.features.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Safety Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {safetyStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border text-center group hover:border-gold/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-dark-elevated rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gold mb-2">{stat.value}</div>
                  <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-text-secondary italic mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-text-secondary">{testimonial.location}</div>
                    </div>
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 text-green-500 text-xs">
                        <Verified className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 rounded-3xl p-8 md:p-12 border border-gold/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                24/7 Customer Support
              </h3>
              <p className="text-lg text-text-secondary mb-8">
                Our dedicated support team is always here to help. Whether you have questions about a listing, need help with verification, or want to report an issue - we're just a call or message away.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Call Us Anytime</div>
                    <div className="text-gold font-medium">03090017510</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Live Chat Support</div>
                    <div className="text-text-secondary">Available 24/7 in the app</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-dark">
                  <Heart className="w-4 h-4 mr-2" />
                  Trust Center
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Verified className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-semibold text-foreground">Verified Secure Platform</div>
                      <div className="text-sm text-text-secondary">SSL encrypted and security audited</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-semibold text-foreground">Buyer Protection Guarantee</div>
                      <div className="text-sm text-text-secondary">100% satisfaction guaranteed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-8 h-8 text-purple-500" />
                    <div>
                      <div className="font-semibold text-foreground">Identity Verified Users</div>
                      <div className="text-sm text-text-secondary">All users are ID verified</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;