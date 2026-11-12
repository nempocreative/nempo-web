import { useEffect, useRef, useState } from "react";
import { Check, Download, Flag, Instagram, Loader2, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { graduates, yearBookMeta } from "@/data/year-book";
import { chooseVote, dreamGroups, makeQuiz, parseVotes, quizScore, VOTE_STORAGE_KEY, voteCategories, type QuizQuestion, type VoteCategory, type Votes } from "@/lib/yearbook-personal";

function Title({ label, title }: { label: string; title: string }) {
  return <><p className="text-sm font-bold uppercase">{label}</p><h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">{title}</h2></>;
}
function StudentSelect({ id, value, onChange }: { id: string; value: string; onChange: (id: string) => void }) {
  return <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">{graduates.map((g) => <option key={g.id} value={g.id}>{g.nama} · {g.kelas}</option>)}</select>;
}

export function YearbookVoting() {
  const [votes, setVotes] = useState<Votes>({});
  const [category, setCategory] = useState<VoteCategory>("heboh");
  const [selected, setSelected] = useState("nadia");
  const [notice, setNotice] = useState("");
  useEffect(() => { try { setVotes(parseVotes(localStorage.getItem(VOTE_STORAGE_KEY))); } catch { setNotice("Penyimpanan perangkat tidak tersedia."); } }, []);
  const chosen = graduates.find((g) => g.id === votes[category]);
  function vote() {
    const next = chooseVote(votes, category, selected);
    try { localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(next)); setVotes(next); setNotice("Pilihanmu tersimpan di perangkat ini."); }
    catch { setNotice("Pilihan belum tersimpan. Coba browser lain."); }
  }
  return <section id="voting" className="yb-memories px-5 py-20 sm:px-10"><div className="mx-auto max-w-6xl">
    <Title label="Versi kamu" title="Si paling berkesan" />
    <p className="mt-4 max-w-xl text-sm text-muted-foreground">Voting contoh · satu pilihan per kategori di browser ini, bisa diganti. Belum menjadi suara bersama atau hasil satu angkatan.</p>
    <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Kategori voting">{voteCategories.map((c) => <Button key={c.id} variant={category === c.id ? "default" : "outline"} aria-pressed={category === c.id} onClick={() => { setCategory(c.id); setSelected(votes[c.id] || "nadia"); setNotice(""); }}>{c.label}</Button>)}</div>
    <div className="mt-8 grid items-start gap-8 sm:grid-cols-2">
      <div><label htmlFor="vote-student" className="mb-2 block text-sm font-bold">Pilihan untuk {voteCategories.find((c) => c.id === category)?.label.toLowerCase()}</label><StudentSelect id="vote-student" value={selected} onChange={setSelected} /><Button className="mt-4" onClick={vote}><Check /> {chosen ? "Ganti pilihan" : "Simpan pilihan"}</Button><p role="status" className="mt-3 text-sm text-muted-foreground">{notice}</p></div>
      {chosen ? <div className="flex items-center gap-5 border-y border-border py-5"><img src={chosen.foto} alt={chosen.nama} className="h-24 w-20 rounded-lg object-cover" /><div><Trophy className="text-primary" /><p className="mt-2 text-sm text-muted-foreground">Pilihanmu</p><h3 className="text-xl font-bold">{chosen.nama}</h3><p className="text-sm">{chosen.kelas}</p></div></div> : <p className="border-y border-border py-8 text-muted-foreground">Belum ada pilihan untuk kategori ini.</p>}
    </div>
  </div></section>;
}

export function YearbookDreamMap() {
  const [group, setGroup] = useState("semua");
  const [studentId, setStudentId] = useState("nadia");
  const student = graduates.find((g) => g.id === studentId);
  const visible = graduates.filter((g) => group === "semua" || dreamGroups.find((d) => d.id === group)?.studentIds.includes(g.id));
  return <section id="peta-mimpi" className="yb-memories yb-memories-dark px-5 py-20 sm:px-10"><div className="mx-auto max-w-6xl">
    <Title label="Dari kelas, menuju dunia" title="Peta mimpi kita" /><p className="mt-4 text-sm text-muted-foreground">Cita-cita siswa contoh · kampus dan kota tujuan belum ditentukan.</p>
    <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Bidang mimpi">{[{ id: "semua", label: "Semua mimpi" }, ...dreamGroups].map((d) => <Button key={d.id} variant={group === d.id ? "default" : "outline"} aria-pressed={group === d.id} onClick={() => { setGroup(d.id); const first = graduates.find((g) => d.id === "semua" || dreamGroups.find((item) => item.id === d.id)?.studentIds.includes(g.id)); if (first) setStudentId(first.id); }}>{d.label}</Button>)}</div>
    <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
      <div className="yb-dream-trails grid grid-cols-2 gap-4 sm:grid-cols-3">{visible.map((g) => <Button key={g.id} variant="ghost" aria-pressed={studentId === g.id} onClick={() => setStudentId(g.id)} className="h-auto min-w-0 flex-col whitespace-normal border-border py-5 text-center"><img src={g.foto} alt="" className="h-16 w-16 rounded-full object-cover" /><span className="mt-2 font-bold">{g.nama}</span><span className="text-xs text-muted-foreground">{g.citaCita}</span></Button>)}</div>
      {student && <div aria-live="polite" className="border-y border-border py-6"><Flag className="text-primary" /><h3 className="mt-4 font-serif text-3xl font-bold">{student.citaCita}</h3><p className="mt-2 font-bold">{student.nama}</p><p className="text-sm text-muted-foreground">{student.kelas}</p><p className="mt-6 font-serif text-xl">“{student.quote}”</p></div>}
    </div>
  </div></section>;
}

export function YearbookMemoryCards() {
  const [studentId, setStudentId] = useState("nadia");
  const [tone, setTone] = useState("dark");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const student = graduates.find((g) => g.id === studentId);
  async function download() {
    const card = cardRef.current;
    if (!card || !student) return;
    setBusy(true); setError("");
    try {
      await document.fonts.ready;
      await Promise.all(Array.from(card.querySelectorAll("img")).map((img) => img.decode()));
      const { toPng } = await import("html-to-image");
      const data = await toPng(card, { pixelRatio: 1080 / card.offsetWidth, cacheBust: false });
      const a = document.createElement("a"); a.download = `kenangan-${student.id}-2026.png`; a.href = data; a.click();
    } catch { setError("Kartu belum bisa diunduh. Coba lagi, ya."); }
    finally { setBusy(false); }
  }
  if (!student) return null;
  return <section id="kartu-kenangan" className="yb-memories px-5 py-20 sm:px-10"><div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">
    <div><Title label="Simpan, lalu bagikan" title="Satu kartu, sejuta cerita" /><div className="mt-8"><label htmlFor="card-student" className="mb-2 block text-sm font-bold">Siswa di kartu</label><StudentSelect id="card-student" value={studentId} onChange={setStudentId} /></div><div className="mt-5 flex gap-3" role="group" aria-label="Warna kartu"><Button variant={tone === "dark" ? "default" : "outline"} aria-pressed={tone === "dark"} onClick={() => setTone("dark")}>Biru malam</Button><Button variant={tone === "light" ? "default" : "outline"} aria-pressed={tone === "light"} onClick={() => setTone("light")}>Kertas putih</Button></div><Button className="mt-6" onClick={download} disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <Download />} {busy ? "Menyiapkan kartu…" : "Unduh kartu Story"}</Button><p className="mt-3 text-sm text-muted-foreground">PNG · 1080 × 1920 · nama dan IG masih contoh</p>{error && <p role="alert" className="mt-3 text-destructive">{error}</p>}</div>
    <div ref={cardRef} className={`yb-story-card ${tone === "dark" ? "yb-memories-dark" : ""} mx-auto w-full max-w-[360px] overflow-hidden`}>
      <div className="yb-story-inner"><p className="yb-story-label">{yearBookMeta.sekolah} · {yearBookMeta.angkatan}</p><h3 className="yb-story-heading">Sejuta<br />Cerita.</h3><img src={student.foto} alt={student.nama} className="yb-story-photo" /><h4 className="yb-story-name">{student.nama}</h4><p className="yb-story-class">{student.kelas} · {student.julukan}</p><p className="yb-story-quote">“{student.quote}”</p><p className="yb-story-ig"><Instagram size={14} /> @{student.instagram}</p><p className="yb-story-footer">NEMPO YEAR BOOK · CONTOH</p></div>
    </div>
  </div></section>;
}

export function YearbookFriendQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const answer = answers[index];
  const friend = graduates.find((g) => g.id === question?.studentId);
  function start() { setQuestions(makeQuiz()); setAnswers([]); setIndex(0); setFinished(false); }
  return <section id="tebak-teman" className="yb-memories px-5 py-20 sm:px-10"><div className="mx-auto max-w-3xl">
    <Title label="Seberapa kenal kamu?" title="Tebak teman sekelas" />
    {!question ? <div className="mt-8"><p className="text-muted-foreground">Lima pertanyaan dari hobi dan kutipan siswa contoh.</p><Button className="mt-5" onClick={start}>Mulai kuis</Button></div> : finished ? <div role="status" className="mt-8 border-y border-border py-8"><Trophy className="h-10 w-10 text-primary" /><h3 className="mt-4 text-3xl font-bold">Skormu {quizScore(questions, answers)} dari {questions.length}</h3><p className="mt-3 text-muted-foreground">{quizScore(questions, answers) === questions.length ? "Kenal banget! Kamu ingat semua cerita mereka." : "Masih ada cerita yang bisa kamu kenali lagi."}</p><Button className="mt-5" onClick={start}><RotateCcw /> Main lagi</Button></div> : <div className="mt-8">
      <p className="text-sm text-muted-foreground">Pertanyaan {index + 1} / {questions.length}</p><h3 className="mt-4 font-serif text-2xl leading-relaxed">{question.clue}</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">{question.optionIds.map((id) => { const g = graduates.find((s) => s.id === id); if (!g) return null; return <Button key={id} variant={answer === id ? "default" : "outline"} disabled={Boolean(answer)} className="min-h-14 justify-start whitespace-normal text-left" onClick={() => setAnswers([...answers, id])}>{g.nama}</Button>; })}</div>
      {answer && friend && <div role="status" className="mt-6 flex items-start gap-4"><img src={friend.foto} alt={friend.nama} className="h-20 w-16 rounded-lg object-cover" /><div><p className="font-bold">{answer === question.studentId ? "Betul!" : "Belum tepat."} Ini {friend.nama}.</p><Button className="mt-3" onClick={() => { if (index === questions.length - 1) setFinished(true); else setIndex(index + 1); }}>{index === questions.length - 1 ? "Lihat skor" : "Pertanyaan berikutnya"}</Button></div></div>}
    </div>}
  </div></section>;
}