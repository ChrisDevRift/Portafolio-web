import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Página no encontrada",
  description: "El contenido que buscas no está disponible o se movió de lugar.",
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <main className="blueprint-grid flex min-h-dvh items-center justify-center border-b border-border px-6">
          <div className="corner-mark max-w-md rounded-xl border border-border bg-surface p-10 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Error 404
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-fg">
              Esta página no existe
            </h1>
            <p className="mt-3 text-fg-muted">
              El contenido que buscas no está disponible o se movió de lugar.
            </p>
            <a
              href="/es"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03]"
            >
              <ArrowLeft size={15} />
              Volver al inicio
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}