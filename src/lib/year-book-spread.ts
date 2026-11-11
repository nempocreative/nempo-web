// Pembagian halaman buku tahunan menjadi "bentangan" (dua halaman berhadapan).
// Sampul depan (halaman 0) dan sampul belakang (halaman terakhir) berdiri sendiri,
// halaman isi dipasangkan kiri-kanan: [1,2], [3,4], ...

export function bookSpreads(total: number): number[][] {
  if (total <= 0) return [];
  if (total === 1) return [[0]];
  const spreads: number[][] = [[0]];
  for (let i = 1; i < total - 1; i += 2) {
    spreads.push(i + 1 < total - 1 ? [i, i + 1] : [i]);
  }
  spreads.push([total - 1]);
  return spreads;
}

export function spreadIndexOf(page: number, total: number): number {
  const spreads = bookSpreads(total);
  const found = spreads.findIndex((s) => s.includes(page));
  return found < 0 ? 0 : found;
}
