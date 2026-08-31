'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiNavigation, FiX, FiCompass } from 'react-icons/fi';
import { useCampusStore } from '@/hooks/useCampusStore';

export function NavigationOverlay() {
    const isNavigating = useCampusStore((s) => s.isNavigating);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);
    const resetSelection = useCampusStore((s) => s.resetSelection);

    if (!isNavigating || !selectedLocation) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 pointer-events-auto"
            >
                <div className="bg-[#070B0A]/85 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] flex items-center justify-between gap-4">
                    {/* Icon and Info */}
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <FiNavigation className="text-lg animate-pulse" />
                            <span className="absolute top-1 right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                                    3D Navigation Active
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-white leading-tight">
                                {selectedLocation.name}
                            </h3>
                            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                                {selectedLocation.building} • Floor {selectedLocation.floor} • Room {selectedLocation.roomNumber}
                            </p>
                        </div>
                    </div>

                    {/* Exit/Cancel Button */}
                    <button
                        type="button"
                        onClick={resetSelection}
                        className="flex items-center justify-center p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                        title="Exit Navigation"
                    >
                        <FiX className="text-base" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default NavigationOverlay;
