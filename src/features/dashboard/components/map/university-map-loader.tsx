'use client';

import dynamic from 'next/dynamic';
import {
  UniversityMapSkeleton,
  type MapPoint,
} from './university-map-skeleton';

const UniversityMap = dynamic(() => import('./university-map'), {
  ssr: false,
  loading: () => <UniversityMapSkeleton />,
});

interface UniversityMapLoaderProps {
  data: MapPoint[];
}

export function UniversityMapLoader({ data }: UniversityMapLoaderProps) {
  return <UniversityMap data={data} />;
}
