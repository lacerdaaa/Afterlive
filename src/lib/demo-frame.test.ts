import { describe, expect, it } from "vitest";
import { demoFrame } from "./demo-frame";

const script = {
  words: ["A", "B", "C", "D", "E", "F", "G"],
  starsAt: [1, 3],
  calmChat: [{ user: "x", text: "oi" }],
  chat: [
    { at: 0, user: "u1", text: "m1" },
    { at: 2, user: "u2", text: "m2" },
    { at: 5, user: "u3", text: "m3" },
  ],
  rate: { calm: 10, peak: 70 },
};

describe("demoFrame", () => {
  it("before playing: calm chat, no caption highlight, no stars", () => {
    const f = demoFrame(script, -1);
    expect(f.line).toEqual(["A", "B", "C"]);
    expect(f.active).toBe(-1);
    expect(f.stars).toBe(0);
    expect(f.rate).toBe(10);
    expect(f.chat.map((m) => m.text)).toEqual(["oi"]);
    expect(f.progress).toBe(0);
    expect(f.done).toBe(false);
  });

  it("shows the three-word line containing the current beat", () => {
    const f = demoFrame(script, 4);
    expect(f.line).toEqual(["D", "E", "F"]);
    expect(f.active).toBe(1);
  });

  it("adds chat messages and stars as beats pass", () => {
    const f = demoFrame(script, 3);
    expect(f.chat.map((m) => m.text)).toEqual(["oi", "m1", "m2"]);
    expect(f.stars).toBe(2);
  });

  it("ramps the message rate linearly to the peak", () => {
    expect(demoFrame(script, 6).rate).toBe(70);
    expect(demoFrame(script, 3).rate).toBe(40);
  });

  it("is done on the last beat with full progress", () => {
    const f = demoFrame(script, 6);
    expect(f.done).toBe(true);
    expect(f.progress).toBe(1);
    expect(f.line).toEqual(["G"]);
  });
});
