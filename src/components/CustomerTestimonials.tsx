import { Card, CardContent } from "@/components/ui/card";
import { Star, Verified, Heart, Quote, MapPin, Car, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CustomerTestimonials = () => {
  const testimonials = [
    {
      name: "Ahmed Hassan",
      location: "Karachi",
      rating: 5,
      text: "Found my dream Toyota Corolla through Kaar.Rentals. The dealer was verified and genuine. The whole process was smooth and transparent. Highly recommend this platform!",
      car: "Toyota Corolla 2020",
      dealerName: "Karachi Motors",
      verified: true,
      timeAgo: "2 weeks ago",
      helpful: 24
    },
    {
      name: "Fatima Sheikh",
      location: "Lahore", 
      rating: 5,
      text: "Excellent experience! Bought a Honda Civic from a verified dealer. Their customer support helped me throughout the process. Best car buying platform in Pakistan.",
      car: "Honda Civic 2019",
      dealerName: "Lahore Auto Center",
      verified: true,
      timeAgo: "1 month ago",
      helpful: 18
    },
    {
      name: "Muhammad Ali",
      location: "Islamabad",
      rating: 5, 
      text: "Safe and reliable platform. The verification process gave me confidence. Got my Suzuki Cultus at the best price with complete documentation.",
      car: "Suzuki Cultus 2021",
      dealerName: "Capital Cars",
      verified: true,
      timeAgo: "3 days ago",
      helpful: 31
    },
    {
      name: "Ayesha Khan",
      location: "Rawalpindi",
      rating: 5,
      text: "Amazing platform! The dealer was professional and the car was exactly as described. 24/7 support team was very helpful.",
      car: "Hyundai Elantra 2020",
      dealerName: "Twin City Motors", 
      verified: true,
      timeAgo: "1 week ago",
      helpful: 15
    },
    {
      name: "Hassan Malik",
      location: "Faisalabad",
      rating: 5,
      text: "Best car marketplace in Pakistan. Found my KIA Picanto with complete history and fair pricing. Trusted dealers and secure transactions.",
      car: "KIA Picanto 2022",
      dealerName: "Faisalabad Auto Mall",
      verified: true,
      timeAgo: "5 days ago", 
      helpful: 22
    },
    {
      name: "Zainab Ali",
      location: "Multan",
      rating: 5,
      text: "Impressed with the quality of service. The dealer was verified and provided complete vehicle inspection report. Smooth buying experience.",
      car: "Nissan March 2019",
      dealerName: "Multan Car Hub",
      verified: true,
      timeAgo: "2 weeks ago",
      helpful: 19
    }
  ];

  const successStories = [
    {
      title: "From Dream to Reality",
      story: "Ahmad saved for 2 years to buy his first car. Through Kaar.Rentals, he found a verified dealer in Karachi who offered the best price for a Toyota Corolla with complete documentation.",
      customer: "Ahmad Raza",
      location: "Karachi",
      car: "Toyota Corolla 2020"
    },
    {
      title: "Family Car Solution", 
      story: "Sarah needed a reliable family car for her growing family. She found a spacious Honda CR-V from a trusted dealer in Lahore with full warranty and service history.",
      customer: "Sarah Ahmed",
      location: "Lahore", 
      car: "Honda CR-V 2019"
    },
    {
      title: "First Car Experience",
      story: "Bilal, a fresh graduate, bought his first car through our platform. The dealer provided complete guidance and helped him understand all the paperwork.",
      customer: "Bilal Khan",
      location: "Islamabad",
      car: "Suzuki Cultus 2021"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-heart-pink/10 to-gold/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
            <Heart className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Customer Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Happy Customers Across Pakistan
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Thousands of satisfied customers have found their perfect cars through our trusted marketplace
          </p>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">4.8/5</div>
              <div className="text-sm text-text-secondary">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">50,000+</div>
              <div className="text-sm text-text-secondary">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">98%</div>
              <div className="text-sm text-text-secondary">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">1,500+</div>
              <div className="text-sm text-text-secondary">Cars Sold Monthly</div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-gold/50 transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-gold" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                  <span className="text-sm text-text-secondary ml-2">({testimonial.rating}.0)</span>
                </div>

                {/* Testimonial Text */}
                <p className="text-text-secondary italic leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Car Details */}
                <div className="bg-dark-elevated/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-gold" />
                    <span className="font-medium text-foreground">{testimonial.car}</span>
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    from {testimonial.dealerName}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-gold/20 to-gold-dark/20 rounded-full flex items-center justify-center">
                      <span className="text-gold font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm flex items-center gap-1">
                        {testimonial.name}
                        {testimonial.verified && (
                          <Verified className="w-3 h-3 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-text-secondary">{testimonial.timeAgo}</div>
                    <div className="text-green-500">{testimonial.helpful} helpful</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-gradient-to-br from-gold/5 to-gold-dark/5 border-gold/20 hover:border-gold/50 transition-all duration-300">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-foreground mb-4">{story.title}</h4>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {story.story}
                  </p>
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-foreground">{story.customer}</div>
                        <div className="text-sm text-text-secondary flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {story.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gold">{story.car}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Testimonials Section */}
        <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 rounded-3xl p-8 md:p-12 border border-gold/20 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See What Our Customers Say
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Watch real customer experiences and learn why they chose Kaar.Rentals for their car buying journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((video, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border group cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-dark-surface to-dark-elevated flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[12px] border-l-gold border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    2:30
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="font-semibold text-foreground mb-1">Customer Success Story #{index + 1}</div>
                  <div className="text-sm text-text-secondary">Real experience from Karachi customer</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Join Thousands of Happy Customers?
          </h3>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Start your car buying journey today and experience Pakistan's most trusted marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cars">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                <Car className="w-4 h-4 mr-2" />
                Find Your Car
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-dark">
                <Heart className="w-4 h-4 mr-2" />
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;