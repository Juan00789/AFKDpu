import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-headline text-2xl font-bold text-primary-foreground">
          AFKDpu
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4">Servicios</Link>
          <Link href="#concierge" className="text-sm font-medium hover:underline underline-offset-4">Conserjería</Link>
          <Link href="#stories" className="text-sm font-medium hover:underline underline-offset-4">Mi Experiencia</Link>
          <Link href="#timeline" className="text-sm font-medium hover:underline underline-offset-4">Trayectoria</Link>
          <Link href="#manuals" className="text-sm font-medium hover:underline underline-offset-4">Filosofía</Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
