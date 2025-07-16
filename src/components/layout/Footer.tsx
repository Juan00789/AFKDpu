const Footer = () => {
  return (
    <footer className="w-full bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground">Sobre AFKDpu</h2>
            <p className="mt-4 text-muted-foreground">
              AFKDpu nació de una pérdida, un final abrupto que nos obligó a mirar hacia adentro. Fue en ese vacío donde encontramos los fragmentos de un propósito que nunca supimos que estábamos construyendo. Esta plataforma es el resultado de esa reconstrucción: un espacio para compartir el conocimiento, las lecciones y las chispas de creatividad que surgen de lo invisible, de lo no planificado.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-2xl font-bold text-primary-foreground">Manifiesto</h3>
            <blockquote className="mt-4 border-l-2 border-accent pl-4 italic text-muted-foreground">
              Creemos en el poder de lo que se rompe. En la sabiduría que reside en los errores. En los manuales que se escriben sin tinta, con experiencia. Celebramos la fractura que precede a la transformación y el renacimiento que sigue. Aquí, lo que nunca se vio no solo se honra, sino que se convierte en faro.
            </blockquote>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AFKDpu. Reconstruyendo con propósito.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
