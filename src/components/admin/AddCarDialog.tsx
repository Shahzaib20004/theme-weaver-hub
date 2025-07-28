import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  location: string;
  rate: number;
  image: string;
  mileage: number;
  withDriver: boolean;
  availability: "available" | "rented" | "maintenance";
  featured: boolean;
  category: string;
  description: string;
}

interface AddCarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCar: (car: Car) => void;
}

export const AddCarDialog = ({ open, onOpenChange, onAddCar }: AddCarDialogProps) => {
  const [formData, setFormData] = useState<{
    name: string;
    brand: string;
    year: number;
    location: string;
    rate: number;
    image: string;
    mileage: number;
    withDriver: boolean;
    availability: "available" | "rented" | "maintenance";
    featured: boolean;
    category: string;
    description: string;
  }>({
    name: "",
    brand: "",
    year: new Date().getFullYear(),
    location: "",
    rate: 0,
    image: "/placeholder.svg",
    mileage: 0,
    withDriver: false,
    availability: "available",
    featured: false,
    category: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCar: Car = {
      id: Date.now().toString(),
      ...formData,
    };

    onAddCar(newCar);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: "",
      brand: "",
      year: new Date().getFullYear(),
      location: "",
      rate: 0,
      image: "/placeholder.svg",
      mileage: 0,
      withDriver: false,
      availability: "available",
      featured: false,
      category: "",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Car Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="rate">Daily Rate ($)</Label>
              <Input
                id="rate"
                type="number"
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Select 
                value={formData.availability} 
                onValueChange={(value) => 
                  setFormData({ ...formData, availability: value as "available" | "rented" | "maintenance" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/placeholder.svg"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="withDriver"
                checked={formData.withDriver}
                onCheckedChange={(checked) => setFormData({ ...formData, withDriver: checked })}
              />
              <Label htmlFor="withDriver">With Driver Available</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured Car</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Car</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};