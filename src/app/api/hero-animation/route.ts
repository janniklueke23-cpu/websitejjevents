import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join } from "path";

export async function GET() {
    try {
        const galleryPath = join(process.cwd(), "public", "hero-animation");
        const files = readdirSync(galleryPath);

        // Filter for valid image/video extensions
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm", ".ogg"];
        const mediaFiles = files.filter((file) => {
            const ext = file.substring(file.lastIndexOf(".")).toLowerCase();
            return validExtensions.includes(ext);
        });

        return NextResponse.json({ files: mediaFiles.sort() });
    } catch (error) {
        console.error("Error reading hero-animation folder:", error);
        return NextResponse.json({ files: [], error: "Failed to read hero-animation folder" }, { status: 500 });
    }
}
