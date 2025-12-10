import { NextResponse } from "next/server";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export async function GET() {
    try {
        const galleryPath = join(process.cwd(), "public", "hero-animation");
        const items = readdirSync(galleryPath);
        
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const eventImages: { folder: string; image: string; text: string }[] = [];

        // Iterate through folders
        for (const item of items) {
            const itemPath = join(galleryPath, item);
            const stat = statSync(itemPath);
            
            if (stat.isDirectory()) {
                // Read images from folder
                const folderFiles = readdirSync(itemPath);
                const imageFile = folderFiles.find((file) => {
                    const ext = file.substring(file.lastIndexOf(".")).toLowerCase();
                    return validExtensions.includes(ext);
                });
                
                if (imageFile) {
                    eventImages.push({
                        folder: item,
                        image: `/hero-animation/${item}/${imageFile}`,
                        text: item
                    });
                }
            }
        }

        return NextResponse.json({ files: eventImages });
    } catch (error) {
        console.error("Error reading hero-animation folder:", error);
        return NextResponse.json({ files: [], error: "Failed to read hero-animation folder" }, { status: 500 });
    }
}
