'use client';

import { create } from 'zustand';
import { CampusLocation } from '@/types/campus';

export interface BuildingInfo {
    id: string;
    name: string;
    code: string;
    totalFloors: number;
    departments: string[];
    description: string;
}

export interface CampusStore {
    selectedCollegeId: string;
    setSelectedCollegeId: (id: string) => void;
    selectedLocation: CampusLocation | null;
    setSelectedLocation: (loc: CampusLocation | null) => void;
    selectedBuilding: BuildingInfo | null;
    setSelectedBuilding: (bldg: BuildingInfo | null) => void;
    isNavigating: boolean;
    setIsNavigating: (val: boolean) => void;
    targetCamera: {
        position: { x: number; y: number; z: number };
        target: { x: number; y: number; z: number };
    } | null;
    setTargetCamera: (camera: {
        position: { x: number; y: number; z: number };
        target: { x: number; y: number; z: number };
    } | null) => void;
    resetSelection: () => void;
}

export const useCampusStore = create<CampusStore>((set) => ({
    selectedCollegeId: 'vjti',
    setSelectedCollegeId: (id: string) =>
        set({
            selectedCollegeId: id,
            selectedLocation: null,
            selectedBuilding: null,
            isNavigating: false,
        }),

    selectedLocation: null,
    setSelectedLocation: (loc: CampusLocation | null) =>
        set({
            selectedLocation: loc,
        }),

    selectedBuilding: null,
    setSelectedBuilding: (bldg: BuildingInfo | null) =>
        set({
            selectedBuilding: bldg,
        }),

    isNavigating: false,
    setIsNavigating: (val: boolean) =>
        set({
            isNavigating: val,
        }),

    targetCamera: null,
    setTargetCamera: (camera) =>
        set({
            targetCamera: camera,
        }),

    resetSelection: () =>
        set({
            selectedLocation: null,
            selectedBuilding: null,
            isNavigating: false,
            targetCamera: null,
        }),
}));

export default useCampusStore;