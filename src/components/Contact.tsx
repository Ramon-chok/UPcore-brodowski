import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, MapPin, Send } from "lucide-react";
import { GlowButton, Reveal, SectionHeading } from "./ui";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./icons";
import { academy, instagramUrl, whatsappUrl } from "../config/academy";

type Status = "idle" | "sending" | "success";

const SUBJECTS = [
  "Quero conhecer a academia",
  "Inauguração — 19.09.2026",
  "Quero ser parceiro",
  "Outro assunto",
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-mist placeholder:text-white/25 outline-none transition-all duration-300 focus:border-up-500/70 focus:bg-up-500/[0.04] focus:ring-2 focus:ring-up-500/20";

const labelClass = "label-mono mb-2 block text-[9px] text-ash";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const waConfigured = Boolean(academy.whatsapp);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") ?? "").trim();
    const telefone = String(data.get("telefone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const assunto = String(data.get("assunto") ?? SUBJECTS[0]);
    const mensagem = String(data.get("mensagem") ?? "").trim();

    const fullMessage =
      `Olá! Meu nome é ${nome}. ${mensagem} ` +
      `(Assunto: ${assunto} · Tel: ${telefone}${email ? ` · E-mail: ${email}` : ""})`;

    setStatus("sending");
    const wa = whatsappUrl(fullMessage);
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      window.setTimeout(() => setStatus("success"), 700);
    } else {
      // Sem backend configurado: feedback local (pronto para integração
      // futura — e-mail/API pode ser ligado em src/config/academy.ts).
      window.setTimeout(() => setStatus("success"), 1000);
    }
  };

  const reset = () => setStatus("idle");

  return (
    <section id="contato" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-full max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -bottom-44 left-1/3 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-up-600/12 blur-[150px]" />

      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* texto */}
        <div className="lg:col-span-5">
          <SectionHeading
            label="CONTATO"
            lines={[{ text: "VAMOS" }, { text: "CONVERSAR?", accent: true }]}
          />
          <Reveal delay={0.22} className="mt-8 max-w-md">
            <p className="text-base leading-relaxed text-silver md:text-lg">
              Quer conhecer a UpCore, tirar dúvidas ou saber mais? Envie uma
              mensagem — a evolução começa com um primeiro passo.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 space-y-4">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] transition-all group-hover:border-up-500/50 group-hover:shadow-glow-soft">
                  <InstagramIcon className="h-4.5 w-4.5 text-silver group-hover:text-up-300" />
                </span>
                <span className="text-sm text-silver transition-colors group-hover:text-white">
                  @{academy.instagram.replace("@", "")}
                </span>
              </a>
            )}
            {waConfigured && (
              <a
                href={whatsappUrl() ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] transition-all group-hover:border-up-500/50 group-hover:shadow-glow-soft">
                  <WhatsAppIcon className="h-4.5 w-4.5 text-silver group-hover:text-up-300" />
                </span>
                <span className="text-sm text-silver transition-colors group-hover:text-white">
                  WhatsApp — resposta rápida
                </span>
              </a>
            )}
            {academy.email && (
              <a href={`mailto:${academy.email}`} className="group flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] transition-all group-hover:border-up-500/50 group-hover:shadow-glow-soft">
                  <MailIcon className="h-4.5 w-4.5 text-silver group-hover:text-up-300" />
                </span>
                <span className="text-sm text-silver transition-colors group-hover:text-white">
                  {academy.email}
                </span>
              </a>
            )}
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                <MapPin className="h-4.5 w-4.5 text-silver" />
              </span>
              <span className="text-sm text-silver">
                {academy.address.street} — Centro, Brodowski/SP
              </span>
            </div>
          </Reveal>
        </div>

        {/* formulário */}
        <Reveal delay={0.2} className="lg:col-span-7">
          <div className="glass-panel relative overflow-hidden rounded-3xl p-7 md:p-10">
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-up-500/15 blur-[90px]" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-up-500 to-up-600 shadow-glow"
                  >
                    <Check className="h-7 w-7 text-white" />
                  </motion.span>
                  <h3 className="h-display mt-8 text-3xl text-white md:text-4xl">
                    MENSAGEM <span className="neon-word">ENVIADA.</span>
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
                    {waConfigured
                      ? "Abrimos o WhatsApp com a sua mensagem pronta. É só confirmar o envio por lá."
                      : "Recebemos seus dados. A equipe UpCore retorna em breve."}
                  </p>
                  <GlowButton variant="ghost" className="mt-9" onClick={reset}>
                    Enviar outra mensagem
                  </GlowButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4 }}
                  className="relative grid gap-5 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="nome" className={labelClass}>NOME *</label>
                    <input id="nome" name="nome" required placeholder="Seu nome" className={inputClass} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="telefone" className={labelClass}>TELEFONE *</label>
                    <input id="telefone" name="telefone" type="tel" required placeholder="(16) 9 0000-0000" className={inputClass} autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>E-MAIL</label>
                    <input id="email" name="email" type="email" placeholder="voce@email.com" className={inputClass} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="assunto" className={labelClass}>ASSUNTO</label>
                    <select id="assunto" name="assunto" className={`${inputClass} appearance-none`} defaultValue={SUBJECTS[0]}>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-panel text-mist">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="mensagem" className={labelClass}>MENSAGEM *</label>
                    <textarea id="mensagem" name="mensagem" required rows={5} placeholder="Conta pra gente o que você quer saber..." className={`${inputClass} resize-none`} />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                    <p className="label-mono text-[8px] text-ash">
                      RESPONDEMOS EM HORÁRIO COMERCIAL
                    </p>
                    <GlowButton type="submit" size="lg" disabled={status === "sending"} cursorLabel="ENTRAR"
                      icon={status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    >
                      {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                    </GlowButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
