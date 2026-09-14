import { motion } from "framer-motion";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl } from "../config/academy";

/**
 * Botão flutuante de WhatsApp.
 * Só é exibido quando o número está configurado em academy.ts —
 * nunca exibimos números inventados.
 */
export default function WhatsAppFloat() {
  const url = whatsappUrl();
  if (!url) return null;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a UpCore Brodowski no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 220, damping: 16 }}
      className="group fixed right-5 bottom-5 z-[85] flex items-center md:right-8 md:bottom-8"
    >
      <span className="label-mono pointer-events-none mr-3 hidden rounded-full border border-white/10 bg-panel/90 px-4 py-2.5 text-[9px] text-mist opacity-0 backdrop-blur-md transition-all duration-400 group-hover:opacity-100 lg:block">
        FALAR NO WHATSAPP
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-up-500 to-up-600 shadow-glow transition-transform duration-400 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-up-500/40 [animation-duration:2.2s]" />
        <WhatsAppIcon className="relative h-6 w-6 text-white" />
      </span>
    </motion.a>
  );
}
