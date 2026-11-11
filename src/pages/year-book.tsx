import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import {
  ArrowRight,
  BookOpen,
  Camera,
  GraduationCap,
  MessageCircle,
  Users,
} from "lucide-react";
import {
  graduates,
  kelasList,
  moments,
  teacherMessages,
  wallNotes,
  yearBookBentuk,
  yearBookIsi,
  yearBookLangkah,
  yearBookMeta,
} from "@/data/year-book";

const SERIF = '"Playfair Display", Georgia, serif';
const HAND = '"Caveat", "Segoe Script", cursive';

const PAPER = "#f6f1e6";
const CARD = "#fffdf8";
const INK = "#1e1a15";
const INK_SOFT = "#6b6157";
const LINE = "#e3d9c6";
const ACCENT = "#7c2f3f";
const BRASS = "#b98a3c";

const stats = [
  { n: graduates.length, l: "Lulusan" },
  { n: kelasList.length, l: "Kelas" },
  { n: moments.length, l: "Momen" },
  { n: teacherMessages.length + wallNotes.length, l: "Pesan" },
];

export default function YearBookPage() {
  return (
    <Layout>
      <SEO
        title="Year Book untuk Sekolah"
        description="Year book sekolah dari Nempo: profil lulusan, galeri momen satu tahun, pesan guru, dan dinding pesan — versi cetak maupun digital. Lihat contohnya dulu."
        keywords="year book sekolah, buku tahunan sekolah, jasa yearbook, buku tahunan angkatan, yearbook digital"
        path="/year-book"
      />

      <style>{`
        .yb-serif { font-family: ${SERIF}; }
        .yb-hand { font-family: ${HAND}; }
        .yb-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .yb-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px -18px rgba(30,26,21,.45); }
      `}</style>

      <main className="min-h-screen overflow-x-clip" style={{ background: PAPER, color: INK }}>
        {/* ── HERO: PENJELASAN ── */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 14% 18%, #b98a3c 0%, transparent 44%), radial-gradient(circle at 86% 62%, #7c2f3f 0%, transparent 46%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
            <p className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
              Layanan Nempo
            </p>
            <h1 className="yb-serif mt-3 text-[52px] font-black leading-[0.86] tracking-[-0.045em] sm:text-[84px] lg:text-[104px]">
              Year Book
            </h1>
            <p className="yb-serif mt-2 text-2xl font-semibold italic sm:text-3xl" style={{ color: INK_SOFT }}>
              buku tahunan untuk satu angkatan
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: INK_SOFT }}>
              Year book adalah buku yang merangkum satu angkatan sekolah: wajah
              setiap lulusan, foto-foto satu tahun, pesan guru, dan catatan
              antarteman. Nempo yang kumpulkan isinya, desain, lalu cetak atau
              bagikan sebagai buku digital.
            </p>
            <p className="yb-hand mt-4 text-2xl sm:text-3xl" style={{ color: ACCENT }}>
              mau lihat bentuknya seperti apa?
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={yearBookMeta.halamanContoh}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                style={{ background: ACCENT, color: PAPER }}
              >
                <BookOpen className="h-4 w-4" />
                Lihat contoh yearbook
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={NEMPO_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                style={{ border: `1px solid ${LINE}`, background: CARD, color: INK }}
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi bareng Nempo
              </a>
            </div>
          </div>
        </section>

        {/* ── KARTU CONTOH (klik → halaman contoh) ── */}
        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <Link
            href={yearBookMeta.halamanContoh}
            className="yb-card group mx-auto block max-w-7xl overflow-hidden rounded-3xl"
            style={{ background: INK, color: PAPER }}
          >
            <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"
                  style={{ background: "rgba(185,138,60,.2)", color: "#e6c489", border: "1px solid rgba(185,138,60,.42)" }}
                >
                  Isi contoh
                </span>
                <p className="mt-5 text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: BRASS }}>
                  Contoh Buku Tahunan
                </p>
                <h2 className="yb-serif mt-2 text-4xl font-black leading-[0.9] tracking-[-0.03em] sm:text-6xl">
                  Year Book
                </h2>
                <p className="yb-serif mt-1 text-xl font-semibold italic sm:text-2xl" style={{ color: "rgba(246,241,230,.72)" }}>
                  Angkatan {yearBookMeta.angkatan} · {yearBookMeta.sekolah}
                </p>
                <p className="mt-4 max-w-md text-sm leading-7" style={{ color: "rgba(246,241,230,.66)" }}>
                  Isinya masih contoh — nama siswa, kutipan, dan fotonya saya
                  karang. Buka halaman ini untuk melihat bentuk aslinya: profil
                  lulusan, galeri momen, linimasa, pesan guru, dan dinding pesan.
                </p>
                <p
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black"
                  style={{ color: "#e6c489" }}
                >
                  Buka contoh yearbook
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl px-4 py-5"
                    style={{ background: "rgba(246,241,230,.07)", border: "1px solid rgba(246,241,230,.16)" }}
                  >
                    <p className="yb-serif text-3xl font-black sm:text-4xl">{s.n}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "rgba(246,241,230,.55)" }}>
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </section>

        {/* ── ISI YEAR BOOK ── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
              Isinya
            </p>
            <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
              Apa saja yang masuk buku?
            </h2>
            <p className="mt-3 text-sm leading-6" style={{ color: INK_SOFT }}>
              Bagian-bagian di bawah ini bisa dikurangi atau ditambah sesuai
              kebutuhan angkatan.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {yearBookIsi.map((item, i) => (
              <article
                key={item.judul}
                className="yb-card rounded-2xl p-5"
                style={{ background: CARD, border: `1px solid ${LINE}` }}
              >
                <p className="yb-serif text-2xl font-black" style={{ color: "rgba(124,47,63,.22)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="yb-serif mt-1 text-xl font-bold">{item.judul}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                  {item.teks}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CARA PESAN ── */}
        <section className="border-y" style={{ borderColor: LINE, background: CARD }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
                Alurnya
              </p>
              <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                Empat langkah sampai buku sampai.
              </h2>
            </div>

            <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {yearBookLangkah.map((s) => (
                <li key={s.nomor} className="yb-card rounded-2xl p-5" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
                  <p className="yb-serif text-4xl font-black" style={{ color: "rgba(185,138,60,.3)" }}>
                    {s.nomor}
                  </p>
                  <h3 className="yb-serif mt-2 text-xl font-bold">{s.judul}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                    {s.teks}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CETAK ATAU DIGITAL ── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
              Bentuknya
            </p>
            <h2 className="yb-serif mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
              Cetak, digital, atau dua-duanya.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {yearBookBentuk.map((b) => (
              <article key={b.nama} className="yb-card rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${LINE}` }}>
                <h3 className="yb-serif text-2xl font-black" style={{ color: ACCENT }}>
                  {b.nama}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: INK_SOFT }}>
                  {b.ringkas}
                </p>
                <ul className="mt-4 space-y-2">
                  {b.poin.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BRASS }} />
                      <span style={{ color: INK }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
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
                <p className="mt-3 text-sm leading-7" style={{ color: "rgba(246,241,230,.66)" }}>
                  Ceritakan jumlah siswa dan kelasnya, sisanya Nempo yang urus —
                  dari kumpul data sampai buku siap dibagikan.
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
                    href={yearBookMeta.halamanContoh}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                    style={{ border: "1px solid rgba(246,241,230,.3)", color: PAPER }}
                  >
                    <BookOpen className="h-4 w-4" />
                    Lihat contoh yearbook
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
                    style={{ background: "rgba(246,241,230,.07)", border: "1px solid rgba(246,241,230,.16)" }}
                  >
                    <s.icon className="h-4 w-4" style={{ color: BRASS }} />
                    <span className="text-sm font-bold">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 text-[11px] font-bold leading-5" style={{ color: "rgba(246,241,230,.45)" }}>
              {yearBookMeta.catatanContoh}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
