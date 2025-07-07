'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { User } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
    const { appUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const isAdmin = appUser && appUser.email === 'alcantara00789@gmail.com';

    useEffect(() => {
        if (isAdmin) {
            const fetchUsers = async () => {
                try {
                    const usersQuery = query(collection(db, 'users'), orderBy('name'));
                    const querySnapshot = await getDocs(usersQuery);
                    const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as User);
                    setUsers(usersData);
                } catch (error) {
                    console.error("Error fetching users:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="flex flex-col h-[calc(100vh-10rem)] items-center justify-center text-center p-4">
                <AlertTriangle className="h-12 w-12 mb-4 text-destructive" />
                <h2 className="text-xl font-semibold">Acceso Denegado</h2>
                <p className="text-muted-foreground mt-2">No tienes permiso para ver esta página.</p>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>
                    Visualiza y gestiona todos los usuarios de la plataforma. Actualmente hay {users.length} usuarios.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Puntos</TableHead>
                            <TableHead className="text-right">Perfil</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{user.role}</Badge>
                                </TableCell>
                                <TableCell>{user.points}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="ghost" size="icon">
                                        <Link href={`/dashboard/users/${user.id}`}>
                                            <ArrowRight className="h-4 w-4" />
                                            <span className="sr-only">Ver Perfil</span>
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
