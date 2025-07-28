import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  active: boolean;
  placement: "hero" | "sidebar" | "footer" | "between-cars";
}

interface AddAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAd: (ad: Ad) => void;
}

export const AddAdDialog = ({ open, onOpenChange, onAddAd }: AddAdDialogProps) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image: string;
    link: string;
    active: boolean;
    placement: "hero" | "sidebar" | "footer" | "between-cars";
  }>({
    title: "",
    description: "",
    image: "/placeholder.svg",
    link: "",
    active: true,
    placement: "hero",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAd: Ad = {
      id: Date.now().toString(),
      ...formData,
    };

    onAddAd(newAd);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      image: "/placeholder.svg",
      link: "",
      active: true,
      placement: "hero",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Advertisement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Ad Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="placement">Placement</Label>
              <Select 
                value={formData.placement} 
                onValueChange={(value) => 
                  setFormData({ ...formData, placement: value as "hero" | "sidebar" | "footer" | "between-cars" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                  <SelectItem value="between-cars">Between Cars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="link">Link URL</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
              />
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

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Active (Visible on website)</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Ad</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};