'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currentUser, mockConnections } from "@/lib/mock-data"
import { Star, Edit, BarChart2 } from "lucide-react"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

const pastConnections = [
    { id: 'conn-past-1', name: 'Migración de Servidor', status: 'Finalizada', finalState: 'Sereno', duration: '30 días', rating: 5 },
    { id: 'conn-past-2', name: 'Auditoría de Seguridad', status: 'Finalizada', finalState: 'Vibrante', duration: '15 días', rating: 4 },
]

const comments = [
    { user: mockConnections[0].participants[0], rating: 5, comment: "Excelente comunicación y proactividad. ¡Un placer trabajar juntos!" },
    { user: mockConnections[1].participants[0], rating: 4, comment: "Buen trabajo en general, aunque a veces la comunicación tardaba un poco." },
]

const emotionalHistory = [
  { state: "Vibrante", hours: 8 },
  { state: "Neutral", hours: 12 },
  { state: "Sereno", hours: 20 },
  { state: "Fading", hours: 2 },
  { state: "Difuso", hours: 1 },
].sort((a, b) => a.hours - b.hours);

const chartConfig = {
  hours: {
    label: "Horas",
  },
  Vibrante: {
    label: "Vibrante",
    color: "hsl(var(--chart-1))",
  },
  Neutral: {
    label: "Neutral",
    color: "hsl(var(--chart-2))",
  },
  Sereno: {
    label: "Sereno",
    color: "hsl(var(--chart-3))",
  },
  Fading: {
    label: "Fading",
    color: "hsl(var(--chart-4))",
  },
  Difuso: {
    label: "Difuso",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function ProfilePage() {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src={currentUser.avatar} />
                            <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl font-headline">{currentUser.name}</CardTitle>
                        <CardDescription>{currentUser.email}</CardDescription>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="secondary">{currentUser.role}</Badge>
                            <Badge variant="outline">Estado: Sereno</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 text-sm">
                        <div>
                            <Label className="text-muted-foreground font-semibold">Nivel de Estabilidad</Label>
                            <div className="flex items-center gap-4 mt-1">
                                <Progress value={85} className="w-full" />
                                <span className="font-bold text-lg">85%</span>
                            </div>
                        </div>
                         <div>
                            <Label className="text-muted-foreground font-semibold">Objetivos</Label>
                            <p className="text-foreground leading-normal mt-1">
                                Buscar proveedores para proyectos a corto plazo en tecnología sostenible. Mantener conexiones auténticas sin comprometer la privacidad.
                            </p>
                         </div>
                         <Button className="w-full">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Perfil
                         </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart2 className="h-5 w-5" />
                            Evolución Emocional
                        </CardTitle>
                        <CardDescription>Horas acumuladas en cada estado emocional a través de tus conexiones.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <BarChart accessibilityLayer data={emotionalHistory} layout="vertical" margin={{ left: 10 }}>
                                <YAxis
                                    dataKey="state"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => (chartConfig[value as keyof typeof chartConfig] as any)?.label || value}
                                    className="text-xs"
                                />
                                <XAxis dataKey="hours" type="number" hide />
                                <CartesianGrid horizontal={false} />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="hours" layout="vertical" radius={5}>
                                  {emotionalHistory.map((entry) => (
                                      <Cell key={entry.state} fill={(chartConfig[entry.state as keyof typeof chartConfig] as any)?.color} />
                                  ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

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
                                    <TableHead>Estado Final</TableHead>
                                    <TableHead>Duración</TableHead>
                                    <TableHead>Tu Calificación</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pastConnections.map(conn => (
                                    <TableRow key={conn.id}>
                                        <TableCell className="font-medium">{conn.name}</TableCell>
                                        <TableCell><Badge variant="outline">{conn.finalState}</Badge></TableCell>
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
            </div>
        </div>
    )
}
