// File: components/layout/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[#0F1815]/80 backdrop-blur-md border-t border-[#10B981]/20 text-zinc-400 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#10B981]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Info */}
                    <div className="md:col-span-1 flex flex-col gap-3">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-xl bg-[#10B981] flex items-center justify-center text-[#0B0F12] font-black text-lg shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:bg-[#00FFA3] transition-all">
                                C
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white tracking-wide leading-none text-base group-hover:text-[#00FFA3] transition-colors">
                                    CampusVerse
                                </span>
                                <span className="text-[10px] font-semibold tracking-widest text-[#00FFA3] uppercase mt-0.5">
                                    AI Digital Twin
                                </span>
                            </div>
                        </Link>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                            Next-generation spatial twin platform for interactive college exploration, real-time campus navigation, and AI-powered assistance.
                        </p>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h4 className="text-xs font-mono font-bold tracking-widest text-[#00FFA3] uppercase mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-2.5 text-xs font-medium">
                            <li>
                                <Link href="/" className="hover:text-[#00FFA3] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/campus" className="hover:text-[#00FFA3] transition-colors">
                                    Campus Explorer
                                </Link>
                            </li>
                            <li>
                                <Link href="#features" className="hover:text-[#00FFA3] transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="hover:text-[#00FFA3] transition-colors">
                                    About Platform
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Capabilities */}
                    <div>
                        <h4 className="text-xs font-mono font-bold tracking-widest text-[#00FFA3] uppercase mb-4">
                            Capabilities
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                3D Interactive Mapping
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                Room & Building Search
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                Spatial AI Assistant
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                Emergency Exit Routing
                            </li>
                        </ul>
                    </div>

                    {/* System Telemetry */}
                    <div>
                        <h4 className="text-xs font-mono font-bold tracking-widest text-[#00FFA3] uppercase mb-4">
                            System Telemetry
                        </h4>
                        <div className="p-3.5 rounded-xl bg-[#0B0F12]/80 border border-[#10B981]/20 text-[11px] font-mono space-y-2">
                            <div className="flex justify-between items-center text-zinc-300">
                                <span>CORE_ENGINE</span>
                                <span className="text-[#00FFA3]">THREE.JS / R3F</span>
                            </div>
                            <div className="flex justify-between items-center text-zinc-300">
                                <span>FRAMEWORK</span>
                                <span className="text-emerald-400">NEXT.JS</span>
                            </div>
                            <div className="flex justify-between items-center text-zinc-300">
                                <span>STATUS</span>
                                <span className="inline-flex items-center gap-1.5 text-[#00FFA3]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />
                                    ONLINE
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-[#10B981]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
                    <div>
                        © {new Date().getFullYear()} CampusVerse AI. All rights reserved.
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <span>SYS.VER // 1.0.0</span>
                        <span>•</span>
                        <span className="text-[#00FFA3]">DIGITAL TWIN ENGINE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}