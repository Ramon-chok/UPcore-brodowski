import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { academy } from "../config/academy";

/**
 * CURIOSIDADE — "VEM AÍ / ALGO MAIOR / QUE TREINO."
 * A fachada cresce conforme o scroll (clip + scale) com linhas
 * arquitetônicas roxas. Texto monumental em camadas.
 */
export default function ComingBig() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* imagem: surge emoldurada e expande até full-bleed */
  const clip = useTransform(
    p,
    [0.08, 0.42],
    ["inset(14% 10% 14% 10% round 28px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const imgScale = useTransform(p, [0.08, 0.6], [1.3, 1.02]);
  const clipTemplate = useMotionTemplate`${clip}`;

  /* palavras em sequência */
  const w1o = useTransform(p, [0.1, 0.18, 0.3], [0, 1, 1]);
  const w1y = useTransform(p, [0.1, 0.2], [60, 0]);
  const w2o = useTransform(p, [0.16, 0.24, 0.34], [0, 1, 1]);
  const w2y = useTransform(p, [0.16, 0.26], [70, 0]);
  const w2s = useTransform(p, [0.16, 0.42], [1.12, 1]);
  const w3o = useTransform(p, [0.22, 0.3], [0, 1]);
  const w3y = useTransform(p, [0.22, 0.32], [70, 0]);

  const capO = useTransform(p, [0.42, 0.52], [0, 1]);
  const capY = useTransform(p, [0.42, 0.52], [26, 0]);

  const dim = useTransform(p, [0.12, 0.4], [0.35, 0.62]);
  const linesO = useTransform(p, [0.06, 0.2], [0, 1]);

  return (
    <section ref={ref} id="vem-ai" className="relative h-[240vh] bg-void">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* fachada */}
        <motion.div style={{ clipPath: clipTemplate }} className="absolute inset-0">
          <motion.img
            src="/images/Fachada.jpeg"
            alt="Fachada da academia UpCore Brodowski à noite"
            style={{ scale: imgScale }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-void" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </motion.div>

        {/* linhas arquitetônicas roxas */}
        <motion.div style={{ opacity: linesO }} className="pointer-events-none absolute inset-0">
          <div className="purple-beam absolute top-[22%] left-[-20%] h-px w-[140%] -rotate-[18deg] opacity-40" />
          <div className="purple-beam absolute top-[30%] left-[-20%] h-px w-[140%] -rotate-[18deg] opacity-20" />
          <div className="purple-beam absolute bottom-[18%] right-[-20%] h-px w-[140%] rotate-[14deg] opacity-30" />
          <div className="absolute top-1/2 left-10 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-up-500/60 to-transparent lg:block" />
          <div className="absolute top-1/2 right-10 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-up-500/60 to-transparent lg:block" />
        </motion.div>

        {/* texto monumental */}
        <div className="relative z-10 px-5 text-center">
          <motion.p
            style={{ opacity: capO }}
            className="label-mono mb-6 text-[10px] text-silver"
          >
            {academy.openingDateShort} — BRODOWSKI/SP
          </motion.p>
          <h2 className="h-display text-[clamp(3rem,11vw,10.5rem)]">
            <motion.span style={{ opacity: w1o, y: w1y }} className="block text-mist">
              VEM AÍ
            </motion.span>
            <motion.span
              style={{ opacity: w2o, y: w2y, scale: w2s }}
              className="text-outline block"
            >
              ALGO MAIOR
            </motion.span>
            <motion.span style={{ opacity: w3o, y: w3y }} className="neon-word block">
              QUE TREINO.
            </motion.span>
          </h2>
          <motion.p
            style={{ opacity: capO, y: capY }}
            className="mx-auto mt-8 max-w-md text-base leading-relaxed text-silver md:text-lg"
          >
            Uma nova experiência fitness está chegando em Brodowski.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
