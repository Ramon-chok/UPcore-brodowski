import { ArrowUpRight } from "lucide-react";
import { GlowButton, Reveal, SectionHeading } from "./ui";
import { InstagramIcon } from "./icons";
import { academy, instagramUrl } from "../config/academy";

/* Categorias de conteúdo do perfil (componente preparado para
   futura integração com a API/feed do Instagram). */
const TILES = [
  { label: "TREINOS", glow: "from-up-600/25" },
  { label: "BASTIDORES", glow: "from-up-500/20" },
  { label: "NOVIDADES", glow: "from-up-400/20" },
  { label: "COMUNIDADE", glow: "from-up-500/25" },
  { label: "INAUGURAÇÃO", glow: "from-up-600/30" },
  { label: "EVOLUÇÃO", glow: "from-up-400/20" },
];

export default function InstagramSection() {
  if (!instagramUrl) return null;

  return (
    <section id="instagram" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-up-600/15 blur-[150px]" />

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            label={`INSTAGRAM — @${academy.instagram.replace("@", "")}`}
            lines={[
              { text: "ACOMPANHE" },
              { text: "A UPCORE.", accent: true },
            ]}
          />
          <Reveal delay={0.25} className="mt-8 max-w-md">
            <p className="text-base leading-relaxed text-silver md:text-lg">
              Treinos, bastidores, novidades e tudo o que acontece na nova fase
              da UpCore Brodowski.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mt-10">
            <GlowButton
              size="lg"
              variant="ghost"
              href={instagramUrl}
              external
              cursorLabel="EXPLORE"
              icon={<InstagramIcon className="h-4 w-4" />}
            >
              Seguir no Instagram
            </GlowButton>
          </Reveal>
          <Reveal delay={0.42} className="mt-8">
            <p className="label-mono text-[9px] text-ash">
              FEED AO VIVO EM BREVE — ENQUANTO ISSO, SIGA O PERFIL
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {TILES.map((tile, i) => (
            <Reveal key={tile.label} delay={0.05 * i} y={24}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="EXPLORE"
                aria-label={`Ver ${tile.label.toLowerCase()} no Instagram da UpCore`}
                className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border hairline bg-panel transition-all duration-500 hover:-translate-y-1 hover:border-up-500/60 hover:shadow-glow-soft"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${tile.glow} to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <InstagramIcon className="relative h-6 w-6 text-silver transition-all duration-500 group-hover:scale-110 group-hover:text-white" />
                <span className="label-mono relative mt-3 text-[8px] text-ash transition-colors duration-500 group-hover:text-up-300 md:text-[9px]">
                  {tile.label}
                </span>
                <span className="absolute top-3 right-3 text-white/0 transition-colors duration-500 group-hover:text-white/70">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
