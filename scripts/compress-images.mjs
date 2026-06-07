import sharp from "sharp";
import { existsSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, "..", "public", "images");

// PNG photos that exceeded Cloudinary's 10MB free-tier limit.
// Convert to JPG at quality 85 — photos have no meaningful transparency,
// so JPG gives ~80% size reduction with imperceptible quality loss.
const targets = [
  { src: "portfolio/project-01.png", out: "portfolio/project-01.jpg" },
  { src: "portfolio/project-03.png", out: "portfolio/project-03.jpg" },
  { src: "portfolio/project-06.png", out: "portfolio/project-06.jpg" },
  { src: "services/kitchen.png",     out: "services/kitchen.jpg" },
  { src: "services/door.png",        out: "services/door.jpg" },
  // video-poster.jpg already uploaded; .png is unused source — just delete it
  { src: "problem/video-poster.png", out: null },
];

for (const { src, out } of targets) {
  const srcPath = join(BASE, src);
  if (!existsSync(srcPath)) {
    console.log(`skip (not found): ${src}`);
    continue;
  }

  if (out === null) {
    unlinkSync(srcPath);
    console.log(`deleted unused source: ${src}`);
    continue;
  }

  const outPath = join(BASE, out);
  const meta = await sharp(srcPath).metadata();
  // Cap at 2400px wide — enough for any retina display; larger is wasteful
  const width = Math.min(meta.width ?? 2400, 2400);

  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath);

  // Report size delta
  const { size: inSz } = (await import("fs")).statSync(srcPath);
  const { size: outSz } = (await import("fs")).statSync(outPath);
  const saved = (((inSz - outSz) / inSz) * 100).toFixed(0);
  console.log(
    `✓ ${src} → ${out}  (${(inSz / 1e6).toFixed(1)}MB → ${(outSz / 1e6).toFixed(1)}MB, -${saved}%)`
  );

  // Remove the original PNG now that the JPG exists
  unlinkSync(srcPath);
}

console.log("\nDone. Re-run the upload script to push the new JPGs to Cloudinary.");
