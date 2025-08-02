import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ images, onImagesChange, maxImages = 10 }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: "Too many images",
        description: `You can only upload up to ${maxImages} images.`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload only image files.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload images smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImagesChange([...images, imageUrl]);
      };
      reader.readAsDataURL(file);
    });

    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleGalleryUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleGalleryUpload}
          className="flex-1"
          disabled={isUploading || images.length >= maxImages}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Gallery
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCameraCapture}
          className="flex-1"
          disabled={isUploading || images.length >= maxImages}
        >
          <Camera className="w-4 h-4 mr-2" />
          Camera
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
      />

      {images.length === 0 && (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="p-8">
            <div className="text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                Upload car images
              </p>
              <p className="text-sm text-muted-foreground">
                Add up to {maxImages} high-quality photos
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Car image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="w-3 h-3" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-gold text-dark text-xs px-2 py-1 rounded">
                  Main
                </div>
              )}
            </div>
          ))}
          
          {images.length < maxImages && (
            <Card className="border-dashed border-2 border-border">
              <CardContent className="p-4 h-32 flex items-center justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleGalleryUpload}
                  className="w-full h-full flex flex-col items-center justify-center"
                  disabled={isUploading}
                >
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-xs">Add More</span>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {images.length}/{maxImages} images uploaded. First image will be the main photo.
      </p>
    </div>
  );
};

export default ImageUpload;