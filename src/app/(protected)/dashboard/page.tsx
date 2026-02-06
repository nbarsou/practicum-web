'use client';

import { TrendingUp, Globe } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Area,
  AreaChart,
  Label,
  LabelList,
} from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';

// --- DATA CONFIGURATION ---
const COUNTRY_DATA = [
  { country: 'España', agreements: 45, fill: 'var(--color-spain)' },
  { country: 'EUA', agreements: 32, fill: 'var(--color-usa)' },
  { country: 'Francia', agreements: 28, fill: 'var(--color-france)' },
  { country: 'Alemania', agreements: 24, fill: 'var(--color-germany)' },
  { country: 'Italia', agreements: 18, fill: 'var(--color-italy)' },
];

const COUNTRY_CONFIG = {
  agreements: { label: 'Convenios' },
  spain: { label: 'España', color: '#ff5900' },
  usa: { label: 'EUA', color: '#1f2937' },
  france: { label: 'Francia', color: '#d97706' },
  germany: { label: 'Alemania', color: '#475569' },
  italy: { label: 'Italia', color: '#94a3b8' },
} satisfies ChartConfig;

const CAMPUS_DATA = [
  { campus: 'norte', visitors: 120, fill: 'var(--color-norte)' },
  { campus: 'sur', visitors: 85, fill: 'var(--color-sur)' },
  { campus: 'mex', visitors: 45, fill: 'var(--color-mex)' },
  { campus: 'virtual', visitors: 10, fill: 'var(--color-virtual)' },
];

const CAMPUS_CONFIG = {
  visitors: { label: 'Estudiantes' },
  norte: { label: 'Campus Norte', color: '#ff5900' },
  sur: { label: 'Campus Sur', color: '#0f172a' },
  mex: { label: 'Campus México', color: '#ea580c' },
  virtual: { label: 'Virtual', color: '#cbd5e1' },
} satisfies ChartConfig;

const GROWTH_DATA = [
  { month: 'Ene', active: 80, pending: 5 },
  { month: 'Feb', active: 85, pending: 8 },
  { month: 'Mar', active: 92, pending: 12 },
  { month: 'Abr', active: 95, pending: 10 },
  { month: 'May', active: 105, pending: 15 },
  { month: 'Jun', active: 112, pending: 8 },
  { month: 'Jul', active: 112, pending: 4 },
  { month: 'Ago', active: 120, pending: 20 },
  { month: 'Sep', active: 135, pending: 18 },
];

const GROWTH_CONFIG = {
  active: { label: 'Activos', color: '#ff5900' },
  pending: { label: 'En Trámite', color: '#64748b' },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <>
      {/* HEADER */}
      <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">
            Panel de Indicadores
          </h1>
          <p className="text-muted-foreground text-xs">
            Vista general de internacionalización Anáhuac
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* CONTENT */}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* ROW 1 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* DONUT CHART */}
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Participación por Campus</CardTitle>
              <CardDescription>
                Estudiantes de intercambio activos
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={CAMPUS_CONFIG}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={CAMPUS_DATA}
                    dataKey="visitors"
                    nameKey="campus"
                    innerRadius={60}
                    strokeWidth={5}
                  >
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
                                260
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground text-xs"
                              >
                                Total Alumnos
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Campus Norte lidera con 46%{' '}
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </CardFooter>
          </Card>

          {/* AREA CHART */}
          <Card className="col-span-1 flex flex-col lg:col-span-2">
            <CardHeader>
              <CardTitle>Crecimiento de Convenios</CardTitle>
              <CardDescription>
                Comparativa: Activos vs. En Trámite (2024)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={GROWTH_CONFIG}
                className="aspect-auto h-[250px] w-full"
              >
                <AreaChart data={GROWTH_DATA}>
                  <defs>
                    <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-active)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-active)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="fillPending"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-pending)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-pending)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="pending"
                    type="natural"
                    fill="url(#fillPending)"
                    fillOpacity={0.4}
                    stroke="var(--color-pending)"
                    stackId="a"
                  />
                  <Area
                    dataKey="active"
                    type="natural"
                    fill="url(#fillActive)"
                    fillOpacity={0.4}
                    stroke="var(--color-active)"
                    stackId="a"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* ROW 2: BAR CHART */}
        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Top Destinos Internacionales</CardTitle>
              <CardDescription>
                Países con mayor número de acuerdos firmados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={COUNTRY_CONFIG}
                className="h-[300px] w-full"
              >
                <BarChart accessibilityLayer data={COUNTRY_DATA}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="country"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'transparent' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="agreements" radius={[8, 8, 0, 0]}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
