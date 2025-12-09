"use client";

import { useEffect, useState } from "react";
import { Logos3 } from "@/components/ui/logos3";

export default function GalleryPage() {
  const [media, setMedia] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setMedia(data.files || []))
      .catch((err) => console.error("Failed to load gallery:", err));
  }, []);

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Galerie</h2>
        <p className="text-muted-foreground mb-6">Momente von unseren Events.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((src, i) => {
            const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg");
            return (
              <div key={i} className="rounded-lg overflow-hidden bg-card">
                {isVideo ? (
                  <video
                    src={src}
                    className="w-full h-48 object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => {
                      try {
                        (e.currentTarget as HTMLVideoElement).play();
                      } catch {}
                    }}
                    onMouseLeave={(e) => {
                      try {
                        const v = e.currentTarget as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      } catch {}
                    }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={`event-${i}`} className="w-full h-48 object-cover" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <Logos3 heading="Unsere Partner" />
    </section>
  );
}
