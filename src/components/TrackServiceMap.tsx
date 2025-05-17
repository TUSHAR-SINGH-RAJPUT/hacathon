
"use client";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import L
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState, useRef } from 'react'; // Import React

// Define style outside to prevent re-creation on every render
const mapStyle = { height: '300px', width: '100%' };

interface TrackServiceMapProps {
  center: [number, number]; // [latitude, longitude]
  providerName: string;
}

const TrackServiceMap = ({ center, providerName }: TrackServiceMapProps) => {
  const [isClientReady, setIsClientReady] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    setIsClientReady(true);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  if (!isClientReady) {
    return <div style={mapStyle} className="rounded-lg shadow-md bg-muted flex items-center justify-center"><p>Initializing map...</p></div>;
  }

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={mapStyle}
      className="rounded-lg shadow-md"
      whenCreated={(mapInstance) => {
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
