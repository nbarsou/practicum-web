'use client';

import { Filter, Download, MoreHorizontal, Plus, Search } from 'lucide-react';
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

// --- MOCK DATA ---
const AGREEMENTS_DATA = [
  {
    id: 'CONV-001',
    university: 'Universidad Complutense de Madrid',
    country: 'España',
    type: 'Bilateral',
    campus: ['Norte', 'Sur'],
    spots: 4,
    status: 'Active',
  },
  {
    id: 'CONV-002',
    university: 'University of Texas at Austin',
    country: 'EUA',
    type: 'Investigación',
    campus: ['Mex', 'Norte'],
    spots: 2,
    status: 'Pending',
  },
  {
    id: 'CONV-003',
    university: 'Sorbonne Université',
    country: 'Francia',
    type: 'Erasmus+',
    campus: ['Norte'],
    spots: 5,
    status: 'Active',
  },
  {
    id: 'CONV-004',
    university: 'Technische Universität München',
    country: 'Alemania',
    type: 'Bilateral',
    campus: ['Sur', 'Virtual'],
    spots: 3,
    status: 'Expired',
  },
  {
    id: 'CONV-005',
    university: 'Politecnico di Milano',
    country: 'Italia',
    type: 'Intercambio',
    campus: ['Mex', 'Sur'],
    spots: 6,
    status: 'Active',
  },
  {
    id: 'CONV-006',
    university: 'UCLA',
    country: 'EUA',
    type: 'Verano',
    campus: ['Norte'],
    spots: 10,
    status: 'Active',
  },
];

export default function AgreementsPage() {
  return (
    <>
      {/* HEADER (Matches Dashboard Header) */}
      <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">
            Gestión de Convenios
          </h1>
          <p className="text-muted-foreground text-xs">
            Administración de alianzas internacionales
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
              <CardTitle>Base de Datos de Convenios</CardTitle>
              <CardDescription>
                Gestiona los acuerdos entre Anáhuac y universidades extranjeras.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* Simple Search Input */}
              <div className="relative mr-2 hidden sm:block">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar..."
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
                  Nuevo
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Universidad</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Campus Anáhuac
                    </TableHead>
                    <TableHead className="hidden text-center md:table-cell">
                      Plazas
                    </TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {AGREEMENTS_DATA.map((agreement) => (
                    <TableRow key={agreement.id}>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        {agreement.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{agreement.university}</span>
                          <span className="text-muted-foreground text-xs md:hidden">
                            {agreement.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{agreement.country}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex gap-1">
                          {agreement.campus.map((c) => (
                            <Badge
                              key={c}
                              variant="outline"
                              className="h-5 px-1 py-0 text-[10px]"
                            >
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-center md:table-cell">
                        {agreement.spots}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            agreement.status === 'Active'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            agreement.status === 'Active'
                              ? 'bg-green-600 hover:bg-green-700'
                              : agreement.status === 'Pending'
                                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }
                        >
                          {agreement.status === 'Active'
                            ? 'Activo'
                            : agreement.status === 'Pending'
                              ? 'En Trámite'
                              : 'Vencido'}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar plazas</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Archivar convenio
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
