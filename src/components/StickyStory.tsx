import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Label } from "./ui";
import { cn } from "../utils/cn";

const STAGES = [
  {
    n: "01",
    key: "DISCIPLINA",
    desc: "Treinar mesmo quando ninguém está olhando. A constância é o verdadeiro atalho.",
    img: "/images/athlete-discipline.jpg",
    alt: "Atleta treinando com cordas navais sob luz roxa",
  },
  {
    n: "02",
    key: "FOCO",
    desc: "Mente presente em cada série. O detalhe que separa o comum do extraordinário.",
    img: "/images/athlete-focus.jpg",
    alt: "Atleta focado preparando as mãos para o treino",
  },
  {
    n: "03",
    key: "FORÇA",
    desc: "Construída devagar, repetição por repetição, com técnica e estrutura de verdade.",
    img: "/images/athlete-strength.jpg",
    alt: "Atleta executando levantamento terra em silhueta",
  },
  {
    n: "04",
    key: "RESULTADO",
    desc: "Quando disciplina, foco e força se encontram, a evolução aparece no espelho.",
    img: "/images/athlete-result.jpg",
    alt: "Atleta contemplando o amanhecer após o treino",
  },
];

/**
 * STICKY STORY — à esquerda os capítulos, à direita o visual.
 * O scroll troca texto, imagem e iluminação.
 */
export default function StickyStory() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(p, "change", (v) => {
    setActive(Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length))));
  });

  const stage = STAGES[active];

  return (
    <section ref={ref} className="relative h-[420vh] bg-coal">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-8 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
          {/* texto */}
          <div className="order-2 lg:order-1">
            <div className="mb-6 hidden lg:block">
              <Label>A JORNADA UPCORE</Label>
            </div>

            <div>
              {STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={s.n}
                    className="border-b hairline py-3 transition-colors duration-500 lg:py-5"
                  >
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span
                        className={cn(
                          "font-mono text-[10px] tracking-[0.24em] transition-colors duration-500 lg:text-xs",
                          isActive ? "text-up-300" : "text-white/25",
                        )}
                      >
                        {s.n}
                      </span>
                      <h3
                        className={cn(
                          "h-display text-2xl transition-all duration-500 sm:text-3xl lg:text-5xl",
                          isActive ? "text-white" : "text-white/15",
                          isActive && s.key === "RESULTADO" && "neon-word",
                        )}
                      >
                        {s.key}
                      </h3>
                      <span
                        className={cn(
                          "ml-auto h-px flex-1 origin-left bg-up-500/70 transition-transform duration-700",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          key={s.n}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pl-9 text-xs leading-relaxed text-ash lg:pl-12 lg:text-sm"
                        >
                          <span className="block pt-2">{s.desc}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* progresso */}
            <div className="mt-6 flex items-center gap-4 lg:mt-8">
              <div className="relative h-px flex-1 bg-white/10">
                <motion.div
                  style={{ scaleX: p }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-up-600 to-up-300"
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-ash">
                {stage.n} <span className="text-white/25">/ 04</span>
              </span>
            </div>
          </div>

          {/* visual */}
          <div className="relative order-1 h-[36vh] overflow-hidden rounded-3xl border hairline sm:h-[42vh] lg:order-2 lg:h-[76vh]">
            {STAGES.map((s, i) => (
              <motion.img
                key={s.n}
                src={s.img}
                alt={s.alt}
                loading="lazy"
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : 1.08,
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            {/* iluminação da cena */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/30" />
            <motion.div
              animate={{ opacity: 0.16 + active * 0.04 }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-up-600/40 via-transparent to-transparent mix-blend-screen"
            />
            {/* etiqueta */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 lg:bottom-6 lg:left-6">
              <span className="glass-panel rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-mist">
                {stage.n} — {stage.key}
              </span>
            </div>
            <span className="absolute top-4 right-4 h-2 w-2 animate-pulse-dot rounded-full bg-up-400 lg:top-6 lg:right-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
