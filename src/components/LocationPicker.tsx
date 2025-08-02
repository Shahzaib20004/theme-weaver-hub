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
          // Use Google Maps Geocoding API for reverse geocoding
          if (GOOGLE_MAPS_API_KEY) {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            
            if (data.status === 'OK' && data.results.length > 0) {
              const result = data.results[0];
              const addressComponents = result.address_components;
              
              // Extract address components
              const streetNumber = addressComponents.find(c => c.types.includes('street_number'))?.long_name || '';
              const route = addressComponents.find(c => c.types.includes('route'))?.long_name || '';
              const sublocality = addressComponents.find(c => c.types.includes('sublocality_level_1'))?.long_name || '';
              const locality = addressComponents.find(c => c.types.includes('locality'))?.long_name || '';
              const city = addressComponents.find(c => c.types.includes('administrative_area_level_2'))?.long_name || 
                          addressComponents.find(c => c.types.includes('locality'))?.long_name || 'Unknown City';
              
              // Construct full address
              const addressParts = [streetNumber, route].filter(Boolean);
              const fullAddress = addressParts.length > 0 ? addressParts.join(' ') : result.formatted_address;
              
              const locationData: LocationData = {
                latitude,
                longitude,
                address: fullAddress,
                city: city,
                area: sublocality || locality || 'Unknown Area'
              };

              onLocationChange(locationData);
            } else {
              throw new Error('Geocoding failed');
            }
          } else {
            // Fallback when API key is not available
            const locationData: LocationData = {
              latitude,
              longitude,
              address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
              city: 'Unknown City',
              area: 'Unknown Area'
            };

            onLocationChange(locationData);
          }
          
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

    try {
      // Use Google Maps Geocoding API for forward geocoding
      if (GOOGLE_MAPS_API_KEY) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        
        if (data.status === 'OK' && data.results.length > 0) {
          const result = data.results[0];
          const { lat, lng } = result.geometry.location;
          const addressComponents = result.address_components;
          
          // Extract address components
          const sublocality = addressComponents.find(c => c.types.includes('sublocality_level_1'))?.long_name || '';
          const locality = addressComponents.find(c => c.types.includes('locality'))?.long_name || '';
          const city = addressComponents.find(c => c.types.includes('administrative_area_level_2'))?.long_name || 
                      addressComponents.find(c => c.types.includes('locality'))?.long_name || 'Unknown City';
          
          const locationData: LocationData = {
            latitude: lat,
            longitude: lng,
            address: result.formatted_address,
            city: city,
            area: sublocality || locality || 'Unknown Area'
          };

          onLocationChange(locationData);
          
          toast({
            title: "Location found",
            description: "Address location has been set successfully.",
          });
        } else {
          toast({
            title: "Address not found",
            description: "Could not find the specified address. Please try a different search.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Search unavailable",
          description: "Address search is currently being configured.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search error",
        description: "Failed to search for the address. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gold" />
          Car Location
        </CardTitle>
        {!GOOGLE_MAPS_API_KEY && (
          <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <MapPin className="w-4 h-4 text-blue-500" />
            <p className="text-sm text-blue-400">
              Interactive map is being configured. You can add your location manually below.
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
                    <p className="text-xs text-blue-400 mt-2">
                      Interactive map coming soon
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