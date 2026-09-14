import type { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import { academy } from "../config/academy";
import { scrollToTop } from "../lib/scroll";

/* =========================================================
 * LOGO — símbolo + wordmark (nunca distorcer)
 * ========================================================= */

export function LogoMark({ className }: { className?: string }) {
  return (
    <img src="/images/Logo UpCore.png" alt="UpCore Brodowski Logo" className={cn("h-9 w-9", className)} />
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick ?? scrollToTop}
      className={cn("group flex items-center gap-3 text-left", className)}
      aria-label={`${academy.name} — voltar ao topo`}
    >
      <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:-translate-y-0.5" />
      <span className="leading-none">
        <span className="h-display block text-[1.05rem] tracking-[0.06em] text-white">
          UPCORE
        </span>
        <span className="label-mono mt-1 block text-[8px] text-ash tracking-[0.42em]">
          BRODOWSKI
        </span>
      </span>
    </button>
  );
}

/* =========================================================
 * LABEL MONO — pequenos rótulos editoriais
 * ========================================================= */

export function Label({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span className="h-px w-8 bg-up-500/80" />
      <span className="label-mono text-[10px] text-silver">{children}</span>
      {align === "center" && <span className="h-px w-8 bg-up-500/80" />}
    </div>
  );
}

/* =========================================================
 * SECTION HEADING — título editorial gigante
 * ========================================================= */

export interface HeadingLine {
  text: string;
  accent?: boolean;
  outline?: boolean;
}

export function SectionHeading({
  label,
  lines,
  align = "left",
  className,
  size = "md",
}: {
  label: string;
  lines: HeadingLine[];
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <Label align={align}>{label}</Label>
      </Reveal>
      <h2
        className={cn(
          "h-display mt-6 text-balance",
          size === "lg"
            ? "text-[clamp(2.75rem,7.5vw,6.5rem)]"
            : "text-[clamp(2.25rem,5.5vw,4.75rem)]",
        )}
      >
        {lines.map((line, i) => (
          <Reveal key={i} delay={0.08 * i + 0.05} y={34} className="block">
            <span
              className={cn(
                "block",
                line.accent && "neon-word",
                line.outline && "text-outline",
              )}
            >
              {line.text}
            </span>
          </Reveal>
        ))}
      </h2>
    </div>
  );
}

/* =========================================================
 * BOTÕES
 * ========================================================= */

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  cursorLabel?: string;
  external?: boolean;
  icon?: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  cursorLabel,
  external,
  icon,
  type = "button",
  disabled,
}: GlowButtonProps) {
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-display uppercase tracking-[0.18em] transition-all duration-500 ease-out select-none",
    size === "lg" ? "px-9 py-4.5 text-[13px] font-bold" : "px-7 py-3.5 text-[11px] font-bold",
    variant === "primary" &&
      "bg-gradient-to-r from-up-600 via-up-500 to-up-400 text-white shadow-[0_0_0_rgba(120,0,255,0)] hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0",
    variant === "ghost" &&
      "border border-white/15 bg-white/[0.02] text-mist backdrop-blur-sm hover:-translate-y-0.5 hover:border-up-500/60 hover:bg-up-500/10 hover:text-white hover:shadow-glow-soft active:translate-y-0",
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const inner = (
    <>
      {/* brilho que atravessa o botão */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon ?? (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        data-cursor={cursorLabel}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} data-cursor={cursorLabel} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
}

/* =========================================================
 * REVEAL — animação de entrada no scroll
 * ========================================================= */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = true,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
 * MARQUEE — faixa editorial
 * ========================================================= */

export function MarqueeStrip({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span
            className={cn(
              "h-display whitespace-nowrap text-[clamp(1.6rem,3.4vw,3rem)]",
              i % 3 === 1 ? "text-outline" : i % 3 === 2 ? "neon-word" : "text-mist",
            )}
          >
            {item}
          </span>
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-up-500" aria-hidden="true">
            <path d="M6 0 L12 6 L6 12 L0 6 Z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y hairline bg-coal/60 py-6",
        className,
      )}
    >
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}

/* =========================================================
 * OVERLAYS GLOBAIS
 * ========================================================= */

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-overlay"
    />
  );
}

/** Trilho vertical discreto de progresso do scroll (desktop). */
export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-1/2 right-5 z-[75] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <span className="label-mono text-[8px] text-ash [writing-mode:vertical-rl]">
        SCROLL
      </span>
      <div className="relative h-36 w-px overflow-hidden bg-white/10">
        <motion.div
          style={{ scaleY }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-up-600 via-up-400 to-up-300"
        />
      </div>
      <span className="h-1.5 w-1.5 rounded-full bg-up-400 shadow-glow-soft" />
    </div>
  );
}

/** Linha roxa luminosa entre seções. */
export function BeamDivider({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn("purple-beam mx-auto h-px w-full max-w-6xl", className)}
    />
  );
}
