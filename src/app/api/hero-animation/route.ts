import { NextResponse } from "next/server";
import { readdirSync, statSync } from "fs";
import { join } from "path";

// Replace common transliterations and hyphens, and capitalize words for nicer display
const prettifyName = (raw: string) => {
    const cleaned = raw
        .replace(/-/g, " ")
        .replace(/ae/g, "ä")
        .replace(/oe/g, "ö")
        .replace(/ue/g, "ü")
        .replace(/Ae/g, "Ä")
        .replace(/Oe/g, "Ö")
        .replace(/Ue/g, "Ü");

    return cleaned
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export async function GET() {
    try {
        const galleryPath = join(process.cwd(), "public", "hero-animation");
        const items = readdirSync(galleryPath);

        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const eventImages: { folder: string; image: string; text: string }[] = [];

        for (const item of items) {
            const itemPath = join(galleryPath, item);
            const stat = statSync(itemPath);

            if (stat.isDirectory()) {
                const folderFiles = readdirSync(itemPath);
                const imageFile = folderFiles.find((file) => {
                    const ext = file.substring(file.lastIndexOf(".")).toLowerCase();
                    return validExtensions.includes(ext);
                });

                if (imageFile) {
                    eventImages.push({
                        folder: item,
                        image: `/hero-animation/${item}/${imageFile}`,
                        text: prettifyName(item),
                    });
                }
            }
        }

        // Optional: keep deterministic order
        eventImages.sort((a, b) => a.text.localeCompare(b.text, "de"));

        return NextResponse.json({ files: eventImages });
    } catch (error) {
        console.error("Error reading hero-animation folder:", error);
        return NextResponse.json({ files: [], error: "Failed to read hero-animation folder" }, { status: 500 });
    }
}
