import { Phone, MessageCircle } from 'lucide-react';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const PatreonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.225 4.075c-2.48 0-4.49 2.01-4.49 4.49s2.01 4.49 4.49 4.49 4.49-2.01 4.49-4.49-2.01-4.49-4.49-4.49zM3 4.075v15.85h3.63V4.075H3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.265.058 2.13.24 2.885.524.787.294 1.457.697 2.122 1.362s.93 1.335 1.225 2.122c.283.755.466 1.62.524 2.885.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.265-.24 2.13-.524 2.885-.294.787-.697 1.457-1.362 2.122s-1.335.93-2.122 1.225c-.755.283-1.62.466-2.885.524-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.265-.058-2.13-.24-2.885-.524-.787-.294-1.457-.697-2.122-1.362s-.93-1.335-1.225-2.122c-.283-.755-.466-1.62-.524-2.885-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.265.24-2.13.524-2.885.294-.787.697 1.457 1.362-2.122s1.335-.93 2.122-1.225C4.28 2.473 5.145 2.29 6.41 2.233c1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.74 0 8.333.014 7.053.072 5.775.129 4.905.333 4.14.63c-.803.307-1.557.74-2.29 1.473S.937 3.337.63 4.14C.333 4.905.129 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.057 1.278.261 2.148.558 2.913.306.802.74 1.557 1.473 2.29s1.487.93 2.29 1.225c.765.297 1.635.501 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.278-.057 2.148-.261 2.913-.558.802-.306 1.557-.74 2.29-1.473s.93-1.487 1.225-2.29c.297-.765.501-1.635.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.057-1.278-.261-2.148-.558-2.913-.306-.802-.74-1.557-1.473-2.29s-1.487-.93-2.29-1.225c-.765-.297-1.635-.501-2.913-.558C15.667.014 15.26 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1 2.88 0 1.44 1.44 0 0 1-2.88 0z"/>
    </svg>
);


const Footer = () => {
  return (
    <footer className="w-full bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
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
          <div>
            <h3 className="font-headline text-2xl font-bold text-primary-foreground">Contacto Directo</h3>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Para colaborar, conversar o compartir ideas invisibles que aún no han brillado, puedes escribirme.
              </p>
              <a href="tel:+18299226556" className="flex items-center gap-3 hover:underline">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (829) 922-6556</span>
              </a>
              <a href="tel:+18299226556" className="flex items-center gap-3 hover:underline">
                 <MessageCircle className="h-5 w-5 text-primary" />
                 <span>Disponible vía WhatsApp y llamadas.</span>
              </a>
               <div className="flex items-center gap-3">
                <FacebookIcon className="h-5 w-5 text-primary" />
                <a href="https://www.facebook.com/juanismael.alcantara" target="_blank" rel="noopener noreferrer" className="hover:underline">Juan Ismael Alcántara</a>
              </div>
              <div className="flex items-center gap-3">
                <PatreonIcon className="h-5 w-5 text-primary" />
                <a href="https://www.patreon.com/c/afkdpu" target="_blank" rel="noopener noreferrer" className="hover:underline">Apoya el proyecto en Patreon</a>
              </div>
              <div className="flex items-center gap-3">
                <InstagramIcon className="h-5 w-5 text-primary" />
                <a href="https://www.instagram.com/blessed_frenzy/" target="_blank" rel="noopener noreferrer" className="hover:underline">@blessed_frenzy</a>
              </div>
            </div>
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
