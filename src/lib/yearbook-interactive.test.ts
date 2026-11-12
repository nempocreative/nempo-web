import { describe, expect, it } from "vitest";
import { graduates } from "@/data/year-book";
import { createTimeCapsule, filterGraduates, parseTimeCapsule, spotifySearchUrl } from "./yearbook-interactive";

describe("yearbook interactive memories", () => {
  it("finds a student by name or Instagram ignoring case", () => {
    expect(filterGraduates(graduates, " NADIA ", "semua").map((g) => g.id)).toEqual(["nadia"]);
    expect(filterGraduates(graduates, "rayhan.aditya", "semua").map((g) => g.id)).toEqual(["rayhan"]);
  });
  it("combines the class filter with search and handles no results", () => {
    expect(filterGraduates(graduates, "", "XII IPA 2")).toHaveLength(4);
    expect(filterGraduates(graduates, "nadia", "XII IPS 1")).toHaveLength(0);
  });
  it("opens five years after creation, including leap day", () => {
    expect(createTimeCapsule("Nadia", "Semoga bahagia", new Date("2026-11-12T05:06:00Z"))?.opensAt).toBe("2031-11-12T05:06:00.000Z");
    expect(createTimeCapsule("Nadia", "Semoga bahagia", new Date("2028-02-29T00:00:00Z"))?.opensAt).toBe("2033-02-28T00:00:00.000Z");
  });
  it("rejects empty or oversized messages and invalid stored data", () => {
    const now = new Date("2026-11-12T00:00:00Z");
    expect(createTimeCapsule(" ", "halo", now)).toBeNull();
    expect(createTimeCapsule("Nadia", " ", now)).toBeNull();
    expect(createTimeCapsule("Nadia", "a".repeat(2001), now)).toBeNull();
    expect(parseTimeCapsule('{"name":"Nadia"}')).toBeNull();
    const capsule = createTimeCapsule("Nadia", "Sampai jumpa", now);
    expect(parseTimeCapsule(JSON.stringify(capsule))).toEqual(capsule);
  });
  it("links the selected song to Spotify search", () => {
    expect(spotifySearchUrl("Sampai Jumpa", "Endank Soekamti")).toBe("https://open.spotify.com/search/Sampai%20Jumpa%20Endank%20Soekamti");
  });
});