// src/dictionaries/index.ts
import type { Lang } from "@/lib/data/client";
import { es } from "./es";
import { en } from "./en";

const dictionaries = { es, en };

export function getDictionary(lang: Lang) {
  return dictionaries[lang];
}