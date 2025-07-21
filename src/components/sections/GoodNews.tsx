'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GoodNews = () => {
  return (
    <section id="good-news" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Protocolo: Salvación</h2>
        </div>
        <div className="mt-12 flex justify-center">
            <Card className="max-w-2xl w-full bg-card shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center font-body text-xl tracking-wider">
                    <span role="img" aria-label="stop sign">🛑</span> Protocolo: Salvación [activo]
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center text-muted-foreground">
                    <p className="text-lg">
                        Hay algo que tengo.
                        <br/>
                        No lo necesito.
                        <br/>
                        Tampoco te lo voy a vender.
                        <br/>
                        Pero si lo entendés… capaz es tuyo.
                    </p>
                    <p className="text-lg font-bold text-foreground">
                        <span role="img" aria-label="cyclone">🌀</span> No hay precio.
                        <br/>
                        No hay apuro.
                        <br/>
                        No hay dirección.
                    </p>
                    <p className="text-lg">
                        Hay energía lista para cambiar de manos.
                        <br/>
                        No soy comerciante. Soy tránsito.
                    </p>
                    <p className="text-md italic">
                        <span role="img" aria-label="paperclip">📎</span> Si algo de esto te vibra, escribí.
                        <br/>
                        Si no, estás a salvo también.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default GoodNews;