import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Search, AlertCircle } from "lucide-react";
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

  // Google Maps API key - should be set in environment variables
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (location && GOOGLE_MAPS_API_KEY) {
      // Generate Google Maps embed URL
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${location.latitude},${location.longitude}&zoom=15`;
      setMapUrl(embedUrl);
    }
  }, [location, GOOGLE_MAPS_API_KEY]);

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
          // You can implement reverse geocoding here using Google Maps Geocoding API
          // For now, using mock data
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

    // For production, you would use Google Maps Geocoding API here
    // Mock search functionality for now
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
        {!GOOGLE_MAPS_API_KEY && (
          <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <p className="text-sm text-yellow-600">
              Google Maps API key not configured. Add VITE_GOOGLE_MAPS_API_KEY to your environment variables for full map functionality.
            </p>
          </div>
        )}
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

            {/* Map Display */}
            <div className="w-full h-64 bg-dark-elevated rounded-lg border border-border flex items-center justify-center">
              {GOOGLE_MAPS_API_KEY && mapUrl ? (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              ) : (
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gold mx-auto mb-2" />
                  <p className="text-foreground font-medium">Map Preview</p>
                  <p className="text-sm text-muted-foreground">
                    {location.city} - {location.area}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
                  </p>
                  {!GOOGLE_MAPS_API_KEY && (
                    <p className="text-xs text-yellow-500 mt-2">
                      Configure Google Maps API for interactive map
                    </p>
                  )}
                </div>
              )}
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