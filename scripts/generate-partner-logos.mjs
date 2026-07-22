// Generates one React component per partner/network/stablecoin logo SVG,
// with the artwork optimized (SVGO) and inlined as JSX (SVGR) instead of
// shipped as a standalone file resolved via `new URL(..., import.meta.url)`.
//
// Why: a dynamic `new URL(\`./assets/${slug}.svg\`, import.meta.url)` cannot
// be statically analyzed by most bundlers (Vite handles literal paths only;
// Webpack/Next.js don't copy the asset at all), so consumers whose apps use
// Webpack/Next.js would get a broken <img> at runtime. Inlining the SVG as a
// real JSX component removes the asset-resolution step entirely — it works
// identically in every bundler (and with no bundler at all).
//
// Inputs live in src/assets/partners/*.svg (source of truth, git-tracked,
// NOT shipped in dist/ — see copy-build-assets.mjs). Outputs are generated
// into src/components/PartnerLogo/logos/ and are themselves git-ignored,
// regenerated automatically before build/test/storybook (see package.json
// "pre*" scripts) and on demand via `npm run generate:logos`.
import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { transform } from "@svgr/core";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "src/assets/partners");
const OUT_DIR = path.join(ROOT, "src/components/PartnerLogo/logos");

function toComponentName(slug) {
  const pascal = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
  return `${pascal}Logo`;
}

async function generateOne(file) {
  const slug = path.basename(file, ".svg");
  const componentName = toComponentName(slug);
  const svgCode = await readFile(path.join(SRC_DIR, file), "utf8");

  const jsCode = await transform(
    svgCode,
    {
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      jsxRuntime: "automatic",
      // Strip width/height so the wrapper (bankLogo/squareLogo in
      // PartnerLogo.jsx) fully controls rendered size via props; viewBox is
      // preserved by SVGO's default preset so scaling stays correct.
      dimensions: false,
      ref: false,
      titleProp: false,
      expandProps: "end",
      svgoConfig: {
        plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }],
      },
    },
    { componentName },
  );

  const header =
    `// GENERATED FILE — do not edit by hand.\n` +
    `// Source: src/assets/partners/${file}\n` +
    `// Regenerate with \`npm run generate:logos\` after changing the source SVG.\n`;

  await writeFile(path.join(OUT_DIR, `${componentName}.jsx`), header + jsCode);
  return { slug, componentName };
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR)).filter((f) => f.endsWith(".svg")).sort();
  const entries = [];
  for (const file of files) {
    entries.push(await generateOne(file));
  }

  const barrel =
    `// GENERATED FILE — do not edit by hand.\n` +
    `// Regenerate with \`npm run generate:logos\`.\n` +
    entries.map((e) => `import ${e.componentName} from "./${e.componentName}.jsx";`).join("\n") +
    `\n\nexport const LOGO_COMPONENTS = {\n` +
    entries.map((e) => `  "${e.slug}": ${e.componentName},`).join("\n") +
    `\n};\n`;

  await writeFile(path.join(OUT_DIR, "index.js"), barrel);

  console.log(
    `Generated ${entries.length} partner logo components into ${path.relative(ROOT, OUT_DIR)}/`,
  );
}

await main();
