'use client';

import React from 'react';
import { useCampusStore } from '@/hooks/useCampusStore';
import { CampusLocation } from '@/types/campus';

interface LocationCardProps {
    location: CampusLocation;
}

export function LocationCard({ location }: LocationCardProps) {
    const setSelectedLocation = useCampusStore((s) => s.setSelectedLocation);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);

    const isSelected = selectedLocation?.id === location.id;

    return (
        <div
            className={`p-4 rounded-xl border transition-all duration-200 ${isSelected
                ? 'bg-zinc-900 border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-semibold text-sm">{location.name}</h4>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                    {location.category}
                </span>
            </div>

            <p className="text-xs text-zinc-400 mb-3">
                {location.building} • Floor {location.floor} • Room {location.roomNumber}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
                <button
                    type="button"
                    onClick={() => setSelectedLocation(location)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                    Focus in 3D →
                </button>
            </div>
        </div>
    );
}

export default LocationCard;