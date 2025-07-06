import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const quizData = [
  {
    question: "¿Qué diferencia a un \"cliente\", un \"proveedor\" y un \"empleado\" dentro de AFKDpu?",
    options: [
      { id: "a", text: "El cliente se comunica directamente con el proveedor, mientras que el empleado gestiona las interacciones entre ambos." },
      { id: "b", text: "El cliente es el único que puede iniciar una conexión, mientras que el proveedor solo responde a estas solicitudes." },
      { id: "c", text: "No hay diferencia, todos los roles tienen las mismas capacidades." },
      { id: "d", text: "El empleado solo puede ver conexiones, pero no interactuar." },
    ],
    userAnswer: "b",
    correctAnswer: "a",
    comment: "Aclaración: Los roles son flexibles. El 'cliente' y el 'proveedor' tienen interacción directa y ambos pueden iniciar conexiones. El 'empleado' a menudo actúa como un intermediario o facilitador de estas interacciones, gestionando o mediando según el contexto.",
  },
  {
    question: "¿Cómo se asegura AFKDpu de que las conexiones sean \"efímeras\" y no permanentes?",
    options: [
      { id: "a", text: "Eliminando la cuenta del usuario después de 30 días." },
      { id: "b", text: "Utilizando un sistema de reglas temporales que gestiona la duración de cada vínculo." },
      { id: "c", text: "Cifrando los mensajes para que solo sean visibles una vez." },
      { id: "d", text: "Solo permitiendo que los clientes inicien las conexiones y no los proveedores." },
    ],
    userAnswer: "d",
    correctAnswer: "b",
    comment: "Aclaración: El concepto de 'efímero' se basa en la gestión de la duración de las conexiones mediante reglas temporales. No se trata de eliminar usuarios ni de limitar quién puede iniciar una conexión, sino de permitir que cada vínculo tenga un tiempo definido sin compromisos a largo plazo.",
  },
  {
    question: "¿Cuál es el propósito principal de las \"Reglas Automáticas\" en AFKDpu?",
    options: [
      { id: "a", text: "Enviar correos de marketing a los usuarios." },
      { id: "b", text: "Notificar al usuario sobre el progreso de las conexiones sin que tenga que intervenir." },
      { id: "c", text: "Activar o desactivar funciones de la aplicación según el estado de la conexión." },
      { id: "d", text: "Limitar el número de conexiones que un usuario puede tener." },
    ],
    userAnswer: "b",
    correctAnswer: "c",
    comment: "Aclaración: Las reglas automáticas van más allá de las notificaciones. Su propósito principal es automatizar acciones basadas en el estado emocional y el tiempo de la conexión, como activar un temporizador, sugerir una actualización o habilitar/deshabilitar funciones específicas.",
  },
  {
    question: "¿Qué pasa si una conexión permanece en estado \"Neutral\" por más de 3 días?",
    options: [
        { id: "a", text: "La conexión se elimina automáticamente del sistema." },
        { id: "b", text: "El sistema sugerirá una actualización para mejorar la conexión." },
        { id: "c", text: "Se notifica al administrador de la plataforma." },
        { id: "d", text: "No pasa nada, el estado es solo informativo." },
    ],
    userAnswer: "a",
    correctAnswer: "b",
    comment: "Aclaración: AFKDpu no elimina automáticamente una conexión que permanece neutral. En su lugar, está diseñado para ser proactivo y sugerirá una actualización o intervención para ayudar a mejorar la conexión si detecta que no ha habido progreso.",
  },
  {
    question: "¿Qué función tiene el \"Historial de Conexiones Abstractas\" en AFKDpu?",
    options: [
        { id: "a", text: "Mostrar un chat detallado de todas las conversaciones." },
        { id: "b", text: "Registrar los estados emocionales y temporales de cada conexión sin almacenar información fija." },
        { id: "c", text: "Controlar la duración de cada conexión de manera manual." },
        { id: "d", text: "Exportar los datos de contacto de los participantes." },
    ],
    userAnswer: "c",
    correctAnswer: "b",
    comment: "Aclaración: La función del historial es registrar los estados emocionales y momentos clave de las conexiones de una manera abstracta. No se utiliza para gestionar manualmente la duración ni para almacenar datos fijos como conversaciones detalladas.",
  },
  {
    question: "¿Cómo funciona la notificación contextual de AFKDpu cuando una conexión se vuelve \"Fading\"?",
    options: [
        { id: "a", text: "Envía una alerta de emergencia a todos los participantes." },
        { id: "b", text: "El sistema pregunta al usuario si desea actualizar el estado de la conexión o enviar una notificación." },
        { id: "c", text: "Automáticamente finaliza la conexión." },
        { id: "d", text: "La notificación solo se envía si el proveedor lo solicita." },
    ],
    userAnswer: "d",
    correctAnswer: "b",
    comment: "Aclaración: Cuando una conexión se debilita (estado 'Fading'), el sistema envía notificaciones automáticas o sugiere actualizaciones de forma proactiva. No depende de una solicitud explícita del proveedor, sino del estado de la propia conexión.",
  },
  {
    question: "¿Qué significa un estado \"Vibrante\" en AFKDpu?",
    options: [
        { id: "a", text: "Una conexión permanente que no puede ser eliminada." },
        { id: "b", text: "Es un estado activo y emocionalmente intenso, con una duración definida por el usuario." },
        { id: "c", text: "Un estado de alerta que indica un problema." },
        { id: "d", text: "Un estado exclusivo para empleados." },
    ],
    userAnswer: "b",
    correctAnswer: "b",
    comment: "Aclaración: ¡Correcto! Un estado 'Vibrante' se refiere a una conexión activa, emocionalmente intensa y con un límite de duración definido. Es una de las formas clave en que el sistema gestiona el estado y la temporalidad de la interacción.",
  },
];


export default function QuizPage() {
  const correctAnswers = quizData.filter(q => q.userAnswer === q.correctAnswer).length;
  const totalQuestions = quizData.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Resultados del Cuestionario</CardTitle>
          <CardDescription>
            Aquí puedes revisar tus respuestas y ver las áreas donde puedes mejorar tu conocimiento sobre AFKDpu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 mb-6 rounded-lg bg-secondary">
            <div className="text-lg font-bold">Puntuación Final:</div>
            <div className="text-2xl font-bold text-primary">{correctAnswers} de {totalQuestions}</div>
            <Badge variant={correctAnswers / totalQuestions > 0.5 ? "default" : "destructive"}>
              {correctAnswers / totalQuestions > 0.5 ? "Aprobado" : "Necesita Mejora"}
            </Badge>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {quizData.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4 text-left">
                     <Badge variant={item.userAnswer === item.correctAnswer ? "default" : "destructive"}>
                        {item.userAnswer === item.correctAnswer ? "Correcta" : "Incorrecta"}
                     </Badge>
                     <span className="flex-1">Pregunta {index + 1}: {item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-background rounded-b-lg border-t-0">
                  <div className="space-y-4">
                     <RadioGroup value={item.userAnswer} disabled>
                        {item.options.map(option => (
                           <div key={option.id} className={`flex items-start gap-3 p-3 rounded-md border ${
                                option.id === item.correctAnswer ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500/50" :
                                (option.id === item.userAnswer ? "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500/50" : "")
                            }`}>
                                <RadioGroupItem value={option.id} id={`q${index}-${option.id}`} />
                                <Label htmlFor={`q${index}-${option.id}`} className="flex-1 text-sm leading-normal cursor-pointer">
                                  {option.text}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    <Card className="bg-muted/50 dark:bg-muted/20">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base">Comentario</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{item.comment}</p>
                        </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
