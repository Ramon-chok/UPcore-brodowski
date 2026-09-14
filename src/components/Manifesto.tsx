import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const LINES_A = ["NÃO É", "APENAS", "SOBRE", "TREINAR."];

function ManifestoLine({
  text,
  p,
  index,
}: {
  text: string;
  p: MotionValue<number>;
  index: number;
}) {
  const start = 0.05 + index * 0.055;
  const opacity = useTransform(p, [start, start + 0.06], [0.08, 1]);
  const y = useTransform(p, [start, start + 0.06], [30, 0]);
  return (
    <motion.span style={{ opacity, y }} className="block text-mist">
      {text}
    </motion.span>
  );
}

/**
 * MANIFESTO — tipografia gigante revelada pelo scroll:
 * "NÃO É APENAS SOBRE TREINAR." → "É SOBRE EVOLUIR."
 */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const outAO = useTransform(p, [0.44, 0.55], [1, 0]);
  const outAY = useTransform(p, [0.44, 0.55], [0, -70]);
  const outAF = useTransform(p, [0.44, 0.55], ["blur(0px)", "blur(16px)"]);

  const inBO = useTransform(p, [0.57, 0.68], [0, 1]);
  const inBY = useTransform(p, [0.57, 0.72], [70, 0]);
  const glow = useTransform(p, [0.62, 0.85], [0, 0.9]);

  const labelO = useTransform(p, [0.86, 0.95], [0, 1]);

  return (
    <section ref={ref} id="manifesto" className="relative h-[340vh] bg-void">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* linhas verticais finas */}
        <div aria-hidden="true" className="absolute inset-0 mx-auto hidden max-w-5xl grid-cols-3 lg:grid">
          <span className="border-l hairline" />
          <span className="border-l hairline" />
          <span className="border-x hairline" />
        </div>

        {/* partículas roxas */}
        <div aria-hidden="true" className="absolute inset-0">
          <span className="absolute top-[24%] left-[18%] h-1 w-1 animate-float rounded-full bg-up-400 shadow-glow-soft" />
          <span className="absolute top-[62%] left-[78%] h-1.5 w-1.5 animate-float rounded-full bg-up-500/80 [animation-delay:1.2s]" />
          <span className="absolute top-[38%] left-[85%] h-1 w-1 animate-float rounded-full bg-up-300/70 [animation-delay:2.1s]" />
          <span className="absolute top-[74%] left-[28%] h-1 w-1 animate-float rounded-full bg-up-500/60 [animation-delay:0.7s]" />
          <span className="absolute top-[18%] left-[55%] h-px w-24 rotate-90 bg-gradient-to-b from-transparent via-up-500/50 to-transparent" />
        </div>

        {/* glow que nasce com EVOLUIR */}
        <motion.div
          style={{ opacity: glow }}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-up-600/20 blur-[150px]"
        />

        {/* fase A */}
        <motion.div
          style={{ opacity: outAO, y: outAY, filter: outAF }}
          className="absolute px-5 text-center"
        >
          <h2 className="h-display text-[clamp(3rem,10.5vw,10rem)]">
            {LINES_A.map((line, i) => (
              <ManifestoLine key={line} text={line} p={p} index={i} />
            ))}
          </h2>
        </motion.div>

        {/* fase B */}
        <motion.div
          style={{ opacity: inBO, y: inBY }}
          className="absolute px-5 text-center"
        >
          <h2 className="h-display text-[clamp(3rem,10.5vw,10rem)]">
            <span className="block text-mist">É SOBRE</span>
            <span className="neon-word block">EVOLUIR.</span>
          </h2>
          <motion.p
            style={{ opacity: labelO }}
            className="label-mono mt-10 text-[10px] text-silver"
          >
            UPCORE BRODOWSKI — MANIFESTO
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
