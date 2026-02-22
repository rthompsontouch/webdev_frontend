import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: string | Buffer,
  options?: { folder?: string }
): Promise<{ url: string; publicId: string }> {
  const source = typeof file === "string"
    ? file
    : `data:image/png;base64,${(file as Buffer).toString("base64")}`;
  const result = await cloudinary.uploader.upload(source, {
    folder: options?.folder ?? "project-updates",
    resource_type: "image",
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function uploadImages(
  files: (string | Buffer)[],
  options?: { folder?: string }
): Promise<string[]> {
  const results = await Promise.all(
    files.map((f) => uploadImage(f, options))
  );
  return results.map((r) => r.url);
}
