
"use client";

import 'leaflet/dist/leaflet.css';
import type L from 'leaflet'; // For type safety
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useRef, useEffect } from 'react'; // Ensure React is imported for JSX
import { Loader2 } from 'lucide-react';

const mapStyle = { height: '300px', width: '100%' };

interface TrackServiceMapProps {
  center: [number, number];
  providerName: string;
}

// A placeholder component to be used by MapContainer's placeholder prop
const MapPlaceholder = () => (
  <div style={mapStyle} className="aspect-video bg-muted rounded-lg flex items-center justify-center p-4 shadow">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="ml-2 text-muted-foreground">Initializing map...</p>
  </div>
);

const TrackServiceMap = ({ center, providerName }: TrackServiceMapProps) => {
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Cleanup effect: runs only on unmount because of the empty dependency array.
  // The `key` prop on this component in its parent (TrackServicePage) ensures 
  // it unmounts/remounts when the bookingId (and thus potentially 'center') changes.
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        // console.log("TrackServiceMap: Cleaning up Leaflet map instance on unmount.", mapInstanceRef.current);
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null; // Important to clear the ref
      }
    };
  }, []); // Empty dependency array ensures cleanup runs only on unmount

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={mapStyle}
      className="rounded-lg shadow-md"
      placeholder={<MapPlaceholder />} // Use the placeholder prop
      whenCreated={(mapInstance) => {
        // console.log("TrackServiceMap: Leaflet map instance created.", mapInstance);
        mapInstanceRef.current = mapInstance;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          {providerName}'s approximate location.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default TrackServiceMap;
