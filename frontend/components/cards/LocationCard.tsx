'use client';

import React from 'react';
import { useCampusStore } from '@/hooks/useCampusStore';
import { CampusLocation } from '@/types/campus';

interface LocationCardProps {
    location: CampusLocation;
}

export function LocationCard({ location }: LocationCardProps) {
    const selectedLocation = useCampusStore((s) => s.selectedLocation);
    const setSelectedLocation = useCampusStore((s) => s.setSelectedLocation);
    const setIsNavigating = useCampusStore((s) => s.setIsNavigating);

    const isSelected = selectedLocation?.id === location.id;

    const handleNavigate = () => {
        setSelectedLocation(location);
        setIsNavigating(true);
    };

    return (
        <div
            className={`p-3.5 rounded-xl border transition-all duration-200 ${isSelected
                    ? 'bg-zinc-900/90 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    : 'bg-zinc-950/70 border-zinc-850 hover:border-zinc-700'
                }`}
        >
            <div className="flex justify-between items-start mb-1.5">
                <h4 className="text-white font-semibold text-sm leading-snug">{location.name}</h4>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    {location.category}
                </span>
            </div>

            <p className="text-xs text-zinc-400 mb-3 font-mono">
                {location.building} • Floor {location.floor} • Room {location.roomNumber}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                <button
                    type="button"
                    onClick={handleNavigate}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                    Navigate in 3D →
                </button>
            </div>
        </div>
    );
}

export default LocationCard;