import { Crosshair, Dumbbell, Target, TrendingUp } from "lucide-react";
import { LogoMark, Reveal, SectionHeading } from "./ui";
import { academy } from "../config/academy";

const PILLARS = [
  {
    n: "01",
    title: "DISCIPLINA",
    desc: "Constância todos os dias. É ela que transforma intenção em hábito.",
    icon: Target,
  },
  {
    n: "02",
    title: "FOCO",
    desc: "Cada treino com intenção. Nada de distração, só presença e execução.",
    icon: Crosshair,
  },
  {
    n: "03",
    title: "FORÇA",
    desc: "Construída repetição por repetição, dentro e fora da academia.",
    icon: Dumbbell,
  },
  {
    n: "04",
    title: "RESULTADO",
    desc: "O destino natural de quem treina com método, estrutura e propósito.",
    icon: TrendingUp,
  },
];

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-full max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-up-600/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* texto institucional */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              label="SOBRE A UPCORE"
              lines={[
                { text: "MAIS DO QUE" },
                { text: "UMA ACADEMIA.", accent: true },
              ]}
            />
            <Reveal delay={0.25} className="mt-8 max-w-md">
              <p className="text-base leading-relaxed text-silver md:text-lg">
                A UpCore Brodowski nasce com uma proposta clara: elevar o padrão
                da experiência fitness em Brodowski, unindo ambiente, estrutura,
                performance e uma comunidade movida por evolução.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-10 flex items-center gap-4">
              <LogoMark className="h-10 w-10" />
              <div>
                <p className="label-mono text-[9px] text-ash">
                  {academy.name.toUpperCase()}
                </p>
                <p className="label-mono mt-1 text-[9px] text-up-300">
                  {academy.openingDateShort} — {academy.openingTimeLabel}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* pilares */}
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:gap-4">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.n}
              delay={0.08 * i}
              y={36}
              className={i % 2 === 1 ? "sm:translate-y-10" : ""}
            >
              <article className="group glass-panel relative h-full overflow-hidden rounded-2xl p-7 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-up-500/50 hover:shadow-glow-soft md:p-8">
                <div className="pointer-events-none absolute -top-14 -right-14 h-32 w-32 rounded-full bg-up-500/0 blur-[50px] transition-all duration-500 group-hover:bg-up-500/25" />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-[0.24em] text-up-400">
                    {pillar.n}
                  </span>
                  <pillar.icon className="h-5 w-5 text-ash transition-all duration-500 group-hover:-rotate-6 group-hover:text-up-300" />
                </div>
                <h3 className="h-display mt-8 text-2xl text-white md:text-3xl">
                  {pillar.title}
                </h3>
                <span className="mt-4 block h-px w-10 bg-up-500/60 transition-all duration-500 group-hover:w-16 group-hover:bg-up-400" />
                <p className="mt-4 text-sm leading-relaxed text-ash">
                  {pillar.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
