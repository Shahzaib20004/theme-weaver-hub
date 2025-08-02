import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CarCategories from "@/components/CarCategories";
import CarBrands from "@/components/CarBrands";
import FeaturedCars from "@/components/FeaturedCars";
import Footer from "@/components/Footer";
import RealTimeStats from "@/components/RealTimeStats";
import RealTimeAvailability from "@/components/RealTimeAvailability";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <div className="container mx-auto px-6 py-8">
        <RealTimeStats />
        <RealTimeAvailability />
      </div>
      <CarCategories />
      <CarBrands />
      <FeaturedCars />
      <Footer />
    </div>
  );
};

export default Index;
