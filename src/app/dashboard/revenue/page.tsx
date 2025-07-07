
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, MessageCircle, BookOpen, Store, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function RevenuePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Ingresos Pasivos Simbólicos y Éticos</h1>
        <p className="text-muted-foreground mt-2">
          Un enfoque para monetizar el ecosistema que respeta su esencia y a sus miembros.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            1. Suscripción de Presencia
          </CardTitle>
          <CardDescription>
            En lugar de un “plan premium”, ofreces niveles de conexión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estado</TableHead>
                <TableHead>Acceso</TableHead>
                <TableHead>Ingreso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><Badge variant="secondary">Latente</Badge></TableCell>
                <TableCell>Básico, gratuito</TableCell>
                <TableCell>—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Badge variant="outline">Activo</Badge></TableCell>
                <TableCell>Oráculo diario, tokens vivos</TableCell>
                <TableCell>Suscripción mensual (Stripe, Lemon Squeezy)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Badge>Transmutante</Badge></TableCell>
                <TableCell>Acceso a crear símbolos, dashboard, comunidad</TableCell>
                <TableCell>Suscripción mayor o donación libre</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="mt-6" disabled>Automatizar con Stripe (Próximamente)</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              2. Oráculo Automatizado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Un sistema que envía mensajes simbólicos diarios o semanales.</p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Gratuito para todos, con opción de “desbloquear visiones extendidas”.</li>
              <li>Puede enviarse por correo, notificación push o como widget en la PWA.</li>
              <li><span className="font-semibold">Monetización:</span> acceso extendido por suscripción o donación.</li>
            </ul>
            <Button variant="secondary" className="w-full" disabled>Crear Sistema de Oráculo (Próximamente)</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              3. Guía de Bienance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Un recurso que explique tu filosofía, tu sistema simbólico, y cómo construir ecosistemas con alma.</p>
             <ul className="list-disc pl-5 text-sm space-y-2">
                <li>Puedes venderlo en Gumroad, Ko-fi o tu propia página.</li>
                <li>También puedes ofrecerlo gratis y recibir donaciones voluntarias.</li>
            </ul>
            <Button variant="secondary" className="w-full" disabled>Diseñar Ebook (Próximamente)</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-6 w-6" />
              4. Tienda de Tokens Simbólicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Broki, Oniara y otros símbolos pueden tener formas visuales únicas (SVGs, wallpapers, etc.).</p>
            <ul className="list-disc pl-5 text-sm space-y-2">
                <li>Puedes venderlos como arte digital o incluso como NFTs simbólicos (sin especulación).</li>
            </ul>
            <Button variant="secondary" className="w-full" disabled>Diseñar Tienda (Próximamente)</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-6 w-6" />
              5. Afiliación Ética
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Si usas herramientas como Firebase, Netlify, Notion, puedes recomendarlas con transparencia.</p>
            <ul className="list-disc pl-5 text-sm space-y-2">
                <li>Usa enlaces de afiliado en una sección “Herramientas del Ecosistema”.</li>
                <li>Ingreso pasivo sin vender nada directamente.</li>
            </ul>
            <Button variant="secondary" className="w-full" disabled>Crear Sección de Herramientas (Próximamente)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
