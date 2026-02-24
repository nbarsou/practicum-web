'use client';

import {
  Filter,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  ExternalLink,
  Building2,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
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
import { Input } from '@/components/ui/input';
import { UNIVERSITIES, getAgreementCountByUniversityId } from '@/lib/mock-data';

export default function UniversitiesPage() {
  return (
    <>
      <Card className="h-full">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Instituciones Asociadas</CardTitle>
            <CardDescription>
              Información general y rankings de universidades partners.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
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
                {UNIVERSITIES.map((uni) => {
                  const agreementCount = getAgreementCountByUniversityId(
                    uni.id
                  );
                  return (
                    <TableRow key={uni.id}>
                      <TableCell>
                        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                          <Building2 className="text-muted-foreground h-5 w-5" />
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <Link
                            href={`/universities/${uni.slug}`}
                            className="text-base hover:underline"
                          >
                            {uni.name}
                          </Link>
                          <a
                            href={`https://${uni.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                          >
                            {uni.website} <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm">
                          {uni.city}, {uni.country}
                        </span>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className="font-mono font-normal"
                        >
                          {uni.ranking}
                        </Badge>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <span className="text-muted-foreground flex items-center gap-1 text-sm">
                          <GraduationCap className="h-3 w-3" /> {uni.type}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <Link href={`/universities/${uni.slug}`}>
                          <Badge
                            variant="secondary"
                            className="cursor-pointer rounded-full px-3 transition-colors hover:bg-orange-100"
                          >
                            {agreementCount}
                          </Badge>
                        </Link>
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
                            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/universities/${uni.slug}`}>
                                Ver Convenios
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Editar Información
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
