import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  Building2,
  Cpu,
  Dumbbell,
  Users,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { useReducedMotion } from "../hooks/use-app";

const ITEMS = [
  {
    n: "01",
    title: "AMBIENTE MODERNO",
    desc: "Arquitetura, iluminação e clima pensados para você querer ficar.",
    icon: Building2,
  },
  {
    n: "02",
    title: "EQUIPAMENTOS",
    desc: "Máquinas selecionadas para treino pesado, técnico e seguro.",
    icon: Dumbbell,
  },
  {
    n: "03",
    title: "PERFORMANCE",
    desc: "Treinos com intenção: força, condicionamento e evolução medida.",
    icon: Activity,
  },
  {
    n: "04",
    title: "COMUNIDADE",
    desc: "Um ambiente movido por pessoas que buscam evoluir todos os dias.",
    icon: Users,
  },
  {
    n: "05",
    title: "ORGANIZAÇÃO",
    desc: "Espaço impecável, fluxo inteligente e padrão em cada detalhe.",
    icon: BadgeCheck,
  },
  {
    n: "06",
    title: "TECNOLOGIA",
    desc: "Uma experiência conectada, do primeiro contato ao treino diário.",
    icon: Cpu,
  },
];

function TiltCard({
  item,
  index,
}: {
  item: (typeof ITEMS)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const rxv = useMotionValue(0);
  const ryv = useMotionValue(0);
  const rx = useSpring(rxv, { stiffness: 180, damping: 22 });
  const ry = useSpring(ryv, { stiffness: 180, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rxv.set(py * -5);
    ryv.set(px * 5);
    ref.current.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    rxv.set(0);
    ryv.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative h-full overflow-hidden rounded-2xl border hairline bg-panel p-7 transition-[border-color,box-shadow] duration-500 hover:border-up-500/50 hover:shadow-glow-soft md:p-8"
    >
      {/* glare que segue o mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), rgba(161,0,255,0.13), transparent 65%)",
        }}
      />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-xs tracking-[0.24em] text-up-400">
          {item.n}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] transition-all duration-500 group-hover:border-up-500/50 group-hover:shadow-glow-soft">
          <item.icon className="h-5 w-5 text-silver transition-colors duration-500 group-hover:text-up-300" />
        </span>
      </div>
      <h3 className="h-display relative mt-9 text-xl text-white md:text-2xl">
        {item.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-ash">
        {item.desc}
      </p>
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-up-600 to-up-300 transition-transform duration-700 ease-out group-hover:scale-x-100" />
      <span className="sr-only">Diferencial {index + 1}</span>
    </motion.article>
  );
}

export default function Differentials() {
  return (
    <section id="diferenciais" className="relative py-28 md:py-36">
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          label="DIFERENCIAIS"
          align="center"
          lines={[
            { text: "SEU TREINO." },
            { text: "OUTRO NÍVEL.", accent: true },
          ]}
        />

        <div className="mt-16 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.n} delay={0.06 * i} y={32} className="h-full">
              <TiltCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
