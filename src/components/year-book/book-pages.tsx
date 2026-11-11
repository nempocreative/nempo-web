// Halaman-halaman buku tahunan contoh. Setiap halaman berukuran tetap 5:7 dan semua
// ukuran memakai satuan cqw (persen lebar halaman), jadi tata letaknya sama persis
// di HP maupun layar besar — seperti halaman cetak yang diperkecil/diperbesar.
import type { CSSProperties, ReactNode } from "react";
import { Award, GraduationCap, Sparkles, Star } from "lucide-react";
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

export const SERIF = '"Playfair Display", Georgia, serif';
export const HAND = '"Caveat", "Segoe Script", cursive';
const PAPER = "#fffdf7";
const INK = "#141c3f";
const INK_SOFT = "#565f88";
const LINE = "#dbe1f6";
const ACCENT = "#2b3fd8";
const BRASS = "#f2a007";

export type BookPageDef = {
  id: string;
  label: string;
  dark?: boolean;
  render: (jump: (id: string) => void) => ReactNode;
};

const serif: CSSProperties = { fontFamily: SERIF };
const hand: CSSProperties = { fontFamily: HAND };

function Eyebrow({ children, color = ACCENT }: { children: ReactNode; color?: string }) {
  return (
    <p className="text-[2.3cqw] font-black uppercase tracking-[0.24em]" style={{ color }}>
      {children}
    </p>
  );
}

function Title({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[7.4cqw] font-black leading-[1] tracking-[-0.03em] ${className}`} style={serif}>
      {children}
    </h2>
  );
}

function Tape({ className = "", rotate = -4 }: { className?: string; rotate?: number }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-[3.6cqw] w-[13cqw] ${className}`}
      style={{
        background: "rgba(242,160,7,.34)",
        border: "1px solid rgba(242,160,7,.4)",
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}

function Polaroid({
  src,
  caption,
  rotate,
  className = "",
  imgClass = "aspect-[4/3]",
}: {
  src: string;
  caption: string;
  rotate: number;
  className?: string;
  imgClass?: string;
}) {
  return (
    <figure
      className={`relative bg-white p-[1.8cqw] pb-[1.2cqw] ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, boxShadow: "0 1.2cqw 2.6cqw -1.4cqw rgba(20,28,63,.45)" }}
    >
      <Tape className="-top-[1.6cqw] left-1/2 -translate-x-1/2" rotate={rotate * -1.5} />
      <div className={`overflow-hidden ${imgClass}`}>
        <img src={src} alt={caption} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-[1cqw] truncate text-center text-[3.4cqw] leading-none" style={{ ...hand, color: INK }}>
        {caption}
      </figcaption>
    </figure>
  );
}

const byId = (id: string) => graduates.find((g) => g.id === id);
const kelasCandid: Record<Kelas, number> = { "XII IPA 1": 2, "XII IPA 2": 4, "XII IPS 1": 7 };

/* ───────────────────────── SAMPUL ───────────────────────── */

function Cover() {
  return (
    <div
      className="absolute inset-0 overflow-hidden text-center"
      style={{ background: "radial-gradient(120% 90% at 30% 18%, #2a3878 0%, #141c3f 52%, #0a1030 100%)", color: "#fff6dc" }}
    >
      <div aria-hidden className="absolute inset-y-0 left-0 w-[6cqw]" style={{ background: "linear-gradient(90deg, rgba(0,0,0,.45), rgba(255,255,255,.06) 70%, transparent)" }} />
      <div aria-hidden className="absolute inset-[5cqw] rounded-[1cqw] border-[0.5cqw]" style={{ borderColor: "rgba(242,190,80,.7)" }} />
      <div aria-hidden className="absolute inset-[6.6cqw] rounded-[0.6cqw] border" style={{ borderColor: "rgba(242,190,80,.35)" }} />

      <span
        className="absolute right-[8cqw] top-[9cqw] z-10 rotate-[8deg] rounded-full px-[2.4cqw] py-[1cqw] text-[2.2cqw] font-black uppercase tracking-[0.16em]"
        style={{ background: BRASS, color: INK }}
      >
        Isi contoh
      </span>

      <div className="relative flex h-full flex-col items-center px-[10cqw] pt-[17cqw]">
        <span className="grid h-[17cqw] w-[17cqw] place-items-center rounded-full border-[0.5cqw]" style={{ borderColor: "rgba(242,190,80,.85)" }}>
          <GraduationCap className="h-[9cqw] w-[9cqw]" style={{ color: "#f5c55a" }} strokeWidth={1.6} />
        </span>
        <p className="mt-[5cqw] text-[2.6cqw] font-black uppercase tracking-[0.42em]" style={{ color: "rgba(245,197,90,.9)" }}>
          {yearBookMeta.sekolah}
        </p>
        <h1 className="yb-foil mt-[4cqw] text-[19cqw] font-black leading-[0.82] tracking-[-0.04em]" style={serif}>
          Year
          <br />
          Book
        </h1>
        <div className="mt-[5cqw] flex items-center gap-[3cqw]">
          <span className="h-px w-[11cqw]" style={{ background: "rgba(245,197,90,.6)" }} />
          <span className="yb-foil text-[7.5cqw] font-black" style={serif}>
            {yearBookMeta.angkatan}
          </span>
          <span className="h-px w-[11cqw]" style={{ background: "rgba(245,197,90,.6)" }} />
        </div>
        <p className="mt-[3cqw] text-[6.4cqw] leading-none" style={{ ...hand, color: "#fff6dc" }}>
          “{yearBookMeta.julukanAngkatan}”
        </p>
        <p className="mt-auto pb-[12cqw] text-[2.4cqw] font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(255,246,220,.6)" }}>
          Angkatan {yearBookMeta.tahunMasuk} — {yearBookMeta.tahunLulus}
        </p>
      </div>
    </div>
  );
}

function BackCover() {
  return (
    <div
      className="absolute inset-0 overflow-hidden text-center"
      style={{ background: "radial-gradient(120% 90% at 70% 82%, #2a3878 0%, #141c3f 52%, #0a1030 100%)", color: "#fff6dc" }}
    >
      <div aria-hidden className="absolute inset-y-0 right-0 w-[6cqw]" style={{ background: "linear-gradient(270deg, rgba(0,0,0,.45), rgba(255,255,255,.06) 70%, transparent)" }} />
      <div aria-hidden className="absolute inset-[5cqw] rounded-[1cqw] border-[0.5cqw]" style={{ borderColor: "rgba(242,190,80,.55)" }} />
      <div className="relative flex h-full flex-col items-center justify-center px-[13cqw]">
        <Sparkles className="h-[7cqw] w-[7cqw]" style={{ color: "#f5c55a" }} strokeWidth={1.6} />
        <p className="yb-foil mt-[4cqw] text-[9cqw] font-black leading-[1.02] tracking-[-0.03em]" style={serif}>
          Sampai jumpa di cerita berikutnya.
        </p>
        <p className="mt-[5cqw] text-[5.4cqw] leading-tight" style={hand}>
          Jangan lupa pulang, ya — sekolah ini selalu rumah.
        </p>
        <div className="mt-[10cqw] flex items-end gap-[0.6cqw]" aria-hidden>
          {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2].map((w, i) => (
            <span key={i} className="h-[8cqw] bg-[#fff6dc]" style={{ width: `${w * 0.45}cqw`, opacity: 0.85 }} />
          ))}
        </div>
        <p className="mt-[1.5cqw] text-[2cqw] font-bold tracking-[0.3em]" style={{ color: "rgba(255,246,220,.55)" }}>
          YB-{yearBookMeta.angkatan}-SEJUTACERITA
        </p>
        <p className="absolute bottom-[10cqw] text-[2.3cqw] font-black uppercase tracking-[0.26em]" style={{ color: "rgba(245,197,90,.85)" }}>
          Dibuat bersama Nempo · Garut
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── ISI ───────────────────────── */

function Sambutan() {
  return (
    <div className="flex h-full flex-col">
      <Eyebrow>Sambutan</Eyebrow>
      <Title className="mt-[1.5cqw]">Untuk angkatan {yearBookMeta.angkatan}</Title>
      <div className="mt-[5cqw] flex items-end gap-[4cqw]">
        <div className="relative w-[34cqw] shrink-0 bg-white p-[1.6cqw]" style={{ transform: "rotate(-2deg)", boxShadow: "0 1.2cqw 2.6cqw -1.4cqw rgba(20,28,63,.45)" }}>
          <Tape className="-top-[1.6cqw] left-[9cqw]" rotate={-6} />
          <img src={kepalaSekolah.foto} alt={kepalaSekolah.nama} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="min-w-0 pb-[2cqw]">
          <p className="text-[3.4cqw] font-black leading-tight">{kepalaSekolah.nama}</p>
          <p className="mt-[0.6cqw] text-[2.3cqw] font-bold uppercase tracking-[0.14em]" style={{ color: INK_SOFT }}>
            {kepalaSekolah.jabatan}
          </p>
          <p className="mt-[0.4cqw] text-[2.3cqw] font-bold uppercase tracking-[0.14em]" style={{ color: INK_SOFT }}>
            {yearBookMeta.sekolah}
          </p>
        </div>
      </div>
      <div className="relative mt-[5cqw] space-y-[2.4cqw] text-[3.1cqw] leading-[1.6]" style={{ color: INK }}>
        <span aria-hidden className="absolute -left-[1cqw] -top-[6cqw] text-[16cqw] leading-none" style={{ ...serif, color: "rgba(43,63,216,.12)" }}>
          “
        </span>
        {kepalaSekolah.sambutan.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </div>
      <div className="mt-auto">
        <p className="text-[7cqw] leading-none" style={{ ...hand, color: ACCENT }}>
          Siti Marlina
        </p>
        <span className="mt-[1cqw] block h-px w-[30cqw]" style={{ background: LINE }} />
      </div>
    </div>
  );
}

function DaftarIsi({ jump, toc }: { jump: (id: string) => void; toc: { id: string; label: string; page: number }[] }) {
  return (
    <div className="flex h-full flex-col">
      <Eyebrow>Isi buku</Eyebrow>
      <Title className="mt-[1.5cqw] text-[10cqw]">Daftar Isi</Title>
      <ol className="mt-[6cqw] space-y-[1.2cqw]">
        {toc.map((t, i) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => jump(t.id)}
              className="group flex w-full items-baseline gap-[2cqw] rounded-[1cqw] py-[1.2cqw] text-left transition-colors"
            >
              <span className="w-[6cqw] shrink-0 text-[3cqw] font-black" style={{ color: BRASS }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="shrink-0 text-[3.8cqw] font-bold group-hover:underline" style={serif}>
                {t.label}
              </span>
              <span aria-hidden className="mb-[0.8cqw] flex-1 border-b-[0.35cqw] border-dotted" style={{ borderColor: "rgba(86,95,136,.4)" }} />
              <span className="shrink-0 text-[3.2cqw] font-black" style={{ color: ACCENT }}>
                {t.page}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-auto -rotate-2 text-center text-[5.6cqw] leading-tight" style={{ ...hand, color: ACCENT }}>
        selamat membaca & bernostalgia!
      </p>
    </div>
  );
}

function FotoAngkatan() {
  const group = moments.find((m) => m.featured) ?? moments[0];
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative h-[60%] overflow-hidden">
        <img src={group.src} alt={group.caption} loading="lazy" className="h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,28,63,0) 45%, rgba(20,28,63,.85) 100%)" }} />
        <p className="absolute bottom-[4cqw] left-[7cqw] text-[5.4cqw] leading-none" style={{ ...hand, color: "#ffd166" }}>
          foto bareng satu angkatan ♡
        </p>
      </div>
      <div className="flex flex-1 flex-col px-[7cqw] pb-[9cqw] pt-[5cqw]">
        <Eyebrow>Angkatan</Eyebrow>
        <div className="mt-[1cqw] flex items-end justify-between gap-[3cqw]">
          <p className="text-[17cqw] font-black leading-[0.85] tracking-[-0.05em]" style={{ ...serif, color: INK }}>
            {yearBookMeta.angkatan}
          </p>
          <p className="pb-[1.5cqw] text-right text-[4.6cqw] italic leading-tight" style={{ ...serif, color: ACCENT }}>
            {yearBookMeta.julukanAngkatan}
          </p>
        </div>
        <div className="mt-auto grid grid-cols-3 gap-[2.4cqw]">
          {[
            { n: graduates.length, l: "Lulusan" },
            { n: kelasInfo.length, l: "Kelas" },
            { n: yearBookMeta.tahunLulus - yearBookMeta.tahunMasuk, l: "Tahun" },
          ].map((s) => (
            <div key={s.l} className="rounded-[2cqw] border px-[2.4cqw] py-[2cqw]" style={{ borderColor: LINE, background: "#fff" }}>
              <p className="text-[6.4cqw] font-black leading-none" style={serif}>
                {s.n}
              </p>
              <p className="mt-[0.8cqw] text-[2.2cqw] font-black uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Perjalanan() {
  return (
    <div className="flex h-full flex-col">
      <Eyebrow>Linimasa</Eyebrow>
      <Title className="mt-[1.5cqw]">Perjalanan kita</Title>
      <ol className="relative mt-[6cqw] flex flex-1 flex-col justify-between pl-[8cqw]">
        <span aria-hidden className="absolute bottom-[3cqw] left-[2.4cqw] top-[3cqw] w-[0.5cqw] rounded-full" style={{ background: "linear-gradient(180deg, #2b3fd8, #f2a007)" }} />
        {chapters.map((c) => (
          <li key={c.number} className="relative">
            <span
              aria-hidden
              className="absolute -left-[8cqw] top-[0.4cqw] grid h-[5.4cqw] w-[5.4cqw] place-items-center rounded-full text-[2.3cqw] font-black"
              style={{ background: ACCENT, color: "#fff", boxShadow: `0 0 0 1cqw ${PAPER}` }}
            >
              {c.number}
            </span>
            <p className="text-[2.3cqw] font-black uppercase tracking-[0.18em]" style={{ color: BRASS }}>
              {c.date}
            </p>
            <h3 className="mt-[0.6cqw] text-[4.8cqw] font-bold leading-tight" style={serif}>
              {c.title}
            </h3>
            <p className="mt-[1cqw] text-[3cqw] leading-[1.55]" style={{ color: INK_SOFT }}>
              {c.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function KelasPage({ kelas }: { kelas: Kelas }) {
  const info = kelasInfo.find((k) => k.kelas === kelas)!;
  const wali = teacherMessages.find((t) => t.kelas === kelas)!;
  const members = graduates.filter((g) => g.kelas === kelas);
  const candid = moments[kelasCandid[kelas]];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-[3cqw]">
        <div>
          <Eyebrow color={info.warna}>{info.julukan}</Eyebrow>
          <p className="mt-[1.2cqw] text-[11.5cqw] font-black leading-[0.9] tracking-[-0.04em]" style={{ ...serif, color: info.warna }}>
            {kelas}
          </p>
        </div>
        <span className="mt-[1cqw] grid h-[11cqw] w-[11cqw] shrink-0 place-items-center rounded-full" style={{ background: info.warna, color: "#fff" }}>
          <Star className="h-[5cqw] w-[5cqw]" fill="currentColor" />
        </span>
      </div>
      <p className="mt-[2cqw] text-[5cqw] leading-tight" style={{ ...hand, color: INK }}>
        “{info.motto}”
      </p>

      <div className="mt-[5cqw] flex gap-[4cqw]">
        <div className="relative w-[33cqw] shrink-0 bg-white p-[1.6cqw] pb-[1.2cqw]" style={{ transform: "rotate(-2.5deg)", boxShadow: "0 1.2cqw 2.6cqw -1.4cqw rgba(20,28,63,.45)" }}>
          <Tape className="-top-[1.6cqw] left-[9cqw]" rotate={5} />
          <img src={wali.foto} alt={wali.nama} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <p className="mt-[0.8cqw] text-center text-[3.4cqw] leading-none" style={hand}>
            {wali.nama}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[2.3cqw] font-black uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
            Pesan wali kelas
          </p>
          <p className="mt-[1.6cqw] text-[4.4cqw] leading-[1.18]" style={{ ...hand, color: INK }}>
            {wali.pesan}
          </p>
        </div>
      </div>

      <div className="relative mt-[5cqw] flex min-h-[26cqw] flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-hidden rounded-[1.6cqw]">
          <img src={candid.src} alt={candid.caption} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="absolute -bottom-[2.6cqw] right-[2cqw] flex items-center gap-[1cqw] rounded-full bg-white py-[0.8cqw] pl-[0.8cqw] pr-[2.4cqw]" style={{ boxShadow: "0 1cqw 2cqw -1cqw rgba(20,28,63,.4)" }}>
          <div className="flex -space-x-[1.6cqw]">
            {members.map((m) => (
              <img key={m.id} src={m.foto} alt="" className="h-[6cqw] w-[6cqw] rounded-full border-[0.4cqw] border-white object-cover" />
            ))}
          </div>
          <span className="text-[2.4cqw] font-black" style={{ color: INK }}>
            {members.length} lulusan
          </span>
        </div>
      </div>
    </div>
  );
}

function LulusanPage({ kelas }: { kelas: Kelas }) {
  const info = kelasInfo.find((k) => k.kelas === kelas)!;
  const members = graduates.filter((g) => g.kelas === kelas);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <Title className="text-[6.4cqw]">Para lulusan</Title>
        <span className="text-[2.6cqw] font-black uppercase tracking-[0.16em]" style={{ color: info.warna }}>
          {kelas}
        </span>
      </div>
      <div className="mt-[3.5cqw] grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-x-[4cqw] gap-y-[3.5cqw]">
        {members.map((g) => (
          <article key={g.id} className="flex min-h-0 flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.4cqw]" style={{ boxShadow: `0 0 0 0.5cqw #fff, 0 0 0 0.8cqw ${LINE}` }}>
              <img src={g.foto} alt={g.nama} loading="lazy" className="h-full w-full object-cover object-[50%_22%]" />
              <span className="absolute left-[1.4cqw] top-[1.4cqw] rounded-full px-[1.6cqw] py-[0.5cqw] text-[1.9cqw] font-black uppercase tracking-[0.1em]" style={{ background: g.warna, color: "#fff" }}>
                {g.julukan}
              </span>
            </div>
            <h3 className="mt-[1.4cqw] truncate text-[3.7cqw] font-black leading-[1.2]" style={serif}>
              {g.nama}
            </h3>
            <p className="mt-[0.4cqw] line-clamp-3 h-[9.9cqw] text-[3.2cqw] leading-[1.02]" style={{ ...hand, color: INK_SOFT }}>
              “{g.quote}”
            </p>
            <p className="mt-[0.8cqw] truncate text-[2.1cqw] font-bold" style={{ color: INK_SOFT }}>
              <span style={{ color: g.warna }}>Cita-cita:</span> {g.citaCita} · {g.hobi}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Penghargaan() {
  return (
    <div className="flex h-full flex-col">
      <Eyebrow color={BRASS}>Hasil voting angkatan</Eyebrow>
      <Title className="mt-[1.5cqw]">Paling-paling</Title>
      <p className="mt-[1.6cqw] text-[3cqw]" style={{ color: INK_SOFT }}>
        Gelar yang dipilih sendiri oleh teman satu angkatan.
      </p>
      <div className="mt-[4cqw] grid flex-1 grid-cols-2 grid-rows-3 gap-[3cqw]">
        {superlatives.map((s, i) => {
          const g = byId(s.graduateId)!;
          return (
            <div
              key={s.gelar}
              className="flex flex-col items-center justify-center rounded-[2.4cqw] border px-[2cqw] text-center"
              style={{ borderColor: LINE, background: i % 3 === 1 ? "#fff6e0" : "#fff" }}
            >
              <div className="relative">
                <img src={g.foto} alt={g.nama} loading="lazy" className="h-[15cqw] w-[15cqw] rounded-full object-cover object-top" style={{ boxShadow: `0 0 0 0.7cqw ${BRASS}` }} />
                <span className="absolute -bottom-[1cqw] -right-[1cqw] grid h-[6cqw] w-[6cqw] place-items-center rounded-full" style={{ background: ACCENT, color: "#fff" }}>
                  <Award className="h-[3.6cqw] w-[3.6cqw]" />
                </span>
              </div>
              <p className="mt-[2.4cqw] text-[3.1cqw] font-bold italic leading-tight" style={serif}>
                {s.gelar}
              </p>
              <p className="mt-[0.8cqw] text-[2.3cqw] font-black uppercase tracking-[0.12em]" style={{ color: ACCENT }}>
                {g.nama}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MomenSatu() {
  const featured = moments.find((m) => m.featured) ?? moments[0];
  const a = moments[1];
  const b = moments[3];
  return (
    <div className="flex h-full flex-col">
      <p className="text-[9cqw] leading-none" style={{ ...hand, color: ACCENT }}>
        momen-momen kita
      </p>
      <Polaroid src={featured.src} caption={featured.caption} rotate={-1.6} className="mt-[5cqw]" imgClass="aspect-[16/10]" />
      <div className="mt-[6cqw] grid grid-cols-2 gap-[5cqw]">
        <Polaroid src={a.src} caption={a.caption} rotate={2.4} imgClass="aspect-square" />
        <Polaroid src={b.src} caption={b.caption} rotate={-2.8} imgClass="aspect-square" className="mt-[3cqw]" />
      </div>
    </div>
  );
}

function MomenDua() {
  const picks = [moments[5], moments[6], moments[8], moments[2], moments[4], moments[7]];
  const rot = [-2.5, 2, 1.6, -1.8, -2.2, 2.6];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <Eyebrow>Galeri</Eyebrow>
        <p className="text-[4.6cqw] leading-none" style={{ ...hand, color: BRASS }}>
          kangen nggak?
        </p>
      </div>
      <div className="mt-[5cqw] grid flex-1 grid-cols-2 content-between gap-x-[5cqw]">
        {picks.map((m, i) => (
          <Polaroid key={m.caption} src={m.src} caption={m.caption} rotate={rot[i]} imgClass="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

const NOTE_COLORS = ["#fff1b8", "#ffd9e4", "#dce4ff", "#d8f5e3", "#ffe3c4", "#ece0ff"];
const INK_COLORS = ["#2b3fd8", "#c0265b", "#0d9488", "#7c4ddb"];

function DindingPesan() {
  const signatures = graduates;
  return (
    <div className="flex h-full flex-col">
      <Eyebrow>Dinding pesan</Eyebrow>
      <Title className="mt-[1.5cqw]">Tanda tangan & pesan</Title>
      <div className="mt-[5cqw] grid grid-cols-2 gap-[3.4cqw]">
        {wallNotes.map((n, i) => (
          <div
            key={n.dari}
            className="relative px-[3cqw] pb-[2.4cqw] pt-[3cqw]"
            style={{
              background: NOTE_COLORS[i % NOTE_COLORS.length],
              transform: `rotate(${i % 2 === 0 ? -2 : 1.8}deg)`,
              boxShadow: "0 1cqw 2cqw -1.2cqw rgba(20,28,63,.35)",
            }}
          >
            <span aria-hidden className="absolute -top-[1.2cqw] left-1/2 h-[2.4cqw] w-[2.4cqw] -translate-x-1/2 rounded-full" style={{ background: INK_COLORS[i % INK_COLORS.length] }} />
            <p className="text-[3.9cqw] leading-[1.08]" style={{ ...hand, color: INK }}>
              {n.teks}
            </p>
            <p className="mt-[1.2cqw] text-right text-[2.2cqw] font-black uppercase tracking-[0.12em]" style={{ color: INK_COLORS[i % INK_COLORS.length] }}>
              — {n.dari}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-[4cqw] border-t pt-[2.4cqw] text-[2.2cqw] font-black uppercase tracking-[0.2em]" style={{ borderColor: LINE, color: INK_SOFT }}>
        Tanda tangan teman-teman
      </p>
      <div className="flex flex-1 flex-wrap content-center items-center justify-center gap-x-[4cqw] gap-y-[1.4cqw]">
        {signatures.map((g, i) => (
          <span
            key={g.id}
            className="text-[5cqw] leading-none"
            style={{ ...hand, color: INK_COLORS[i % INK_COLORS.length], transform: `rotate(${(i % 3) * 3 - 3}deg)` }}
          >
            {g.nama.split(" ")[0]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── SUSUNAN BUKU ───────────────────────── */

const kelasPages = kelasInfo.flatMap<BookPageDef>((k) => [
  { id: `kelas-${k.kelas}`, label: k.kelas, render: () => <KelasPage kelas={k.kelas} /> },
  { id: `lulusan-${k.kelas}`, label: `Lulusan ${k.kelas}`, render: () => <LulusanPage kelas={k.kelas} /> },
]);

const bodyPages: BookPageDef[] = [
  { id: "sambutan", label: "Sambutan", render: () => <Sambutan /> },
  { id: "daftar-isi", label: "Daftar Isi", render: (jump) => <DaftarIsi jump={jump} toc={tocEntries()} /> },
  { id: "angkatan", label: "Angkatan 2026", render: () => <FotoAngkatan /> },
  { id: "perjalanan", label: "Perjalanan Kita", render: () => <Perjalanan /> },
  ...kelasPages,
  { id: "penghargaan", label: "Paling-paling", render: () => <Penghargaan /> },
  { id: "momen", label: "Momen", render: () => <MomenSatu /> },
  { id: "galeri", label: "Galeri", render: () => <MomenDua /> },
  { id: "dinding", label: "Dinding Pesan", render: () => <DindingPesan /> },
];

export const bookPages: BookPageDef[] = [
  { id: "sampul", label: "Sampul", dark: true, render: () => <Cover /> },
  ...bodyPages,
  { id: "sampul-belakang", label: "Sampul belakang", dark: true, render: () => <BackCover /> },
];

/** Halaman yang tampil penuh sampai tepi (tanpa margin isi). */
export const fullBleedPages = new Set(["angkatan"]);

const TOC_IDS = ["sambutan", "angkatan", "perjalanan", ...kelasInfo.map((k) => `kelas-${k.kelas}`), "penghargaan", "momen", "dinding"];

export function tocEntries() {
  return TOC_IDS.map((id) => {
    const page = bookPages.findIndex((p) => p.id === id);
    return { id, label: bookPages[page]?.label ?? id, page };
  });
}

/** Lembar halaman: kertas, bayangan lipatan tengah, kepala & nomor halaman. */
export function BookSheet({ page, index, onJump }: { page: BookPageDef; index: number; onJump: (id: string) => void }) {
  const isLeft = index % 2 === 1;
  if (page.dark) {
    return <div className="yb-sheet relative overflow-hidden">{page.render(onJump)}</div>;
  }
  const bleed = fullBleedPages.has(page.id);
  return (
    <div
      className="yb-sheet relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at 20% 10%, rgba(242,160,7,.05), transparent 40%), ${PAPER}`,
        color: INK,
      }}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 z-20 w-[9cqw] ${isLeft ? "right-0" : "left-0"}`}
        style={{
          background: `linear-gradient(${isLeft ? "270deg" : "90deg"}, rgba(20,28,63,.16), rgba(20,28,63,.04) 45%, transparent)`,
        }}
      />
      {!bleed && (
        <p
          className={`absolute top-[3.6cqw] z-10 text-[1.9cqw] font-black uppercase tracking-[0.26em] ${isLeft ? "left-[7cqw]" : "right-[7cqw]"}`}
          style={{ color: "rgba(86,95,136,.6)" }}
        >
          {isLeft ? `Year Book ${yearBookMeta.angkatan}` : yearBookMeta.sekolah}
        </p>
      )}
      <div className={bleed ? "absolute inset-0" : "absolute inset-0 px-[7cqw] pb-[9cqw] pt-[9.5cqw]"}>{page.render(onJump)}</div>
      <p
        className={`absolute bottom-[3.4cqw] z-10 text-[2.4cqw] font-black ${isLeft ? "left-[7cqw]" : "right-[7cqw]"}`}
        style={{ ...serif, color: INK_SOFT }}
      >
        {index}
      </p>
    </div>
  );
}
