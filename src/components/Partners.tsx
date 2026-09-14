import { ArrowUpRight, Handshake } from "lucide-react";
import { GlowButton, Reveal, SectionHeading } from "./ui";
import { partners, whatsappUrl } from "../config/academy";
import { scrollToTarget } from "../lib/scroll";

/**
 * PARCEIROS — grid de logos quando cadastrados;
 * caso contrário, chamada "Seja um dos nossos parceiros".
 */
export default function Partners() {
  const partnerUrl = whatsappUrl(
    "Olá! Tenho interesse em ser parceiro da UpCore Brodowski.",
  );

  return (
    <section id="parceiros" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-full max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          label="PARCEIROS"
          align="center"
          lines={[
            { text: "PARCEIROS QUE" },
            { text: "FAZEM PARTE DA" },
            { text: "NOSSA EVOLUÇÃO.", accent: true },
          ]}
        />

        {partners.length === 0 ? (
          <Reveal delay={0.2} className="mx-auto mt-16 max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-panel/60 px-8 py-14 text-center md:py-20">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-up-600/20 blur-[100px]" />
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-up-500/40 bg-up-500/10 shadow-glow-soft">
                <Handshake className="h-6 w-6 text-up-300" />
              </span>
              <h3 className="h-display relative mt-8 text-[clamp(1.6rem,3.5vw,2.6rem)] text-white">
                SEJA UM DOS NOSSOS
                <span className="neon-word block">PARCEIROS.</span>
              </h3>
              <p className="relative mx-auto mt-5 max-w-md text-sm leading-relaxed text-ash md:text-base">
                Estamos construindo algo novo em Brodowski — e grandes marcas
                constroem juntas. Vamos conversar sobre parceria.
              </p>
              <div className="relative mt-9 flex justify-center">
                <GlowButton
                  size="lg"
                  href={partnerUrl ?? "#contato"}
                  external={Boolean(partnerUrl)}
                  onClick={partnerUrl ? undefined : () => scrollToTarget("#contato")}
                  cursorLabel="ENTRAR"
                >
                  Quero ser parceiro
                </GlowButton>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {partners.map((partner, i) => (
              <Reveal key={partner.name} delay={0.06 * i} className="h-full">
                <a
                  href={partner.website || "#"}
                  target={partner.website ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group glass-panel flex h-full min-h-36 flex-col items-center justify-center gap-3 rounded-2xl p-6 opacity-60 grayscale transition-all duration-500 hover:scale-[1.03] hover:border-up-500/50 hover:opacity-100 hover:grayscale-0 hover:shadow-glow-soft"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      loading="lazy"
                      className="max-h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="h-display text-lg text-mist">{partner.name}</span>
                  )}
                  <span className="label-mono flex items-center gap-1.5 text-[8px] text-ash group-hover:text-up-300">
                    {partner.category.toUpperCase()}
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
