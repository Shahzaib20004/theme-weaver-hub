import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CarCategories from "@/components/CarCategories";
import CarBrands from "@/components/CarBrands";
import FeaturedCars from "@/components/FeaturedCars";
import Footer from "@/components/Footer";
import RealTimeStats from "@/components/RealTimeStats";
import RealTimeAvailability from "@/components/RealTimeAvailability";
import RealTimePricing from "@/components/RealTimePricing";
import HowItWorks from "@/components/HowItWorks";
import TrustSafety from "@/components/TrustSafety";
import PopularSearches from "@/components/PopularSearches";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import PakistaniFeatures from "@/components/PakistaniFeatures";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background mobile-scroll">
      <Header />
      <Hero />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Real-time Data Sections */}
      <div className="container mx-auto px-6 py-8">
        <RealTimeStats />
        <RealTimeAvailability />
        <RealTimePricing />
      </div>
      
      {/* Popular Searches */}
      <PopularSearches />
      
      {/* Car Categories & Brands */}
      <CarCategories />
      <CarBrands />
      
      {/* Featured Cars */}
      <FeaturedCars />
      
      {/* Pakistani Market Features */}
      <PakistaniFeatures />
      
      {/* Trust & Safety */}
      <TrustSafety />
      
      {/* Customer Testimonials */}
      <CustomerTestimonials />
      
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
