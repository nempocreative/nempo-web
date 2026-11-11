import { describe, expect, it } from "vitest";
import { bookSpreads, spreadIndexOf } from "./year-book-spread";

describe("bentangan buku tahunan", () => {
  it("sampul depan dan belakang berdiri sendiri, isi berpasangan", () => {
    expect(bookSpreads(16)).toEqual([[0], [1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15]]);
  });

  it("halaman isi ganjil menyisakan satu halaman sebelum sampul belakang", () => {
    expect(bookSpreads(5)).toEqual([[0], [1, 2], [3], [4]]);
  });

  it("menemukan bentangan untuk halaman kanan", () => {
    expect(spreadIndexOf(6, 16)).toBe(3);
    expect(spreadIndexOf(15, 16)).toBe(8);
  });
});
