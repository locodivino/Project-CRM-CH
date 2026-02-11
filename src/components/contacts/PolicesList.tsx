import { Police, STATUT_COLORS, TYPE_COLORS } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Shield, Car, Heart, Landmark, Building2, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PolicesListProps {
  polices: Police[];
  loading: boolean;
  stats: { total: number; actives: number; prime_totale: number };
}

const categorieIcons: Record<string, React.ReactNode> = {
  'Véhicules': <Car className="h-4 w-4" />,
  'Santé': <Heart className="h-4 w-4" />,
  'Personnes': <User className="h-4 w-4" />,
  'Choses': <Shield className="h-4 w-4" />,
  'Prévoyance': <Landmark className="h-4 w-4" />,
  'Entreprise': <Building2 className="h-4 w-4" />,
};

function formatCHF(amount: number | undefined | null): string {
  if (!amount) return '—';
  return new Intl.NumberFormat('fr-CH', { style: 'currency', currency: 'CHF' }).format(amount);
}

export function PolicesList({ polices, loading, stats }: PolicesListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (polices.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Aucune police d'assurance liée à ce contact.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-sm text-muted-foreground">Total polices</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-sm text-muted-foreground">Actives</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.actives}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <p className="text-sm text-muted-foreground">Prime annuelle totale</p>
            <p className="text-2xl font-bold">{formatCHF(stats.prime_totale)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Compagnie</TableHead>
              <TableHead>N° Police</TableHead>
              <TableHead>Objet</TableHead>
              <TableHead className="text-right">Prime annuelle</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {polices.map((police) => {
              const categorie = police.ref_type?.categorie || '';
              const compagnie = police.ref_compagnie?.nom || police.compagnie || '—';
              const typeLabel = police.ref_type?.code_court || police.type_assurance || '—';
              const typeName = police.ref_type?.nom_fr || '';

              return (
                <TableRow key={police.id}>
                  <TableCell className="text-muted-foreground">
                    {categorieIcons[categorie] || <Shield className="h-4 w-4" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{typeLabel}</span>
                      {typeName && typeLabel !== typeName && (
                        <span className="text-xs text-muted-foreground">{typeName}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{compagnie}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {police.numero_police || '—'}
                    {police.sous_numero && (
                      <span className="text-muted-foreground"> / {police.sous_numero}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                    {police.objet_assure || '—'}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCHF(police.prime_annuelle)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={STATUT_COLORS[police.statut] || ''}
                    >
                      {police.statut}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
