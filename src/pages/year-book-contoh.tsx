import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  GraduationCap,
  MessageCircle,
  Quote,
  Users,
} from "lucide-react";
import {
  chapters,
  graduates,
  kelasList,
  moments,
  teacherMessages,
  wallNotes,
  yearBookMeta,
  type Kelas,
} from "@/data/year-book";

const SERIF = '"Playfair Display", Georgia, serif';
const HAND = '"Caveat", "Segoe Script", cursive';

const PAPER = "#f4f6ff";
const CARD = "#ffffff";
const INK = "#141c3f";
const INK_SOFT = "#565f88";
const LINE = "#dbe1f6";
const ACCENT = "#2b3fd8";
const BRASS = "#f2a007";

const initialsOf = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

type Filter = "Semua" | Kelas;

export default function YearBookPage() {
  const [filter, setFilter] = useState<Filter>("Semua");
  const shown = filter === "Semua" ? graduates : graduates.filter((g) => g.kelas === filter);
  const featured = moments.find((m) => m.featured) ?? null;
  const others = moments.filter((m) => !m.featured);

  return (
    <Layout>
      <SEO
        title={`Contoh Year Book Angkatan ${yearBookMeta.angkatan}`}
        description={`Contoh isi buku tahunan angkatan ${yearBookMeta.angkatan} ${yearBookMeta.sekolah}: profil lulusan, momen satu tahun, pesan guru, dan dinding pesan.`}
        keywords="contoh year book, contoh buku tahunan, yearbook angkatan, buku tahunan sekolah"
        path="/year-book/contoh"
      />

      <style>{`
        .yb-serif { font-family: ${SERIF}; }
        .yb-hand { font-family: ${HAND}; }
        .yb-tape::before, .yb-tape::after {
          content: ""; position: absolute; top: -9px; width: 54px; height: 19px;
          background: rgba(242,160,7,.3); border: 1px solid rgba(242,160,7,.36);
        }
        .yb-tape::before { left: 14px; transform: rotate(-4deg); }
        .yb-tape::after { right: 14px; transform: rotate(3deg); }
        .yb-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .yb-card:hover { transform: translateY(-4px) rotate(-.5deg); box-shadow: 0 16px 34px -18px rgba(20,28,63,.45); }
      `}</style>

      <main className="min-h-screen overflow-x-clip" style={{ background: PAPER, color: INK }}>
        {/* ── COVER ── */}
        <section className="relative overflow-hidden" style={{ background: INK, color: PAPER }}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, #f2a007 0%, transparent 42%), radial-gradient(circle at 82% 70%, #2b3fd8 0%, transparent 46%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
            <Link
              href="/year-book"
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] transition-colors"
              style={{ border: "1px solid rgba(244,246,255,.3)", color: "rgba(244,246,255,.78)" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Penjelasan Year Book
            </Link>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b pb-5" style={{ borderColor: "rgba(244,246,255,.2)" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.28em]" style={{ color: "rgba(244,246,255,.62)" }}>
                {yearBookMeta.sekolah}
              </p>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"
                style={{ background: "rgba(242,160,7,.22)", color: "#ffd166", border: "1px solid rgba(242,160,7,.45)" }}
              >
                Isi contoh
              </span>
            </div>

            <p className="mt-9 text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: BRASS }}>
              Contoh Buku Tahunan
            </p>
            <h1 className="yb-serif mt-3 text-[54px] font-black leading-[0.86] tracking-[-0.045em] sm:text-[86px] lg:text-[112px]">
              Year Book
            </h1>
            <p className="yb-serif mt-2 text-2xl font-semibold italic sm:text-4xl" style={{ color: "rgba(244,246,255,.75)" }}>
              Angkatan {yearBookMeta.angkatan}
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 sm:text-base" style={{ color: "rgba(244,246,255,.68)" }}>
              {yearBookMeta.tagline}
            </p>
            <p className="yb-hand mt-4 text-2xl sm:text-3xl" style={{ color: "#ffd166" }}>
              sampai jumpa lagi, ya!
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { n: graduates.length, l: "Lulusan" },
                { n: kelasList.length, l: "Kelas" },
                { n: moments.length, l: "Momen" },
                { n: teacherMessages.length + wallNotes.length, l: "Pesan" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl px-4 py-4"
                  style={{ background: "rgba(244,246,255,.08)", border: "1px solid rgba(244,246,255,.18)" }}
                >
                  <p className="yb-serif text-3xl font-black sm:text-4xl">{s.n}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "rgba(244,246,255,.58)" }}>
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JUMP NAV ── */}
        <nav className="border-b" style={{ borderColor: LINE, background: CARD }}>
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {[
              { id: "lulusan", l: "Lulusan" },
              { id: "momen", l: "Momen" },
              { id: "perjalanan", l: "Perjalanan" },
              { id: "guru", l: "Pesan Guru" },
              { id: "dinding", l: "Dinding Pesan" },
            ].map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-colors"
                style={{ border: `1px solid ${LINE}`, background: CARD, color: INK_SOFT }}
              >
                {t.l}
              </a>
            ))}
          </div>
        </nav>

        {/* ── LULUSAN ── */}
        <section id="lulusan" className="scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="max-w-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
                  Profil Lulusan
                </p>
                <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                  Satu angkatan, {graduates.length} wajah.
                </h2>
                <p className="mt-3 text-sm leading-6" style={{ color: INK_SOFT }}>
                  Pilih kelas untuk melihat siapa saja yang lulus di angkatan {yearBookMeta.angkatan}.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Semua", ...kelasList] as Filter[]).map((k) => {
                  const active = filter === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setFilter(k)}
                      className="rounded-full px-4 py-2 text-xs font-bold transition-colors"
                      style={
                        active
                          ? { background: INK, color: PAPER, border: `1px solid ${INK}` }
                          : { background: CARD, color: INK_SOFT, border: `1px solid ${LINE}` }
                      }
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((g) => (
                <article
                  key={g.id}
                  className="yb-card yb-tape relative rounded-2xl p-5"
                  style={{ background: CARD, border: `1px solid ${LINE}`, boxShadow: "0 8px 22px -20px rgba(20,28,63,.6)" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="yb-serif grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-black"
                      style={{ background: g.warna, color: "#ffffff" }}
                    >
                      {initialsOf(g.nama)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="yb-serif truncate text-xl font-bold leading-tight">{g.nama}</h3>
                      <p className="mt-0.5 text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: g.warna }}>
                        {g.julukan}
                      </p>
                    </div>
                  </div>

                  <p className="yb-hand mt-4 text-xl leading-snug" style={{ color: INK_SOFT }}>
                    “{g.quote}”
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3 text-[11px] font-bold" style={{ borderColor: LINE, color: INK_SOFT }}>
                    <span className="rounded-full px-2.5 py-1" style={{ background: "rgba(43,63,216,.1)", color: ACCENT }}>
                      {g.kelas}
                    </span>
                    <span className="rounded-full px-2.5 py-1" style={{ background: "rgba(242,160,7,.14)", color: "#8a5a00" }}>
                      {g.hobi}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── MOMEN ── */}
        <section id="momen" className="scroll-mt-16 border-y" style={{ borderColor: LINE, background: CARD }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
                Galeri
              </p>
              <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                Momen satu tahun.
              </h2>
              <p className="mt-3 text-sm leading-6" style={{ color: INK_SOFT }}>
                Foto-foto yang paling sering dibuka lagi kalau kangen.
              </p>
            </div>

            {featured && (
              <figure
                className="yb-card group mt-9 overflow-hidden rounded-2xl"
                style={{ background: PAPER, border: `1px solid ${LINE}` }}
              >
                <div className="aspect-[16/10] sm:aspect-[21/9]">
                  <img
                    src={featured.src}
                    alt={featured.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="px-4 py-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: BRASS }}>
                    {featured.tag}
                  </p>
                  <p className="yb-serif mt-0.5 text-lg font-bold leading-snug">{featured.caption}</p>
                </figcaption>
              </figure>
            )}

            <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {others.map((m) => (
                <figure
                  key={m.caption}
                  className="yb-card group overflow-hidden rounded-2xl"
                  style={{ background: PAPER, border: `1px solid ${LINE}` }}
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={m.src}
                      alt={m.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="px-3 py-2.5">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: BRASS }}>
                      {m.tag}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold leading-snug">{m.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── PERJALANAN ── */}
        <section id="perjalanan" className="scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
                Linimasa
              </p>
              <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                Dari hari pertama sampai jumpa.
              </h2>
            </div>

            <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {chapters.map((c) => (
                <li
                  key={c.number}
                  className="yb-card rounded-2xl p-5"
                  style={{ background: CARD, border: `1px solid ${LINE}` }}
                >
                  <p className="yb-serif text-4xl font-black" style={{ color: "rgba(43,63,216,.2)" }}>
                    {c.number}
                  </p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: BRASS }}>
                    {c.date}
                  </p>
                  <h3 className="yb-serif mt-1 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                    {c.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── PESAN GURU ── */}
        <section id="guru" className="scroll-mt-16 border-y" style={{ borderColor: LINE, background: CARD }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
                Pesan Guru
              </p>
              <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                Kata mereka sebelum kita pergi.
              </h2>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {teacherMessages.map((t) => (
                <article key={t.nama} className="yb-card rounded-2xl p-5" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
                  <Quote className="h-5 w-5" style={{ color: BRASS }} />
                  <p className="yb-hand mt-3 text-2xl leading-snug">{t.pesan}</p>
                  <div className="mt-4 border-t pt-3" style={{ borderColor: LINE }}>
                    <p className="text-sm font-black">{t.nama}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: INK_SOFT }}>
                      {t.mapel}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── DINDING PESAN ── */}
        <section id="dinding" className="scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
                Dinding Pesan
              </p>
              <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                Catatan yang ditempel di mading.
              </h2>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wallNotes.map((n, i) => (
                <article
                  key={n.dari}
                  className="yb-card rounded-xl p-5"
                  style={{
                    background: i % 2 === 0 ? "#fff3d6" : "#e8edff",
                    border: `1px solid ${LINE}`,
                    transform: `rotate(${i % 2 === 0 ? -0.8 : 0.7}deg)`,
                  }}
                >
                  <p className="yb-hand text-2xl leading-snug">{n.teks}</p>
                  <p className="mt-3 text-right text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: ACCENT }}>
                    — {n.dari}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t" style={{ borderColor: LINE, background: INK, color: PAPER }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: BRASS }}>
                  Buat Year Book Sekolahmu
                </p>
                <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                  Punya angkatan yang mau dibukukan?
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "rgba(244,246,255,.68)" }}>
                  Nempo bantu kumpulin profil lulusan, foto satu tahun, pesan guru,
                  dan dinding pesan jadi satu buku tahunan — versi cetak maupun digital.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
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
                    href="/digital-services/yearbook"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                    style={{ border: "1px solid rgba(244,246,255,.32)", color: PAPER }}
                  >
                    <BookOpen className="h-4 w-4" />
                    Lihat yearbook digital
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid shrink-0 grid-cols-3 gap-3 lg:grid-cols-1">
                {[
                  { icon: GraduationCap, l: `${graduates.length} lulusan` },
                  { icon: Users, l: `${kelasList.length} kelas` },
                  { icon: Camera, l: `${moments.length} momen` },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: "rgba(244,246,255,.08)", border: "1px solid rgba(244,246,255,.18)" }}
                  >
                    <s.icon className="h-4 w-4" style={{ color: BRASS }} />
                    <span className="text-sm font-bold">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 text-[11px] font-bold leading-5" style={{ color: "rgba(244,246,255,.48)" }}>
              {yearBookMeta.catatanContoh}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
