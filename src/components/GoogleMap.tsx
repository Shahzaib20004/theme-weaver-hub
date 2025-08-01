import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    info?: string;
  }>;
  height?: string;
  width?: string;
}

const GoogleMap = ({ 
  center = { lat: 24.8607, lng: 67.0011 }, // Karachi, Pakistan
  zoom = 10,
  markers = [],
  height = '400px',
  width = '100%'
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places'],
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');

        if (mapRef.current) {
          const mapInstance = new Map(mapRef.current, {
            center,
            zoom,
            mapId: 'kaar-rentals-map',
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#1a1a1a' }]
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#ffffff' }]
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#000000' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#2a2a2a' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#0f4c75' }]
              }
            ]
          });

          setMap(mapInstance);

          // Add markers
          markers.forEach((markerData) => {
            const marker = new AdvancedMarkerElement({
              map: mapInstance,
              position: markerData.position,
              title: markerData.title,
            });

            if (markerData.info) {
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="color: #000; padding: 8px;">
                    <h3 style="margin: 0 0 8px 0; color: #d4af37;">${markerData.title}</h3>
                    <p style="margin: 0; font-size: 14px;">${markerData.info}</p>
                  </div>
                `,
              });

              marker.addListener('click', () => {
                infoWindow.open(mapInstance, marker);
              });
            }
          });

          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key.');
        setLoading(false);
      }
    };

    initializeMap();
  }, [center, zoom, markers]);

  if (loading) {
    return (
      <div 
        style={{ height, width }}
        className="flex items-center justify-center bg-dark-surface border border-border rounded-lg"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={{ height, width }}
        className="flex items-center justify-center bg-dark-surface border border-border rounded-lg"
      >
        <div className="text-center">
          <p className="text-red-500 mb-2">Map Error</p>
          <p className="text-text-secondary text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      style={{ height, width }}
      className="rounded-lg border border-border"
    />
  );
};

export default GoogleMap;