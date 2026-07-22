// Copies non-JS build assets (CSS, fonts, SVGs) from src/ into dist/,
// mirroring the source layout so relative paths (e.g. tokens.css's
// `../fonts/...`, OtcBanner's `./assets/...`) keep resolving correctly
// after the Babel build. Skips dev-only trees (stories, examples, docs)
// that the package doesn't ship.
//
// Two exceptions to the plain "copy everything" behaviour:
//  - src/assets/partners/**  — raw partner/network/stablecoin logo SVGs are
//    build-time-only input to scripts/generate-partner-logos.mjs (inlined
//    as React components at build time, see PartnerLogo.jsx). They are
//    never read from disk at runtime, so they're intentionally NOT copied
//    into dist/ — this keeps ~600KB of source artwork out of the published
//    package.
//  - every other *.svg still shipped as a standalone file (currently just
//    OtcBanner's decorative patterns, plus 3 unused root brand SVGs) is run
//    through SVGO on the way into dist/, since those files are consumer-
//    facing build output, not just source.
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { optimize } from "svgo";

const ROOT = path.resolve(import.meta.dirname, "..");
const SVGO_CONFIG = { plugins: ["preset-default"] };

async function copyDir(src, dest, options = {}) {
  await mkdir(path.dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: true, ...options });
}

// Recursively finds every *.svg under `srcDir` (skipping any directory
// named in `skipDirs`), optimizes it with SVGO, and writes it to the
// matching path under `destDir`.
async function optimizeSvgsIn(srcDir, destDir, { skipDirs = [] } = {}) {
  let entries;
  try {
    entries = await readdir(srcDir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (skipDirs.includes(entry.name)) continue;
      await optimizeSvgsIn(path.join(srcDir, entry.name), path.join(destDir, entry.name), {
        skipDirs,
      });
      continue;
    }
    if (!entry.name.endsWith(".svg")) continue;

    const srcFile = path.join(srcDir, entry.name);
    const destFile = path.join(destDir, entry.name);
    const raw = await readFile(srcFile, "utf8");
    const { data } = optimize(raw, { path: srcFile, ...SVGO_CONFIG });

    await mkdir(path.dirname(destFile), { recursive: true });
    await writeFile(destFile, data);
  }
}

await copyDir(path.join(ROOT, "src/fonts"), path.join(ROOT, "dist/fonts"));
await copyDir(path.join(ROOT, "src/styles"), path.join(ROOT, "dist/styles"));

// assets/: copy everything except *.svg (handled by optimizeSvgsIn below)
// and the partners/ source tree (build-time-only, never shipped).
await copyDir(path.join(ROOT, "src/assets"), path.join(ROOT, "dist/assets"), {
  filter: (source) => {
    if (path.basename(source) === "partners") return false;
    if (source.endsWith(".svg")) return false;
    return true;
  },
});
await optimizeSvgsIn(path.join(ROOT, "src/assets"), path.join(ROOT, "dist/assets"), {
  skipDirs: ["partners"],
});

// Per-component CSS files live alongside their .jsx — copy just the .css
// (and other non-JS, non-SVG files); SVGs (OtcBanner's decorative patterns)
// go through optimizeSvgsIn instead. Generated PartnerLogo/logos/*.jsx are
// excluded here (by the .jsx filter) and compiled by build:babel instead.
await copyDir(path.join(ROOT, "src/components"), path.join(ROOT, "dist/components"), {
  filter: (source) =>
    !source.endsWith(".jsx") && !source.endsWith(".js") && !source.endsWith(".svg"),
});
await optimizeSvgsIn(path.join(ROOT, "src/components"), path.join(ROOT, "dist/components"));

console.log(
  "Copied fonts/, assets/, styles/, and component CSS/SVG into dist/ (SVGs optimized via SVGO).",
);
