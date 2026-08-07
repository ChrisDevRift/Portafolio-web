// src/app/not-found.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProfile, getSocial } from "@/lib/data/client";
import { getDictionary } from "@/dictionaries";

export default async function NotFound() {
  
  const [profile, social] = await Promise.all([getProfile(), getSocial()]);
  const dict = getDictionary("es"); // not-found.tsx no recibe params — limitación de Next.js, se queda fijo en español

  return (
    <>
      <Navbar name={profile.fullName} dict={dict.navbar}/>
      <main className="blueprint-grid flex min-h-[calc(100dvh-4rem)] items-center justify-center border-b border-border px-6">
        <div className="corner-mark max-w-md rounded-xl border border-border bg-surface p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {dict.notFound.error}
          </p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight text-fg">
            {dict.notFound.heading}
          </h1>
          <p className="mt-3 text-fg-muted">
            {dict.notFound.description}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03]"
          >
            <ArrowLeft size={15} />
            {dict.notFound.backToHome}
          </Link>
        </div>
      </main>
      <Footer name={profile.fullName} social={social} />
    </>
  );
}