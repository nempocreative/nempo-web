// Contoh year book sebagai satu web buku tahunan layar penuh: tanpa menu situs,
// hanya tombol kembali. Semua isi diambil dari src/data/year-book.ts (data contoh).
import type { CSSProperties, ReactNode } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { ArrowLeft, ArrowUp, Award, ChevronDown, GraduationCap, Star } from "lucide-react";
import {
  chapters,
  graduates,
  kelasInfo,
  kepalaSekolah,
  moments,
  superlatives,
  teacherMessages,
  wallNotes,
  yearBookMeta,
  type Kelas,
} from "@/data/year-book";
import { Reveal, useCountUp, useInView, useScrollProgress, useStagger } from "@/lib/yearbook-motion";

const SERIF = '"Playfair Display", Georgia, serif';
const HAND = '"Caveat", "Segoe Script", cursive';
const PAPER = "#f4f6ff";
const CARD = "#ffffff";
const NAVY = "#141c3f";
const INK = "#141c3f";
const INK_SOFT = "#565f88";
const LINE = "#dbe1f6";
const ACCENT = "#2b3fd8";
const BRASS = "#f2a007";
const CREAM = "#fff6dc";

const serif: CSSProperties = { fontFamily: SERIF };
const hand: CSSProperties = { fontFamily: HAND };
const byId = (id: string) => graduates.find((g) => g.id === id);
const kelasCandid: Record<Kelas, number> = { "XII IPA 1": 2, "XII IPA 2": 4, "XII IPS 1": 7 };
const NOTE_COLORS = ["#fff1b8", "#ffd9e4", "#dce4ff", "#d8f5e3", "#ffe3c4", "#ece0ff"];
const INK_COLORS = ["#2b3fd8", "#c0265b", "#0d9488", "#7c4ddb"];
const NAV_BG = "radial-gradient(120% 90% at 30% 18%, #2a3878 0%, #141c3f 52%, #0a1030 100%)";

function Eyebrow({ children, color = ACCENT }: { children: ReactNode; color?: string }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.28em] sm:text-sm" style={{ color }}>
      {children}
    </p>
  );
}

function Heading({ children, className = "", color = INK }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <h2 className={`text-4xl font-black leading-[0.98] tracking-[-0.03em] sm:text-6xl ${className}`} style={{ ...serif, color }}>
      {children}
    </h2>
  );
}

function Tape({ className = "", rotate = -4 }: { className?: string; rotate?: number }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-5 w-20 sm:h-6 sm:w-24 ${className}`}
      style={{ background: "rgba(242,160,7,.34)", border: "1px solid rgba(242,160,7,.4)", transform: `rotate(${rotate}deg)` }}
    />
  );
}

function Polaroid({ src, caption, rotate, imgClass = "aspect-[4/3]", className = "" }: { src: string; caption: string; rotate: number; imgClass?: string; className?: string }) {
  return (
    <figure
      className={`yb-lift relative bg-white p-2.5 pb-2 sm:p-3.5 sm:pb-3 ${className}`}
      style={{ "--r": `${rotate}deg`, boxShadow: "0 18px 40px -22px rgba(20,28,63,.55)" } as CSSProperties}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={rotate * -1.5} />
      <div className={`overflow-hidden ${imgClass}`}>
        <img src={src} alt={caption} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-2 truncate text-center text-xl leading-none sm:text-2xl" style={{ ...hand, color: INK }}>
        {caption}
      </figcaption>
    </figure>
  );
}

/* ───────────── Sampul ───────────── */

function Cover() {
  return (
    <section id="sampul" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center" style={{ background: NAV_BG, color: CREAM }}>
      <div aria-hidden className="pointer-events-none absolute inset-4 rounded-2xl border-2 sm:inset-8" style={{ borderColor: "rgba(242,190,80,.6)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-6 rounded-xl border sm:inset-11" style={{ borderColor: "rgba(242,190,80,.28)" }} />
      <span className="yb-fade absolute right-8 top-8 rotate-[8deg] rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] sm:right-14 sm:top-14 sm:text-xs" style={{ background: BRASS, color: INK, animationDelay: "0.25s" }}>
        Isi contoh
      </span>

      <Reveal delay={80} y={18}>
        <span className="grid h-20 w-20 place-items-center rounded-full border-2 sm:h-24 sm:w-24 [@media(max-height:720px)]:hidden" style={{ borderColor: "rgba(242,190,80,.85)" }}>
          <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12" style={{ color: "#f5c55a" }} strokeWidth={1.6} />
        </span>
      </Reveal>
      <Reveal delay={220} y={18}>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.42em] sm:text-sm" style={{ color: "rgba(245,197,90,.9)" }}>
          {yearBookMeta.sekolah}
        </p>
      </Reveal>
      <Reveal delay={340} y={36}>
        <h1 className="yb-foil mt-4 text-[clamp(4.2rem,min(15vw,21svh),12rem)] font-black leading-[0.84] tracking-[-0.045em]" style={serif}>
          Year Book
        </h1>
      </Reveal>
      <Reveal delay={540} y={20}>
        <div className="mt-5 flex items-center gap-4">
          <span className="h-px w-12 sm:w-20" style={{ background: "rgba(245,197,90,.6)" }} />
          <span className="yb-foil text-4xl font-black sm:text-5xl" style={serif}>
            {yearBookMeta.angkatan}
          </span>
          <span className="h-px w-12 sm:w-20" style={{ background: "rgba(245,197,90,.6)" }} />
        </div>
      </Reveal>
      <Reveal delay={680} y={20}>
        <p className="mt-4 text-4xl leading-none sm:text-5xl" style={hand}>
          “{yearBookMeta.julukanAngkatan}”
        </p>
      </Reveal>
      <Reveal delay={800} y={20}>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed sm:text-base [@media(max-height:720px)]:hidden" style={{ color: "rgba(255,246,220,.72)" }}>
          {yearBookMeta.tagline}
        </p>
      </Reveal>
      <Reveal delay={900} y={16}>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.3em] sm:text-xs" style={{ color: "rgba(255,246,220,.5)" }}>
          Angkatan {yearBookMeta.tahunMasuk} — {yearBookMeta.tahunLulus}
        </p>
      </Reveal>

      <a href="#sambutan" className="yb-bob absolute bottom-10 flex [@media(max-height:720px)]:bottom-7 flex-col items-center gap-1 text-[11px] font-black uppercase tracking-[0.24em] sm:bottom-14" style={{ color: "rgba(245,197,90,.9)" }}>
        Buka buku
        <ChevronDown className="h-5 w-5" />
      </a>
    </section>
  );
}

/* ───────────── Sambutan ───────────── */

function Sambutan() {
  return (
    <section id="sambutan" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: PAPER }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative bg-white p-3 pb-4 sm:p-4" style={{ transform: "rotate(-2.5deg)", boxShadow: "0 30px 60px -30px rgba(20,28,63,.55)" }}>
            <Tape className="-top-3 left-10" rotate={-6} />
            <img src={kepalaSekolah.foto} alt={kepalaSekolah.nama} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <p className="mt-3 text-center text-2xl leading-none" style={{ ...hand, color: INK }}>
              {kepalaSekolah.nama}
            </p>
          </div>
        </div>
        <div>
          <Eyebrow>Sambutan kepala sekolah</Eyebrow>
          <Heading className="mt-3">Untuk angkatan {yearBookMeta.angkatan}</Heading>
          <div className="relative mt-8 space-y-5 text-base leading-[1.8] sm:text-lg" style={{ color: INK }}>
            {kepalaSekolah.sambutan.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-5xl leading-none" style={{ ...hand, color: ACCENT }}>
              Siti Marlina
            </p>
            <span className="mt-2 block h-px w-48" style={{ background: LINE }} />
            <p className="mt-2 text-xs font-black uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>
              {kepalaSekolah.jabatan} · {yearBookMeta.sekolah}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Foto angkatan ───────────── */

function Stat({ n, l, delay }: { n: number; l: string; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const shown = useCountUp(n, inView, 1100);
  return (
    <div
      ref={ref}
      data-reveal
      className="rounded-2xl border px-5 py-5 text-center"
      style={{
        background: "rgba(255,255,255,.06)",
        borderColor: "rgba(255,246,220,.16)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : "translate3d(0,22px,0)",
        transition: `opacity .7s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <p className="text-4xl font-black leading-none sm:text-5xl" style={{ ...serif, color: "#ffd166" }}>
        {shown}
      </p>
      <p className="mt-2 text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: "rgba(255,246,220,.75)" }}>
        {l}
      </p>
    </div>
  );
}

function Angkatan() {
  const group = moments.find((m) => m.featured) ?? moments[0];
  const stats = [
    { n: graduates.length, l: "Lulusan" },
    { n: kelasInfo.length, l: "Kelas" },
    { n: yearBookMeta.tahunLulus - yearBookMeta.tahunMasuk, l: "Tahun bareng" },
    { n: moments.length, l: "Momen" },
  ];
  return (
    <section id="angkatan" className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-24" style={{ background: NAV_BG }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center" y={24}>
          <p className="text-3xl leading-none sm:text-4xl" style={{ ...hand, color: "#ffd166" }}>
            foto bareng satu angkatan ♡
          </p>
          <h2 className="mt-3 text-[clamp(2.6rem,8vw,5.5rem)] font-black leading-[0.95] tracking-[-0.03em]" style={{ ...serif, color: CREAM }}>
            Angkatan {yearBookMeta.angkatan}
          </h2>
          <p className="mt-2 text-xl italic sm:text-2xl" style={{ ...serif, color: "rgba(255,246,220,.8)" }}>
            “{yearBookMeta.julukanAngkatan}” · {yearBookMeta.sekolah}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-5xl sm:mt-14" y={44} delay={120}>
          <figure className="relative">
          <div className="rounded-[6px] p-2 sm:p-3.5" style={{ background: CARD, boxShadow: "0 40px 80px -30px rgba(0,0,0,.65)" }}>
            <div className="overflow-hidden rounded-[3px]">
              <img src={group.src} alt={group.caption} loading="lazy" width={1600} height={907} className="yb-kb block h-auto w-full" />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-1 pb-0.5 pt-2.5 sm:px-2 sm:pt-3.5">
              <span className="text-xl leading-none sm:text-3xl" style={{ ...hand, color: INK }}>
                {yearBookMeta.sekolah}, {yearBookMeta.tahunLulus}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] sm:text-xs" style={{ color: INK_SOFT }}>
                {yearBookMeta.tahunMasuk}–{yearBookMeta.tahunLulus}
              </span>
            </figcaption>
          </div>
          </figure>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
          {stats.map((s, i) => (
            <Stat key={s.l} n={s.n} l={s.l} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Perjalanan ───────────── */

function Perjalanan() {
  const { ref, inView } = useInView<HTMLOListElement>(0.08);
  return (
    <section id="perjalanan" className="px-5 pb-20 pt-20 sm:px-10 sm:pb-28 sm:pt-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center" y={22}>
          <Eyebrow>Linimasa</Eyebrow>
          <Heading className="mt-3">Perjalanan kita</Heading>
        </Reveal>
        <ol ref={ref} className={`relative mt-14 grid gap-10 pl-12 lg:grid-cols-4 lg:gap-6 lg:pl-0 lg:pt-14 yb-stagger${inView ? " on" : ""}`}>
          <span aria-hidden className={`yb-line yb-keep absolute bottom-2 left-[18px] top-2 w-1 rounded-full lg:bottom-auto lg:left-0 lg:right-0 lg:top-[22px] lg:h-1 lg:w-auto${inView ? " on" : ""}`} style={{ background: "linear-gradient(90deg, #2b3fd8, #f2a007)" }} />
          {chapters.map((c, i) => (
            <li key={c.number} className="relative" style={{ animationDelay: `${i * 150}ms` }}>
              <span
                aria-hidden
                className="absolute -left-12 top-0 grid h-10 w-10 place-items-center rounded-full text-sm font-black lg:-top-14 lg:left-0"
                style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 0 6px ${PAPER}` }}
              >
                {c.number}
              </span>
              <div className="rounded-2xl border p-6" style={{ background: CARD, borderColor: LINE }}>
                <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: BRASS }}>
                  {c.date}
                </p>
                <h3 className="mt-2 text-2xl font-bold leading-tight" style={{ ...serif, color: INK }}>
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: INK_SOFT }}>
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────── Per kelas ───────────── */

function KelasSection({ kelas, index }: { kelas: Kelas; index: number }) {
  const info = kelasInfo.find((k) => k.kelas === kelas)!;
  const wali = teacherMessages.find((t) => t.kelas === kelas)!;
  const members = graduates.filter((g) => g.kelas === kelas);
  const candid = moments[kelasCandid[kelas]];
  const { ref: headRef, inView: headOn } = useInView<HTMLDivElement>(0.08);
  const { ref: gridRef, className: gridClass } = useStagger<HTMLDivElement>(0.06);
  return (
    <section id={`kelas-${index + 1}`} className="relative overflow-hidden px-5 py-20 sm:px-10 sm:py-28" style={{ background: index % 2 === 0 ? CARD : PAPER }}>
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.08]" style={{ background: info.warna }} />
      <div className="relative mx-auto max-w-6xl">
        <div
          ref={headRef}
          data-reveal
          className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          style={{
            opacity: headOn ? 1 : 0,
            transform: headOn ? "translate3d(0,0,0)" : "translate3d(0,30px,0)",
            transition: "opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: info.warna, color: "#fff" }}>
                <Star className="h-5 w-5" fill="currentColor" />
              </span>
              <Eyebrow color={info.warna}>{info.julukan}</Eyebrow>
            </div>
            <p className="mt-4 text-[clamp(3.6rem,10vw,7rem)] font-black leading-[0.86] tracking-[-0.045em]" style={{ ...serif, color: info.warna }}>
              {kelas}
            </p>
            <p className="mt-4 text-3xl leading-tight sm:text-4xl" style={{ ...hand, color: INK }}>
              “{info.motto}”
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl" style={{ boxShadow: "0 30px 60px -36px rgba(20,28,63,.6)" }}>
            <img src={candid.src} alt={candid.caption} loading="lazy" className="aspect-[16/9] w-full object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-black" style={{ background: "rgba(255,255,255,.92)", color: INK }}>
              {candid.caption}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-3xl border p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-7" style={{ borderColor: LINE, background: index % 2 === 0 ? PAPER : CARD }}>
          <img src={wali.foto} alt={wali.nama} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl object-cover object-top sm:h-28 sm:w-28" style={{ boxShadow: `0 0 0 4px #fff, 0 0 0 6px ${info.warna}` }} />
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>
              Pesan wali kelas · {wali.nama}
            </p>
            <p className="mt-2 text-2xl leading-snug sm:text-3xl" style={{ ...hand, color: INK }}>
              “{wali.pesan}”
            </p>
          </div>
        </div>

        <div ref={gridRef} className={`mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 ${gridClass}`}>
          {members.map((g, i) => (
            <article key={g.id} className="yb-card flex flex-col" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: `0 0 0 5px #fff, 0 0 0 7px ${LINE}, 0 24px 40px -28px rgba(20,28,63,.6)`, transform: `rotate(${i % 2 === 0 ? -1.2 : 1.2}deg)` }}>
                <img src={g.foto} alt={g.nama} loading="lazy" className="aspect-[4/5] w-full object-cover object-[50%_22%]" />
                <span className="absolute left-2.5 top-2.5 max-w-[calc(100%-20px)] truncate rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] sm:text-[11px]" style={{ background: g.warna, color: "#fff" }}>
                  {g.julukan}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-black leading-tight sm:text-2xl" style={{ ...serif, color: INK }}>
                {g.nama}
              </h3>
              <p className="mt-1.5 text-xl leading-[1.12] sm:text-2xl" style={{ ...hand, color: INK_SOFT }}>
                “{g.quote}”
              </p>
              <div className="mt-auto space-y-0.5 pt-3 text-xs font-bold sm:text-sm" style={{ color: INK_SOFT }}>
                <p>
                  <span style={{ color: g.warna }}>Cita-cita:</span> {g.citaCita}
                </p>
                <p>
                  <span style={{ color: g.warna }}>Hobi:</span> {g.hobi}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Paling-paling ───────────── */

function Penghargaan() {
  const { ref, className } = useStagger<HTMLDivElement>(0.08);
  return (
    <section id="paling-paling" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: NAV_BG, color: CREAM }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center" y={24}>
          <Eyebrow color={BRASS}>Hasil voting angkatan</Eyebrow>
          <Heading className="yb-foil mt-3" color="inherit">
            Paling-paling
          </Heading>
          <p className="mx-auto mt-4 max-w-md text-sm sm:text-base" style={{ color: "rgba(255,246,220,.7)" }}>
            Gelar yang dipilih sendiri oleh teman satu angkatan.
          </p>
        </Reveal>
        <div className={`mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 ${className}`} ref={ref}>
          {superlatives.map((s, i) => {
            const g = byId(s.graduateId)!;
            return (
              <div key={s.gelar} className="yb-card flex flex-col items-center rounded-3xl border px-4 py-7 text-center sm:px-6 sm:py-9" style={{ borderColor: "rgba(242,190,80,.3)", background: "rgba(255,255,255,.05)", animationDelay: `${i * 90}ms` }}>
                <div className="relative">
                  <img src={g.foto} alt={g.nama} loading="lazy" className="h-24 w-24 rounded-full object-cover object-top sm:h-32 sm:w-32" style={{ boxShadow: `0 0 0 4px ${BRASS}` }} />
                  <span className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full sm:h-10 sm:w-10" style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 0 3px ${NAVY}` }}>
                    <Award className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-5 text-lg font-bold italic leading-tight sm:text-2xl" style={serif}>
                  {s.gelar}
                </p>
                <p className="mt-2 text-[11px] font-black uppercase tracking-[0.16em] sm:text-xs" style={{ color: BRASS }}>
                  {g.nama}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Galeri ───────────── */

function Galeri() {
  const picks = moments.filter((m) => !m.featured);
  const rot = [-2.5, 2, 1.4, -1.8, -2.2, 2.6, -1.2, 1.8];
  const shape = ["aspect-[4/3]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]", "aspect-square"];
  const { ref, className } = useStagger<HTMLDivElement>(0.05);
  return (
    <section id="galeri" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4" y={22}>
          <div>
            <Eyebrow>Galeri</Eyebrow>
            <p className="mt-2 text-6xl leading-none sm:text-7xl" style={{ ...hand, color: ACCENT }}>
              momen-momen kita
            </p>
          </div>
          <p className="text-3xl leading-none" style={{ ...hand, color: BRASS }}>
            kangen nggak?
          </p>
        </Reveal>
        <div ref={ref} className={`mt-14 columns-2 gap-5 sm:gap-8 lg:columns-4 ${className}`}>
          {picks.map((m, i) => (
            <div key={m.caption} className="mb-8 break-inside-avoid sm:mb-10" style={{ animationDelay: `${i * 80}ms` }}>
              <Polaroid src={m.src} caption={m.caption} rotate={rot[i % rot.length]} imgClass={shape[i % shape.length]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Dinding pesan ───────────── */

function Dinding() {
  const { ref: notesRef, className: notesClass } = useStagger<HTMLDivElement>(0.06);
  const { ref: signRef, className: signClass } = useStagger<HTMLDivElement>(0.15);
  return (
    <section id="dinding" className="px-5 py-20 sm:px-10 sm:py-28" style={{ background: CARD }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center" y={22}>
          <Eyebrow>Dinding pesan</Eyebrow>
          <Heading className="mt-3">Tanda tangan & pesan</Heading>
        </Reveal>
        <div ref={notesRef} className={`mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 ${notesClass}`}>
          {wallNotes.map((n, i) => (
            <div
              key={n.dari}
              className="yb-lift relative px-6 pb-5 pt-7"
              style={{ "--r": `${i % 2 === 0 ? -2 : 1.8}deg`, background: NOTE_COLORS[i % NOTE_COLORS.length], boxShadow: "0 18px 34px -22px rgba(20,28,63,.5)", animationDelay: `${i * 80}ms` } as CSSProperties}
            >
              <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full" style={{ background: INK_COLORS[i % INK_COLORS.length] }} />
              <p className="text-3xl leading-[1.08]" style={{ ...hand, color: INK }}>
                {n.teks}
              </p>
              <p className="mt-3 text-right text-xs font-black uppercase tracking-[0.14em]" style={{ color: INK_COLORS[i % INK_COLORS.length] }}>
                — {n.dari}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-3xl border border-dashed px-6 py-10 text-center" style={{ borderColor: LINE }}>
          <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: INK_SOFT }}>
            Tanda tangan teman-teman
          </p>
          <div ref={signRef} className={`mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 ${signClass}`}>
            {graduates.map((g, i) => (
              <span key={g.id} className="text-4xl leading-none sm:text-5xl" style={{ ...hand, color: INK_COLORS[i % INK_COLORS.length], transform: `rotate(${(i % 3) * 3 - 3}deg)`, animationDelay: `${i * 45}ms` }}>
                {g.nama.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Penutup ───────────── */

function Penutup() {
  return (
    <section className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center" style={{ background: "radial-gradient(120% 90% at 70% 82%, #2a3878 0%, #141c3f 52%, #0a1030 100%)", color: CREAM }}>
      <div aria-hidden className="pointer-events-none absolute inset-4 rounded-2xl border-2 sm:inset-8" style={{ borderColor: "rgba(242,190,80,.5)" }} />
      <Reveal className="flex flex-col items-center" y={28}>
        <span aria-hidden className="flex items-center gap-3">
          <span className="h-px w-16 sm:w-24" style={{ background: "rgba(242,190,80,.55)" }} />
          <span className="h-2.5 w-2.5 rotate-45" style={{ background: "#f5c55a" }} />
          <span className="h-px w-16 sm:w-24" style={{ background: "rgba(242,190,80,.55)" }} />
        </span>
        <p className="yb-foil mt-6 max-w-3xl text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[1.02] tracking-[-0.03em]" style={serif}>
          Sampai jumpa di cerita berikutnya.
        </p>
        <p className="mt-6 text-3xl leading-tight sm:text-4xl" style={hand}>
          Jangan lupa pulang, ya — sekolah ini selalu rumah.
        </p>
        <a href="#sampul" className="mt-10 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-black transition-colors hover:bg-white/10" style={{ borderColor: "rgba(242,190,80,.6)", color: "#f5c55a" }}>
          <ArrowUp className="h-4 w-4" />
          Baca dari awal
        </a>
        <p className="mt-12 max-w-md text-xs leading-relaxed" style={{ color: "rgba(255,246,220,.5)" }}>
          Contoh year book dari Nempo · Garut. Nama, kutipan, dan semua foto di halaman ini contoh (foto dibuat dengan AI).
        </p>
      </Reveal>
    </section>
  );
}

export default function YearBookContohPage() {
  const progress = useScrollProgress();
  return (
    <Layout minimalChrome hideBottomNav>
      <SEO
        title={`Contoh Year Book Angkatan ${yearBookMeta.angkatan} — ${yearBookMeta.sekolah}`}
        description="Contoh web buku tahunan sekolah dari Nempo: sambutan kepala sekolah, profil tiap lulusan, halaman per kelas, paling-paling, galeri momen, dan dinding pesan."
        path={yearBookMeta.halamanContoh}
      />
      <style>{`
        html { scroll-behavior: smooth; }
        .yb-foil { background: linear-gradient(100deg, #f7d27a 0%, #fff3c8 28%, #e2a93b 52%, #fbe3a0 74%, #d4952c 100%); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: yb-shine 7s ease-in-out infinite; }
        @keyframes yb-shine { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .yb-lift { transform: rotate(var(--r, 0deg)); transition: transform .35s ease; }
        .yb-lift:hover { transform: rotate(0deg) translateY(-6px) scale(1.02); }
        .yb-card { transition: transform .35s ease; }
        .yb-card:hover { transform: translateY(-6px); }
        @keyframes yb-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .yb-bob { animation: yb-bob 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .yb-bob { animation: none; } .yb-lift, .yb-card { transition: none; } .yb-foil { animation: none; } }
      `}</style>

      <div className="-mb-20 lg:mb-0" style={{ background: PAPER, color: INK }}>
        <div
          aria-hidden
          className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left"
          style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg, #2b3fd8, #f2a007)" }}
        />
        <Link
          href="/year-book"
          className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black backdrop-blur-md transition-transform hover:-translate-x-0.5 sm:left-6 sm:top-6"
          style={{ background: "rgba(20,28,63,.72)", borderColor: "rgba(242,190,80,.5)", color: CREAM }}
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        <Cover />
        <Sambutan />
        <Angkatan />
        <Perjalanan />
        {kelasInfo.map((k, i) => (
          <KelasSection key={k.kelas} kelas={k.kelas} index={i} />
        ))}
        <Penghargaan />
        <Galeri />
        <Dinding />
        <Penutup />
      </div>
    </Layout>
  );
}
