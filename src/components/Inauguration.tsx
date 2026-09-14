import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { GlowButton, Reveal, SectionHeading } from "./ui";
import { useCountdown } from "../hooks/use-app";
import { scrollToTarget } from "../lib/scroll";
import { academy, whatsappUrl } from "../config/academy";

const pad = (n: number) => String(n).padStart(2, "0");

/** Gera um lembrete .ics real da inauguração. */
function downloadReminder() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UpCore Brodowski//Inauguracao//PT-BR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:inauguracao-2026@upcorebrodowski",
    "DTSTAMP:20260101T120000Z",
    "DTSTART:20260919T120000Z",
    "DTEND:20260919T150000Z",
    "SUMMARY:Inauguração UpCore Brodowski",
    "DESCRIPTION:Uma nova fase começa agora. A evolução do treino chegou em Brodowski.",
    "LOCATION:Rua Thompson Flores\\, 163 — Centro\\, Brodowski/SP",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "upcore-inauguracao.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function CountdownCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-panel group relative overflow-hidden rounded-2xl px-4 py-8 text-center transition-colors duration-500 hover:border-up-500/40 md:py-10">
      <div className="pointer-events-none absolute -top-16 left-1/2 h-28 w-40 -translate-x-1/2 rounded-full bg-up-500/25 blur-[50px] transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-[1.1em] overflow-visible">
        <motion.span
          key={value}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-display block text-[clamp(2.6rem,6.5vw,5rem)] text-white [font-variant-numeric:tabular-nums]"
          style={{ textShadow: "0 0 34px rgba(120,0,255,0.4)" }}
        >
          {value}
        </motion.span>
      </div>
      <p className="label-mono mt-4 text-[9px] text-ash">{label}</p>
    </div>
  );
}

export default function Inauguration() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(
    academy.openingDateISO,
  );
  const joinUrl = whatsappUrl(
    "Olá! Quero participar da inauguração da UpCore Brodowski em 19/09/2026 às 09:00.",
  );

  return (
    <section id="inauguracao" className="relative overflow-hidden py-28 md:py-40">
      {/* glow volumétrico */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[46vh] w-[80vw] -translate-x-1/2 rounded-full bg-up-600/15 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-up-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            label="INAUGURAÇÃO — SAVE THE DATE"
            size="lg"
            lines={[
              { text: "UMA NOVA FASE" },
              { text: "COMEÇA AGORA.", accent: true },
            ]}
          />
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-sm leading-relaxed text-ash md:text-base">
              {academy.openingMessage} Venha conhecer de perto a estrutura, a
              energia e o padrão que a UpCore traz para a cidade.
            </p>
          </Reveal>
        </div>

        {isPast ? (
          <Reveal className="mt-20">
            <div className="glass-panel relative overflow-hidden rounded-3xl px-8 py-16 text-center md:py-24">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[34rem] -translate-x-1/2 rounded-full bg-up-500/30 blur-[110px]" />
              <p className="h-display neon-word relative text-[clamp(2.6rem,8vw,7rem)]">
                ESTAMOS ABERTOS.
              </p>
              <p className="label-mono relative mt-6 text-[10px] text-silver">
                A NOVA EXPERIÊNCIA FITNESS DE BRODOWSKI JÁ ESTÁ NO AR
              </p>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.15} className="mt-16 md:mt-20">
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                <CountdownCard value={pad(days)} label="DIAS" />
                <CountdownCard value={pad(hours)} label="HORAS" />
                <CountdownCard value={pad(minutes)} label="MINUTOS" />
                <CountdownCard value={pad(seconds)} label="SEGUNDOS" />
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-12">
              <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
                <span className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-up-400" />
                  <span className="font-mono text-xs tracking-[0.18em] text-mist">
                    {academy.openingDateShort}
                  </span>
                </span>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <span className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-up-400" />
                  <span className="font-mono text-xs tracking-[0.18em] text-mist">
                    {academy.openingTimeLabel}
                  </span>
                </span>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <span className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-up-400" />
                  <span className="font-mono text-xs tracking-[0.18em] text-silver">
                    {academy.address.street} — CENTRO
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.32} className="mt-12">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <GlowButton
                  size="lg"
                  cursorLabel="ENTRAR"
                  href={joinUrl ?? "#contato"}
                  external={Boolean(joinUrl)}
                  onClick={joinUrl ? undefined : () => scrollToTarget("#contato")}
                >
                  Quero participar
                </GlowButton>
                <GlowButton size="lg" variant="ghost" onClick={downloadReminder}>
                  Adicionar à agenda
                </GlowButton>
              </div>
            </Reveal>
          </>
        )}

        {!isPast && (
          <Reveal delay={0.4} className="mt-10">
            <p className="text-center label-mono text-[9px] text-ash">
              VAGAS DE VISITAÇÃO LIMITADAS NO DIA DA INAUGURAÇÃO
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
