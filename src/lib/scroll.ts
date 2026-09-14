import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/** Inicializa o smooth scroll premium (retorna cleanup). */
export function initLenis(): () => void {
  if (lenis) return destroyLenis;

  lenis = new Lenis({
    lerp: 0.095,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return destroyLenis;
}

export function destroyLenis() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}

/** Scroll suave até um seletor (ex: "#contato") respeitando o Lenis. */
export function scrollToTarget(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, {
      duration: 1.5,
      easing: easeOutQuart,
    });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.5, easing: easeOutQuart });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function getLenis() {
  return lenis;
}
