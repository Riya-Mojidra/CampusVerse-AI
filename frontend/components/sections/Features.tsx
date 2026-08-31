// File: components/sections/Features.tsx
"use client";

import {
    HiLocationMarker,
    HiSparkles,
    HiCube,
    HiEye
} from "react-icons/hi";

const features = [
    {
        title: "SMART NAVIGATION",
        description: "Find any classroom, laboratory, or faculty cabin instantly with precise building location data.",
        icon: HiLocationMarker,
        badge: "INSTANT SEARCH",
    },
    {
        title: "AI ASSISTANT",
        description: "Ask natural questions about campus facilities, upcoming events, or emergency exit routes.",
        icon: HiSparkles,
        badge: "CAMPUS INTEL",
    },
    {
        title: "IMMERSIVE 3D",
        description: "Explore every building virtually with a full digital twin model built on web 3D technologies.",
        icon: HiCube,
        badge: "REAL-TIME RENDERING",
    },
    {
        title: "LIVE EXPERIENCE",
        description: "Interactive campus view designed for real-time location tracking, navigation, and updates.",
        icon: HiEye,
        badge: "SPATIAL VIEW",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#10B981]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold tracking-widest text-[#00FFA3] uppercase bg-[#0F1815]/80 border border-[#10B981]/30 px-4 py-1.5 rounded-full inline-block mb-3">
                    Core Platform Capabilities
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Designed for the <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] to-[#10B981]">
                        Next-Gen Campus
                    </span>
                </h2>
                <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                    CampusVerse AI bridges spatial 3D visualization with intelligent search to make college navigation effortless.
                </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <div
                            key={index}
                            className="group relative p-6 rounded-2xl bg-[#0F1815]/70 backdrop-blur-md border border-[#10B981]/20 hover:border-[#00FFA3]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(0,255,163,0.15)] transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* Header Row with Icon & Badge */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#0B0F12] border border-[#10B981]/30 flex items-center justify-center text-[#00FFA3] text-2xl group-hover:scale-110 group-hover:border-[#00FFA3] group-hover:shadow-[0_0_15px_rgba(0,255,163,0.4)] transition-all">
                                        <IconComponent />
                                    </div>
                                    <span className="text-[10px] font-mono text-emerald-400/80 bg-[#0B0F12]/60 px-2.5 py-1 rounded-md border border-[#10B981]/15">
                                        {feature.badge}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white group-hover:text-[#00FFA3] transition-colors mb-2">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Bottom Decorative Indicator */}
                            <div className="mt-6 pt-4 border-t border-[#10B981]/10 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-[#00FFA3]/80 transition-colors">
                                <span>0{index + 1} // CAPABILITY</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}