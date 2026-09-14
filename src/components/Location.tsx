import { Calendar, MapPin, Navigation } from "lucide-react";
import { GlowButton, Reveal, SectionHeading } from "./ui";
import { InstagramIcon } from "./icons";
import {
  academy,
  instagramUrl,
  mapsDirUrl,
  mapsEmbedUrl,
  mapsUrl,
} from "../config/academy";

export default function LocationSection() {
  return (
    <section id="localizacao" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-full max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-up-600/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-10">
        {/* informações */}
        <div className="flex flex-col justify-center">
          <SectionHeading
            label="LOCALIZAÇÃO"
            lines={[
              { text: "ENCONTRE" },
              { text: "A UPCORE.", accent: true },
            ]}
          />

          <Reveal delay={0.2} className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-up-500/40 bg-up-500/10">
                <MapPin className="h-4.5 w-4.5 text-up-300" />
              </span>
              <div>
                <p className="h-display text-xl text-white md:text-2xl">
                  {academy.address.street.toUpperCase()}
                </p>
                <p className="label-mono mt-2 text-[10px] text-ash">
                  {academy.address.district.toUpperCase()} —{" "}
                  {academy.address.city.toUpperCase()}/{academy.address.state}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                <Calendar className="h-4.5 w-4.5 text-silver" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide text-mist">
                  Inauguração — {academy.openingDateShort} às{" "}
                  {academy.openingTimeLabel}
                </p>
                <p className="mt-1 text-xs text-ash">
                  Chegue cedo: as vagas de visitação são limitadas.
                </p>
              </div>
            </div>

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] transition-colors group-hover:border-up-500/50">
                  <InstagramIcon className="h-4.5 w-4.5 text-silver transition-colors group-hover:text-up-300" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-mist transition-colors group-hover:text-white">
                    @{academy.instagram.replace("@", "")}
                  </p>
                  <p className="mt-1 text-xs text-ash">
                    Rotas, dúvidas e novidades também pelo direct.
                  </p>
                </div>
              </a>
            )}
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
            <GlowButton href={mapsDirUrl} external icon={<Navigation className="h-4 w-4" />}>
              Como chegar
            </GlowButton>
            <GlowButton href={mapsUrl} external variant="ghost">
              Abrir no Google Maps
            </GlowButton>
          </Reveal>
        </div>

        {/* mapa escuro */}
        <Reveal delay={0.15} className="relative">
          <div className="map-dark relative h-[420px] overflow-hidden rounded-3xl border hairline lg:h-full lg:min-h-[520px]">
            <iframe
              title="Mapa — UpCore Brodowski"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
            />
            {/* tint roxa + vinheta sobre o mapa */}
            <div className="pointer-events-none absolute inset-0 bg-up-600/15 mix-blend-soft-light" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(5,5,5,0.8)]" />
            <span className="glass-panel label-mono absolute bottom-4 left-4 rounded-full px-4 py-2 text-[9px] text-mist">
              BRODOWSKI — SP
            </span>
            <span className="absolute top-4 right-4 flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-up-400" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
