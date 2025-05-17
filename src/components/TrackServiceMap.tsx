
"use client";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';

// Fix for default Leaflet icon paths with Webpack/Next.js
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface TrackServiceMapProps {
  center: [number, number]; // [latitude, longitude]
  providerName: string;
}

// Define style outside to prevent re-creation on every render
const mapStyle = { height: '300px', width: '100%' };

const TrackServiceMap = ({ center, providerName }: TrackServiceMapProps) => {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after initial mount
    setIsClientReady(true);

    // Configure Leaflet's default icon paths
    // This check is to prevent errors during server-side rendering or if L is undefined
    if (typeof window !== "undefined" && L && L.Icon && L.Icon.Default) {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl.src,
            iconUrl: iconUrl.src,
            shadowUrl: shadowUrl.src,
        });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  if (!isClientReady) {
    // Render nothing or a loading indicator until the client is ready
    // This helps prevent Leaflet from initializing on the server or too early on the client
    return <div style={mapStyle} className="rounded-lg shadow-md bg-muted flex items-center justify-center"><p>Loading map...</p></div>;
  }

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true} style={mapStyle} className="rounded-lg shadow-md">
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
