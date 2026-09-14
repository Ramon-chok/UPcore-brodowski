import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Label, Reveal } from "./ui";
import {
  useInViewOnce,
  useIsMobile,
  useLowPowerDevice,
} from "../hooks/use-app";

const ExperienceScene = lazy(() => import("../three/ExperienceScene"));

/** Fallback estático premium em CSS */
function ExperienceFallback() {
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center overflow-hidden">
      <div className="absolute h-72 w-72 rounded-full bg-up-600/20 blur-[100px]" />
      <div className="relative flex items-center justify-center rotate-[25deg] scale-110 animate-float">
        <div className="flex items-center -space-x-1 z-10">
          <div className="h-28 w-4 rounded-md bg-zinc-800 border-r border-zinc-700/50 shadow-lg" />
          <div className="h-36 w-8 rounded-lg bg-zinc-900 border border-zinc-700/80 shadow-2xl" />
          <div className="h-24 w-3 rounded-md bg-up-500 border-r border-up-400" />
        </div>
        <div className="relative h-6 w-32 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 border-y border-zinc-500 shadow-inner flex items-center justify-center">
          <div className="absolute inset-y-1 inset-x-3 border-x border-dashed border-zinc-900/60 opacity-40" />
        </div>
        <div className="flex items-center -space-x-1 z-10">
          <div className="h-24 w-3 rounded-md bg-up-500 border-l border-up-400" />
          <div className="h-36 w-8 rounded-lg bg-zinc-900 border border-zinc-700/80 shadow-2xl" />
          <div className="h-28 w-4 rounded-md bg-zinc-800 border-l border-zinc-700/50 shadow-lg" />
        </div>
        <div className="absolute inset-0 -z-10 bg-up-500/10 blur-2xl rounded-full scale-125" />
      </div>
    </div>
  );
}

export default function Experience3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const lowPower = useLowPowerDevice();
  const isMobile = useIsMobile(768);
  const canRender3D = !lowPower && !isMobile;

  const { ref: stageRef, inView } = useInViewOnce<HTMLDivElement>(
    "400px 0px 400px 0px", // Margem menor para ativar apenas quando estiver na tela
  );

  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Otimização: Aplicar transformações pesadas de escala e opacidade via CSS (motion.div)
  const scale = useTransform(p, [0.05, 0.5, 0.95], [0.82, 1.02, 0.94]);
  const stageO = useTransform(p, [0, 0.14, 0.86, 1], [0, 1, 1, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative overflow-hidden py-28 md:py-36 bg-void"
    >
      {/* glow de fundo */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-up-600/10 blur-[160px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <Label align="center">EXPERIÊNCIA UPCORE</Label>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-display mt-6 text-[clamp(2.4rem,6vw,5.5rem)]">
              <span className="block text-mist">FORÇA DA</span>
              <span className="text-outline block">EVOLUÇÃO.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="label-mono mt-6 text-[9px] text-ash md:text-[10px]">
              TECNOLOGIA · ESTRUTURA · PERFORMANCE — EM UM SÓ LUGAR
            </p>
          </Reveal>
        </div>

        {/* palco 3D */}
        <div ref={stageRef} className="relative mx-auto mt-6 max-w-6xl">
          {/* Otimização: A escala e opacidade acontecem na camada DOM/CSS, poupando a GPU */}
          <motion.div
            style={{ opacity: stageO, scale: scale }}
            className="relative h-[45vh] md:h-[65vh] will-change-transform"
          >
            {canRender3D && inView ? (
              <Suspense fallback={<ExperienceFallback />}>
                <ExperienceScene />
              </Suspense>
            ) : (
              <ExperienceFallback />
            )}

            {/* palavras flutuantes */}
            <span className="h-display pointer-events-none absolute top-[14%] left-[2%] hidden text-[clamp(1.7rem,4vw,3.8rem)] text-white/90 lg:block select-none">
              SEU TREINO.
            </span>
            <span className="h-display neon-word pointer-events-none absolute right-[2%] bottom-[14%] hidden text-[clamp(1.7rem,4vw,3.8rem)] lg:block select-none">
              OUTRO NÍVEL.
            </span>
          </motion.div>

          {/* versão mobile das palavras */}
          <div className="mt-4 flex items-center justify-between lg:hidden">
            <span className="h-display text-xl text-white">SEU TREINO.</span>
            <span className="h-display neon-word text-xl">OUTRO NÍVEL.</span>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-ash md:text-base">
            Um haltere de alta performance que representa o que a UpCore entrega:
            força, constância e evolução. Mova o mouse — a experiência responde.
          </p>
        </Reveal>
      </div>
    </section>
  );
}