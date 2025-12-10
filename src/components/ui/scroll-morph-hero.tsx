"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    eventText: string;
}

// --- FlipCard Component ---
const IMG_WIDTH = 80;  // Slightly larger to avoid text clipping
const IMG_HEIGHT = 120; // Slightly larger to avoid text clipping

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
    eventText,
}: FlipCardProps) {
    
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 20,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                willChange: "transform, opacity",
                pointerEvents: "auto",
                zIndex: 1000 - index, // keep each card hoverable and above overlaps
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.65, type: "spring", stiffness: 90, damping: 22 }}
                whileHover={{ rotateY: 180, scale: 1.03 }}
                whileTap={{ rotateY: 180, scale: 1.02 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img src={src} alt={`hero-${index}`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-white/90 flex items-center justify-center p-4 border border-gray-200"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center text-gray-900 font-semibold text-base md:text-lg leading-tight tracking-tight drop-shadow-sm px-2">
                        {eventText}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 16;
// Increase virtual scroll distance to slow down the hero animation
const MAX_SCROLL = 4000;

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [images, setImages] = useState<string[]>([]);
    const [eventTexts, setEventTexts] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const transitionTriggeredRef = useRef(false);
    const isCursorNearBottomRef = useRef(false); // allow exit when mouse is near bottom band

    // Load gallery images dynamically
    useEffect(() => {
        fetch("/api/hero-animation")
            .then((res) => res.json())
            .then((data) => {
                const eventData = data.files || [];
                const urls = eventData.map((item: any) => item.image);
                const texts = eventData.map((item: any) => item.text);
                setImages(urls.slice(0, TOTAL_IMAGES));
                setEventTexts(texts.slice(0, TOTAL_IMAGES));
            })
            .catch((err) => console.error("Failed to load hero animation images:", err));
    }, []);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0); // Keep track of scroll value without re-renders

    useEffect(() => {
        const target = window;

        const handleWheel = (e: WheelEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            // If hero is off-screen, let the page scroll normally
            if (!isVisible) return;

            const delta = e.deltaY;
            const newScroll = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);

            const atTopAndScrollingUp = scrollRef.current <= 0 && delta < 0;
            const wantsExit =
                delta > 0 && (scrollRef.current >= MAX_SCROLL || isCursorNearBottomRef.current);

            // Only exit hero when user is at end OR hovers near the bottom band
            if (wantsExit) {
                if (!transitionTriggeredRef.current && containerRef.current) {
                    transitionTriggeredRef.current = true;
                    const rect = containerRef.current.getBoundingClientRect();
                    const targetY = rect.bottom + window.scrollY;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                    setTimeout(() => (transitionTriggeredRef.current = false), 900);
                }
                return; // allow native page scroll after trigger
            }

            if (atTopAndScrollingUp) return;

            e.preventDefault();
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            if (!isVisible) return;

            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);

            const atTopAndPullingDown = scrollRef.current <= 0 && deltaY < 0;
            const atBottomAndPullingUp = scrollRef.current >= MAX_SCROLL && deltaY > 0;

            if (atBottomAndPullingUp) {
                if (!transitionTriggeredRef.current && containerRef.current) {
                    transitionTriggeredRef.current = true;
                    const rect = containerRef.current.getBoundingClientRect();
                    const targetY = rect.bottom + window.scrollY;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                    setTimeout(() => (transitionTriggeredRef.current = false), 900);
                }
                return;
            }

            if (atTopAndPullingDown) return;

            e.preventDefault();
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        target.addEventListener("wheel", handleWheel, { passive: false });
        target.addEventListener("touchstart", handleTouchStart, { passive: false });
        target.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            target.removeEventListener("wheel", handleWheel);
            target.removeEventListener("touchstart", handleTouchStart);
            target.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Happens between scroll 0 and 1200 (slower/longer)
    const morphProgress = useTransform(virtualScroll, [0, 1200], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 30, damping: 28 });

    // 2. Scroll Rotation (Shuffling): Starts after morph (e.g., > 1200)
    const scrollRotate = useTransform(virtualScroll, [1200, 4000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 30, damping: 28 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 25, damping: 22 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const relativeY = e.clientY - rect.top;

            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 60); // reduce parallax amplitude for smoother motion

            const normalizedY = relativeY / rect.height;
            isCursorNearBottomRef.current = normalizedY >= 0.82;
        };
        const handleMouseLeave = () => {
            isCursorNearBottomRef.current = false;
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return images.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, [images]);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-screen bg-[#FAFAFA] overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Top intro text removed as requested */}

                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
                        Unvergessliche Events. Perfekt organisiert
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
                        Planung, Technik, Umsetzung – alles aus einer Hand.
                    </p>
                </motion.div>

                {introPhase === "circle" && morphValue < 0.6 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-center"
                    >
                        <img
                            src="/jj-events-logo.png"
                            alt="JJ Events"
                            className="h-24 w-auto md:h-28 mix-blend-multiply brightness-110 contrast-110"
                        />
                        <span className="text-sm md:text-base font-medium text-gray-800 tracking-wide">
                            Scroll to explore
                        </span>
                    </motion.div>
                )}

                <div className="relative flex items-center justify-center w-full h-full">
                    {images.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 90;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);
                            const circleRadius = Math.min(minDimension * 0.42, 380);

                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.5 : 1.2);

                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                eventText={eventTexts[i] || "Event"}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
