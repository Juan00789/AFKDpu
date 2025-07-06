import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { currentUser, mockConnections } from "@/lib/mock-data"
import { Star } from "lucide-react"

export default function ProfilePage() {
    const pastConnections = [
        { id: 'conn-past-1', name: 'Migración de Servidor', status: 'Finalizada', duration: '30 días', rating: 5 },
        { id: 'conn-past-2', name: 'Auditoría de Seguridad', status: 'Finalizada', duration: '15 días', rating: 4 },
    ]

    const comments = [
        { user: mockConnections[0].participants[0], rating: 5, comment: "Excelente comunicación y proactividad. ¡Un placer trabajar juntos!" },
        { user: mockConnections[1].participants[0], rating: 4, comment: "Buen trabajo en general, aunque a veces la comunicación tardaba un poco." },
    ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-headline">{currentUser.name}</CardTitle>
                    <CardDescription>{currentUser.email}</CardDescription>
                    <Badge variant="secondary" className="mt-2">{currentUser.role}</Badge>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">Editar Perfil</Button>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Tabs defaultValue="history">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="history">Conexiones Pasadas</TabsTrigger>
                    <TabsTrigger value="ratings">Calificaciones y Comentarios</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de Conexiones</CardTitle>
                            <CardDescription>Un resumen de tus colaboraciones previas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Conexión</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Duración</TableHead>
                                        <TableHead>Calificación</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pastConnections.map(conn => (
                                        <TableRow key={conn.id}>
                                            <TableCell className="font-medium">{conn.name}</TableCell>
                                            <TableCell><Badge variant="outline">{conn.status}</Badge></TableCell>
                                            <TableCell>{conn.duration}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {Array(conn.rating).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                                                    {Array(5 - conn.rating).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 text-muted-foreground" />)}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ratings">
                    <Card>
                         <CardHeader>
                            <CardTitle>Calificaciones Recibidas</CardTitle>
                            <CardDescription>Lo que otros dicen de tus colaboraciones.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {comments.map((c, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={c.user.avatar} />
                                        <AvatarFallback>{c.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{c.user.name}</p>
                                            <div className="flex items-center">
                                                {Array(c.rating).fill(0).map((_, j) => <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{c.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}
