
"use client";

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression, Map as LeafletMap } from 'leaflet';

interface TrackServiceMapProps {
  center: LatLngExpression;
  providerName: string;
}

const mapStyle: React.CSSProperties = { height: '300px', width: '100%' };

export default function TrackServiceMap({ center, providerName }: TrackServiceMapProps) {
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    // Cleanup function to remove the map instance when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        console.log("Leaflet map instance removed on TrackServiceMap unmount.");
      }
    };
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={mapStyle}
      className="rounded-lg shadow-md"
      whenCreated={(mapInstance) => {
        mapInstanceRef.current = mapInstance;
        console.log("Leaflet map instance created.");
      }}
      placeholder={ // Added placeholder
        <div style={mapStyle} className="flex items-center justify-center bg-muted rounded-lg">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      }
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          {providerName} is here.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
