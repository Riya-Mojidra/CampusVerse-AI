'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import CampusScene from './CampusScene';
import { FiCompass, FiMaximize2, FiMinimize2, FiRefreshCw } from 'react-icons/fi';
import { useCampusStore } from '@/hooks/useCampusStore';

// Cyberpunk loading placeholder inside the canvas
function CanvasLoadingFallback() {
    return (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#070B0A]/90 backdrop-blur-md">
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                <div className="absolute w-8 h-8 rounded-full border-2 border-cyan-500/20 border-b-cyan-400 animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
            <p className="mt-4 text-xs font-mono tracking-widest text-emerald-400 uppercase animate-pulse">
                Initializing 3D Digital Twin...
            </p>
        </div>
    );
}

export default function CampusCanvas() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const resetSelection = useCampusStore((s) => s.resetSelection);

    const toggleFullscreen = () => {
        const el = document.getElementById('canvas-container');
        if (!document.fullscreenElement) {
            el?.requestFullscreen().catch(() => { });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => { });
            setIsFullscreen(false);
        }
    };

    return (
        <div
            id="canvas-container"
            className="relative w-full h-full min-h-[500px] flex-1 overflow-hidden bg-[#070B0A]"
        >
            <Suspense fallback={<CanvasLoadingFallback />}>
                <Canvas
                    shadows
                    dpr={[1, 1.5]}
                    camera={{ position: [35, 25, 40], fov: 45, near: 0.1, far: 1000 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: 'high-performance',
                    }}
                    className="w-full h-full absolute inset-0 !touch-none"
                >
                    <CampusScene />
                </Canvas>
            </Suspense>

            {/* Floating 3D Viewport Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => resetSelection()}
                    title="Reset Camera & View"
                    className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 backdrop-blur-md transition-all shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                    <FiRefreshCw className="text-base" />
                </button>

                <button
                    type="button"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 backdrop-blur-md transition-all shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                    {isFullscreen ? <FiMinimize2 className="text-base" /> : <FiMaximize2 className="text-base" />}
                </button>
            </div>

            {/* Compass / Orientation Indicator */}
            <div className="absolute top-6 right-6 z-20 pointer-events-none flex items-center gap-2 bg-black/60 border border-zinc-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl">
                <FiCompass className="text-emerald-400 text-sm animate-spin-slow" />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                    North 0°
                </span>
            </div>

            {/* R3F Asset Loader Bar */}
            <Loader
                containerStyles={{ background: 'rgba(7, 11, 10, 0.95)' }}
                innerStyles={{ width: '240px', backgroundColor: '#18181b', borderRadius: '8px' }}
                barStyles={{ backgroundColor: '#10b981', height: '4px' }}
                dataStyles={{ fontFamily: 'monospace', fontSize: '11px', color: '#a1a1aa' }}
            />
        </div>
    );
}