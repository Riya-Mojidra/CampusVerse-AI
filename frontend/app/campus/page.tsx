'use client';

import React, { useState } from 'react';
import CampusWrapper from '@/three/CampusWrapper';
import { useCampusStore } from '@/hooks/useCampusStore';
import { useSearch } from '@/hooks/useSearch';
import { useUrlSync } from '@/hooks/useUrlSync';
import { CampusSearch } from '@/components/ui/CampusSearch';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { LocationCard } from '@/components/cards/LocationCard';
import { NavigationOverlay } from '@/components/ui/NavigationOverlay';
import { AIAssistantDrawer } from '@/components/ui/AIAssistantDrawer';
import { BuildingInspectorDrawer } from '@/components/ui/BuildingInspectorDrawer';
import { VoiceGuidanceHUD } from '@/components/ui/VoiceGuidanceHUD';
import { ShareRouteButton } from '@/components/ui/ShareRouteButton';
import { MUMBAI_COLLEGES, COLLEGE_LOCATIONS } from '@/data/mumbaiColleges';
import { FiCpu } from 'react-icons/fi';

export default function CampusPage() {
    useUrlSync(); // Activates Phase 8 Deep Linking

    const [isAiOpen, setIsAiOpen] = useState(false);
    const selectedCollegeId = useCampusStore((s) => s.selectedCollegeId);
    const setSelectedCollegeId = useCampusStore((s) => s.setSelectedCollegeId);

    const currentCollege =
        MUMBAI_COLLEGES.find((c) => c.id === selectedCollegeId) || MUMBAI_COLLEGES[0];
    const locations = COLLEGE_LOCATIONS.filter(
        (loc) => loc.collegeId === currentCollege?.id
    );

    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        filteredLocations,
    } = useSearch(locations);

    return (
        <div className="relative w-screen h-[calc(100vh-4rem)] flex overflow-hidden bg-[#070B0A]">
            {/* 3D Building Inspector Drawer */}
            <BuildingInspectorDrawer />

            {/* Voice Navigation HUD (Phase 9) */}
            <VoiceGuidanceHUD />

            {/* Main 3D Viewport */}
            <div className="flex-1 h-full relative">
                <NavigationOverlay />
                <CampusWrapper />

                {/* Floating AI and Action Controls */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsAiOpen(true)}
                        className="flex items-center gap-2.5 bg-black/85 border border-emerald-500/80 hover:border-emerald-400 text-white px-4 py-3 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-xl transition-all hover:scale-105 cursor-pointer"
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <FiCpu className="text-emerald-400 text-lg" />
                        <span className="text-xs font-mono font-semibold tracking-wide">Ask Copilot</span>
                    </button>

                    <ShareRouteButton />
                </div>
            </div>

            {/* Right Sidebar: Directory */}
            <div className="w-[420px] h-full flex flex-col bg-[#070B0A]/95 backdrop-blur-md border-l border-zinc-800/80 p-5 z-10 shadow-2xl">
                <div className="mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                        Mumbai Digital Twin Directory
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight">Campus Explorer</h2>
                </div>

                <div className="mb-3">
                    <select
                        value={selectedCollegeId}
                        onChange={(e) => setSelectedCollegeId(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl p-2.5 focus:border-emerald-500 focus:outline-none cursor-pointer"
                    >
                        {MUMBAI_COLLEGES.map((college) => (
                            <option key={college.id} value={college.id} className="bg-zinc-950 text-white">
                                {college.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <CampusSearch
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder={`Search rooms in ${currentCollege?.name || 'campus'}...`}
                    />
                </div>

                <div className="mb-4">
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                    {filteredLocations.length > 0 ? (
                        filteredLocations.map((loc) => (
                            <LocationCard key={loc.id} location={loc} />
                        ))
                    ) : (
                        <div className="py-12 text-center text-zinc-500 text-xs font-mono">
                            No locations matching "{searchQuery}"
                        </div>
                    )}
                </div>
            </div>

            {/* AI Assistant Drawer */}
            <AIAssistantDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
        </div>
    );
}