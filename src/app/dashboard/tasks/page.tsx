import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTasks, Task } from "@/lib/mock-data";
import { PlusCircle, Users } from "lucide-react";

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
      <CardContent className="p-4">
        <p className="text-sm font-medium">{task.title}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{task.connectionName}</span>
            </div>
          <div className="flex items-center -space-x-1">
             {task.participants.map(p => (
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
  const openTasks = mockTasks.filter(t => t.status === "Abierto");
  const inProgressTasks = mockTasks.filter(t => t.status === "En Progreso");
  const doneTasks = mockTasks.filter(t => t.status === "Terminadas");

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                 <h1 className="text-2xl font-bold tracking-tight font-headline">Mis Tareas</h1>
                 <p className="text-muted-foreground">Gestiona tus tareas pendientes y completadas.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Tarea
            </Button>
        </div>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Abierto ({openTasks.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {openTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>En Progreso ({inProgressTasks.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {inProgressTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Terminadas ({doneTasks.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {doneTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
