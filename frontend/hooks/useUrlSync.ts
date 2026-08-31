'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useCampusStore } from './useCampusStore';
import { COLLEGE_LOCATIONS, MUMBAI_COLLEGES } from '@/data/mumbaiColleges';

export function useUrlSync() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isHydrated = useRef(false);

    const selectedCollegeId = useCampusStore((s) => s.selectedCollegeId);
    const setSelectedCollegeId = useCampusStore((s) => s.setSelectedCollegeId);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);
    const setSelectedLocation = useCampusStore((s) => s.setSelectedLocation);
    const selectedBuilding = useCampusStore((s) => s.selectedBuilding);
    const setSelectedBuilding = useCampusStore((s) => s.setSelectedBuilding);
    const setIsNavigating = useCampusStore((s) => s.setIsNavigating);

    // 1. Hydrate store from URL query parameters on first load
    useEffect(() => {
        if (isHydrated.current) return;

        const collegeParam = searchParams.get('college');
        const locParam = searchParams.get('loc');
        const bldgParam = searchParams.get('bldg');
        const navParam = searchParams.get('nav');

        if (collegeParam && MUMBAI_COLLEGES.some((c) => c.id === collegeParam)) {
            setSelectedCollegeId(collegeParam);
        }

        if (locParam) {
            const matchLoc = COLLEGE_LOCATIONS.find((l) => l.id === locParam);
            if (matchLoc) {
                setSelectedLocation(matchLoc);
                if (navParam === '1') {
                    setIsNavigating(true);
                }
            }
        }

        if (bldgParam) {
            setSelectedBuilding({
                id: bldgParam,
                name: bldgParam.replace(/-/g, ' ').toUpperCase(),
                code: 'BLDG',
                totalFloors: 4,
                departments: [],
                description: 'Selected via direct link.',
            });
        }

        isHydrated.current = true;
    }, [searchParams, setSelectedCollegeId, setSelectedLocation, setSelectedBuilding, setIsNavigating]);

    // 2. Sync store updates back to the browser URL
    useEffect(() => {
        if (!isHydrated.current) return;

        const params = new URLSearchParams();
        if (selectedCollegeId) params.set('college', selectedCollegeId);
        if (selectedLocation) params.set('loc', selectedLocation.id);
        if (selectedBuilding) params.set('bldg', selectedBuilding.id);

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        window.history.replaceState(null, '', newUrl);
    }, [selectedCollegeId, selectedLocation, selectedBuilding, pathname]);
}