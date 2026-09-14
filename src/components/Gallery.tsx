import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

interface GalleryItem {
  src: string;
  alt: string;
  tag: string;
  className: string;
}

const ITEMS: GalleryItem[] = [
  {
    src: "/images/gym-strength.jpg",
    alt: "Zona de musculação da UpCore",
    tag: "MUSCULAÇÃO",
    className: "col-span-2 row-span-2 md:col-span-7 md:row-span-3",
  },
  {
    src: "/images/gym-cardio.jpg",
    alt: "Área de cardio com vista noturna",
    tag: "CARDIO",
    className: "row-span-2 md:col-span-5 md:row-span-3",
  },
  {
    src: "/images/gym-functional.jpg",
    alt: "Área funcional com turf e rigs",
    tag: "FUNCIONAL",
    className: "row-span-2 md:col-span-4",
  },
  {
    src: "/images/gym-detail.jpg",
    alt: "Detalhe de anilhas e equipamentos",
    tag: "DETALHES",
    className: "row-span-2 md:col-span-4",
  },
  {
    src: "/images/facade.jpg",
    alt: "Fachada da UpCore Brodowski",
    tag: "A CASA",
    className: "col-span-2 row-span-2 md:col-span-4",
  },
];

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const item = ITEMS[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-void/95 p-4 backdrop-blur-xl md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizar imagem: ${item.tag}`}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-40 w-[60vw] -translate-x-1/2 rounded-full bg-up-600/20 blur-[110px]" />

      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-mist transition-all hover:border-up-500 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Imagem anterior"
        className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-mist transition-all hover:border-up-500 hover:text-white md:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Próxima imagem"
        className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-mist transition-all hover:border-up-500 hover:text-white md:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full"
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[76vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-card"
        />
        <figcaption className="mt-4 flex items-center justify-between">
          <span className="label-mono text-[10px] text-mist">{item.tag}</span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-ash">
            {String(index + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const nav = useCallback(
    (dir: 1 | -1) =>
      setOpen((cur) =>
        cur === null ? null : (cur + dir + ITEMS.length) % ITEMS.length,
      ),
    [],
  );

  return (
    <section id="estrutura" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-up-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            label="ESTRUTURA"
            lines={[
              { text: "ESTRUTURA FEITA" },
              { text: "PARA VOCÊ EVOLUIR.", accent: true },
            ]}
          />
          <Reveal delay={0.2} className="max-w-xs md:text-right">
            <p className="text-sm leading-relaxed text-ash">
              Cada metro pensado para performance. Toque nas imagens para
              explorar.
            </p>
            <p className="label-mono mt-3 text-[9px] text-up-300">
              05 AMBIENTES
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[170px] md:auto-rows-[150px] md:grid-cols-12 md:gap-4 lg:auto-rows-[160px]">
          {ITEMS.map((item, i) => (
            <motion.figure
              key={item.tag}
              initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10% round 22px)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 22px)" }}
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              transition={{ duration: 1, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative cursor-pointer overflow-hidden border hairline",
                item.className,
              )}
              data-cursor="EXPLORAR"
              onClick={() => setOpen(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpen(i)}
              aria-label={`Abrir imagem: ${item.tag}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-up-600/0 mix-blend-overlay transition-colors duration-500 group-hover:bg-up-600/25" />
              <span className="label-mono absolute bottom-4 left-4 translate-y-2 text-[9px] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-5 md:left-5">
                {item.tag}
              </span>
              <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onClose={() => setOpen(null)} onNav={nav} />
        )}
      </AnimatePresence>
    </section>
  );
}
