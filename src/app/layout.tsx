
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});


export const metadata: Metadata = {
  title: 'AFKDpu: Un Portal para Conexiones Conscientes',
  description: 'Gestiona tus interacciones como viajes simbólicos. Cada conexión es un portal que se abre, se transita y se cierra, dejando una memoria. Un espacio para la comunicación asíncrona y la transformación personal.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#A020F0" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={cn("font-body antialiased", fontInter.variable, fontSpaceGrotesk.variable)}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
