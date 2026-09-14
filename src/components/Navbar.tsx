import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "./icons";
import { GlowButton, Label, Logo } from "./ui";
import { useScrolled } from "../hooks/use-app";
import { scrollToTarget } from "../lib/scroll";
import { academy, instagramUrl, primaryContactHref } from "../config/academy";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Inauguração", href: "#inauguracao" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const scrolled = useScrolled(48);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => (e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpen(false);
    // espera o menu fechar para uma transição limpa
    window.setTimeout(() => scrollToTarget(href), open ? 350 : 0);
  };

  const cta = primaryContactHref();
  const ctaIsAnchor = cta.startsWith("#");

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled
            ? "border-b hairline bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 md:px-10",
            scrolled ? "h-16" : "h-20 md:h-24",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={go(link.href)}
                className="group relative label-mono text-[10px] text-silver transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-up-400 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da UpCore Brodowski"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-silver transition-all duration-300 hover:border-up-500/60 hover:text-white hover:shadow-glow-soft md:flex"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
            <GlowButton
              href={cta}
              onClick={ctaIsAnchor ? () => scrollToTarget("#contato") : undefined}
              external={!ctaIsAnchor}
              className="hidden md:inline-flex"
              cursorLabel="ENTRAR"
            >
              Quero conhecer
            </GlowButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-up-500/60 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile imersivo */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] flex flex-col bg-void/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-up-600/25 blur-[130px]" />
            <div className="flex h-20 items-center justify-between px-5 md:px-10">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist hover:border-up-500/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="Menu">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={go(link.href)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 border-b hairline py-4"
                >
                  <span className="label-mono text-[10px] text-up-400">
                    0{i + 1}
                  </span>
                  <span className="h-display text-[11vw] leading-none text-mist transition-colors group-hover:text-white sm:text-5xl">
                    {link.label.toUpperCase()}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 px-8 pb-10"
            >
              <Label>Inauguração — {academy.openingDateShort}</Label>
              <div className="flex items-center justify-between gap-4">
                <GlowButton
                  href={cta}
                  onClick={ctaIsAnchor ? () => { setOpen(false); scrollToTarget("#contato"); } : undefined}
                  external={!ctaIsAnchor}
                  size="md"
                >
                  Quero conhecer
                </GlowButton>
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram da UpCore Brodowski"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-mist"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
