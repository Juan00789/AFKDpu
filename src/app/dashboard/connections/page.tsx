import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockConnections } from "@/lib/mock-data"
import { cva } from "class-variance-authority"
import { ArrowRight, PlusCircle } from "lucide-react"
import Link from "next/link"

const statusBadgeVariants = cva(
  "border-transparent",
  {
    variants: {
      status: {
        Vibrante: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
        Neutral: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
        Fading: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200",
      },
    },
  }
)

export default function ConnectionsPage() {
  const allConnections = [
    ...mockConnections,
    { id: 'conn-5', name: 'Revisión Anual Contrato', status: 'Vibrante', duration: 'Finalizada', participants: [mockConnections[0].participants[0], mockConnections[1].participants[1]] },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle>Todas mis Conexiones</CardTitle>
          <CardDescription>Gestiona todas tus conexiones, tanto activas como finalizadas.</CardDescription>
        </div>
        <div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Conexión
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de la Conexión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Participantes</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead><span className="sr-only">Acciones</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allConnections.map(conn => (
              <TableRow key={conn.id}>
                <TableCell className="font-medium">{conn.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusBadgeVariants({ status: conn.status })}>{conn.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center -space-x-2">
                    {conn.participants.map(p => (
                      <Avatar key={p.id} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{conn.duration}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/connections/${conn.id}`}>
                            <ArrowRight className="h-4 w-4" />
                            <span className="sr-only">Ver conexión</span>
                        </Link>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
