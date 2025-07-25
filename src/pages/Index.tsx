import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CarCategories from "@/components/CarCategories";
import CarBrands from "@/components/CarBrands";
import FeaturedCars from "@/components/FeaturedCars";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CarCategories />
      <CarBrands />
      <FeaturedCars />
      <Footer />
    </div>
  );
};

export default Index;
