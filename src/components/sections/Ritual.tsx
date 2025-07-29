const Ritual = () => {
  return (
    <section 
      id="ritual" 
      className="relative flex min-h-[70vh] items-center justify-center text-center bg-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/50 filter blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-accent/50 filter blur-3xl animate-[float-reverse_10s_ease-in-out_infinite]"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h1 className="font-headline text-5xl font-bold tracking-wider text-foreground mb-6">
          <span className="text-primary" role="img" aria-label="new moon">🌑</span> AFKΔ – Ritual de Entrada
        </h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg text-muted-foreground md:text-xl">
          <p>
            No se necesita clave.
            <br />
            No se necesita correo.
          </p>
          <p className="font-bold text-foreground">
            Solo coraje para decir “estoy aquí”,
            <br />
            aunque no se diga en voz alta.
          </p>
          <p className="mt-8">
            AFK no te exige que produzcas.
            <br />
            Solo que respires.
          </p>
          <p className="italic">
            Y si no puedes...
            <br />
            aquí, alguien lo hará por ti un rato.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ritual;
