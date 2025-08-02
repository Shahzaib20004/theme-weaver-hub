import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car, DollarSign, MapPin, Camera, Star, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import LocationPicker from "@/components/LocationPicker";
import PaymentModal from "@/components/PaymentModal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { testDatabaseConnection } from "@/utils/setupDatabase";

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  area: string;
}

const AddCar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    carName: "",
    brand: "",
    model: "",
    year: "",
    category: "",
    dailyRate: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    seats: "",
    description: "",
    withDriver: false,
    features: [] as string[],
    package: "basic" as "basic" | "featured" | "premium",
    condition: "",
    color: "",
    engineCapacity: "",
    registrationCity: ""
  });

  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [currentFeature, setCurrentFeature] = useState("");

  const brands = ["Toyota", "Suzuki", "Honda", "Hyundai", "KIA", "Mitsubishi", "Changan", "MG", "Haval", "Proton", "BMW", "Mercedes", "Audi", "Nissan", "Mazda", "Volkswagen"];
  const categories = ["Sedan", "SUV", "Hatchback", "Luxury", "Van", "Pickup", "Coupe", "Convertible"];
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Gujranwala", "Sialkot"];
  const conditions = ["Excellent", "Good", "Fair", "Needs Work"];
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Hybrid", "Electric"];
  const transmissions = ["Manual", "Automatic", "CVT"];

  const packageDetails = {
    basic: { price: 0, days: 7, features: ["Basic listing", "Standard visibility"] },
    featured: { price: 1000, days: 30, features: ["Featured placement", "Enhanced visibility", "Priority support"] },
    premium: { price: 5000, days: 60, features: ["Top placement", "Maximum visibility", "Premium badge", "Social media promotion"] }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.carName || !formData.brand || !formData.model || !formData.year) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required car details.",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Missing Images",
        description: "Please upload at least one car image.",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Missing Location",
        description: "Please set the car location.",
        variant: "destructive",
      });
      return;
    }

    if (formData.package !== "basic") {
      setShowPaymentModal(true);
      return;
    }

    await submitListing();
  };

  const submitListing = async (paymentData?: any) => {
    setIsSubmitting(true);

    try {
      // First, test database connection
      const dbTest = await testDatabaseConnection();
      if (!dbTest.success) {
        throw new Error('Database connection failed. Please contact support.');
      }

      // Get brand_id from brand name
      let brandId = null;
      if (formData.brand) {
        const { data: brandData } = await supabase
          .from('car_brands')
          .select('id')
          .eq('name', formData.brand)
          .single();
        brandId = brandData?.id;
      }

      // Get category_id from category name
      let categoryId = null;
      if (formData.category) {
        const { data: categoryData } = await supabase
          .from('car_categories')
          .select('id')
          .eq('name', formData.category)
          .single();
        categoryId = categoryData?.id;
      }
      const listingData = {
        ...formData,
        images,
        location,
        paymentData,
        userId: user?.id,
        status: 'pending_approval',
        submissionDate: new Date().toISOString(),
        packageType: formData.package,
        packagePrice: packageDetails[formData.package].price,
        expiryDate: new Date(Date.now() + packageDetails[formData.package].days * 24 * 60 * 60 * 1000).toISOString()
      };

      // Insert into Supabase (matching your actual database schema)
      const { error } = await supabase
        .from('cars')
        .insert([{
          title: formData.carName,
          description: formData.description,
          model: formData.model,
          year: parseInt(formData.year),
          price_per_day: parseFloat(formData.dailyRate),
          mileage: parseInt(formData.mileage) || null,
          transmission: formData.transmission,
          fuel_type: formData.fuelType,
          color: formData.color,
          images: images,
          location: location?.address || null,
          latitude: location?.latitude || null,
          longitude: location?.longitude || null,
          is_featured: formData.package !== 'basic',
          is_available: true,
          user_id: user?.id,
          brand_id: brandId,
          category_id: categoryId
        }]);

      if (error) throw error;

      toast({
        title: "Listing Submitted!",
        description: "Your car listing has been submitted for admin approval. You'll be notified once it's reviewed.",
      });

      // Reset form
      setFormData({
        carName: "",
        brand: "",
        model: "",
        year: "",
        category: "",
        dailyRate: "",
        mileage: "",
        transmission: "",
        fuelType: "",
        seats: "",
        description: "",
        withDriver: false,
        features: [],
        package: "basic",
        condition: "",
        color: "",
        engineCapacity: "",
        registrationCity: ""
      });
      setImages([]);
      setLocation(null);
      setCurrentStep(1);

    } catch (error: any) {
      console.error('Error submitting listing:', error);
      const errorMessage = error?.message || error?.error_description || "Failed to submit listing. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowPaymentModal(false);
    }
  };

  const addFeature = () => {
    if (currentFeature.trim() && !formData.features.includes(currentFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, currentFeature.trim()]
      });
      setCurrentFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f !== feature)
    });
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">List Your Car</h1>
            <p className="text-muted-foreground">
              Share your vehicle with our community and earn money
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-gold text-dark' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-20 mx-2 ${
                    currentStep > step ? 'bg-gold' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-gold" />
                    Basic Car Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="carName">Car Name *</Label>
                      <Input
                        id="carName"
                        value={formData.carName}
                        onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
                        placeholder="e.g., Toyota Corolla GLi"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand *</Label>
                      <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        placeholder="e.g., Corolla"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        type="number"
                        min="1990"
                        max="2025"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="2020"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="e.g., White"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map(condition => (
                            <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mileage">Mileage (km)</Label>
                      <Input
                        id="mileage"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                        placeholder="50,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="engineCapacity">Engine (cc)</Label>
                      <Input
                        id="engineCapacity"
                        value={formData.engineCapacity}
                        onChange={(e) => setFormData({ ...formData, engineCapacity: e.target.value })}
                        placeholder="1300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select value={formData.transmission} onValueChange={(value) => setFormData({ ...formData, transmission: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          {transmissions.map(transmission => (
                            <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select value={formData.fuelType} onValueChange={(value) => setFormData({ ...formData, fuelType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="seats">Seats</Label>
                      <Input
                        id="seats"
                        type="number"
                        min="2"
                        max="15"
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registrationCity">Registration City</Label>
                    <Select value={formData.registrationCity} onValueChange={(value) => setFormData({ ...formData, registrationCity: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select registration city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Next Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Images */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-gold" />
                    Car Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload 
                    images={images} 
                    onImagesChange={setImages}
                    maxImages={10}
                  />
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button type="button" onClick={nextStep} disabled={images.length === 0}>
                      Next Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div>
                <LocationPicker 
                  location={location} 
                  onLocationChange={setLocation}
                />
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep} disabled={!location}>
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Details & Package */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="dailyRate">Daily Rate (PKR) *</Label>
                      <Input
                        id="dailyRate"
                        type="number"
                        value={formData.dailyRate}
                        onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                        placeholder="5000"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your car's condition, special features, etc."
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="withDriver">Available with Driver</Label>
                      <Switch
                        id="withDriver"
                        checked={formData.withDriver}
                        onCheckedChange={(checked) => setFormData({ ...formData, withDriver: checked })}
                      />
                    </div>

                    <div>
                      <Label>Car Features</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={currentFeature}
                          onChange={(e) => setCurrentFeature(e.target.value)}
                          placeholder="Add a feature"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        />
                        <Button type="button" onClick={addFeature}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeFeature(feature)}
                          >
                            {feature} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Package Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-gold" />
                      Choose Your Package
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.package} 
                      onValueChange={(value: "basic" | "featured" | "premium") => setFormData({ ...formData, package: value })}
                    >
                      {Object.entries(packageDetails).map(([key, details]) => (
                        <div key={key} className="flex items-center space-x-2 p-4 border rounded-lg hover:border-gold/50 transition-colors">
                          <RadioGroupItem value={key} id={key} />
                          <div className="flex-1">
                            <Label htmlFor={key} className="cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium capitalize">{key} Package</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {details.features.join(", ")}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Active for {details.days} days
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-gold">
                                    {details.price === 0 ? "FREE" : `PKR ${details.price}`}
                                  </p>
                                </div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-gold hover:bg-gold/90 text-dark">
                    {isSubmitting ? "Submitting..." : "Submit Listing"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        packageType={formData.package}
        onPaymentSubmit={submitListing}
      />
    </div>
  );
};

export default AddCar;