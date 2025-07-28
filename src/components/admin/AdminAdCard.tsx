import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Trash2, Edit, Eye, ExternalLink } from "lucide-react";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  position: number;
  active: boolean;
  placement: "hero" | "sidebar" | "footer" | "between-cars";
}

interface AdminAdCardProps {
  ad: Ad;
  onToggleActive: (adId: string) => void;
  onDelete: (adId: string) => void;
}

export const AdminAdCard = ({ ad, onToggleActive, onDelete }: AdminAdCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ad.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPlacementColor = (placement: string) => {
    switch (placement) {
      case "hero":
        return "bg-blue-500";
      case "sidebar":
        return "bg-green-500";
      case "footer":
        return "bg-purple-500";
      case "between-cars":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPlacementLabel = (placement: string) => {
    switch (placement) {
      case "hero":
        return "Hero Section";
      case "sidebar":
        return "Sidebar";
      case "footer":
        return "Footer";
      case "between-cars":
        return "Between Cars";
      default:
        return placement;
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

          {/* Ad Image */}
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Ad Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{ad.title}</h3>
              {!ad.active && (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {ad.description}
            </p>
            <div className="flex items-center gap-2">
              <Badge 
                className={`${getPlacementColor(ad.placement)} text-white`}
              >
                {getPlacementLabel(ad.placement)}
              </Badge>
              {ad.link && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate max-w-32">{ad.link}</span>
                </div>
              )}
            </div>
          </div>

          {/* Position Indicator */}
          <div className="text-sm text-muted-foreground">
            Position: {ad.position}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Active Toggle */}
            <div className="flex items-center gap-2">
              <label className="text-sm">Active:</label>
              <Switch 
                checked={ad.active}
                onCheckedChange={() => onToggleActive(ad.id)}
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
                onClick={() => onDelete(ad.id)}
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