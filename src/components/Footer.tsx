import { ArrowUp } from "lucide-react";
import { GlowButton, Logo, MarqueeStrip, Reveal } from "./ui";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TikTokIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "./icons";
import { scrollToTarget, scrollToTop } from "../lib/scroll";
import {
  academy,
  facebookUrl,
  instagramUrl,
  primaryContactHref,
  tiktokUrl,
  whatsappUrl,
  youtubeUrl,
} from "../config/academy";

const NAV = [
  { label: "Inauguração", href: "#inauguracao" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Parceiros", href: "#parceiros" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  const socials = [
    instagramUrl && { label: "Instagram", href: instagramUrl, Icon: InstagramIcon },
    whatsappUrl() && { label: "WhatsApp", href: whatsappUrl()!, Icon: WhatsAppIcon },
    facebookUrl && { label: "Facebook", href: facebookUrl, Icon: FacebookIcon },
    tiktokUrl && { label: "TikTok", href: tiktokUrl, Icon: TikTokIcon },
    youtubeUrl && { label: "YouTube", href: youtubeUrl, Icon: YoutubeIcon },
    academy.email && {
      label: "E-mail",
      href: `mailto:${academy.email}`,
      Icon: MailIcon,
    },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof InstagramIcon }[];

  const cta = primaryContactHref();
  const ctaIsAnchor = cta.startsWith("#");

  return (
    <footer className="relative overflow-hidden bg-void">
      <MarqueeStrip
        items={["DISCIPLINA.", "FOCO.", "FORÇA.", "RESULTADO."]}
        className="border-t-0"
      />

      {/* glow de fundo */}
      <div className="pointer-events-none absolute -bottom-52 left-1/2 h-[30rem] w-[70vw] -translate-x-1/2 rounded-full bg-up-600/15 blur-[160px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 pt-20 pb-10 md:px-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* marca */}
          <Reveal className="lg:col-span-5">
            <Logo />
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-ash md:text-base">
              {academy.tagline} Uma nova experiência fitness em{" "}
              {academy.address.city}/{academy.address.state} — estrutura,
              performance e uma comunidade movida por evolução.
            </p>
            <div className="mt-8 space-y-2">
              <p className="label-mono text-[9px] text-silver">
                {academy.address.street.toUpperCase()}
              </p>
              <p className="label-mono text-[9px] text-ash">
                {academy.address.district.toUpperCase()} —{" "}
                {academy.address.city.toUpperCase()}/{academy.address.state}
              </p>
              <p className="label-mono text-[9px] text-up-300">
                INAUGURAÇÃO {academy.openingDateShort} · {academy.openingTimeLabel}
              </p>
            </div>
          </Reveal>

          {/* explorar */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <p className="label-mono text-[10px] text-ash">EXPLORAR</p>
            <nav className="mt-6 flex flex-col gap-3.5" aria-label="Rodapé">
              {NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(link.href);
                  }}
                  className="group flex w-fit items-center gap-3 text-sm text-silver transition-colors duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-up-400 transition-all duration-400 group-hover:w-5" />
                  {link.label}
                </a>
              ))}
            </nav>
          </Reveal>

          {/* social + cta */}
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="label-mono text-[10px] text-ash">SIGA A UPCORE</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} da UpCore Brodowski`}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-silver transition-all duration-400 hover:-translate-y-1 hover:border-up-500/60 hover:text-white hover:shadow-glow-soft"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>

            <div className="glass-panel mt-9 rounded-2xl p-6">
              <p className="h-display text-lg text-white">
                PRONTO PARA EVOLUIR<span className="text-up-400">?</span>
              </p>
              <GlowButton
                href={cta}
                external={!ctaIsAnchor}
                onClick={ctaIsAnchor ? () => scrollToTarget("#contato") : undefined}
                className="mt-5 w-full"
                cursorLabel="ENTRAR"
              >
                Fale com a UpCore
              </GlowButton>
            </div>
          </Reveal>
        </div>

        {/* barra final */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t hairline pt-7 md:flex-row">
          <p className="label-mono text-[8px] text-ash">
            © 2026 {academy.legalName.toUpperCase()}. TODOS OS DIREITOS RESERVADOS.
          </p>
          <p className="label-mono text-[8px] text-ash">BRODOWSKI — SP — BRASIL</p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-silver transition-all duration-400 hover:-translate-y-1 hover:border-up-500/60 hover:text-white hover:shadow-glow-soft"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-400 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
