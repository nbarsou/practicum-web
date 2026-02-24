'use client';

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';

interface BarChartProps<T> {
  data: T[];
  config: ChartConfig;
  title: string;
  description: string;
  dataKey: Extract<keyof T, string>;
  categoryKey: Extract<keyof T, string>;
  showLabels?: boolean;
  showGrid?: boolean;
  showYAxis?: boolean;
  footer?: React.ReactNode;
  className?: string;
  chartClassName?: string;
}

export function BarChart<T>({
  data,
  config,
  title,
  description,
  dataKey,
  categoryKey,
  showLabels = true,
  showGrid = true,
  showYAxis = false,
  footer,
  className,
  chartClassName = 'h-[300px]',
}: BarChartProps<T>) {
  // ------------------------------------------------------------------
  // DATA TRANSFORMATION & COLOR INJECTION
  // ------------------------------------------------------------------
  // What: Inspects the raw data and injects a 'fill' property into each item.
  // Why:  Recharts requires the 'fill' key on the data object to color individual slices.
  //       However, our database/API data should remain "pure" (color-agnostic).
  //       This transformation allows us to keep styling in the 'config' prop
  //       while automatically applying it to the chart data at runtime.
  const chartData = useMemo(() => {
    return data.map((item) => {
      const key = item[categoryKey] as string;
      const configItem = config[key];

      if (!configItem) {
        console.warn(`[BarChart] Missing config for: ${key}`);
      }

      return {
        ...item,
        fill: configItem?.color || 'var(--color-slate-500)',
      };
    });
  }, [data, config, categoryKey]);

  return (
    <Card className={`flex h-full flex-col ${className || ''}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className={`w-full ${chartClassName}`}>
          <RechartsBarChart accessibilityLayer data={chartData}>
            {showGrid && (
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
            )}
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            {showYAxis && (
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            )}
            <ChartTooltip
              cursor={{ fill: 'transparent' }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
              {showLabels && (
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              )}
            </Bar>
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

// Reusable Skeleton Component
interface BarChartSkeletonProps {
  className?: string;
  barCount?: number;
  chartClassName?: string;
}

export function BarChartSkeleton({
  className,
  barCount = 5,
  chartClassName = 'h-[300px]',
}: BarChartSkeletonProps) {
  // Generate varied heights for visual interest
  const loadingHeights = Array.from({ length: barCount }, (_, i) => {
    const baseHeights = [60, 45, 35, 30, 20];
    return baseHeights[i % baseHeights.length];
  });

  return (
    <Card className={`flex h-full flex-col ${className || ''}`}>
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-56" /> {/* Title */}
        <Skeleton className="h-4 w-72" /> {/* Description */}
      </CardHeader>
      <CardContent
        className={`mt-2 flex items-end justify-between gap-4 px-6 ${chartClassName}`}
      >
        {loadingHeights.map((height, i) => (
          <div key={i} className="flex w-full flex-col items-center gap-2">
            {/* The Bar */}
            <Skeleton
              className="w-full rounded-t-lg"
              style={{ height: `${height}%` }}
            />
            {/* The X Axis Label */}
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
