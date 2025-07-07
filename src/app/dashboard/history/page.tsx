import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Interacciones</CardTitle>
        <CardDescription>Un registro de todos los eventos y cambios importantes en tus conexiones.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-16">
            <HistoryIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4">A medida que interactúes, tu historial de eventos aparecerá aquí.</p>
            <Button variant="secondary" className="mt-6" asChild>
                <Link href="/dashboard/connections">Crear una nueva conexión</Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
