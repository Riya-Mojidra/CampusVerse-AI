// File: components/sections/HowItWorks.tsx
"use client";

import { HiSearch, HiCube, HiLocationMarker } from "react-icons/hi";

const steps = [
    {
        step: "01",
        title: "Search or Query AI",
        description: "Type any location name or ask CampusVerse AI questions like 'Where is Computer Lab 204?'.",
        icon: HiSearch,
        tag: "INPUT // QUERY",
    },
    {
        step: "02",
        title: "3D Spatial Highlight",
        description: "The digital twin smoothly shifts camera angle, highlighting the exact building, floor, and room.",
        icon: HiCube,
        tag: "3D // VISUALIZE",
    },
    {
        step: "03",
        title: "Navigate & Access Details",
        description: "View department information, faculty room details, and step-by-step campus walking directions.",
        icon: HiLocationMarker,
        tag: "NAV // ROUTE",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold tracking-widest text-[#00FFA3] uppercase bg-[#0F1815]/80 border border-[#10B981]/30 px-4 py-1.5 rounded-full inline-block mb-3">
                    Workflow Architecture
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    How CampusVerse <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] to-[#10B981]">
                        Operates
                    </span>
                </h2>
                <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                    From search query to 3D highlight in three instant steps.
                </p>
            </div>

            {/* Step Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {steps.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                        <div
                            key={idx}
                            className="relative p-8 rounded-2xl bg-[#0F1815]/70 backdrop-blur-md border border-[#10B981]/20 hover:border-[#00FFA3]/50 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Step Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-3xl font-mono font-black text-[#00FFA3]/40 group-hover:text-[#00FFA3] transition-colors">
                                        {item.step}
                                    </span>
                                    <span className="text-[10px] font-mono text-emerald-400/80 bg-[#0B0F12]/60 px-2.5 py-1 rounded-md border border-[#10B981]/15">
                                        {item.tag}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-[#0B0F12] border border-[#10B981]/30 flex items-center justify-center text-[#00FFA3] text-2xl mb-4 group-hover:scale-105 transition-transform">
                                    <IconComp />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00FFA3] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Status bar bottom */}
                            <div className="mt-8 pt-4 border-t border-[#10B981]/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                                <span>STATUS: READY</span>
                                <span className="text-[#00FFA3]">PHASE_{item.step}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}