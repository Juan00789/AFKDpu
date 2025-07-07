import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Archivo de Memorias</CardTitle>
        <CardDescription>Un registro de todos los eventos y ciclos completados en tus viajes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-16">
            <HistoryIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4">A medida que tus portales evolucionen, tus memorias se registrarán aquí.</p>
            <Button variant="secondary" className="mt-6" asChild>
                <Link href="/dashboard/connections">Abrir un nuevo portal</Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
