"use client";

import { useEffect, useState } from "react";
import { Logos3 } from "@/components/ui/logos3";

export default function GalleryPage() {
  const [media, setMedia] = useState<string[]>([]);

  useEffect(() => {
    // Add external image links
    const externalImages = [
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=800,height=600/image/530724058/15d4a79e-5e3c-4105-9e9a-23d9224e0c31.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;244;0;244,width=800,height=600/image/530724229/9214f232-fbc9-46e7-a8ff-ff2368ca509a.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=800,height=600/image/496007198/09dedc33-00e0-452f-ab18-18547f539d04.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=735,height=1280/image/496007197/63f43af1-871f-4d84-92fa-a60d73883fba.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;152;0;153,width=640,height=512/image/496007195/377ddb3a-aa38-46dd-bd55-7300e8d76d67.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=738,height=1280/image/496007196/c37d3409-45ff-4316-8e3b-d1296099597d.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=800,height=600/image/497154587/a9c2bff7-b073-40f6-865b-179b8317369a.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=800,height=600/image/497154592/2e7ca1d8-34d1-4d11-a5f8-94d4fd77a6a7.jpg",
      "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=800,height=600/image/497154593/593c9c37-3187-491e-9b6d-8635a011f13a.jpg"
    ];
    
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setMedia([...externalImages, ...(data.files || [])]))
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
      
      <Logos3 heading="Unsere Technik" />
    </section>
  );
}
