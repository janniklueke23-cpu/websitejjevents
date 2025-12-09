import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    const files = fs.readdirSync(galleryDir);
    
    // Filter for valid media files and exclude .gitkeep
    const mediaFiles = files
      .filter((file) => {
        const ext = file.toLowerCase();
        return (
          ext.endsWith(".jpg") ||
          ext.endsWith(".jpeg") ||
          ext.endsWith(".png") ||
          ext.endsWith(".gif") ||
          ext.endsWith(".webp") ||
          ext.endsWith(".mp4") ||
          ext.endsWith(".webm") ||
          ext.endsWith(".ogg")
        );
      })
      .map((file) => `/gallery/${file}`);

    return NextResponse.json({ files: mediaFiles });
  } catch (error) {
    console.error("Error reading gallery directory:", error);
    return NextResponse.json({ files: [] }, { status: 500 });
  }
}
