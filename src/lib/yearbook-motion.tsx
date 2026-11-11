// Shared motion helpers for the year book pages.
// Everything runs client-side only: SSR and the first client render produce the
// same markup (hidden state), then IntersectionObserver reveals content.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A positive bottom margin widens the observer root below the fold, so anything
// already on screen is always counted (a negative margin can strand content in
// the bottom strip of a page that cannot scroll any further).
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.01, rootMargin = "0px 0px 8% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || prefersReduced()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

/** Fade + slide a block in the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : `translate3d(${x}px,${y}px,0)`,
        transition: `opacity .75s ease ${delay}ms, transform .85s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Container that fades its direct children up in sequence once it is in view.
 * Pair with the `.yb-stagger` rules in src/styles.css and give each child an
 * inline `animationDelay` for the sequence step.
 */
export function useStagger<T extends HTMLElement = HTMLDivElement>(threshold = 0.01) {
  const { ref, inView } = useInView<T>(threshold);
  return { ref, className: `yb-stagger${inView ? " on" : ""}` };
}

/** Count from 0 to `target` once `active` turns true. */
export function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReduced() || typeof requestAnimationFrame === "undefined") {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

/** 0 → 1 reading progress of the whole document. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}
