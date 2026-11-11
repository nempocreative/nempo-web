import { useCallback, useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, MessageCircle, RotateCcw } from "lucide-react";
import { yearBookMeta } from "@/data/year-book";
import { bookSpreads, spreadIndexOf } from "@/lib/year-book-spread";
import { BookSheet, bookPages, HAND, SERIF, tocEntries } from "@/components/year-book/book-pages";

const DESK = "#0f1636";
const PAPER = "#f4f6ff";
const INK = "#141c3f";
const BRASS = "#f2a007";
const TOTAL = bookPages.length;

function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

export default function YearBookContohPage() {
  const wide = useWide();
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const spreads = wide ? bookSpreads(TOTAL) : bookPages.map((_, i) => [i]);
  const spreadIdx = wide ? spreadIndexOf(page, TOTAL) : page;
  const current = spreads[spreadIdx] ?? [0];
  const atStart = spreadIdx === 0;
  const atEnd = spreadIdx === spreads.length - 1;

  const turn = useCallback(
    (delta: 1 | -1) => {
      const next = Math.min(Math.max(spreadIdx + delta, 0), spreads.length - 1);
      if (next === spreadIdx) return;
      setDir(delta);
      setPage(spreads[next][0]);
    },
    [spreadIdx, spreads],
  );

  const jumpTo = useCallback(
    (target: number) => {
      setDir(target >= page ? 1 : -1);
      setPage(target);
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [page],
  );

  const jumpId = useCallback(
    (id: string) => {
      const i = bookPages.findIndex((p) => p.id === id);
      if (i >= 0) jumpTo(i);
    },
    [jumpTo],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight") turn(1);
      if (e.key === "ArrowLeft") turn(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  const pageLabel =
    current.length === 2
      ? `Halaman ${current[0]}–${current[1]}`
      : current[0] === 0
        ? "Sampul depan"
        : current[0] === TOTAL - 1
          ? "Sampul belakang"
          : `Halaman ${current[0]}`;

  const toc = tocEntries();
  const activeToc = [...toc].reverse().find((t) => t.page <= current[current.length - 1])?.id;

  return (
    <Layout>
      <SEO
        title={`Contoh Year Book Angkatan ${yearBookMeta.angkatan}`}
        description={`Buka dan balik halaman contoh buku tahunan angkatan ${yearBookMeta.angkatan} ${yearBookMeta.sekolah}: sambutan, profil lulusan per kelas, paling-paling, galeri momen, dan dinding pesan.`}
        keywords="contoh year book, contoh buku tahunan, yearbook angkatan, buku tahunan sekolah"
        path="/year-book/contoh"
      />

      <style>{`
        .yb-sheet { container-type: inline-size; aspect-ratio: 5 / 7; width: min(calc(100vw - 28px), 470px); }
        @media (min-width: 1024px) {
          .yb-sheet { width: min(calc((100vw - 200px) / 2), 500px, calc((100svh - 210px) * 5 / 7)); }
        }
        .yb-foil {
          background: linear-gradient(100deg, #b5801a 0%, #ffe08a 28%, #f2a007 48%, #fff3c4 64%, #c8901c 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        @keyframes yb-turn-next { from { opacity: .25; transform: perspective(1600px) rotateY(-14deg) translateX(18px); } to { opacity: 1; transform: none; } }
        @keyframes yb-turn-prev { from { opacity: .25; transform: perspective(1600px) rotateY(14deg) translateX(-18px); } to { opacity: 1; transform: none; } }
        .yb-turn-next { animation: yb-turn-next 420ms cubic-bezier(.2,.7,.2,1) both; transform-origin: left center; }
        .yb-turn-prev { animation: yb-turn-prev 420ms cubic-bezier(.2,.7,.2,1) both; transform-origin: right center; }
        @media (prefers-reduced-motion: reduce) { .yb-turn-next, .yb-turn-prev { animation: none; } }
      `}</style>

      <main className="min-h-screen overflow-x-clip" style={{ background: PAPER, color: INK }}>
        {/* ── MEJA BACA ── */}
        <section
          ref={stageRef}
          className="relative scroll-mt-16 overflow-hidden"
          style={{ background: `radial-gradient(90% 70% at 50% 30%, #23306b 0%, ${DESK} 70%)`, color: PAPER }}
        >
          <div className="relative mx-auto max-w-7xl px-[14px] pb-10 pt-6 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/year-book"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em]"
                style={{ border: "1px solid rgba(244,246,255,.3)", color: "rgba(244,246,255,.8)" }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Penjelasan Year Book
              </Link>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"
                style={{ background: "rgba(242,160,7,.22)", color: "#ffd166", border: "1px solid rgba(242,160,7,.45)" }}
              >
                Isi contoh
              </span>
            </div>

            <div className="mt-5 text-center">
              <h1 className="text-2xl font-black tracking-[-0.02em] sm:text-3xl" style={{ fontFamily: SERIF }}>
                Contoh Year Book Angkatan {yearBookMeta.angkatan}
              </h1>
              <p className="mt-1 text-xl sm:text-2xl" style={{ fontFamily: HAND, color: "#ffd166" }}>
                {wide ? "klik panah atau tekan ← → untuk membalik halaman" : "geser halaman ke kiri / kanan untuk membalik"}
              </p>
            </div>

            {/* Buku */}
            <div
              className="mt-6 flex items-center justify-center gap-3 lg:gap-6"
              onTouchStart={(e) => {
                touchX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const start = touchX.current;
                const end = e.changedTouches[0]?.clientX;
                touchX.current = null;
                if (start == null || end == null) return;
                const dx = end - start;
                if (Math.abs(dx) > 45) turn(dx < 0 ? 1 : -1);
              }}
            >
              <button
                type="button"
                onClick={() => turn(-1)}
                disabled={atStart}
                aria-label="Halaman sebelumnya"
                className="hidden h-12 w-12 shrink-0 place-items-center rounded-full transition-opacity disabled:opacity-25 lg:grid"
                style={{ background: "rgba(244,246,255,.12)", border: "1px solid rgba(244,246,255,.25)" }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div
                key={`${wide ? "w" : "n"}-${spreadIdx}`}
                className={`flex ${dir === 1 ? "yb-turn-next" : "yb-turn-prev"}`}
                style={{
                  filter: "drop-shadow(0 30px 40px rgba(0,0,0,.45))",
                }}
                aria-live="polite"
              >
                {current.map((i) => (
                  <BookSheet key={i} page={bookPages[i]} index={i} onJump={jumpId} />
                ))}
              </div>

              <button
                type="button"
                onClick={() => turn(1)}
                disabled={atEnd}
                aria-label="Halaman berikutnya"
                className="hidden h-12 w-12 shrink-0 place-items-center rounded-full transition-opacity disabled:opacity-25 lg:grid"
                style={{ background: "rgba(244,246,255,.12)", border: "1px solid rgba(244,246,255,.25)" }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Kontrol */}
            <div className="mx-auto mt-6 flex max-w-md items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => turn(-1)}
                disabled={atStart}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black transition-opacity disabled:opacity-30"
                style={{ background: "rgba(244,246,255,.12)", border: "1px solid rgba(244,246,255,.25)" }}
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </button>
              <div className="text-center">
                <p className="text-sm font-black">{pageLabel}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(244,246,255,.55)" }}>
                  dari {TOTAL - 2} halaman isi
                </p>
              </div>
              <button
                type="button"
                onClick={() => (atEnd ? jumpTo(0) : turn(1))}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black"
                style={{ background: BRASS, color: INK }}
              >
                {atStart ? "Buka buku" : atEnd ? "Baca dari awal" : "Berikutnya"}
                {atEnd ? <RotateCcw className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            </div>

            {/* Progres */}
            <div className="mx-auto mt-4 h-1 max-w-md overflow-hidden rounded-full" style={{ background: "rgba(244,246,255,.15)" }}>
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${((spreadIdx + 1) / spreads.length) * 100}%`, background: BRASS }}
              />
            </div>

            {/* Lompat ke bab */}
            <div className="mx-auto mt-6 flex max-w-3xl gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-center">
              {toc.map((t) => {
                const active = activeToc === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => jumpTo(t.page)}
                    className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors"
                    style={
                      active
                        ? { background: PAPER, color: INK, border: `1px solid ${PAPER}` }
                        : { background: "transparent", color: "rgba(244,246,255,.75)", border: "1px solid rgba(244,246,255,.25)" }
                    }
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: PAPER, color: INK }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: "#2b3fd8" }}>
                  Buat Year Book Sekolahmu
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl" style={{ fontFamily: SERIF }}>
                  Angkatanmu juga layak dibukukan.
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "#565f88" }}>
                  Sampul foil, sambutan kepala sekolah, halaman per kelas, foto studio tiap lulusan,
                  paling-paling, galeri momen, sampai dinding pesan — Nempo bantu susun dari awal sampai cetak atau versi digital.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={NEMPO_CONSULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                  style={{ background: BRASS, color: INK }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Konsultasi bareng Nempo
                </a>
                <Link
                  href="/year-book"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                  style={{ border: "1px solid #dbe1f6", color: INK, background: "#fff" }}
                >
                  <BookOpen className="h-4 w-4" />
                  Cara pesan year book
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <p className="mt-10 text-[11px] font-bold leading-5" style={{ color: "rgba(20,28,63,.5)" }}>
              {yearBookMeta.catatanContoh}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
