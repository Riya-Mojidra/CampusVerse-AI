'use client';

import React, { useState } from 'react';
import { useCampusStore } from '@/hooks/useCampusStore';
import { COLLEGE_LOCATIONS } from '@/data/mumbaiColleges';
import { CampusLocation } from '@/types/campus';
import {
    FiLayers,
    FiX,
    FiMapPin,
    FiNavigation,
    FiChevronDown,
    FiChevronRight,
    FiCompass
} from 'react-icons/fi';

export function BuildingInspectorDrawer() {
    const selectedBuilding = useCampusStore((s) => s.selectedBuilding);
    const setSelectedBuilding = useCampusStore((s) => s.setSelectedBuilding);
    const selectedCollegeId = useCampusStore((s) => s.selectedCollegeId);
    const setSelectedLocation = useCampusStore((s) => s.setSelectedLocation);
    const setIsNavigating = useCampusStore((s) => s.setIsNavigating);

    const [activeFloor, setActiveFloor] = useState<number | null>(0);

    if (!selectedBuilding) return null;

    // Filter rooms belonging to this building in the active campus
    const buildingRooms = COLLEGE_LOCATIONS.filter(
        (loc) =>
            loc.collegeId === selectedCollegeId &&
            (loc.building.toLowerCase().includes(selectedBuilding.name.toLowerCase()) ||
                selectedBuilding.name.toLowerCase().includes(loc.building.toLowerCase()))
    );

    // Group rooms by floor
    const floors = Array.from({ length: selectedBuilding.totalFloors || 4 }, (_, idx) => {
        const floorNumber = idx;
        const roomsOnFloor = buildingRooms.filter((r) => Number(r.floor) === floorNumber);
        return { floorNumber, rooms: roomsOnFloor };
    });

    const handleStartNav = (room: CampusLocation) => {
        setSelectedLocation(room);
        setIsNavigating(true);
        setSelectedBuilding(null);
    };

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-full sm:w-[420px] bg-[#070B0A]/95 backdrop-blur-2xl border-r border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-left-full duration-300">
            {/* Header */}
            <div className="p-5 border-b border-zinc-800/80 flex items-start justify-between bg-zinc-950/70">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                            3D Inspector
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                            Code: {selectedBuilding.code}
                        </span>
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                        {selectedBuilding.name}
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={() => setSelectedBuilding(null)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                    <FiX className="text-lg" />
                </button>
            </div>

            {/* Building Highlights */}
            <div className="p-4 bg-zinc-900/40 border-b border-zinc-800/50 space-y-2">
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {selectedBuilding.description || 'Primary educational wing containing specialized departments and computer laboratories.'}
                </p>

                {selectedBuilding.departments && selectedBuilding.departments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedBuilding.departments.map((dept) => (
                            <span
                                key={dept}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                            >
                                {dept}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Floor-by-Floor Directory Accordion */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase mb-1">
                    <span className="flex items-center gap-1.5">
                        <FiLayers className="text-emerald-400" /> Floor Directory
                    </span>
                    <span>{buildingRooms.length} Indexed Rooms</span>
                </div>

                {floors.map(({ floorNumber, rooms }) => {
                    const isExpanded = activeFloor === floorNumber;
                    return (
                        <div
                            key={floorNumber}
                            className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden transition-all"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveFloor(isExpanded ? null : floorNumber)}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-zinc-850 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xs font-bold font-mono text-emerald-400">
                                        Floor {floorNumber === 0 ? 'Ground (0)' : floorNumber}
                                    </span>
                                    <span className="text-[11px] font-mono text-zinc-400">
                                        ({rooms.length} locations)
                                    </span>
                                </div>
                                {isExpanded ? (
                                    <FiChevronDown className="text-zinc-400 text-sm" />
                                ) : (
                                    <FiChevronRight className="text-zinc-400 text-sm" />
                                )}
                            </button>

                            {isExpanded && (
                                <div className="p-2.5 pt-0 space-y-1.5 border-t border-zinc-800/40 bg-black/40">
                                    {rooms.length > 0 ? (
                                        rooms.map((room) => (
                                            <div
                                                key={room.id}
                                                className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between hover:border-emerald-500/40 transition-colors"
                                            >
                                                <div className="min-w-0 flex-1 pr-2">
                                                    <p className="text-xs font-semibold text-white truncate">
                                                        {room.name}
                                                    </p>
                                                    <p className="text-[10px] text-zinc-400 font-mono">
                                                        Room {room.roomNumber || (room as any).room || 'N/A'} • {room.category}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleStartNav(room)}
                                                    className="py-1 px-2.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-[10px] flex items-center gap-1 shrink-0 transition-all shadow-[0_0_8px_rgba(16,185,129,0.3)] cursor-pointer"
                                                >
                                                    <FiNavigation className="text-xs" /> Route
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-3 text-center text-zinc-500 font-mono text-[11px]">
                                            General Classrooms & Faculty Cabins
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}

export default BuildingInspectorDrawer;