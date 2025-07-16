const Footer = () => {
  return (
    <footer className="w-full bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground">Sobre AFKDpu</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                AFKDpu es mi proyecto de vida. Nació de lo que perdí y de lo que aprendí sin saberlo. Una chispa invisible que creció entre manuales espontáneos, amistades entrañables, y plataformas que se fueron… pero dejaron huella.
              </p>
              <p>
                Este sitio es más que código. Es la reconstrucción de propósito, un homenaje a quienes me acompañaron cuando el mundo parecía apagarse. Aquí conecto QuickieRapidito, Ledpop, Pos Vesta, y todas esas ideas que me enseñaron a crear desde el corazón.
              </p>
              <p>
                AFKDpu no pretende impresionar. Pretende recordar, guiar y reflejar. Es una casa digital para lo que fue invisible, y ahora vive… para quienes lo quieran sentir.
              </p>
            </div>
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
