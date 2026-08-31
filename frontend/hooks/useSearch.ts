'use client';

import { useMemo, useState } from 'react';
import { CampusLocation } from '@/types/campus';

export function useSearch(locations: CampusLocation[]) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filteredLocations = useMemo(() => {
        return locations.filter((loc) => {
            // Category check
            const matchesCategory =
                selectedCategory === 'All' ||
                loc.category?.toLowerCase() === selectedCategory.toLowerCase();

            // Search query check across name, room, building, department, description
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesCategory;

            const roomStr = String(loc.roomNumber || '');
            const matchesQuery =
                loc.name.toLowerCase().includes(query) ||
                loc.building.toLowerCase().includes(query) ||
                roomStr.toLowerCase().includes(query) ||
                loc.category?.toLowerCase().includes(query) ||
                (loc.description && loc.description.toLowerCase().includes(query));

            return matchesCategory && matchesQuery;
        });
    }, [locations, searchQuery, selectedCategory]);

    return {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        filteredLocations,
    };
}