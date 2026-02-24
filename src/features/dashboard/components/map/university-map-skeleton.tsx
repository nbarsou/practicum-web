import { MapPin } from 'lucide-react';

export function UniversityMapSkeleton() {
  return (
    <div className="bg-muted flex h-[420px] w-full animate-pulse items-center justify-center rounded-xl border shadow-sm">
      <div className="text-muted-foreground/40 flex flex-col items-center gap-2">
        <MapPin className="h-10 w-10" />
        <span className="text-sm font-medium">Cargando mapa...</span>
      </div>
    </div>
  );
}

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  info: string;
}
