import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Star, Trash2, Edit, Eye } from "lucide-react";

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
  position: number;
}

interface AdminCarCardProps {
  car: Car;
  onToggleFeatured: (carId: string) => void;
  onDelete: (carId: string) => void;
}

export const AdminCarCard = ({ car, onToggleFeatured, onDelete }: AdminCarCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: car.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500";
      case "rented":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className="cursor-move">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Drag Handle */}
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Car Image */}
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Car Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{car.name}</h3>
              {car.featured && (
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {car.brand} • {car.year} • {car.location}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{car.category}</Badge>
              <Badge 
                className={`${getAvailabilityColor(car.availability)} text-white`}
              >
                {car.availability}
              </Badge>
              <span className="text-sm font-medium">${car.rate}/day</span>
            </div>
          </div>

          {/* Position Indicator */}
          <div className="text-sm text-muted-foreground">
            Position: {car.position}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Featured Toggle */}
            <div className="flex items-center gap-2">
              <label className="text-sm">Featured:</label>
              <Switch 
                checked={car.featured}
                onCheckedChange={() => onToggleFeatured(car.id)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(car.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};