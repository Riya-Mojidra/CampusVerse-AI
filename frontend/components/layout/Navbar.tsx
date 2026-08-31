// File: components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-[72px] px-4 sm:px-8 flex items-center justify-between bg-[#0F1815]/80 backdrop-blur-md border-b border-[#10B981]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {/* Brand Logo & Subtitle */}
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-sm font-medium text-zinc-300 hover:text-[#00FFA3] transition-colors">
                    Home
                </Link>
                <Link href="/campus" className="text-sm font-medium text-zinc-300 hover:text-[#00FFA3] transition-colors">
                    Campus
                </Link>
                <Link href="#features" className="text-sm font-medium text-zinc-300 hover:text-[#00FFA3] transition-colors">
                    Features
                </Link>
                <Link href="#about" className="text-sm font-medium text-zinc-300 hover:text-[#00FFA3] transition-colors">
                    About
                </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
                <Link
                    href="/campus"
                    className="px-5 py-2.5 rounded-full bg-[#10B981] text-[#0B0F12] text-sm font-bold hover:bg-[#00FFA3] hover:shadow-[0_0_20px_rgba(0,255,163,0.5)] transition-all transform hover:-translate-y-0.5"
                >
                    Explore Campus →
                </Link>
            </div>

            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-zinc-200 p-2 text-2xl focus:outline-none hover:text-[#00FFA3]"
                aria-label="Toggle Navigation"
            >
                {mobileOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileOpen && (
                <div className="absolute top-[72px] left-0 right-0 bg-[#0F1815]/95 backdrop-blur-lg border-b border-[#10B981]/20 p-6 flex flex-col gap-4 md:hidden shadow-2xl">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="text-base font-medium text-zinc-200 hover:text-[#00FFA3]">
                        Home
                    </Link>
                    <Link href="/campus" onClick={() => setMobileOpen(false)} className="text-base font-medium text-[#00FFA3]">
                        Campus
                    </Link>
                    <Link href="#features" onClick={() => setMobileOpen(false)} className="text-base font-medium text-zinc-200 hover:text-[#00FFA3]">
                        Features
                    </Link>
                    <Link href="#about" onClick={() => setMobileOpen(false)} className="text-base font-medium text-zinc-200 hover:text-[#00FFA3]">
                        About
                    </Link>
                    <Link
                        href="/campus"
                        onClick={() => setMobileOpen(false)}
                        className="mt-2 w-full text-center py-3 rounded-xl bg-[#10B981] text-[#0B0F12] font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    >
                        Explore Campus →
                    </Link>
                </div>
            )}
        </header>
    );
}