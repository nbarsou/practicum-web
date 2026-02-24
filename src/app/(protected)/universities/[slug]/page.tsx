import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Filter,
  GraduationCap,
  MapPin,
  MoreHorizontal,
  Plus,
  Trophy,
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
import {
  getUniversityBySlug,
  getAgreementsByUniversityId,
  type Agreement,
} from '@/lib/mock-data';

// ─── Helpers ────────────────────────────────────────────────────────────────

function statusLabel(status: Agreement['status']) {
  return status === 'Active'
    ? 'Activo'
    : status === 'Pending'
      ? 'En Trámite'
      : 'Vencido';
}

function statusClass(status: Agreement['status']) {
  return status === 'Active'
    ? 'bg-green-600 hover:bg-green-700'
    : status === 'Pending'
      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
      : 'bg-slate-200 text-slate-600 hover:bg-slate-300';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ─── Stats card ─────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
        {sub && <p className="text-muted-foreground mt-0.5 text-xs">{sub}</p>}
      </CardContent>
    </Card>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> };

export default async function UniversityAgreementsPage({ params }: Props) {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);
  if (!university) notFound();

  const agreements = getAgreementsByUniversityId(university.id);

  const active = agreements.filter((a) => a.status === 'Active').length;
  const pending = agreements.filter((a) => a.status === 'Pending').length;
  const expired = agreements.filter((a) => a.status === 'Expired').length;
  const totalSpots = agreements.reduce((sum, a) => sum + a.spots, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Back link ── */}
      <div>
        <Button variant="ghost" size="sm" className="gap-1 pl-0" asChild>
          <Link href="/universities">
            <ArrowLeft className="h-4 w-4" />
            Todas las instituciones
          </Link>
        </Button>
      </div>

      {/* ── University header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {university.name}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {university.city}, {university.country}
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" />
              {university.type}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5" />
              {university.ranking}
            </span>
            <a
              href={`https://${university.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              {university.website}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <Button
          size="sm"
          className="h-8 gap-1 bg-orange-600 text-white hover:bg-orange-700 sm:mt-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Nuevo Convenio
        </Button>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total convenios" value={agreements.length} />
        <StatCard label="Activos" value={active} />
        <StatCard
          label="En trámite / Vencidos"
          value={`${pending} / ${expired}`}
        />
        <StatCard
          label="Plazas totales"
          value={totalSpots}
          sub="suma de todas las plazas"
        />
      </div>

      {/* ── Agreements table ── */}
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Convenios con {university.name}</CardTitle>
            <CardDescription>
              {agreements.length} acuerdo{agreements.length !== 1 ? 's' : ''}{' '}
              registrado{agreements.length !== 1 ? 's' : ''} con esta
              institución.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Filtrar</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Exportar</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {agreements.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-12 text-sm">
              <p>No hay convenios registrados para esta universidad.</p>
              <Button
                size="sm"
                className="mt-2 bg-orange-600 text-white hover:bg-orange-700"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Agregar primer convenio
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Campus Anáhuac
                    </TableHead>
                    <TableHead className="hidden text-center md:table-cell">
                      Plazas
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Vigencia
                    </TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agreements.map((agreement) => (
                    <TableRow key={agreement.id}>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        {agreement.id}
                      </TableCell>

                      <TableCell className="font-medium">
                        {agreement.type}
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
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

                      <TableCell className="hidden md:table-cell">
                        <span className="text-muted-foreground text-xs">
                          {formatDate(agreement.startDate)} —{' '}
                          {formatDate(agreement.endDate)}
                        </span>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            agreement.status === 'Active'
                              ? 'default'
                              : 'secondary'
                          }
                          className={statusClass(agreement.status)}
                        >
                          {statusLabel(agreement.status)}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
