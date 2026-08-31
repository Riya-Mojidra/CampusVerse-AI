'use client';

import React from 'react';

const CATEGORIES = [
    'All',
    'Department',
    'Classroom',
    'Laboratory',
    'Library',
    'Facility',
];

interface CategoryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
    selectedCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
                const isActive =
                    selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => onSelectCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${isActive
                                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                                : 'bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                            }`}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}

export default CategoryFilter;