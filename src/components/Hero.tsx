import { Suspense, lazy, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { GlowButton } from "./ui";
import { WhatsAppIcon } from "./icons";
import {
  useIsMobile,
  useLowPowerDevice,
  useReducedMotion,
} from "../hooks/use-app";
import { scrollToTarget } from "../lib/scroll";
import { academy, whatsappUrl } from "../config/academy";

const HeroScene = lazy(() => import("../three/HeroScene"));

const HEADLINE = [
  { text: "A EVOLUÇÃO" },
  { text: "DO TREINO" },
  { text: "CHEGOU EM" },
  { text: "BRODOWSKI.", accent: true },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const lowPower = useLowPowerDevice();
  const isMobile = useIsMobile(1024);
  const show3D = !lowPower && !isMobile;
  const [bgLoaded, setBgLoaded] = useState(false);

  /* ---- scroll cinematográfico: hero diminui e desaparece ---- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, -120]);
  const contentFilter = useTransform(
    scrollYProgress,
    [0, 0.55],
    ["blur(0px)", "blur(12px)"],
  );
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const darkOpacity = useTransform(scrollYProgress, [0.2, 0.95], [0, 0.85]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.45], [0.95, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  /* ---- mouse parallax em camadas ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 50, damping: 22, mass: 0.5 });

  const bgX = useTransform(sx, (v) => v * -12);
  const bgY = useTransform(sy, (v) => v * -8);
  const fgX = useTransform(sx, (v) => v * 8);
  const sceneX = useTransform(sx, (v) => v * 28);
  const sceneY = useTransform(sy, (v) => v * 18);

  const bgTransform = useMotionTemplate`translate3d(${bgX}px, ${bgY}px, 0) scale(${bgScale})`;

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || isMobile) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const wa = whatsappUrl();

  return (
    <section ref={sectionRef} id="top" className="relative h-[135vh] bg-void">
      <div
        className="vignette sticky top-0 h-screen overflow-hidden"
        onMouseMove={onMouseMove}
      >
        {/* ===== camada: background (foto da estrutura com máscara aprimorada) ===== */}
        <motion.div style={{ transform: bgTransform }} className="absolute inset-0">
          <motion.img
            src="/images/hero.jpg"
            alt="Estrutura da UpCore Brodowski com iluminação roxa"
            onLoad={() => setBgLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: bgLoaded ? 1 : 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover select-none"
            loading="eager"
            fetchPriority="high"
          />
          {/* Degradê dinâmico ultra escuro para garantir leitura perfeita da tipografia */}
          <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/40 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/25 to-transparent" />
          
          {/* Glow de ambientação roxo neon */}
          <div className="absolute -bottom-1/4 -left-1/4 h-[80vh] w-[80vw] rounded-full bg-up-600/20 blur-[150px] pointer-events-none" />
          <div className="absolute top-10 right-10 h-[50vh] w-[50vw] rounded-full bg-up-500/10 blur-[130px] pointer-events-none" />
        </motion.div>

        {/* ===== camada: 3D Scene (Lado Direito) ===== */}
        {show3D && (
          <motion.div
            style={{ opacity: sceneOpacity, x: sceneX, y: sceneY }}
            className="pointer-events-none absolute right-[-2%] top-1/2 h-[80vh] w-[50vw] max-w-[1000px] -translate-y-1/2 z-10"
          >
            <Suspense fallback={null}>
              <HeroScene px={sx} py={sy} />
            </Suspense>
          </motion.div>
        )}

        {/* ===== camada: conteúdo principal (Lado Esquerdo) ===== */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
            x: fgX,
            filter: contentFilter,
          }}
          className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 md:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start">
              
              {/* Badge de Experiência Premium */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-up-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-up-500" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-silver md:text-[10px]">
                  UPCORE — A REVOLUÇÃO FITNESS
                </span>
              </motion.div>

              {/* Headline Monumental */}
              <h1 className="h-display text-[clamp(2.5rem,7.5vw,7.8rem)] leading-[0.92] tracking-tighter">
                {HEADLINE.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.04em]">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + i * 0.08,
                        ease: EASE,
                      }}
                      className={`block ${line.accent ? "neon-word font-extrabold" : "text-mist font-medium"}`}
                    >
                      {line.text}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Subtítulo Descritivo */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
                className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-zinc-400 font-normal"
              >
                {academy.openingMessage} Treinos intensos, estrutura incomparável e tecnologia voltada à sua melhor performance física.
              </motion.p>

              {/* Grupo de Ações */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: EASE }}
                className="mt-9 flex flex-wrap items-center gap-4 w-full sm:w-auto"
              >
                <GlowButton
                  size="lg"
                  cursorLabel="COMEÇAR"
                  onClick={() => scrollToTarget("#vem-ai")}
                  className="w-full sm:w-auto justify-center"
                >
                  Quero conhecer
                </GlowButton>
                <GlowButton
                  size="lg"
                  variant="ghost"
                  href={wa ?? "#contato"}
                  external={Boolean(wa)}
                  onClick={wa ? undefined : () => scrollToTarget("#contato")}
                  icon={<WhatsAppIcon className="h-4.5 w-4.5" />}
                  className="w-full sm:w-auto justify-center"
                >
                  {wa ? "Falar no WhatsApp" : "Falar com a UpCore"}
                </GlowButton>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Escurecimento progressivo ao rolar para baixo */}
        <motion.div
          style={{ opacity: darkOpacity }}
          className="pointer-events-none absolute inset-0 z-10 bg-void"
        />

        {/* ===== camada: Rodapé Técnico e Informativo (Grid Alinhado) ===== */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute inset-x-0 bottom-0 z-20 pb-8 px-6 md:px-12"
        >
          {/* Linha Divisória Fina */}
          <div className="mx-auto max-w-[1600px] h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-6" />

          <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6">
            
            {/* Widget Data de Inauguração */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="flex flex-col gap-1"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                STATUS DA UNIDADE
              </span>
              <span className="font-mono text-xs tracking-[0.08em] text-mist font-semibold">
                {academy.openingDateLabel}{" "}
                <span className="text-up-400 mx-1">//</span>{" "}
                <span className="text-zinc-400">{academy.openingTimeLabel}</span>
              </span>
            </motion.div>

            {/* Scroll Indicator minimalista */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="hidden flex-col items-center gap-2.5 md:flex absolute left-1/2 -translate-x-1/2 bottom-8"
            >
              <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 uppercase">
                SCROLL TO EXPLORE
              </span>
              <span className="relative h-10 w-[1.5px] overflow-hidden bg-white/[0.08]">
                <motion.span
                  animate={{ y: [-24, 40] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                  }}
                  className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-up-400 to-transparent"
                />
              </span>
            </motion.div>

            {/* Endereço / Localização */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="text-right flex flex-col gap-1"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                LOCALIZAÇÃO
              </span>
              <span className="font-mono text-xs tracking-[0.08em] text-silver uppercase">
                {academy.address.street} <span className="text-up-400/80">—</span> CENTRO
              </span>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}