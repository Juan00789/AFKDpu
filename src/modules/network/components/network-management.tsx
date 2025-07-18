// src/modules/network/components/network-management.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddUserDialog } from './add-user-dialog';
import { NetworkList } from './network-list';

export function NetworkManagement() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserAddedOrRemoved = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold">My Network</h1>
        <p className="text-muted-foreground">Manage your clients and service providers.</p>
      </div>
      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="clients">My Clients</TabsTrigger>
          <TabsTrigger value="providers">My Providers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Clients</CardTitle>
                    <CardDescription>
                    Users who have hired you for a service.
                    </CardDescription>
                </div>
                 <AddUserDialog roleToAdd="client" onUserAdded={handleUserAddedOrRemoved} />
              </div>
            </CardHeader>
            <CardContent>
              <NetworkList roleToList="client" refreshTrigger={refreshTrigger} onUserRemoved={handleUserAddedOrRemoved}/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Providers</CardTitle>
                    <CardDescription>
                    Users you have hired or can hire for a service.
                    </CardDescription>
                </div>
                <AddUserDialog roleToAdd="provider" onUserAdded={handleUserAddedOrRemoved} />
              </div>
            </CardHeader>
            <CardContent>
              <NetworkList roleToList="provider" refreshTrigger={refreshTrigger} onUserRemoved={handleUserAddedOrRemoved} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
