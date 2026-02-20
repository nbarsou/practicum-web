'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Building2, MapPin } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { MapPoint } from './university-map-skeleton';

export type { MapPoint };

function createPinIcon(isDark: boolean) {
  const fill = isDark ? 'oklch(0.922 0 0)' : 'oklch(0.205 0 0)';
  const stroke = isDark ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)';

  // MapPin shape from Lucide, rendered as inline SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3" fill="${stroke}" stroke="none"/>
    </svg>
  `;

  return L.divIcon({
    className: '',
    html: svg,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -26],
  });
}

const TILE_LAYERS = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
};

interface UniversityMapProps {
  data: MapPoint[];
}

export default function UniversityMap({ data }: UniversityMapProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const pinIcon = createPinIcon(isDark);
  const tile = resolvedTheme === 'dark' ? TILE_LAYERS.dark : TILE_LAYERS.light;

  return (
    // Add style height here in addition to the Tailwind class
    <div
      className="bg-muted relative z-0 w-full overflow-hidden rounded-xl border shadow-sm"
      style={{ height: '420px' }}
    >
      <MapContainer
        center={[20, 0]}
        zoom={2}
        // Make sure both inline style and Tailwind are set
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          url={tile.url}
          attribution={tile.attribution}
          detectRetina={true}
        />
        {data.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lng]} icon={pinIcon}>
            <Popup closeButton={false} offset={[0, -4]}>
              <div className="flex flex-col gap-1 px-1 py-0.5">
                <span className="text-foreground flex items-center gap-1.5 text-xs font-semibold">
                  <Building2 className="text-primary h-3 w-3" />
                  {item.name}
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <MapPin className="h-3 w-3" />
                  {item.info}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
