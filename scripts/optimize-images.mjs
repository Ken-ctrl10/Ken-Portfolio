/**
 * One-time (re-runnable) image optimizer.
 *
 * Originals are moved to _originals/ on first run, preserving their repo-relative
 * path, and every later run re-reads from there. That keeps the script idempotent:
 * re-running never re-compresses an already-compressed file.
 *
 * _originals/ sits outside public/ and src/, so Vite neither bundles nor copies it.
 *
 * Usage: npm run optimize:images
 */

import sharp from "sharp";
import { readdir, mkdir, rename, access, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGINALS = path.join(ROOT, "_originals");

// Cream background, matching --bg in global.css. Used to letterbox non-uniform
// certificate scans and to back the OG card.
const CREAM = { r: 236, g: 223, b: 204, alpha: 1 };

/**
 * Widths are ~2x the actual rendered CSS size, so the images stay crisp on
 * retina displays without shipping anything larger than necessary.
 */
const JOBS = [
  // Hero portraits — rendered at min(380px, 35vw) (main-page.css)
  { src: "src/assets/images/image.png", width: 760 },
  { src: "src/assets/images/image-animated.png", width: 760 },

  // About flip photos — rendered at 420px (about-page.css)
  { src: "src/assets/images/internship/aboutme.jpg", width: 840 },
  { src: "src/assets/images/internship/intern-selfie.png", width: 840 },

  // QR code — must stay scannable, so higher quality and no aggressive downscale
  { src: "src/assets/images/VIBER-QR.jpg", width: 600, quality: 92 },

  // Project shots — rendered roughly full-column width
  { dir: "public/projects", width: 900 },

  // Certificate thumbnails — letterboxed to a uniform 4:3 box so the gallery
  // grid stays even regardless of each scan's aspect ratio.
  { dir: "public/certificates", width: 400, height: 300, fit: "contain" },

  // Full-size certificates for the lightbox. These live in a subfolder and are
  // only ever fetched when a visitor opens a certificate, so they add nothing to
  // the initial page weight.
  { dir: "public/certificates", width: 1400, outDir: "public/certificates/full" },
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the path to read pixels from, moving the live file into _originals/
 * the first time we see it.
 */
async function resolveSource(relPath) {
  const originalPath = path.join(ORIGINALS, relPath);
  const livePath = path.join(ROOT, relPath);

  if (await exists(originalPath)) return originalPath;

  if (!(await exists(livePath))) return null;

  await mkdir(path.dirname(originalPath), { recursive: true });
  await rename(livePath, originalPath);
  return originalPath;
}

async function convert({ relPath, width, height, fit, outDir, quality = 82 }) {
  const source = await resolveSource(relPath);
  if (!source) {
    console.warn(`  ! skipped (missing): ${relPath}`);
    return null;
  }

  // outDir redirects the output elsewhere (e.g. full-size lightbox copies) while
  // still reading from the same archived original.
  const baseRel = outDir ? path.posix.join(outDir, path.basename(relPath)) : relPath;
  const outRel = baseRel.replace(/\.(png|jpe?g)$/i, ".webp");
  const outPath = path.join(ROOT, outRel);
  await mkdir(path.dirname(outPath), { recursive: true });

  const resizeOpts = height
    ? { width, height, fit: fit ?? "cover", background: CREAM }
    : { width, withoutEnlargement: true };

  const info = await sharp(source).resize(resizeOpts).webp({ quality }).toFile(outPath);

  const before = (await stat(source)).size;
  const saved = (((before - info.size) / before) * 100).toFixed(0);
  console.log(
    `  ${outRel}  ${(before / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB  (-${saved}%)`
  );

  return { before, after: info.size };
}

/**
 * 1200x630 social card: cream ground, portrait bled to the right, name and role
 * set on the left. Emitted as JPEG — some social scrapers still refuse WebP.
 */
async function buildOgImage() {
  const source = await resolveSource("src/assets/images/image.png");
  if (!source) return null;

  const W = 1200;
  const H = 630;

  const portrait = await sharp(source)
    .resize({ height: H, width: Math.round(W * 0.42), fit: "cover", position: "top" })
    .toBuffer();

  const text = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .name { font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif; font-size: 72px; font-weight: 700; fill: #181C14; }
        .role { font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif; font-size: 34px; fill: #3C3D37; }
        .tech { font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif; font-size: 26px; fill: #5A5C52; }
      </style>
      <text class="name" x="80" y="270">Ken Castillo</text>
      <text class="role" x="80" y="335">Computer Science Graduate</text>
      <text class="tech" x="80" y="400">React · Node.js · Express · PostgreSQL</text>
      <rect x="80" y="440" width="120" height="6" rx="3" fill="#3C3D37" />
    </svg>
  `);

  const outPath = path.join(ROOT, "public/og-image.jpg");
  const info = await sharp({
    create: { width: W, height: H, channels: 3, background: CREAM },
  })
    .composite([
      { input: portrait, top: 0, left: W - Math.round(W * 0.42) },
      { input: text, top: 0, left: 0 },
    ])
    .jpeg({ quality: 88 })
    .toFile(outPath);

  console.log(`  public/og-image.jpg  ${(info.size / 1024).toFixed(0)}KB  (${W}x${H})`);
  return info;
}

async function main() {
  console.log("Optimizing images...\n");

  const targets = [];

  for (const job of JOBS) {
    if (job.src) {
      targets.push({ ...job, relPath: job.src });
      continue;
    }

    // Directory job: prefer the already-archived originals so re-runs are stable.
    const archived = path.join(ORIGINALS, job.dir);
    const scanDir = existsSync(archived) ? archived : path.join(ROOT, job.dir);
    const files = await readdir(scanDir);

    for (const file of files.filter((f) => /\.(png|jpe?g)$/i.test(f))) {
      targets.push({ ...job, relPath: path.posix.join(job.dir, file) });
    }
  }

  let before = 0;
  let after = 0;
  // One original can produce several outputs (thumbnail + full-size), so only
  // count each source once or the "before" total is inflated.
  const countedSources = new Set();

  for (const target of targets) {
    const result = await convert(target);
    if (result) {
      if (!countedSources.has(target.relPath)) {
        countedSources.add(target.relPath);
        before += result.before;
      }
      after += result.after;
    }
  }

  console.log("\nBuilding social card...");
  const og = await buildOgImage();
  if (og) after += og.size;

  console.log(
    `\nTotal: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB ` +
      `(-${(((before - after) / before) * 100).toFixed(0)}%)`
  );
  console.log("Originals archived in _originals/ (not deployed).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
