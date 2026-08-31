'use client';

import React from 'react';
import { Html } from '@react-three/drei';

interface BuildingLabelProps {
    name: string;
    position?: [number, number, number] | { x: number; y: number; z: number };
    height?: number;
    isSelected?: boolean;
}

export const BuildingLabel: React.FC<BuildingLabelProps> = ({
    name,
    position = [0, 0, 0],
    height = 5,
    isSelected = false,
}) => {
    const posArray: [number, number, number] = Array.isArray(position)
        ? [position[0], position[1] + height / 2 + 2, position[2]]
        : [position.x, position.y + height / 2 + 2, position.z];

    return (
        <Html
            position={posArray}
            center
            distanceFactor={30}
            style={{
                pointerEvents: 'none',
                userSelect: 'none',
            }}
        >
            <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-2xl transition-all duration-200 ${isSelected
                        ? 'bg-black/95 border-2 border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.9)] scale-110'
                        : 'bg-black/90 border-2 border-emerald-400/90 shadow-[0_0_15px_rgba(0,0,0,0.9)]'
                    }`}
            >
                <span
                    className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-300 animate-ping' : 'bg-emerald-400'
                        }`}
                />
                <span className="text-emerald-300 font-mono text-sm sm:text-base font-extrabold uppercase tracking-wider whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                    {name}
                </span>
            </div>
        </Html>
    );
};

export default BuildingLabel;