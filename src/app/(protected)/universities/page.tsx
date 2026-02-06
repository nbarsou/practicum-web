'use client';

import {
  Filter,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  ExternalLink,
  MapPin,
  Building2,
  GraduationCap,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

// --- MOCK DATA: UNIVERSITIES ---
const UNIVERSITY_DATA = [
  {
    id: 'UNI-001',
    name: 'Yale University',
    country: 'EUA',
    city: 'New Haven',
    ranking: '#16 QS',
    type: 'Privada',
    agreements: 3,
    website: 'yale.edu',
  },
  {
    id: 'UNI-002',
    name: 'Universidad de Buenos Aires',
    country: 'Argentina',
    city: 'Buenos Aires',
    ranking: '#95 QS',
    type: 'Pública',
    agreements: 1,
    website: 'uba.ar',
  },
  {
    id: 'UNI-003',
    name: 'Kyoto University',
    country: 'Japón',
    city: 'Kyoto',
    ranking: '#46 QS',
    type: 'Pública',
    agreements: 2,
    website: 'kyoto-u.ac.jp',
  },
  {
    id: 'UNI-004',
    name: 'Pontificia Universidad Católica de Chile',
    country: 'Chile',
    city: 'Santiago',
    ranking: '#103 QS',
    type: 'Privada',
    agreements: 5,
    website: 'uc.cl',
  },
  {
    id: 'UNI-005',
    name: 'University of Toronto',
    country: 'Canadá',
    city: 'Toronto',
    ranking: '#21 QS',
    type: 'Pública',
    agreements: 4,
    website: 'utoronto.ca',
  },
  {
    id: 'UNI-006',
    name: 'Universidad Francisco de Vitoria',
    country: 'España',
    city: 'Madrid',
    ranking: 'N/A',
    type: 'Privada',
    agreements: 8,
    website: 'ufv.es',
  },
];

export default function UniversitiesPage() {
  return (
    <>
      {/* HEADER */}
      <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">
            Directorio de Universidades
          </h1>
          <p className="text-muted-foreground text-xs">
            Catálogo de instituciones aliadas
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

      {/* MAIN CONTENT */}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* --- DATA TABLE SECTION --- */}
        <Card className="h-full">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Instituciones Asociadas</CardTitle>
              <CardDescription>
                Información general y rankings de universidades partners.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* Simple Search Input */}
              <div className="relative mr-2 hidden sm:block">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar universidad..."
                  className="h-8 w-[200px] pl-8"
                />
              </div>

              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filtrar
                </span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Exportar
                </span>
              </Button>
              <Button
                size="sm"
                className="h-8 gap-1 bg-orange-600 text-white hover:bg-orange-700"
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Nueva Institución
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[80px]">Logo</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Ranking
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Tipo</TableHead>
                    <TableHead className="text-center">Convenios</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {UNIVERSITY_DATA.map((uni) => (
                    <TableRow key={uni.id}>
                      {/* Logo Placeholder */}
                      <TableCell>
                        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                          <Building2 className="text-muted-foreground h-5 w-5" />
                        </div>
                      </TableCell>

                      {/* Name & Website */}
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-base">{uni.name}</span>
                          <a
                            href={`https://${uni.website}`}
                            target="_blank"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                          >
                            {uni.website} <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </TableCell>

                      {/* Location */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {uni.city}, {uni.country}
                          </span>
                        </div>
                      </TableCell>

                      {/* Ranking */}
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className="font-mono font-normal"
                        >
                          {uni.ranking}
                        </Badge>
                      </TableCell>

                      {/* Type (Public/Private) */}
                      <TableCell className="hidden md:table-cell">
                        <span className="text-muted-foreground flex items-center gap-1 text-sm">
                          <GraduationCap className="h-3 w-3" /> {uni.type}
                        </span>
                      </TableCell>

                      {/* Active Agreements Count */}
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className="rounded-full px-3"
                        >
                          {uni.agreements}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                            <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                            <DropdownMenuItem>
                              Gestionar Convenios
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Editar Información
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
