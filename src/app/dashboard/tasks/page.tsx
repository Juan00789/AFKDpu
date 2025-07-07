'use client';
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/lib/mock-data";
import { Users, Clock, Loader2 } from "lucide-react";
import { AddServiceDialog } from "@/components/AddServiceDialog";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

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

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
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
                <span className="break-all">{service.connectionName}</span>
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

export default function TasksPage() {
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
          ...doc.data()
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const openServices = services.filter(t => t.status === "Abierto");
  const inProgressServices = services.filter(t => t.status === "En Progreso");
  const doneServices = services.filter(t => t.status === "Terminadas");

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-end">
            <AddServiceDialog />
        </div>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Abierto ({openServices.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {openServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>En Progreso ({inProgressServices.length})</CardTitle>
          </Header>
          <CardContent className="space-y-3">
            {inProgressServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Terminadas ({doneServices.length})</CardTitle>
          </Header>
          <CardContent className="space-y-3">
            {doneServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
