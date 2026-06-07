import { v2 as cloudinary } from "cloudinary";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, "..", "public", "images");

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Only the files that were compressed and converted from PNG → JPG
const files = [
  "portfolio/project-01.jpg",
  "portfolio/project-03.jpg",
  "portfolio/project-06.jpg",
  "services/kitchen.jpg",
  "services/door.jpg",
];

const mapping = {};

for (const rel of files) {
  const filePath = join(BASE, rel);
  const publicId = `lumicore/${rel.replace(/\.[^.]+$/, "")}`;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: "image",
      overwrite: true,
    });
    mapping[`/images/${rel}`] = result.secure_url;
    console.log(`✓ ${rel}\n  → ${result.secure_url}\n`);
  } catch (err) {
    console.error(`✗ ${rel}: ${err.message}\n`);
  }
}

console.log("\n=== MAPPING ===");
console.log(JSON.stringify(mapping, null, 2));
