import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Star, 
  Plus, 
  Edit, 
  Trash2, 
  Clock,
  DollarSign,
  CheckCircle
} from "lucide-react";

interface FeaturingPackage {
  id: string;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  features: string[];
  is_active: boolean;
}

const FeaturingPackagesManager = () => {
  const [packages, setPackages] = useState<FeaturingPackage[]>([
    {
      id: "1",
      name: "Basic Featuring",
      description: "Get your car featured for better visibility",
      duration_days: 7,
      price: 2500,
      features: ["Homepage spotlight", "Search priority", "7 days visibility"],
      is_active: true
    },
    {
      id: "2",
      name: "Premium Featuring", 
      description: "Maximum exposure for your vehicle listing",
      duration_days: 30,
      price: 8000,
      features: ["Homepage spotlight", "Search priority", "Social media promotion", "30 days visibility", "Priority support"],
      is_active: true
    },
    {
      id: "3",
      name: "Gold Featuring",
      description: "Ultimate visibility package with exclusive benefits",
      duration_days: 60,
      price: 15000,
      features: ["Homepage spotlight", "Search priority", "Social media promotion", "60 days visibility", "Priority support", "Professional photography", "Video showcase"],
      is_active: true
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<FeaturingPackage | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_days: 7,
    price: 0,
    features: "",
    is_active: true
  });

  const handleAddPackage = () => {
    const newPackage: FeaturingPackage = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      duration_days: formData.duration_days,
      price: formData.price,
      features: formData.features.split('\n').filter(f => f.trim()),
      is_active: formData.is_active
    };
    setPackages([...packages, newPackage]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditPackage = (pkg: FeaturingPackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      duration_days: pkg.duration_days,
      price: pkg.price,
      features: pkg.features.join('\n'),
      is_active: pkg.is_active
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdatePackage = () => {
    if (!editingPackage) return;
    
    const updatedPackage: FeaturingPackage = {
      ...editingPackage,
      name: formData.name,
      description: formData.description,
      duration_days: formData.duration_days,
      price: formData.price,
      features: formData.features.split('\n').filter(f => f.trim()),
      is_active: formData.is_active
    };
    
    setPackages(packages.map(pkg => 
      pkg.id === editingPackage.id ? updatedPackage : pkg
    ));
    resetForm();
    setIsAddDialogOpen(false);
    setEditingPackage(null);
  };

  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, is_active: !pkg.is_active } : pkg
    ));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      duration_days: 7,
      price: 0,
      features: "",
      is_active: true
    });
  };

  const closeDialog = () => {
    setIsAddDialogOpen(false);
    setEditingPackage(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Featuring Packages</h2>
          <p className="text-text-secondary">Manage pricing and features for car listing promotions</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Package
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-dark-surface border-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{packages.length}</div>
            <div className="text-sm text-text-secondary">Total Packages</div>
          </CardContent>
        </Card>
        <Card className="bg-dark-surface border-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{packages.filter(pkg => pkg.is_active).length}</div>
            <div className="text-sm text-text-secondary">Active Packages</div>
          </CardContent>
        </Card>
        <Card className="bg-dark-surface border-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gold">
              PKR {packages.reduce((sum, pkg) => sum + pkg.price, 0).toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">Total Revenue Potential</div>
          </CardContent>
        </Card>
      </div>

      {/* Packages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="bg-dark-surface border-border hover:shadow-gold transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Star className="w-5 h-5 text-gold" />
                    {pkg.name}
                  </CardTitle>
                  <Badge variant={pkg.is_active ? "default" : "secondary"} className="mt-2">
                    {pkg.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm mb-4">{pkg.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="text-foreground">{pkg.duration_days} days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-foreground font-semibold">PKR {pkg.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Features:</h4>
                <ul className="space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditPackage(pkg)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleToggleActive(pkg.id)}
                  className={pkg.is_active ? "text-red-500" : "text-green-500"}
                >
                  {pkg.is_active ? "Deactivate" : "Activate"}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeletePackage(pkg.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? "Edit Package" : "Add New Package"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Package Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Premium Featuring"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Package description..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Duration (days)</label>
                <Input
                  type="number"
                  value={formData.duration_days}
                  onChange={(e) => setFormData({...formData, duration_days: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Price (PKR)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">Features (one per line)</label>
              <Textarea
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                placeholder="Homepage spotlight&#10;Search priority&#10;Social media promotion"
                rows={4}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              />
              <label htmlFor="is_active" className="text-sm text-foreground">Active package</label>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={closeDialog} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={editingPackage ? handleUpdatePackage : handleAddPackage}
                className="flex-1"
              >
                {editingPackage ? "Update" : "Create"} Package
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeaturingPackagesManager;