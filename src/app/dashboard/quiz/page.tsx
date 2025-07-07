import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HelpCircle } from "lucide-react";

export default function QuizPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Cuestionario de la Plataforma</CardTitle>
          <CardDescription>
            Comprende las funcionalidades clave de AFKDpu para sacar el máximo provecho.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="text-center text-muted-foreground py-16">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4">El cuestionario se está actualizando para reflejar las nuevas funcionalidades de la plataforma.</p>
            <p className="mt-2 text-sm">Vuelve pronto para probar tus conocimientos.</p>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
