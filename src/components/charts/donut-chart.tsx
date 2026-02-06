'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Label } from 'recharts';
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

interface DonutChartProps<T> {
  data: T[];
  config: ChartConfig;
  title: string;
  description: string;
  dataKey: Extract<keyof T, string>;
  nameKey: Extract<keyof T, string>;
  footer?: {
    text: string;
    trend?: 'up' | 'down' | 'neutral';
  };
  centerLabel?: {
    valueKey?: Extract<keyof T, string>;
    label: string;
  };
  className?: string;
}

export function DonutChart<T>({
  data,
  config,
  title,
  description,
  dataKey,
  nameKey,
  footer,
  centerLabel,
  className,
}: DonutChartProps<T>) {
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
      // Get the identifier (e.g., 'norte' from item.campus)
      const key = item[nameKey] as string;
      // Find color in config
      const configItem = config[key];

      if (!configItem) {
        console.warn(
          `[DonutChart] Missing config for key: "${key}". Using fallback color.`
        );
      }

      return {
        ...item,
        // Inject the fill color required by Recharts
        fill: configItem?.color || 'var(--color-slate-500)',
      };
    });
  }, [data, config, nameKey]);

  // 2. Calculate Total
  const totalValue = useMemo(() => {
    if (!centerLabel) return 0;
    return chartData.reduce((acc, curr) => {
      const key = centerLabel.valueKey || dataKey;
      return acc + (Number(curr[key]) || 0);
    }, 0);
  }, [chartData, centerLabel, dataKey]);

  return (
    <Card className={`flex h-full flex-col ${className || ''}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
            >
              {centerLabel && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalValue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-xs"
                          >
                            {centerLabel.label}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              )}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            {footer.text}
            {footer.trend === 'up' && (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
            {footer.trend === 'down' && (
              <TrendingUp className="h-4 w-4 rotate-180 text-red-500" />
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

// Reusable Skeleton Component
export function DonutChartSkeleton({ className }: { className?: string }) {
  return (
    <Card className={`flex h-full flex-col ${className || ''}`}>
      <CardHeader className="items-center space-y-2 pb-0">
        <Skeleton className="h-6 w-1/2" /> {/* Title */}
        <Skeleton className="h-4 w-3/4" /> {/* Description */}
      </CardHeader>
      <CardContent className="flex flex-1 justify-center py-6 pb-0">
        {/* Simulating the donut chart circle */}
        <Skeleton className="h-50 w-50 rounded-full" />
      </CardContent>
      <CardFooter className="flex justify-center pt-0">
        <Skeleton className="h-4 w-2/3" />
      </CardFooter>
    </Card>
  );
}
