import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AddCar = () => {
  const [formData, setFormData] = useState({
    carName: "",
    brand: "",
    model: "",
    year: "",
    category: "",
    location: "",
    dailyRate: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    seats: "",
    description: "",
    withDriver: false,
    features: [] as string[],
    package: "basic" as "basic" | "featured" | "premium"
  });

  const [images, setImages] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState("");

  const brands = ["Toyota", "Suzuki", "Honda", "Hyundai", "KIA", "Mitsubishi", "Changan", "MG", "Haval", "Proton"];
  const categories = ["Sedan", "SUV", "Hatchback", "Luxury", "Van", "Pickup"];
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Car listing:", formData);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-dark-surface border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">List Your Car</CardTitle>
            <p className="text-text-secondary">Fill in the details to list your car for rent</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Car Name</Label>
                  <Input
                    placeholder="e.g., Toyota Corolla GLi"
                    className="bg-dark-elevated border-border text-foreground"
                    value={formData.carName}
                    onChange={(e) => setFormData({...formData, carName: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Brand</Label>
                  <Select onValueChange={(value) => setFormData({...formData, brand: value})}>
                    <SelectTrigger className="bg-dark-elevated border-border text-foreground">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Model</Label>
                  <Input
                    placeholder="e.g., Corolla"
                    className="bg-dark-elevated border-border text-foreground"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Year</Label>
                  <Input
                    type="number"
                    placeholder="2023"
                    className="bg-dark-elevated border-border text-foreground"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Category</Label>
                  <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="bg-dark-elevated border-border text-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Location</Label>
                  <Select onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger className="bg-dark-elevated border-border text-foreground">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pricing and Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Daily Rate (Rs)</Label>
                  <Input
                    type="number"
                    placeholder="5000"
                    className="bg-dark-elevated border-border text-foreground"
                    value={formData.dailyRate}
                    onChange={(e) => setFormData({...formData, dailyRate: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Mileage (km/l)</Label>
                  <Input
                    placeholder="15"
                    className="bg-dark-elevated border-border text-foreground"
                    value={formData.mileage}
                    onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Seats</Label>
                  <Input
                    type="number"
                    placeholder="5"
                    className="bg-dark-elevated border-border text-foreground"
                    value={formData.seats}
                    onChange={(e) => setFormData({...formData, seats: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Transmission</Label>
                  <Select onValueChange={(value) => setFormData({...formData, transmission: value})}>
                    <SelectTrigger className="bg-dark-elevated border-border text-foreground">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Fuel Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, fuelType: value})}>
                    <SelectTrigger className="bg-dark-elevated border-border text-foreground">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Driver Option */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.withDriver}
                  onCheckedChange={(checked) => setFormData({...formData, withDriver: checked})}
                />
                <Label className="text-foreground">Available with Driver</Label>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label className="text-foreground">Features</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature (e.g., Air Conditioning)"
                    className="bg-dark-elevated border-border text-foreground"
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} variant="luxury">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Listing Package */}
              <div className="space-y-4">
                <Label className="text-foreground">Listing Package</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Basic Package */}
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      formData.package === 'basic' 
                        ? 'border-gold shadow-gold bg-gold/5' 
                        : 'border-border hover:border-gold/50'
                    }`}
                    onClick={() => setFormData({...formData, package: 'basic'})}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">B</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Basic</h3>
                      <p className="text-sm text-text-secondary mb-3">Standard listing</p>
                      <p className="text-lg font-bold text-foreground">Free</p>
                      <ul className="text-xs text-text-secondary mt-2 space-y-1">
                        <li>• Standard search placement</li>
                        <li>• Basic visibility</li>
                        <li>• 30 days listing</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Featured Package */}
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      formData.package === 'featured' 
                        ? 'border-gold shadow-gold bg-gold/5' 
                        : 'border-border hover:border-gold/50'
                    }`}
                    onClick={() => setFormData({...formData, package: 'featured'})}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-foreground font-bold">F</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Featured</h3>
                      <p className="text-sm text-text-secondary mb-3">Enhanced visibility</p>
                      <p className="text-lg font-bold text-gold">Rs 2,000</p>
                      <ul className="text-xs text-text-secondary mt-2 space-y-1">
                        <li>• Featured badge</li>
                        <li>• Higher search ranking</li>
                        <li>• 45 days listing</li>
                        <li>• Priority support</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Premium Package */}
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      formData.package === 'premium' 
                        ? 'border-gold shadow-gold bg-gold/5' 
                        : 'border-border hover:border-gold/50'
                    }`}
                    onClick={() => setFormData({...formData, package: 'premium'})}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-foreground font-bold">P</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Premium</h3>
                      <p className="text-sm text-text-secondary mb-3">Maximum exposure</p>
                      <p className="text-lg font-bold text-gold">Rs 5,000</p>
                      <ul className="text-xs text-text-secondary mt-2 space-y-1">
                        <li>• Top search placement</li>
                        <li>• Homepage featured</li>
                        <li>• 60 days listing</li>
                        <li>• Dedicated support</li>
                        <li>• Social media promotion</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-400">
                    💡 Featured and Premium packages include better visibility and more inquiries for your listing.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <Textarea
                  placeholder="Describe your car, its condition, and any additional information..."
                  className="bg-dark-elevated border-border text-foreground"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-foreground">Upload Images</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-text-secondary">PNG, JPG up to 10MB each</p>
                  <Button type="button" variant="luxury" className="mt-4">
                    Select Images
                  </Button>
                </div>
              </div>

              <Button type="submit" variant="premium" className="w-full" size="lg">
                List My Car
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddCar;