'use client';

import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface CampusSearchProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export function CampusSearch({
    value,
    onChange,
    placeholder = 'Search rooms, departments, labs...',
}: CampusSearchProps) {
    return (
        <div className="relative w-full">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-base pointer-events-none" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                    <FiX className="text-base" />
                </button>
            )}
        </div>
    );
}

export default CampusSearch;