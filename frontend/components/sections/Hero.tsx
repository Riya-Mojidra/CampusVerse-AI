// File: components/sections/Hero.tsx
"use client";

import Link from "next/link";
import CampusCanvas from "@/three/CampusCanvas";

export default function Hero() {
    return (
        <section className="relative pt-8 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
            {/* Background Glow Effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#10B981]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1815]/80 border border-[#10B981]/30 text-[#00FFA3] text-xs font-semibold tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse shadow-[0_0_8px_#00FFA3]" />
                Interactive 3D Campus Experience
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
                Explore Your Campus <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] via-[#10B981] to-emerald-400">
                    In Interactive 3D
                </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
                Navigate classrooms, discover laboratories, explore faculty cabins, and experience your college through an immersive AI-powered digital twin.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                    href="/campus"
                    className="px-8 py-3.5 rounded-full bg-[#10B981] text-[#0B0F12] font-bold text-base hover:bg-[#00FFA3] hover:shadow-[0_0_25px_rgba(0,255,163,0.5)] transition-all transform hover:-translate-y-0.5"
                >
                    Explore Campus →
                </Link>
                <button
                    onClick={() => {
                        const el = document.getElementById("features");
                        el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-3.5 rounded-full bg-[#0F1815]/70 border border-[#10B981]/30 text-zinc-200 font-semibold text-base hover:border-[#00FFA3]/60 hover:text-[#00FFA3] transition-all"
                >
                    Watch Demo
                </button>
            </div>

            {/* 3D Campus HUD Container */}
            <div className="mt-12 w-full max-w-5xl relative group">
                {/* HUD Frame Container */}
                <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl bg-[#0F1815]/70 backdrop-blur-md border border-[#10B981]/25 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]">

                    {/* Tactical HUD Corner Crosshairs */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00FFA3] z-20 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00FFA3] z-20 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00FFA3] z-20 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00FFA3] z-20 pointer-events-none" />

                    {/* Top HUD Bar overlay */}
                    <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0B0F12]/80 border border-[#10B981]/20 text-[11px] text-zinc-300 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3]" />
                            SYS.CANVAS // 3D_TWIN_ACTIVE
                        </div>
                        <div className="hidden sm:block text-[11px] font-mono text-emerald-400/80">
                            ROTATION: ACTIVE | INTERACTION: ENABLED
                        </div>
                    </div>

                    {/* Preserved 3D Canvas */}
                    <div className="w-full h-full relative z-10">
                        <CampusCanvas />
                    </div>
                </div>
            </div>
        </section>
    );
}