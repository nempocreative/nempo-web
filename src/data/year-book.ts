// Year Book — isi buku tahunan angkatan.
// Semua nama, julukan, kutipan, dan pesan di bawah ini CONTOH (bukan data asli),
// ditulis di kode supaya mudah diganti satu per satu.
import momentBasecamp from "@/assets/kalamuda-kegiatan-basecamp.jpg";
import momentHunting from "@/assets/kalamuda-kegiatan-hunting-foto.jpg";
import momentCafe from "@/assets/kalamuda-kegiatan-good-story-cafe.jpg";
import momentAkustik from "@/assets/kalamuda-kegiatan-akustik.webp";
import momentDapoer from "@/assets/kalamuda-kegiatan-dapoer-nyunda.webp";
import momentMakan from "@/assets/kalamuda-kegiatan-makan-bersama.webp";
import momentPodcast from "@/assets/kalamuda-kegiatan-podcast-malam.webp";
import momentTari from "@/assets/kalamuda-kegiatan-tari-musicomedy.webp";
import momentGroup from "@/assets/musicomedy-group.webp";

export const yearBookMeta = {
  angkatan: "2026",
  sekolah: "SMA Nempo Garut",
  julukanAngkatan: "Sejuta Cerita",
  tahunMasuk: 2023,
  tahunLulus: 2026,
  tagline: "Empat tahun, satu angkatan, sejuta cerita yang kita simpan di sini.",
  halamanContoh: "/year-book/contoh",
  catatanContoh:
    "Semua nama, foto, dan pesan di halaman ini masih CONTOH. Ganti isinya di file src/data/year-book.ts.",
};

export const kelasList = ["XII IPA 1", "XII IPA 2", "XII IPS 1"] as const;
export type Kelas = (typeof kelasList)[number];

export type Graduate = {
  id: string;
  nama: string;
  julukan: string;
  kelas: Kelas;
  hobi: string;
  quote: string;
  warna: string;
};

export const graduates: Graduate[] = [
  { id: "nadia", nama: "Nadia Putri", julukan: "Ketua Angkatan", kelas: "XII IPA 1", hobi: "Paduan suara", quote: "Kita mungkin ambil arah berbeda, tapi pernah tumbuh di halaman yang sama.", warna: "#e0447c" },
  { id: "rayhan", nama: "Rayhan Aditya", julukan: "Si Paling Strategis", kelas: "XII IPA 1", hobi: "Catur & futsal", quote: "Bagian paling seru dari sekolah adalah tidak pernah tahu cerita apa yang menunggu besok.", warna: "#2b6fd8" },
  { id: "salsa", nama: "Salsa Nuraini", julukan: "Creative Soul", kelas: "XII IPA 2", hobi: "Menggambar & film analog", quote: "Terima kasih untuk semua tawa yang membuat hari biasa terasa istimewa.", warna: "#7c4ddb" },
  { id: "dimas", nama: "Dimas Pratama", julukan: "Si Penghubung", kelas: "XII IPS 1", hobi: "Podcast & nongkrong", quote: "Kelas ini mengajarkan bahwa teman baik selalu punya cara untuk tetap dekat.", warna: "#0d9488" },
  { id: "aulia", nama: "Aulia Rahman", julukan: "Quiet Achiever", kelas: "XII IPA 2", hobi: "Olimpiade fisika", quote: "Kita selesai di sini, tapi cerita kita tidak pernah benar-benar selesai.", warna: "#e07b00" },
  { id: "maya", nama: "Maya Kirana", julukan: "Si Paling Optimis", kelas: "XII IPS 1", hobi: "Menari & fotografi", quote: "Simpan yang baik-baik. Nanti kita akan rindu semuanya.", warna: "#e05244" },
  { id: "fajar", nama: "Fajar Nugraha", julukan: "Kapten Lapangan", kelas: "XII IPA 1", hobi: "Basket & lari pagi", quote: "Habis lapangan ini, masih ada lapangan-lapangan lain yang menunggu.", warna: "#2b3fd8" },
  { id: "salma", nama: "Salma Azzahra", julukan: "Ibu Kandung Kelas", kelas: "XII IPA 2", hobi: "Memasak & baca novel", quote: "Resep paling enak di sekolah bukan kantin, tapi makan bareng pas jam istirahat.", warna: "#c026d3" },
  { id: "gilang", nama: "Gilang Saputra", julukan: "DJ Kelas", kelas: "XII IPS 1", hobi: "Musik & editing video", quote: "Setiap acara jadi lebih hidup kalau musiknya tepat. Itu pelajaran paling pentingku.", warna: "#16a34a" },
  { id: "kirana", nama: "Kirana Ayudia", julukan: "Pencatat Sejarah", kelas: "XII IPA 1", hobi: "Menulis & jurnalistik", quote: "Aku catat semuanya supaya suatu hari nanti kita bisa baca lagi dan tertawa.", warna: "#d97706" },
  { id: "rizky", nama: "Rizky Ramadhan", julukan: "Si Rajin Telat", kelas: "XII IPS 1", hobi: "Skateboard & gaming", quote: "Maaf untuk semua telatku. Terima kasih sudah tetap nyimpenin tempat duduk.", warna: "#4f46e5" },
  { id: "nayla", nama: "Nayla Zahira", julukan: "Gudang Cerita", kelas: "XII IPA 2", hobi: "Teater & nulis lirik", quote: "Kalau nanti kita ketemu lagi, aku mau cerita ini belum kelar.", warna: "#db2777" },
];

export type Moment = {
  src: string;
  caption: string;
  tag: string;
  featured?: boolean;
};

export const moments: Moment[] = [
  { src: momentGroup, caption: "Panggung perpisahan angkatan", tag: "Perpisahan", featured: true },
  { src: momentBasecamp, caption: "Kumpul angkatan di basecamp", tag: "Kumpul" },
  { src: momentHunting, caption: "Hunting foto tugas sekolah", tag: "Tugas" },
  { src: momentAkustik, caption: "Akustikan setelah bel pulang", tag: "Sore" },
  { src: momentDapoer, caption: "Masak bareng di kelas", tag: "Masak" },
  { src: momentCafe, caption: "Rapat panitia di kafe", tag: "Panitia" },
  { src: momentMakan, caption: "Makan bareng tiap Jumat", tag: "Perut" },
  { src: momentPodcast, caption: "Rekam podcast angkatan", tag: "Suara" },
  { src: momentTari, caption: "Latihan tari buat pentas", tag: "Pentas" },
];

export const chapters = [
  { number: "01", title: "Hari pertama", date: "Juli 2023", text: "Seragam masih kaku, nama teman belum hafal, dan bangku yang akhirnya jadi tempat pulang." },
  { number: "02", title: "Tumbuh bareng", date: "2024 — 2025", text: "Dari tugas kelompok sampai obrolan setelah bel pulang, pelan-pelan kita jadi satu angkatan." },
  { number: "03", title: "Tahun terakhir", date: "2026", text: "Ujian, pentas, dan panitia perpisahan — semua kita kerjakan sambil pura-pura tidak sedih." },
  { number: "04", title: "Sampai jumpa", date: "April 2026", text: "Kita tutup satu bab dengan bangga, bawa cerita lebih banyak daripada yang muat ditulis di sini." },
];

export const teacherMessages = [
  { nama: "Bapak Hendra", mapel: "Wali Kelas XII IPA 1", pesan: "Kalian bukan kelas paling tenang, tapi kalian kelas paling hidup. Itu yang bikin saya ingat terus." },
  { nama: "Ibu Ratna", mapel: "Wali Kelas XII IPA 2", pesan: "Nilai bisa lupa, tapi cara kalian saling jaga waktu acara sekolah tidak akan saya lupa." },
  { nama: "Bapak Yusuf", mapel: "Wali Kelas XII IPS 1", pesan: "Pergi jauh, pulang kalau sempat. Kelas ini selalu punya tempat buat kalian." },
];

export const wallNotes = [
  { dari: "Dimas", teks: "Nanti kalau udah kerja, jangan cuma muncullah di grup ya." },
  { dari: "Maya", teks: "Sisa foto hasil hunting masih ada di flashdiskku. Ambil sebelum kehapus." },
  { dari: "Kirana", teks: "Aku simpan semua koran dinding kalian. Suatu hari bakal jadi buku." },
  { dari: "Fajar", teks: "Lapangan nanti kita main lagi, ya. Janji." },
  { dari: "Salma", teks: "Kalau rindu, mampir. Aku masak." },
  { dari: "Nayla", teks: "Naskah drama kita belum kelar. Nanti kita lanjut di lain waktu." },
];

// ── Penjelasan layanan Year Book (dipakai halaman /year-book) ──

export type YearBookIsi = {
  judul: string;
  teks: string;
};

export const yearBookIsi: YearBookIsi[] = [
  { judul: "Profil lulusan", teks: "Satu halaman per siswa: nama, kelas, hobi, dan kutipan pilihan sendiri." },
  { judul: "Galeri momen", teks: "Foto satu tahun penuh — kumpul angkatan, tugas, pentas, sampai makan bareng." },
  { judul: "Linimasa angkatan", teks: "Cerita berurutan dari hari pertama masuk sampai hari perpisahan." },
  { judul: "Pesan guru", teks: "Kata wali kelas dan guru untuk angkatan, dicetak persis seperti ditulis." },
  { judul: "Dinding pesan", teks: "Catatan singkat antarteman, ditempel seperti di mading sekolah." },
  { judul: "Sampul & identitas", teks: "Nama sekolah, angkatan, dan julukan angkatan di sampul depan." },
];

export type YearBookLangkah = {
  nomor: string;
  judul: string;
  teks: string;
};

export const yearBookLangkah: YearBookLangkah[] = [
  { nomor: "01", judul: "Konsultasi", teks: "Ceritakan angkatanmu: jumlah siswa, jumlah kelas, dan buku yang diinginkan." },
  { nomor: "02", judul: "Kumpulkan isi", teks: "Kami kirim formulir isian untuk siswa, guru, dan panitia biar datanya rapi." },
  { nomor: "03", judul: "Desain & tinjau", teks: "Tata letak dan foto disusun, lalu kamu tinjau sampai benar-benar pas." },
  { nomor: "04", judul: "Cetak & bagikan", teks: "Buku dicetak atau dibagikan sebagai tautan digital ke seluruh angkatan." },
];

export type YearBookBentuk = {
  nama: string;
  ringkas: string;
  poin: string[];
};

export const yearBookBentuk: YearBookBentuk[] = [
  {
    nama: "Cetak",
    ringkas: "Buku fisik untuk dipegang, disimpan, dan dibagikan ke angkatan.",
    poin: ["Pilihan ukuran dan jenis kertas", "Sampul tebal dengan nama angkatan", "Dibagikan pas hari perpisahan"],
  },
  {
    nama: "Digital",
    ringkas: "Buku tahunan yang dibuka lewat tautan, bisa dibagikan ke mana saja.",
    poin: ["Tautan khusus untuk angkatan", "Foto bisa dibuka ukuran penuh", "Isinya bisa ditambah setelah cetak"],
  },
];
