
"use client";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet icon paths with Webpack/Next.js
// Ensure these imports point to the correct files in your node_modules
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface TrackServiceMapProps {
  center: [number, number]; // [latitude, longitude]
  providerName: string;
}

const TrackServiceMap = ({ center, providerName }: TrackServiceMapProps) => {
  useEffect(() => {
    // This check is to prevent errors during server-side rendering or if L is undefined
    if (typeof window !== "undefined" && L && L.Icon && L.Icon.Default) {
        // Type assertion needed because _getIconUrl is private
        delete (L.Icon.Default.prototype as any)._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl.src,
            iconUrl: iconUrl.src,
            shadowUrl: shadowUrl.src,
        });
    }
  }, []);

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true} style={{ height: '300px', width: '100%' }} className="rounded-lg shadow-md">
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
