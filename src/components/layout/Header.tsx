import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-headline text-2xl font-bold text-primary">
          AFKDpu
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Servicios</Link>
          <Link href="#stories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Mi Experiencia</Link>
          <Link href="#timeline" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Trayectoria</Link>
          <Link href="#manuals" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Filosofía</Link>
          <Link href="/gastos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Gastos</Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
