import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  area: string;
}

interface LocationPickerProps {
  location: LocationData | null;
  onLocationChange: (location: LocationData) => void;
}

const LocationPicker = ({ location, onLocationChange }: LocationPickerProps) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (location) {
      // Generate Google Maps embed URL
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.latitude},${location.longitude}&zoom=15`;
      setMapUrl(embedUrl);
    }
  }, [location]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding using a mock service (replace with actual API)
          const mockAddress = `Street ${Math.floor(Math.random() * 100)}, Sector ${Math.floor(Math.random() * 20)}`;
          const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"];
          const randomCity = cities[Math.floor(Math.random() * cities.length)];
          
          const locationData: LocationData = {
            latitude,
            longitude,
            address: mockAddress,
            city: randomCity,
            area: `Area ${Math.floor(Math.random() * 50)}`
          };

          onLocationChange(locationData);
          
          toast({
            title: "Location found",
            description: "Your current location has been set successfully.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to get address details.",
            variant: "destructive",
          });
        }
        
        setIsGettingLocation(false);
      },
      (error) => {
        setIsGettingLocation(false);
        
        let errorMessage = "Failed to get your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const searchLocation = async () => {
    if (!searchAddress.trim()) {
      toast({
        title: "Enter address",
        description: "Please enter an address to search.",
        variant: "destructive",
      });
      return;
    }

    // Mock search functionality (replace with actual geocoding service)
    const mockCoordinates = {
      latitude: 24.8607 + (Math.random() - 0.5) * 0.1,
      longitude: 67.0011 + (Math.random() - 0.5) * 0.1
    };

    const locationData: LocationData = {
      ...mockCoordinates,
      address: searchAddress,
      city: "Karachi",
      area: "Area 1"
    };

    onLocationChange(locationData);
    
    toast({
      title: "Location found",
      description: "Address location has been set successfully.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gold" />
          Car Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Location Button */}
        <Button
          type="button"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="w-full bg-gold hover:bg-gold/90 text-dark"
        >
          <Navigation className="w-4 h-4 mr-2" />
          {isGettingLocation ? "Getting Location..." : "Use Current Location"}
        </Button>

        {/* Manual Address Search */}
        <div className="space-y-2">
          <Label htmlFor="search-address">Or enter address manually</Label>
          <div className="flex gap-2">
            <Input
              id="search-address"
              placeholder="Enter address, landmark, or area"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            />
            <Button
              type="button"
              variant="outline"
              onClick={searchLocation}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Location Display */}
        {location && (
          <div className="space-y-4">
            <div className="p-4 bg-dark-elevated rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Selected Location</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Address:</strong> {location.address}</p>
                <p><strong>City:</strong> {location.city}</p>
                <p><strong>Area:</strong> {location.area}</p>
                <p><strong>Coordinates:</strong> {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
              </div>
            </div>

            {/* Mock Map Display */}
            <div className="w-full h-64 bg-dark-elevated rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gold mx-auto mb-2" />
                <p className="text-foreground font-medium">Map Preview</p>
                <p className="text-sm text-muted-foreground">
                  {location.city} - {location.area}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://maps.google.com/?q=${location.latitude},${location.longitude}`, '_blank')}
              >
                View on Google Maps
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onLocationChange(null as any)}
              >
                Clear Location
              </Button>
            </div>
          </div>
        )}

        {!location && (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No location selected</p>
            <p className="text-sm">Use current location or search for an address</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationPicker;