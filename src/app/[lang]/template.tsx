"use client";

// `template.tsx` se vuelve a montar en cada navegación (a diferencia de
// `layout.tsx`), así que es el lugar correcto para el fade de entrada
// entre páginas sin recargas bruscas.
import { PageTransition } from "@/components/ui/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}