import { useEffect, useState } from "react";

/** true quando o usuário prefere menos movimento */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** true em desktops com ponteiro preciso (mouse/trackpad) */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const onChange = () => setFine(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

/** true abaixo de um breakpoint (default 768px) */
export function useIsMobile(breakpoint = 768): boolean {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return mobile;
}

/**
 * Dispositivo de baixa capacidade → renderizar fallbacks estáticos
 * (sem WebGL pesado, sem parallax complexo).
 */
export function useLowPowerDevice(): boolean {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const [weak] = useState(
    () =>
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4,
  );
  return reduced || !fine || weak;
}

/** true quando a página rolou além de `threshold` px */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/** Contagem regressiva até uma data ISO (atualiza 1×/s, para quando passa). */
export function useCountdown(targetISO: string): CountdownState {
  const compute = (): CountdownState => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (Number.isNaN(diff) || diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: diff <= 0 };
    }
    const s = Math.floor(diff / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
      isPast: false,
    };
  };

  const [state, setState] = useState<CountdownState>(compute);

  useEffect(() => {
    const id = window.setInterval(() => setState(compute()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);

  return state;
}

/** Observa quando um elemento entra na viewport (uma única vez por padrão). */
export function useInViewOnce<T extends HTMLElement>(
  rootMargin = "0px 0px -12% 0px",
) {
  const [ref, setRef] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref, inView, rootMargin]);

  return { ref: setRef, inView };
}
