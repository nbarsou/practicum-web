'use client';

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

type AreaType = 'natural' | 'monotone' | 'step' | 'linear';

interface AreaConfig<T> {
  dataKey: Extract<keyof T, string>;
  stackId?: string;
  type?: AreaType;
  // Optional: override the fill opacity if needed
  fillOpacity?: number;
}

// 2. Update Props to use T
interface AreaChartProps<T> {
  data: T[];
  config: ChartConfig;
  title: string;
  description: string;
  areas: AreaConfig<T>[]; // Pass T to AreaConfig
  categoryKey: Extract<keyof T, string>; // Ensure category is a valid key
  showGrid?: boolean;
  showLegend?: boolean;
  showYAxis?: boolean;
  tickFormatter?: (value: string | number) => string;
  footer?: React.ReactNode;
  className?: string;
  chartClassName?: string;
}

// 3. Define the component with T extending a safe object type
export function AreaChart<T>({
  data,
  config,
  title,
  description,
  areas,
  categoryKey,
  showGrid = true,
  showLegend = true,
  showYAxis = false,
  tickFormatter,
  footer,
  className,
  chartClassName = 'aspect-auto h-[250px]',
}: AreaChartProps<T>) {
  return (
    <Card className={`flex h-full flex-col ${className || ''}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className={`w-full ${chartClassName}`}>
          <RechartsAreaChart data={data}>
            {/* Gradients for each area */}
            <defs>
              {areas.map((area) => {
                const colorKey = `--color-${area.dataKey}`;
                return (
                  <linearGradient
                    key={area.dataKey}
                    id={`fill${area.dataKey.charAt(0).toUpperCase() + area.dataKey.slice(1)}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={`var(${colorKey})`}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={`var(${colorKey})`}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                );
              })}
            </defs>

            {showGrid && <CartesianGrid vertical={false} />}

            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={tickFormatter}
            />

            {showYAxis && (
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            )}

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {areas.map((area) => {
              const gradientId = `fill${area.dataKey.charAt(0).toUpperCase() + area.dataKey.slice(1)}`;
              return (
                <Area
                  key={area.dataKey}
                  dataKey={area.dataKey}
                  type={area.type || 'natural'}
                  fill={`url(#${gradientId})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${area.dataKey})`}
                  stackId={area.stackId}
                />
              );
            })}

            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          </RechartsAreaChart>
        </ChartContainer>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

// Reusable Skeleton Component
interface AreaChartSkeletonProps {
  className?: string;
  dataPoints?: number;
  showLegend?: boolean;
  chartClassName?: string;
}

export function AreaChartSkeleton({
  className,
  dataPoints = 9,
  showLegend = true,
  chartClassName = 'h-[250px]',
}: AreaChartSkeletonProps) {
  // Generate varied heights for visual interest
  const loadingHeights = Array.from({ length: dataPoints }, (_, i) => {
    const pattern = [40, 70, 35, 80, 55, 90, 25, 65, 50];
    return pattern[i % pattern.length];
  });

  return (
    <Card className={`flex h-full flex-col ${className || ''}`}>
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {/* Mocking the chart area */}
        <div
          className={`mt-4 flex w-full flex-1 items-end justify-between gap-2 ${chartClassName}`}
        >
          {loadingHeights.map((height, i) => (
            <Skeleton
              key={i}
              className="w-full rounded-t-md"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Legend Mock */}
        {showLegend && (
          <div className="mt-2 flex justify-center gap-4">
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="h-3 w-20 rounded-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
