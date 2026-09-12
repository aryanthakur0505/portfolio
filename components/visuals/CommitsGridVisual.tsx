/**
 * Renders "GITPULSE" as a GitHub-contribution-style grid of squares — own
 * from-scratch bitmap font + renderer (not the locked 21st.dev "Commits
 * Grid" source), for GitPulse's git/code theme.
 */

// 5-wide x 7-tall bitmap glyphs for the letters GITPULSE needs.
const FONT: Record<string, string[]> = {
  G: [".###.", "#...#", "#....", "#.##.", "#...#", "#...#", ".###."],
  I: [".###.", "..#..", "..#..", "..#..", "..#..", "..#..", ".###."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
};

const TEXT = "GITPULSE";

// Deterministic pseudo-random intensity so it renders the same on server & client.
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export default function CommitsGridVisual() {
  const letters = TEXT.split("").map((ch) => FONT[ch]);
  const rows = 7;

  return (
    <div className="commits-grid">
      {Array.from({ length: rows }).map((_, row) => (
        <div className="commits-grid__row" key={row}>
          {letters.map((glyph, li) => (
            <div className="commits-grid__letter" key={li}>
              {glyph[row].split("").map((cell, col) => {
                const seed = row * 31 + li * 7 + col;
                const lit = cell === "#";
                const level = lit ? Math.floor(pseudoRandom(seed) * 3) + 2 : 0;
                return (
                  <span
                    key={col}
                    className="commits-grid__cell"
                    data-level={level}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
