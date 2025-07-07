import { cn } from '@/lib/utils';
import React from 'react';

// Este componente está listo para recibir tu logo SVG.
// Simplemente reemplaza el contenido dentro de la etiqueta <svg> con el tuyo.
export const CurrencyIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(className)}
    {...props}
  >
    {/* Contenido del SVG de la moneda va aquí. Este es un marcador de posición. */}
    {/* Reemplaza el <circle> y <path> con el contenido de tu logo SVG. */}
    <circle cx="12" cy="12" r="10" />
    <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
  </svg>
);
