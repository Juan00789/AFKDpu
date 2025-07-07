'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockConnections, Service } from "@/lib/mock-data"
import { cva } from "class-variance-authority"
import { MoreHorizontal, Users, ArrowRight, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

const emotionalStateBadgeVariants = cva(
  "border-transparent capitalize text-xs",
  {
    variants: {
      status: {
        Vibrante: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
        Neutral: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
        Fading: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200",
        Sereno: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200",
        Difuso: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200",
      },
    },
  }
);

function ConnectionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conexiones Activas</CardTitle>
        <CardDescription>Tus conexiones actuales y su estado emocional.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de la Conexión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Participantes</TableHead>
              <TableHead>Duración Restante</TableHead>
              <TableHead><span className="sr-only">Acciones</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockConnections.map(conn => (
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

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
       <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium pr-2">{service.title}</p>
            <Badge variant="outline" className={emotionalStateBadgeVariants({ status: service.emotionalState })}>{service.emotionalState}</Badge>
        </div>
         <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Clock className="h-3 w-3" />
            <span>{service.duration}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span className="truncate">{service.connectionName}</span>
            </div>
          <div className="flex items-center -space-x-1">
             {service.participants.map(p => (
                <Avatar key={p.id} className="h-5 w-5 border-2 border-card">
                  <AvatarImage src={p.avatar} />
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ServicesBoard() {
  const { appUser } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) return;
    setLoading(true);

    const q = query(
      collection(db, "services"),
      where("userIds", "array-contains", appUser.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const servicesData: Service[] = [];
      querySnapshot.forEach((doc) => {
        servicesData.push({
          id: doc.id,
          ...doc.data(),
        } as Service);
      });
      setServices(servicesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching services: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [appUser]);

  const openServices = services.filter(t => t.status === "Abierto");
  const inProgressServices = services.filter(t => t.status === "En Progreso");
  const doneServices = services.filter(t => t.status === "Terminadas");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Servicios</CardTitle>
        <CardDescription>Servicios asociados a tus conexiones, organizados por estado.</CardDescription>
      </CardHeader>
       {loading ? (
          <CardContent className="flex h-48 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        ) : (
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-headline font-semibold">Abierto ({openServices.length})</h3>
              <div className="space-y-2">
                {openServices.map(service => <ServiceCard key={service.id} service={service} />)}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline font-semibold">En Progreso ({inProgressServices.length})</h3>
              <div className="space-y-2">
                {inProgressServices.map(service => <ServiceCard key={service.id} service={service} />)}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline font-semibold">Terminadas ({doneServices.length})</h3>
              <div className="space-y-2">
                {doneServices.map(service => <ServiceCard key={service.id} service={service} />)}
              </div>
            </div>
          </CardContent>
       )}
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <ConnectionsTable />
      <ServicesBoard />
    </div>
  )
}
