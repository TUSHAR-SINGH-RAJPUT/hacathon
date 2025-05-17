
"use client";

import 'leaflet/dist/leaflet.css';
// L is imported globally in RootLayout for icon setup.
// For type information and direct use in this client component, we might need it.
// However, for this simplification, we assume the global L is sufficient for react-leaflet.
import type L from 'leaflet'; // Use type import if L is only for types here
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useRef, useEffect } from 'react';

const mapStyle = { height: '300px', width: '100%' };

interface TrackServiceMapProps {
  center: [number, number];
  providerName: string;
}

const TrackServiceMap = ({ center, providerName }: TrackServiceMapProps) => {
  const mapInstanceRef = useRef<L.Map | null>(null);

  // This useEffect handles the cleanup of the map instance when the component unmounts.
  // This is critical for preventing the "Map container is already initialized" error,
  // especially when the component is remounted due to a key change (e.g., bookingId changing).
  useEffect(() => {
    // The return function is the cleanup function.
    return () => {
      if (mapInstanceRef.current) {
        // console.log("TrackServiceMap: Cleaning up Leaflet map instance", mapInstanceRef.current);
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount.

  // console.log("TrackServiceMap rendering with center:", center);

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={mapStyle}
      className="rounded-lg shadow-md"
      whenCreated={(mapInstance) => {
        // console.log("TrackServiceMap: Leaflet map instance created via whenCreated", mapInstance);
        mapInstanceRef.current = mapInstance;
      }}
      // placeholder={
      //   <div style={mapStyle} className="rounded-lg shadow-md bg-muted flex items-center justify-center">
      //     <p>Loading map...</p>
      //   </div>
      // }
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
