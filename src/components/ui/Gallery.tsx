"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryProps {
  images: string[];
  alt: string;
}

export function Gallery({ images, alt }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // document solo existe en cliente; hasta que se monte no hay a dónde
  // "portar" el overlay.
  useEffect(() => {
    console.log("MOUNT GALLERY");
    setMounted(true);
  }, []);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(
    () =>
      setSelected((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () => setSelected((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (selected === null) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    console.log("SELECTED CAMBIO:", selected);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, close, prev, next]);

  console.log("RENDER GALLERY", {
    mounted,
    selected,
  });

  const overlay =
    mounted &&
    createPortal(
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            className="fixed inset-0 z-999999 flex items-center justify-center p-6 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar galería"
              className="absolute right-6 top-6 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/70"
            >
              <X size={22} />
            </button>
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selected]}
                alt={`${alt} — captura ${selected + 1}`}
                width={1920}
                height={1080}
                loading="eager"
                className="max-h-[90vh] max-w-[95vw] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              console.log("open", i);
              setSelected(i);
            }}
            className="corner-mark group relative aspect-video overflow-hidden rounded-lg border border-border bg-border"
          >
            <Image
              src={src}
              alt={`${alt} — captura ${i + 1}`}
              fill
              sizes="480px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {overlay}
    </>
  );
}
