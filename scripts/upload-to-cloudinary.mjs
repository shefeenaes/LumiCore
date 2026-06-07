import { v2 as cloudinary } from "cloudinary";
import { readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public", "images");

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov"]);

function collectFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith("_")) continue; // skip _unused folder
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectFiles(full));
    } else {
      const ext = extname(entry).toLowerCase();
      if (IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext)) results.push(full);
    }
  }
  return results;
}

const files = collectFiles(PUBLIC_DIR);
console.log(`\nUploading ${files.length} files to Cloudinary...\n`);

const mapping = {};

for (const filePath of files) {
  const rel = relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
  const ext = extname(rel).toLowerCase();
  const publicId = `lumicore/${rel.replace(/\.[^.]+$/, "")}`; // strip extension
  const resourceType = VIDEO_EXTS.has(ext) ? "video" : "image";

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
      // Auto-convert to best format and quality on delivery (not at upload)
      // — transformations are applied at the URL level (f_auto, q_auto)
    });

    const cdnUrl = result.secure_url;
    mapping[`/images/${rel}`] = cdnUrl;
    console.log(`✓ ${rel}`);
    console.log(`  → ${cdnUrl}\n`);
  } catch (err) {
    console.error(`✗ ${rel}: ${err.message}\n`);
  }
}

console.log("\n=== MAPPING (local path → Cloudinary URL) ===");
console.log(JSON.stringify(mapping, null, 2));
