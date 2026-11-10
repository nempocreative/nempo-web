import { describe, expect, it } from "vitest";
import { mainNavItems } from "./main-nav-items";
import {
  chapters,
  graduates,
  kelasList,
  moments,
  teacherMessages,
  wallNotes,
  yearBookMeta,
} from "./year-book";

describe("menu Year Book", () => {
  it("muncul di menu utama dan menunjuk ke /year-book", () => {
    const item = mainNavItems.find((n) => n.id === "year-book");
    expect(item?.label).toBe("Year Book");
    expect(item?.href).toBe("/year-book");
  });
});

describe("isi year book", () => {
  it("setiap lulusan punya kelas yang terdaftar", () => {
    expect(graduates.length).toBe(12);
    for (const g of graduates) {
      expect(kelasList).toContain(g.kelas);
      expect(g.nama.trim().length).toBeGreaterThan(0);
      expect(g.quote.trim().length).toBeGreaterThan(0);
    }
  });

  it("galeri punya tepat satu foto utama dan 8 foto isi yang mengisi grid penuh", () => {
    const featured = moments.filter((m) => m.featured);
    const rest = moments.filter((m) => !m.featured);
    expect(featured.length).toBe(1);
    expect(rest.length).toBe(8);
    expect(rest.length % 4).toBe(0);
    expect(rest.length % 2).toBe(0);
  });

  it("linimasa, pesan guru, dan dinding pesan terisi penuh", () => {
    expect(chapters.length).toBe(4);
    expect(teacherMessages.length).toBe(3);
    expect(wallNotes.length).toBe(6);
    expect(wallNotes.length % 3).toBe(0);
  });

  it("meta angkatan memakai tahun 2026 dan menyebut sekolahnya", () => {
    expect(yearBookMeta.angkatan).toBe("2026");
    expect(yearBookMeta.sekolah).toBe("SMA Nempo Garut");
    expect(yearBookMeta.tahunLulus).toBe(2026);
  });

  it("isi halaman masih ditandai sebagai contoh", () => {
    expect(yearBookMeta.catatanContoh).toContain("CONTOH");
    expect(yearBookMeta.catatanContoh).toContain("src/data/year-book.ts");
  });
});
