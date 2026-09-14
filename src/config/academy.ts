/**
 * =========================================================
 * UPCORE BRODOWSKI — CONFIGURAÇÃO CENTRAL
 * =========================================================
 * Todas as informações institucionais do site ficam aqui.
 * Preencha whatsapp / email / redes sociais para ativá-las
 * automaticamente em todo o site (CTAs, botão flutuante,
 * footer e formulário de contato).
 */

export interface Partner {
  name: string;
  logo: string;
  website: string;
  instagram: string;
  category: string;
}

export interface AcademyConfig {
  name: string;
  shortName: string;
  legalName: string;
  siteUrl: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    district: string;
    city: string;
    state: string;
    mapsQuery: string;
  };
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  openingDateISO: string;
  openingDateLabel: string;
  openingDateShort: string;
  openingTimeLabel: string;
  openingMessage: string;
}

export const academy: AcademyConfig = {
  name: "Desenvolvido pela RR Mind",
  shortName: "RR Mind",
  legalName: "RR Mind",

  // URL pública do site (usada em SEO / sitemap / Open Graph)
  siteUrl: "https://www.upcorebrodowski.com.br",

  tagline: "A evolução do treino chegou em Brodowski.",
  description:
    "Conheça a UpCore Brodowski, uma nova experiência fitness em Brodowski/SP. Estrutura, performance, evolução e uma nova forma de treinar.",

  address: {
    street: "Rua Thompson Flores, 163",
    district: "Centro",
    city: "Brodowski",
    state: "SP",
    mapsQuery: "Rua Thompson Flores, 163, Centro, Brodowski, SP, Brasil",
  },

  // DDD+DDD+número, apenas dígitos, com código do país. Ex: "5516987654321"
  whatsapp: "",
  whatsappMessage:
    "Olá! Conheci a UpCore Brodowski pelo site e gostaria de saber mais sobre a academia.",

  email: "",

  // Redes sociais — deixe "" para ocultar automaticamente
  instagram: "upcore_brodowski",
  facebook: "",
  tiktok: "",
  youtube: "",

  // Inauguração — 19/09/2026 às 09:00 (America/Sao_Paulo, UTC-3)
  openingDateISO: "2026-09-19T09:00:00-03:00",
  openingDateLabel: "19 SETEMBRO 2026",
  openingDateShort: "19.09.2026",
  openingTimeLabel: "09:00H",
  openingMessage: "Uma nova experiência fitness está chegando em Brodowski.",
};

/** Parceiros cadastrados — quando vazio, a seção exibe o CTA "Seja parceiro". */
export const partners: Partner[] = [];

/* =========================================================
 * Helpers derivados (não editar)
 * ========================================================= */

export const instagramUrl = academy.instagram
  ? `https://www.instagram.com/${academy.instagram.replace("@", "")}`
  : "";

export const facebookUrl = academy.facebook
  ? `https://www.facebook.com/${academy.facebook.replace("@", "")}`
  : "";

export const tiktokUrl = academy.tiktok
  ? `https://www.tiktok.com/@${academy.tiktok.replace("@", "")}`
  : "";

export const youtubeUrl = academy.youtube
  ? academy.youtube.startsWith("http")
    ? academy.youtube
    : `https://www.youtube.com/@${academy.youtube.replace("@", "")}`
  : "";

export function whatsappUrl(
  message: string = academy.whatsappMessage,
): string | null {
  if (!academy.whatsapp) return null;
  return `https://wa.me/${academy.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  academy.address.mapsQuery,
)}`;

export const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  academy.address.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  academy.address.mapsQuery,
)}&z=16&output=embed`;

/** Link padrão do CTA de conversão: WhatsApp quando configurado, senão contato. */
export function primaryContactHref(message?: string): string {
  return whatsappUrl(message) ?? "#contato";
}
